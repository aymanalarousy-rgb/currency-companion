import { AdMob, BannerAdSize, BannerAdPosition, BannerAdPluginEvents, AdmobConsentStatus, InterstitialAdPluginEvents } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

// AdMob Configuration
const AD_CONFIG = {
  appId: 'ca-app-pub-4980157773430355~7963987243',
  banners: [
    'ca-app-pub-4980157773430355/9732707361',
    'ca-app-pub-4980157773430355/2429969820',
    'ca-app-pub-4980157773430355/8915487122',
    'ca-app-pub-4980157773430355/9596975996',
  ],
  interstitials: [
    'ca-app-pub-4980157773430355/5143763079',
    'ca-app-pub-4980157773430355/1141667837',
    'ca-app-pub-4980157773430355/8723915439',
  ],
};

let isInitialized = false;
let interstitialLoadCount = 0;
let pageViewCount = 0;

// No app-side throttle — let AdMob decide when to serve an interstitial
const INTERSTITIAL_FREQUENCY = 1;

export async function initializeAdMob(): Promise<void> {
  if (!Capacitor.isNativePlatform() || isInitialized) return;

  try {
    await AdMob.initialize({
      initializeForTesting: false,
    });

    // Request consent (GDPR compliance)
    const consentInfo = await AdMob.requestConsentInfo();
    if (consentInfo.isConsentFormAvailable && consentInfo.status === AdmobConsentStatus.REQUIRED) {
      await AdMob.showConsentForm();
    }

    isInitialized = true;
    console.log('AdMob initialized successfully');
  } catch (error) {
    console.error('AdMob initialization error:', error);
  }
}

// Get a rotating banner ID based on position
function getBannerAdId(position: number = 0): string {
  return AD_CONFIG.banners[position % AD_CONFIG.banners.length];
}

// Get a rotating interstitial ID
function getInterstitialAdId(): string {
  const id = AD_CONFIG.interstitials[interstitialLoadCount % AD_CONFIG.interstitials.length];
  interstitialLoadCount++;
  return id;
}

export async function showBannerAd(position: 'top' | 'bottom' = 'bottom', slotIndex: number = 0): Promise<void> {
  if (!Capacitor.isNativePlatform() || !isInitialized) return;

  try {
    await AdMob.showBanner({
      adId: getBannerAdId(slotIndex),
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: position === 'top' ? BannerAdPosition.TOP_CENTER : BannerAdPosition.BOTTOM_CENTER,
      margin: position === 'bottom' ? 60 : 0, // Account for bottom navigation
      isTesting: false,
    });
  } catch (error) {
    console.error('Banner ad error:', error);
  }
}

export async function hideBannerAd(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    await AdMob.hideBanner();
  } catch (error) {
    // Banner might not be showing
  }
}

export async function prepareInterstitial(): Promise<void> {
  if (!Capacitor.isNativePlatform() || !isInitialized) return;

  try {
    await AdMob.prepareInterstitial({
      adId: getInterstitialAdId(),
      isTesting: false,
    });
  } catch (error) {
    console.error('Interstitial prepare error:', error);
  }
}

export async function showInterstitialIfReady(): Promise<void> {
  if (!Capacitor.isNativePlatform() || !isInitialized) return;

  pageViewCount++;

  // Only show interstitial every N page views to avoid annoying users
  if (pageViewCount % INTERSTITIAL_FREQUENCY !== 0) return;

  try {
    await AdMob.showInterstitial();
    // Prepare next one after showing
    setTimeout(() => prepareInterstitial(), 1000);
  } catch (error) {
    // Interstitial might not be loaded yet, prepare one
    await prepareInterstitial();
  }
}

// Track page navigation for smart interstitial timing
export function trackPageView(): void {
  showInterstitialIfReady();
}

// ---------- Rewarded Ad (Calculator gate) ----------
const REWARD_AD_ID = 'ca-app-pub-4980157773430355/8145266636';

export async function prepareRewardAd(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  if (!isInitialized) await initializeAdMob();

  try {
    await AdMob.prepareRewardVideoAd({
      adId: REWARD_AD_ID,
      isTesting: false,
    });
  } catch (error) {
    console.error('Reward ad prepare error:', error);
  }
}

/**
 * Shows a rewarded video ad. Resolves true when the user earned the reward
 * (or when running on web / the ad failed to load, so users are never blocked).
 */
export async function showRewardAd(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return true;

  try {
    if (!isInitialized) await initializeAdMob();
    await AdMob.prepareRewardVideoAd({ adId: REWARD_AD_ID, isTesting: false });
    const reward = await AdMob.showRewardVideoAd();
    return !!reward;
  } catch (error) {
    console.error('Reward ad error:', error);
    // Don't lock the user out if no ad is available
    return true;
  }
}
