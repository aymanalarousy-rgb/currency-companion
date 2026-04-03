import { Header } from "@/components/Header";
import { CurrencyCard } from "@/components/CurrencyCard";
import { SectionDivider } from "@/components/SectionDivider";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useLocalMarketRates } from "@/hooks/useLocalMarketRates";
import { useAdMobBanner } from "@/hooks/useAdMob";

export const LocalMarket = () => {
  const { dollar, euro, transfers, lastUpdate, loading, error } = useLocalMarketRates();
  useAdMobBanner('bottom', 0);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header
        title="السوق المحلي"
        subtitle="أسعار العملات في ليبيا"
        lastUpdate={lastUpdate}
      />

      <main className="px-4 py-4">
        {loading && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">جاري تحميل البيانات...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-4 mb-4 bg-destructive/10 rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {/* الدولار الأمريكي */}
        {dollar.length > 0 && (
          <>
            <SectionDivider title="الدولار الأمريكي" icon="🇺🇸" />
            <div className="space-y-3">
              {dollar.map((currency, index) => (
                <CurrencyCard key={currency.id} currency={currency} index={index} />
              ))}
            </div>
          </>
        )}

        {/* اليورو الأوروبي */}
        {euro.length > 0 && (
          <>
            <SectionDivider title="اليورو الأوروبي" icon="🇪🇺" />
            <div className="space-y-3">
              {euro.map((currency, index) => (
                <CurrencyCard key={currency.id} currency={currency} index={index + dollar.length} />
              ))}
            </div>
          </>
        )}

        {/* حوالات خارجية */}
        {transfers.length > 0 && (
          <>
            <SectionDivider title="حوالات خارجية" icon="💸" />
            <div className="space-y-3">
              {transfers.map((currency, index) => (
                <CurrencyCard
                  key={currency.id}
                  currency={currency}
                  index={index + dollar.length + euro.length}
                />
              ))}
            </div>
          </>
        )}

        <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-border">
          <p className="text-xs text-muted-foreground text-center">
            📢 الأسعار تُحدث يومياً
          </p>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};
