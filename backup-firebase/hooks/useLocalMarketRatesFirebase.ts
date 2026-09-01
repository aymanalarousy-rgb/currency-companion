/**
 * BACKUP VERSION - Firebase Local Market Rates Hook
 * Replace src/hooks/useLocalMarketRates.ts with this file to use Firebase instead of Lovable Cloud.
 *
 * Expected Firebase collection: local_market
 * Expected documents:
 *   - usd-cash, usd-transfer, usd-card       -> category: "dollar"
 *   - eur-cash, eur-transfer, eur-card       -> category: "euro"
 *   - vodafone-lyd, vodafone-bank            -> category: "transfer"
 */

import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/integrations/firebase/config";
import { CurrencyRate } from "@/types/currency";

interface LocalMarketState {
  dollar: CurrencyRate[];
  euro: CurrencyRate[];
  transfers: CurrencyRate[];
  lastUpdate: string;
  loading: boolean;
  error: string | null;
}

const getCategory = (
  id: string,
  name: string,
  nameAr: string,
  category?: string
): CurrencyRate["category"] => {
  // If the document already uses the new categories, keep it
  if (category === "dollar" || category === "euro" || category === "transfer") {
    return category;
  }

  const lowerId = id.toLowerCase();
  const lowerName = name.toLowerCase();
  const lowerNameAr = nameAr.toLowerCase();

  if (
    lowerId.startsWith("usd") ||
    lowerName.includes("usd") ||
    lowerNameAr.includes("دولار")
  ) {
    return "dollar";
  }

  if (
    lowerId.startsWith("eur") ||
    lowerName.includes("euro") ||
    lowerName.includes("eur") ||
    lowerNameAr.includes("يورو")
  ) {
    return "euro";
  }

  // Vodafone and any other transfer-like items go here
  return "transfer";
};

export const useLocalMarketRates = () => {
  const [state, setState] = useState<LocalMarketState>({
    dollar: [],
    euro: [],
    transfers: [],
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
        const dollar: CurrencyRate[] = [];
        const euro: CurrencyRate[] = [];
        const transfers: CurrencyRate[] = [];
        let lastUpdateTime = new Date().toLocaleString("ar-LY");

        snapshot.forEach((doc) => {
          const data = doc.data();
          const category = getCategory(
            doc.id,
            data.name || "",
            data.nameAr || "",
            data.category
          );

          const rate: CurrencyRate = {
            id: doc.id,
            name: data.name || "",
            nameAr: data.nameAr || "",
            rate: Number(data.rate) || 0,
            change: Number(data.change) || 0,
            flag: data.flag || "",
            category,
          };

          if (data.updatedAt) {
            lastUpdateTime = data.updatedAt.toDate().toLocaleString("ar-LY");
          }

          switch (category) {
            case "dollar":
              dollar.push(rate);
              break;
            case "euro":
              euro.push(rate);
              break;
            case "transfer":
            default:
              transfers.push(rate);
              break;
          }
        });

        setState({
          dollar,
          euro,
          transfers,
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
