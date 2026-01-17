-- Create local_market_rates table
CREATE TABLE public.local_market_rates (
  id TEXT PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name TEXT NOT NULL,
  rate NUMERIC(10, 2) NOT NULL DEFAULT 0,
  change NUMERIC(5, 2) NOT NULL DEFAULT 0,
  flag TEXT NOT NULL DEFAULT '🏳️',
  category TEXT NOT NULL CHECK (category IN ('currency', 'gold', 'bank')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.local_market_rates ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view rates)
CREATE POLICY "Anyone can view rates"
  ON public.local_market_rates
  FOR SELECT
  USING (true);

-- Insert initial data based on your current rates
INSERT INTO public.local_market_rates (id, name_ar, name, rate, change, flag, category, sort_order) VALUES
  ('usd_blue', 'الدولار (ازرق)', 'USD Blue', 8.78, 0.11, '🇺🇸', 'currency', 1),
  ('usd_white', 'الدولار (ابيض)', 'USD White', 8.60, 1.18, '🇺🇸', 'currency', 2),
  ('usd_turkey', 'الدولار (تركيا)', 'USD Turkey', 8.78, 0.11, '🇺🇸', 'currency', 3),
  ('usd_dubai', 'الدولار (دبي)', 'USD Dubai', 8.80, 0.11, '🇺🇸', 'currency', 4),
  ('eur', 'اليورو', 'EUR', 10.05, -0.20, '🇪🇺', 'currency', 5),
  ('gbp', 'الجنيه الإسترليني', 'GBP', 11.58, -1.86, '🇬🇧', 'currency', 6),
  ('tnd', 'الدينار التونسي', 'TND', 0.35, 1.45, '🇹🇳', 'currency', 7),
  ('gold_scrap', 'الذهب (كسر)', 'Gold Scrap', 954.00, -0.62, '🏅', 'gold', 8),
  ('bank_development', 'المصارف (التنمية)', 'Development Bank', 10.17, 0.20, '🏦', 'bank', 9),
  ('bank_unity', 'المصارف (الوحدة)', 'Unity Bank', 10.17, 0.20, '🏦', 'bank', 10);

-- Enable realtime for instant updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.local_market_rates;