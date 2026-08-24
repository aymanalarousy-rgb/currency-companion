import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initializeAdMob, showBannerAd, hideBannerAd, prepareInterstitial, trackPageView } from '@/services/admob';
import { Capacitor } from '@capacitor/core';

export function useAdMobInit() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const init = async () => {
      await initializeAdMob();
      // Pre-load first interstitial
      await prepareInterstitial();
    };

    init();
  }, []);
}

export function useAdMobBanner(position: 'top' | 'bottom' = 'bottom', slotIndex: number = 0) {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    document.documentElement.classList.add('native-banner');
    showBannerAd(position, slotIndex);

    return () => {
      document.documentElement.classList.remove('native-banner');
      hideBannerAd();
    };
  }, [position, slotIndex]);
}


export function useAdMobPageTracker() {
  const location = useLocation();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    // Track page change for interstitial timing
    trackPageView();
  }, [location.pathname]);
}
