import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useLocalMarketRates } from "@/hooks/useLocalMarketRates";
import { useAdMobBanner } from "@/hooks/useAdMob";
import { ArrowDownUp } from "lucide-react";
import { Input } from "@/components/ui/input";

type Direction = "lyd_to_foreign" | "foreign_to_lyd";

interface RateOption {
  id: string;
  label: string;
  rate: number;
}

export const Calculator = () => {
  const { dollar, euro, transfers, lastUpdate, loading } = useLocalMarketRates();
  useAdMobBanner("bottom", 0);

  const [amount, setAmount] = useState<string>("");
  const [selectedRateId, setSelectedRateId] = useState<string>("");
  const [direction, setDirection] = useState<Direction>("lyd_to_foreign");

  const rateOptions = useMemo<RateOption[]>(() => {
    const options: RateOption[] = [];
    dollar.forEach((r) => options.push({ id: r.id, label: `🇺🇸 ${r.nameAr}`, rate: r.rate }));
    euro.forEach((r) => options.push({ id: r.id, label: `🇪🇺 ${r.nameAr}`, rate: r.rate }));
    transfers.forEach((r) => options.push({ id: r.id, label: `💸 ${r.nameAr}`, rate: r.rate }));
    return options;
  }, [dollar, euro, transfers]);

  // Auto-select first rate
  const activeRateId = selectedRateId || rateOptions[0]?.id || "";
  const activeRate = rateOptions.find((r) => r.id === activeRateId);

  const result = useMemo(() => {
    const num = parseFloat(amount);
    if (!num || !activeRate) return null;
    if (direction === "lyd_to_foreign") {
      return (num / activeRate.rate).toFixed(2);
    }
    return (num * activeRate.rate).toFixed(3);
  }, [amount, activeRate, direction]);

  const fromLabel = direction === "lyd_to_foreign" ? "د.ل" : "عملة أجنبية";
  const toLabel = direction === "lyd_to_foreign" ? "عملة أجنبية" : "د.ل";

  return (
    <div className="min-h-screen bg-background pb-24" dir="rtl">
      <Header
        title="حاسبة العملات"
        subtitle="تحويل بين الدينار الليبي والعملات"
        lastUpdate={lastUpdate}
      />

      <main className="px-4 py-4 space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">جاري تحميل الأسعار...</p>
          </div>
        ) : (
          <>
            {/* Rate selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">اختر العملة / الطريقة</label>
              <select
                value={activeRateId}
                onChange={(e) => setSelectedRateId(e.target.value)}
                className="w-full rounded-xl border border-border bg-card text-foreground px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {rateOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label} — {opt.rate} د.ل
                  </option>
                ))}
              </select>
            </div>

            {/* Direction toggle */}
            <button
              onClick={() => setDirection((d) => (d === "lyd_to_foreign" ? "foreign_to_lyd" : "lyd_to_foreign"))}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary/10 text-primary font-medium text-sm transition-colors hover:bg-primary/20"
            >
              <ArrowDownUp className="w-4 h-4" />
              {direction === "lyd_to_foreign"
                ? "من دينار ليبي ← عملة أجنبية"
                : "من عملة أجنبية ← دينار ليبي"}
            </button>

            {/* Amount input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                المبلغ ({fromLabel})
              </label>
              <Input
                type="number"
                inputMode="decimal"
                placeholder="أدخل المبلغ..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg py-6 rounded-xl text-center"
              />
            </div>

            {/* Result */}
            {result !== null && (
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 text-center space-y-2">
                <p className="text-sm text-muted-foreground">النتيجة ({toLabel})</p>
                <p className="text-3xl font-bold text-primary">{result}</p>
                {activeRate && (
                  <p className="text-xs text-muted-foreground">
                    سعر الصرف: {activeRate.rate} د.ل
                  </p>
                )}
              </div>
            )}

            {/* Quick amounts */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">مبالغ سريعة</p>
              <div className="grid grid-cols-4 gap-2">
                {(direction === "lyd_to_foreign"
                  ? ["100", "500", "1000", "5000"]
                  : ["10", "50", "100", "500"]
                ).map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className="py-2 rounded-xl bg-secondary text-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-secondary/50 border border-border">
              <p className="text-xs text-muted-foreground text-center">
                📢 الأسعار مأخوذة من السوق المحلي وتُحدّث يومياً
              </p>
            </div>
          </>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};
