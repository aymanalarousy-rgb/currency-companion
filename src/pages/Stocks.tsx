import { Header } from "@/components/Header";
import { BottomNavigation } from "@/components/BottomNavigation";
import { RewardGate } from "@/components/RewardGate";
import { useAdMobBanner } from "@/hooks/useAdMob";
import { REWARD_AD_IDS } from "@/services/admob";
import { TOP_STOCKS } from "@/data/topStocks";
import { formatBigUsd, formatPrice } from "@/lib/format";
import { TrendingDown, TrendingUp } from "lucide-react";

export const Stocks = () => {
  useAdMobBanner("bottom", 2);

  return (
    <div className="min-h-screen bg-background pb-24" dir="rtl">
      <Header
        title="أسهم أكبر الشركات"
        subtitle="أكبر الشركات في العالم والقيمة السوقية"
      />

      <main className="px-4 py-4 space-y-3">
        <RewardGate
          adUnitId={REWARD_AD_IDS.stocks}
          title="شاهد إعلاناً لفتح قسم الأسهم"
          description="لعرض أسهم أكبر الشركات في العالم، يرجى مشاهدة إعلان قصير. شكراً لدعمك للتطبيق."
        >
          <>
            {TOP_STOCKS.map((s, index) => {
              const isPositive = s.change > 0;
              return (
                <div
                  key={s.symbol}
                  className="gradient-card rounded-lg p-4 shadow-card"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-2xl">{s.logo}</span>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground truncate">{s.nameAr}</p>
                        <p className="text-xs text-muted-foreground">{s.symbol}</p>
                      </div>
                    </div>
                    <div className="text-left shrink-0">
                      <p className="font-bold text-foreground">${formatPrice(s.price)}</p>
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
                        {Math.abs(s.change).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">القيمة السوقية</span>
                    <span className="text-xs font-medium text-foreground">
                      {formatBigUsd(s.marketCap)}
                    </span>
                  </div>
                </div>
              );
            })}

            <div className="p-4 rounded-lg bg-secondary/50 border border-border">
              <p className="text-xs text-muted-foreground text-center">
                📢 بيانات الأسهم استرشادية لأكبر الشركات عالمياً
              </p>
            </div>
          </>
        </RewardGate>
      </main>

      <BottomNavigation />
    </div>
  );
};
