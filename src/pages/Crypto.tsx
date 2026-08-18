import { Header } from "@/components/Header";
import { BottomNavigation } from "@/components/BottomNavigation";
import { RewardGate } from "@/components/RewardGate";
import { useAdMobBanner } from "@/hooks/useAdMob";
import { REWARD_AD_IDS } from "@/services/admob";
import { useCryptoRates } from "@/hooks/useCryptoRates";
import { formatBigUsd, formatPrice } from "@/lib/format";
import { TrendingDown, TrendingUp } from "lucide-react";

export const Crypto = () => {
  useAdMobBanner("bottom", 3);
  const { assets, loading, refreshing, lastUpdate, refresh } = useCryptoRates();

  return (
    <div className="min-h-screen bg-background pb-24" dir="rtl">
      <Header
        title="العملات الرقمية"
        subtitle="أفضل العملات الرقمية والقيمة السوقية"
        lastUpdate={lastUpdate}
        onRefresh={refresh}
        isRefreshing={refreshing}
      />

      <main className="px-4 py-4 space-y-3">
        <RewardGate
          adUnitId={REWARD_AD_IDS.crypto}
          title="شاهد إعلاناً لفتح قسم العملات الرقمية"
          description="لعرض أفضل العملات الرقمية في العالم، يرجى مشاهدة إعلان قصير. شكراً لدعمك للتطبيق."
        >
          {loading ? (
            <p className="text-center text-muted-foreground py-8">جاري تحميل الأسعار...</p>
          ) : (
            <>
              {assets.map((c, index) => {
                const isPositive = c.change24h >= 0;
                return (
                  <div
                    key={c.id}
                    className="gradient-card rounded-lg p-4 shadow-card"
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {c.image ? (
                          <img src={c.image} alt={c.name} className="w-8 h-8 rounded-full" loading="lazy" />
                        ) : (
                          <span className="text-2xl">🪙</span>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground truncate">{c.name}</p>
                          <p className="text-xs text-muted-foreground">{c.symbol}</p>
                        </div>
                      </div>
                      <div className="text-left shrink-0">
                        <p className="font-bold text-foreground">${formatPrice(c.price)}</p>
                        <p
                          className={`text-xs flex items-center gap-1 justify-end ${
                            isPositive ? "text-success" : "text-destructive"
                          }`}
                        >
                          {isPositive ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {Math.abs(c.change24h).toFixed(2)}%
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">القيمة السوقية</span>
                        <span className="text-xs font-medium text-foreground">
                          {formatBigUsd(c.marketCap)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">حجم التداول 24س</span>
                        <span className="text-xs font-medium text-foreground">
                          {formatBigUsd(c.volume24h)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <p className="text-xs text-muted-foreground text-center">
                  📢 أسعار العملات الرقمية بالدولار الأمريكي وتُحدّث لحظياً
                </p>
              </div>
            </>
          )}
        </RewardGate>
      </main>

      <BottomNavigation />
    </div>
  );
};
