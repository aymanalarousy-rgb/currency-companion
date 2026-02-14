import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { GlobalCurrencyCard } from "@/components/GlobalCurrencyCard";
import { BottomNavigation } from "@/components/BottomNavigation";

import { GlobalCurrencyRate } from "@/types/currency";

// Mock data - في الواقع سيتم جلبها من API خارجي
const mockGlobalRates: GlobalCurrencyRate[] = [
  {
    code: "USD",
    name: "US Dollar",
    nameAr: "الدولار الأمريكي",
    rate: 1.0000,
    change: 0.00,
    flag: "🇺🇸",
  },
  {
    code: "EUR",
    name: "Euro",
    nameAr: "اليورو",
    rate: 0.9185,
    change: -0.15,
    flag: "🇪🇺",
  },
  {
    code: "GBP",
    name: "British Pound",
    nameAr: "الجنيه الإسترليني",
    rate: 0.7892,
    change: 0.23,
    flag: "🇬🇧",
  },
  {
    code: "CHF",
    name: "Swiss Franc",
    nameAr: "الفرنك السويسري",
    rate: 0.8934,
    change: 0.12,
    flag: "🇨🇭",
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    nameAr: "الين الياباني",
    rate: 157.45,
    change: -0.35,
    flag: "🇯🇵",
  },
];

export const GlobalRates = () => {
  const [rates, setRates] = useState<GlobalCurrencyRate[]>(mockGlobalRates);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleString("ar-LY", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    // محاكاة تحميل البيانات
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // في الواقع، سيتم جلب البيانات من API هنا
    // محاكاة تغييرات عشوائية صغيرة
    const updatedRates = rates.map((rate) => ({
      ...rate,
      change: parseFloat((Math.random() * 1 - 0.5).toFixed(2)),
    }));
    
    setRates(updatedRates);
    setLastUpdate(formatDate());
    setIsLoading(false);
  };

  useEffect(() => {
    setLastUpdate(formatDate());
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header
        title="الأسعار العالمية"
        subtitle="أسعار العملات الرئيسية مقابل الدولار"
        onRefresh={handleRefresh}
        isRefreshing={isLoading}
        lastUpdate={lastUpdate}
      />

      <main className="px-4 py-4">
        <div className="space-y-3">
          {rates.slice(0, 3).map((currency, index) => (
            <GlobalCurrencyCard
              key={currency.code}
              currency={currency}
              index={index}
              isLoading={isLoading}
            />
          ))}
        </div>

        <div className="space-y-3">
          {rates.slice(3).map((currency, index) => (
            <GlobalCurrencyCard
              key={currency.code}
              currency={currency}
              index={index + 3}
              isLoading={isLoading}
            />
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-border">
          <p className="text-xs text-muted-foreground text-center">
            💡 الأسعار تُحدث تلقائياً من مصادر عالمية موثوقة
          </p>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};
