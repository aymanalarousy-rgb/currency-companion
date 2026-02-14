import { Header } from "@/components/Header";
import { CurrencyCard } from "@/components/CurrencyCard";
import { SectionDivider } from "@/components/SectionDivider";
import { BottomNavigation } from "@/components/BottomNavigation";

import { useLocalMarketRates } from "@/hooks/useLocalMarketRates";

export const LocalMarket = () => {
  const { currencies, gold, banks, lastUpdate, loading, error } = useLocalMarketRates();

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header
        title="السوق المحلي"
        subtitle="أسعار العملات والمعادن في ليبيا"
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

        {/* العملات */}
        <SectionDivider title="العملات" icon="💱" />
        <div className="space-y-3">
          {currencies.map((currency, index) => (
            <CurrencyCard key={currency.id} currency={currency} index={index} />
          ))}
        </div>

        {/* الذهب */}
        <SectionDivider title="المعادن الثمينة" icon="🥇" />
        <div className="space-y-3">
          {gold.map((currency, index) => (
            <CurrencyCard
              key={currency.id}
              currency={currency}
              index={index + currencies.length}
            />
          ))}
        </div>

        {/* المصارف */}
        <SectionDivider title="أسعار المصارف" icon="🏦" />
        <div className="space-y-3">
          {banks.map((currency, index) => (
            <CurrencyCard
              key={currency.id}
              currency={currency}
              index={index + currencies.length + gold.length}
            />
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-border">
          <p className="text-xs text-muted-foreground text-center">
            📢 أسعار السوق الموازي تُحدث يومياً
          </p>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};
