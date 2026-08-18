import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { Gift, Loader2 } from "lucide-react";
import { prepareRewardAd, showRewardAd } from "@/services/admob";

interface RewardGateProps {
  adUnitId: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export const RewardGate = ({ adUnitId, title, description, children }: RewardGateProps) => {
  const [unlocked, setUnlocked] = useState(!Capacitor.isNativePlatform());
  const [adLoading, setAdLoading] = useState(false);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      prepareRewardAd(adUnitId);
    }
  }, [adUnitId]);

  const handleWatchAd = async () => {
    setAdLoading(true);
    const earned = await showRewardAd(adUnitId);
    setAdLoading(false);
    if (earned) setUnlocked(true);
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 text-center space-y-4">
      <Gift className="w-12 h-12 text-primary mx-auto" />
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
      <button
        onClick={handleWatchAd}
        disabled={adLoading}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-opacity disabled:opacity-60"
      >
        {adLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            جاري تحميل الإعلان...
          </>
        ) : (
          "مشاهدة الإعلان والمتابعة"
        )}
      </button>
    </div>
  );
};
