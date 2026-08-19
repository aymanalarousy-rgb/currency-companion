import { useCallback, useEffect, useState } from "react";

export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  image: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
}

const FALLBACK: CryptoAsset[] = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin", image: "", price: 118000, change24h: 1.2, marketCap: 2330000000000, volume24h: 42000000000 },
  { id: "ethereum", symbol: "ETH", name: "Ethereum", image: "", price: 4100, change24h: 0.8, marketCap: 495000000000, volume24h: 21000000000 },
  { id: "tether", symbol: "USDT", name: "Tether", image: "", price: 1, change24h: 0.01, marketCap: 165000000000, volume24h: 58000000000 },
  { id: "binancecoin", symbol: "BNB", name: "BNB", image: "", price: 780, change24h: -0.5, marketCap: 110000000000, volume24h: 2100000000 },
  { id: "solana", symbol: "SOL", name: "Solana", image: "", price: 195, change24h: 2.4, marketCap: 105000000000, volume24h: 4300000000 },
];

export function useCryptoRates() {
  const [assets, setAssets] = useState<CryptoAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  const load = useCallback(async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
      );
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      setAssets(
        data.map((c: Record<string, never> & { [k: string]: number | string }) => ({
          id: String(c.id),
          symbol: String(c.symbol).toUpperCase(),
          name: String(c.name),
          image: String(c.image),
          price: Number(c.current_price),
          change24h: Number(c.price_change_percentage_24h ?? 0),
          marketCap: Number(c.market_cap),
          volume24h: Number(c.total_volume),
        }))
      );
    } catch {
      setAssets(FALLBACK);
    } finally {
      setLastUpdate(
        new Date().toLocaleString("ar-LY", { dateStyle: "short", timeStyle: "short" })
      );
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { assets, loading, refreshing, lastUpdate, refresh: () => load(true) };
}
