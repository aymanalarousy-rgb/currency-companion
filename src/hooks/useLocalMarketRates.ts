import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/integrations/firebase/config";
import { CurrencyRate } from "@/types/currency";

interface LocalMarketState {
  dollar: CurrencyRate[];
  euro: CurrencyRate[];
  transfers: CurrencyRate[];
  lastUpdate: string;
  loading: boolean;
  error: string | null;
  source: "cloud" | "firebase" | null;
}

const emptyState: LocalMarketState = {
  dollar: [],
  euro: [],
  transfers: [],
  lastUpdate: new Date().toLocaleString("ar-LY"),
  loading: true,
  error: null,
  source: null,
};

const bucket = (rows: CurrencyRate[]) => {
  const dollar: CurrencyRate[] = [];
  const euro: CurrencyRate[] = [];
  const transfers: CurrencyRate[] = [];
  rows.forEach((rate) => {
    switch (rate.category) {
      case "dollar":
        dollar.push(rate);
        break;
      case "euro":
        euro.push(rate);
        break;
      default:
        transfers.push(rate);
        break;
    }
  });
  return { dollar, euro, transfers };
};

export const useLocalMarketRates = () => {
  const [state, setState] = useState<LocalMarketState>(emptyState);

  useEffect(() => {
    let cancelled = false;

    // Emergency fallback: read from Firebase Firestore if Lovable Cloud fails
    const loadFromFirebase = async () => {
      try {
        const snapshot = await getDocs(
          query(collection(db, "local_market"), orderBy("order", "asc"))
        );
        if (cancelled) return;

        let lastUpdate = new Date().toLocaleString("ar-LY");
        const rows: CurrencyRate[] = snapshot.docs.map((doc) => {
          const data = doc.data() as Record<string, any>;
          if (data.updatedAt?.toDate) {
            lastUpdate = data.updatedAt.toDate().toLocaleString("ar-LY");
          }
          return {
            id: doc.id,
            name: data.name || "",
            nameAr: data.nameAr || "",
            rate: Number(data.rate) || 0,
            change: Number(data.change) || 0,
            flag: data.flag || "",
            category: data.category,
          };
        });

        if (!rows.length) throw new Error("no firebase data");

        setState({
          ...bucket(rows),
          lastUpdate,
          loading: false,
          error: null,
          source: "firebase",
        });
      } catch (err) {
        console.error("Firebase fallback failed:", err);
        if (cancelled) return;
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "فشل في تحميل البيانات",
        }));
      }
    };

    const loadFromCloud = async () => {
      const { data, error } = await supabase
        .from("local_market_rates")
        .select("*")
        .order("sort_order", { ascending: true });

      if (cancelled) return;

      if (error || !data || data.length === 0) {
        if (error) console.error("Error fetching local market rates:", error);
        await loadFromFirebase();
        return;
      }

      const rows: CurrencyRate[] = data.map((row) => ({
        id: row.id,
        name: row.name,
        nameAr: row.name_ar,
        rate: Number(row.rate) || 0,
        change: Number(row.change) || 0,
        flag: row.flag,
        category: row.category as CurrencyRate["category"],
      }));

      const latest = data.reduce<string | null>(
        (acc, row) => (!acc || row.updated_at > acc ? row.updated_at : acc),
        null
      );

      setState({
        ...bucket(rows),
        lastUpdate: new Date(latest ?? Date.now()).toLocaleString("ar-LY"),
        loading: false,
        error: null,
        source: "cloud",
      });
    };

    loadFromCloud();

    // Live updates from Lovable Cloud
    const channel = supabase
      .channel("local-market-rates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "local_market_rates" },
        () => loadFromCloud()
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  return state;
};
