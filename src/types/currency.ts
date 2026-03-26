export interface CurrencyRate {
  id: string;
  name: string;
  nameAr: string;
  rate: number;
  change: number;
  flag: string;
  icon?: string;
  category?: 'currency' | 'gold' | 'bank' | 'dollar' | 'euro' | 'transfer' | 'gold_intl' | 'crypto';
}

export interface GlobalCurrencyRate {
  code: string;
  name: string;
  nameAr: string;
  rate: number;
  change: number;
  flag: string;
}

export interface LocalMarketData {
  rates: CurrencyRate[];
  lastUpdate: string;
}
