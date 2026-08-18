export interface StockAsset {
  symbol: string;
  name: string;
  nameAr: string;
  logo: string;
  price: number;
  change: number;
  marketCap: number;
}

// Indicative snapshot data for the world's largest listed companies.
export const TOP_STOCKS: StockAsset[] = [
  { symbol: "NVDA", name: "NVIDIA", nameAr: "إنفيديا", logo: "🟩", price: 182.4, change: 1.4, marketCap: 4450000000000 },
  { symbol: "AAPL", name: "Apple", nameAr: "أبل", logo: "🍎", price: 232.1, change: 0.6, marketCap: 3440000000000 },
  { symbol: "MSFT", name: "Microsoft", nameAr: "مايكروسوفت", logo: "🪟", price: 468.9, change: -0.3, marketCap: 3480000000000 },
  { symbol: "GOOGL", name: "Alphabet", nameAr: "ألفابت (جوجل)", logo: "🔤", price: 204.5, change: 0.9, marketCap: 2480000000000 },
  { symbol: "AMZN", name: "Amazon", nameAr: "أمازون", logo: "📦", price: 226.7, change: 1.1, marketCap: 2390000000000 },
  { symbol: "META", name: "Meta Platforms", nameAr: "ميتا", logo: "🔵", price: 742.3, change: -0.8, marketCap: 1870000000000 },
  { symbol: "AVGO", name: "Broadcom", nameAr: "برودكوم", logo: "🔗", price: 312.6, change: 2.1, marketCap: 1470000000000 },
  { symbol: "TSLA", name: "Tesla", nameAr: "تسلا", logo: "🚗", price: 335.8, change: -1.6, marketCap: 1080000000000 },
  { symbol: "TSM", name: "TSMC", nameAr: "تي إس إم سي", logo: "🧩", price: 248.9, change: 1.8, marketCap: 1290000000000 },
  { symbol: "BRK.B", name: "Berkshire Hathaway", nameAr: "بيركشاير هاثاواي", logo: "🏦", price: 498.2, change: 0.2, marketCap: 1070000000000 },
  { symbol: "2222.SR", name: "Saudi Aramco", nameAr: "أرامكو السعودية", logo: "🛢️", price: 6.9, change: -0.4, marketCap: 1660000000000 },
  { symbol: "LLY", name: "Eli Lilly", nameAr: "إيلي ليلي", logo: "💊", price: 812.4, change: 0.5, marketCap: 770000000000 },
  { symbol: "JPM", name: "JPMorgan Chase", nameAr: "جي بي مورجان", logo: "🏛️", price: 296.3, change: 0.3, marketCap: 820000000000 },
  { symbol: "V", name: "Visa", nameAr: "فيزا", logo: "💳", price: 352.1, change: 0.4, marketCap: 680000000000 },
  { symbol: "WMT", name: "Walmart", nameAr: "وول مارت", logo: "🛒", price: 104.7, change: -0.2, marketCap: 840000000000 },
];
