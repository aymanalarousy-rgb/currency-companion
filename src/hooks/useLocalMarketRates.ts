import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CurrencyRate } from "@/types/currency";

interface LocalMarketState {
  dollar: CurrencyRate[];
  euro: CurrencyRate[];
  transfer: CurrencyRate[];
  goldIntl: CurrencyRate[];
  lastUpdate: string;
  loading: boolean;
  error: string | null;
}

export const useLocalMarketRates = () => {
  const [state, setState] = useState<LocalMarketState>({
    dollar: [],
    euro: [],
    transfer: [],
    goldIntl: [],
    lastUpdate: new Date().toLocaleString("ar-LY"),
    loading: true,
    error: null,
  });

  const fetchRates = async () => {
    try {
      const { data, error } = await supabase
        .from("local_market_rates")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;

      const dollar: CurrencyRate[] = [];
      const euro: CurrencyRate[] = [];
      const transfer: CurrencyRate[] = [];
      const goldIntl: CurrencyRate[] = [];
      let lastUpdateTime = new Date().toLocaleString("ar-LY");

      data?.forEach((item) => {
        const rate: CurrencyRate = {
          id: item.id,
          name: item.name,
          nameAr: item.name_ar,
          rate: Number(item.rate),
          change: Number(item.change),
          flag: item.flag,
          category: item.category as "currency" | "gold" | "bank" | "dollar" | "euro" | "transfer",
        };

        if (item.updated_at) {
          lastUpdateTime = new Date(item.updated_at).toLocaleString("ar-LY");
        }

        switch (item.category) {
          case "dollar":
            dollar.push(rate);
            break;
          case "euro":
            euro.push(rate);
            break;
          case "transfer":
            transfer.push(rate);
            break;
        }
      });

      setState({
        dollar,
        euro,
        transfer,
        lastUpdate: lastUpdateTime,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching local market rates:", error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "فشل في تحميل البيانات",
      }));
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchRates();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("local_market_rates_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "local_market_rates",
        },
        () => {
          // Refetch all data when any change occurs
          fetchRates();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return state;
};
