import { useState } from "react";
import { Header } from "@/components/Header";
import { CurrencyCard } from "@/components/CurrencyCard";
import { SectionDivider } from "@/components/SectionDivider";
import { BottomNavigation } from "@/components/BottomNavigation";
import { CurrencyRate } from "@/types/currency";

// البيانات المحلية التي يتم تحديثها يدوياً
const localRates: CurrencyRate[] = [
  {
    id: "usd-blue",
    name: "USD Blue",
    nameAr: "الدولار (ازرق)",
    rate: 8.90,
    change: 0.34,
    flag: "🇺🇸",
    category: "currency",
  },
  {
    id: "usd-white",
    name: "USD White",
    nameAr: "الدولار (ابيض)",
    rate: 8.65,
    change: 0.00,
    flag: "🇺🇸",
    category: "currency",
  },
  {
    id: "usd-turkey",
    name: "USD Turkey",
    nameAr: "الدولار (تركيا)",
    rate: 8.89,
    change: 0.28,
    flag: "🇺🇸",
    category: "currency",
  },
  {
    id: "usd-dubai",
    name: "USD Dubai",
    nameAr: "الدولار (دبي)",
    rate: 8.91,
    change: 0.22,
    flag: "🇺🇸",
    category: "currency",
  },
  {
    id: "eur",
    name: "Euro",
    nameAr: "اليورو",
    rate: 10.19,
    change: 0.15,
    flag: "🇪🇺",
    category: "currency",
  },
  {
    id: "gbp",
    name: "British Pound",
    nameAr: "الجنيه الإسترليني",
    rate: 11.52,
    change: 1.50,
    flag: "🇬🇧",
    category: "currency",
  },
  {
    id: "tnd",
    name: "Tunisian Dinar",
    nameAr: "الدينار التونسي",
    rate: 0.34,
    change: -1.43,
    flag: "🇹🇳",
    category: "currency",
  },
];

const goldRates: CurrencyRate[] = [
  {
    id: "gold",
    name: "Gold (Scrap)",
    nameAr: "الذهب (كسر)",
    rate: 946.00,
    change: -0.21,
    flag: "🏅",
    category: "gold",
  },
];

const bankRates: CurrencyRate[] = [
  {
    id: "bank-tanmiya",
    name: "Development Bank",
    nameAr: "المصارف (التنمية)",
    rate: 10.15,
    change: -0.29,
    flag: "🏦",
    category: "bank",
  },
  {
    id: "bank-wahda",
    name: "Wahda Bank",
    nameAr: "المصارف (الوحدة)",
    rate: 10.14,
    change: -0.20,
    flag: "🏦",
    category: "bank",
  },
];

export const LocalMarket = () => {
  const [lastUpdate] = useState("11-01-2026 11:50:57");

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header
        title="السوق المحلي"
        subtitle="أسعار العملات والمعادن في ليبيا"
        lastUpdate={lastUpdate}
      />

      <main className="px-4 py-4">
        {/* العملات */}
        <SectionDivider title="العملات" icon="💱" />
        <div className="space-y-3">
          {localRates.map((currency, index) => (
            <CurrencyCard key={currency.id} currency={currency} index={index} />
          ))}
        </div>

        {/* الذهب */}
        <SectionDivider title="المعادن الثمينة" icon="🥇" />
        <div className="space-y-3">
          {goldRates.map((currency, index) => (
            <CurrencyCard
              key={currency.id}
              currency={currency}
              index={index + localRates.length}
            />
          ))}
        </div>

        {/* المصارف */}
        <SectionDivider title="أسعار المصارف" icon="🏦" />
        <div className="space-y-3">
          {bankRates.map((currency, index) => (
            <CurrencyCard
              key={currency.id}
              currency={currency}
              index={index + localRates.length + goldRates.length}
            />
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-border">
          <p className="text-xs text-muted-foreground text-center">
            📢 أسعار السوق الموازي تُحدث يومياً بشكل يدوي
          </p>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};
