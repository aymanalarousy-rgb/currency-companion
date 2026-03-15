import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
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

  const fetchRates = async () => {
    try {
      const { data, error } = await supabase
        .from("local_market_rates")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;

      const currencies: CurrencyRate[] = [];
      const gold: CurrencyRate[] = [];
      const banks: CurrencyRate[] = [];
      let lastUpdateTime = new Date().toLocaleString("ar-LY");

      data?.forEach((item) => {
        const rate: CurrencyRate = {
          id: item.id,
          name: item.name,
          nameAr: item.name_ar,
          rate: Number(item.rate),
          change: Number(item.change),
          flag: item.flag,
          category: item.category as CurrencyRate["category"],
        };

        if (item.updated_at) {
          lastUpdateTime = new Date(item.updated_at).toLocaleString("ar-LY");
        }

        switch (item.category) {
          case "currency":
            currencies.push(rate);
            break;
          case "gold":
            gold.push(rate);
            break;
          case "bank":
            banks.push(rate);
            break;
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
    fetchRates();

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
