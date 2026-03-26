import { Header } from "@/components/Header";
import { CurrencyCard } from "@/components/CurrencyCard";
import { SectionDivider } from "@/components/SectionDivider";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useLocalMarketRates } from "@/hooks/useLocalMarketRates";

export const LocalMarket = () => {
  const { currencies, transfers, gold, crypto, banks, lastUpdate, loading, error } = useLocalMarketRates();

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

        {/* الحوالات */}
        {transfers.length > 0 && (
          <>
            <SectionDivider title="الحوالات" icon="💸" />
            <div className="space-y-3">
              {transfers.map((currency, index) => (
                <CurrencyCard
                  key={currency.id}
                  currency={currency}
                  index={index + currencies.length}
                />
              ))}
            </div>
          </>
        )}

        {/* المعادن */}
        {gold.length > 0 && (
          <>
            <SectionDivider title="الذهب والفضة" icon="🌟" />
            <div className="space-y-3">
              {gold.map((currency, index) => (
                <CurrencyCard
                  key={currency.id}
                  currency={currency}
                  index={index + currencies.length + transfers.length}
                />
              ))}
            </div>
          </>
        )}

        {/* العملات الرقمية */}
        {crypto.length > 0 && (
          <>
            <SectionDivider title="العملات الرقمية" icon="📱" />
            <div className="space-y-3">
              {crypto.map((currency, index) => (
                <CurrencyCard
                  key={currency.id}
                  currency={currency}
                  index={index + currencies.length + transfers.length + gold.length}
                />
              ))}
            </div>
          </>
        )}

        {/* المصارف */}
        {banks.length > 0 && (
          <>
            <SectionDivider title="الصكوك المصرفية" icon="🏦" />
            <div className="space-y-3">
              {banks.map((currency, index) => (
                <CurrencyCard
                  key={currency.id}
                  currency={currency}
                  index={index + currencies.length + transfers.length + gold.length + crypto.length}
                />
              ))}
            </div>
          </>
        )}

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
