/**
 * BACKUP VERSION - Firebase Local Market Rates Hook
 * Replace src/hooks/useLocalMarketRates.ts with this file to use Firebase instead of Supabase
 */

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

export const useLocalMarketRates = () => {
  const [state, setState] = useState<LocalMarketState>({
    currencies: [],
    gold: [],
    banks: [],
    lastUpdate: new Date().toLocaleString("ar-LY"),
    loading: true,
    error: null,
  });

  useEffect(() => {
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
            category: data.category as "currency" | "gold" | "bank",
          };

          if (data.updatedAt) {
            lastUpdateTime = data.updatedAt.toDate().toLocaleString("ar-LY");
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

        setState({
          currencies,
          gold,
          banks,
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
