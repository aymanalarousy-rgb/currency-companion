import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/integrations/firebase/config";
import { CurrencyRate } from "@/types/currency";

interface LocalMarketState {
  currencies: CurrencyRate[];
  gold: CurrencyRate[];
  banks: CurrencyRate[];
  lastUpdate: string;
  loading: boolean;
  error: string | null;
}

// Default data as fallback
const defaultCurrencies: CurrencyRate[] = [
  { id: "usd-blue", name: "USD Blue", nameAr: "الدولار (ازرق)", rate: 8.90, change: 0.34, flag: "🇺🇸", category: "currency" },
  { id: "usd-white", name: "USD White", nameAr: "الدولار (ابيض)", rate: 8.65, change: 0.00, flag: "🇺🇸", category: "currency" },
  { id: "usd-turkey", name: "USD Turkey", nameAr: "الدولار (تركيا)", rate: 8.89, change: 0.28, flag: "🇺🇸", category: "currency" },
  { id: "usd-dubai", name: "USD Dubai", nameAr: "الدولار (دبي)", rate: 8.91, change: 0.22, flag: "🇺🇸", category: "currency" },
  { id: "eur", name: "Euro", nameAr: "اليورو", rate: 10.19, change: 0.15, flag: "🇪🇺", category: "currency" },
  { id: "gbp", name: "British Pound", nameAr: "الجنيه الإسترليني", rate: 11.52, change: 1.50, flag: "🇬🇧", category: "currency" },
  { id: "tnd", name: "Tunisian Dinar", nameAr: "الدينار التونسي", rate: 0.34, change: -1.43, flag: "🇹🇳", category: "currency" },
];

const defaultGold: CurrencyRate[] = [
  { id: "gold", name: "Gold (Scrap)", nameAr: "الذهب (كسر)", rate: 946.00, change: -0.21, flag: "🏅", category: "gold" },
];

const defaultBanks: CurrencyRate[] = [
  { id: "bank-tanmiya", name: "Development Bank", nameAr: "المصارف (التنمية)", rate: 10.15, change: -0.29, flag: "🏦", category: "bank" },
  { id: "bank-wahda", name: "Wahda Bank", nameAr: "المصارف (الوحدة)", rate: 10.14, change: -0.20, flag: "🏦", category: "bank" },
];

export const useLocalMarketRates = () => {
  const [state, setState] = useState<LocalMarketState>({
    currencies: defaultCurrencies,
    gold: defaultGold,
    banks: defaultBanks,
    lastUpdate: new Date().toLocaleString("ar-LY"),
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Subscribe to the local_market collection
    const ratesRef = collection(db, "local_market");
    const q = query(ratesRef, orderBy("order", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const currencies: CurrencyRate[] = [];
        const gold: CurrencyRate[] = [];
        const banks: CurrencyRate[] = [];
        let lastUpdateTime = new Date().toLocaleString("ar-LY");

        snapshot.forEach((doc) => {
          const data = doc.data();
          const rate: CurrencyRate = {
            id: doc.id,
            name: data.name || "",
            nameAr: data.nameAr || "",
            rate: Number(data.rate) || 0,
            change: Number(data.change) || 0,
            flag: data.flag || "",
            category: data.category || "currency",
          };

          if (data.updatedAt) {
            lastUpdateTime = data.updatedAt.toDate?.()?.toLocaleString("ar-LY") || lastUpdateTime;
          }

          switch (data.category) {
            case "gold":
              gold.push(rate);
              break;
            case "bank":
              banks.push(rate);
              break;
            default:
              currencies.push(rate);
          }
        });

        // Use fetched data if available, otherwise use defaults
        setState({
          currencies: currencies.length > 0 ? currencies : defaultCurrencies,
          gold: gold.length > 0 ? gold : defaultGold,
          banks: banks.length > 0 ? banks : defaultBanks,
          lastUpdate: lastUpdateTime,
          loading: false,
          error: null,
        });
      },
      (error) => {
        console.error("Error fetching local market rates:", error);
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "فشل في تحميل البيانات",
        }));
      }
    );

    return () => unsubscribe();
  }, []);

  return state;
};
