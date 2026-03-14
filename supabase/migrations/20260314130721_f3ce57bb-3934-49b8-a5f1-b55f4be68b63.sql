
-- Update category check constraint to allow gold_intl
ALTER TABLE local_market_rates DROP CONSTRAINT local_market_rates_category_check;
ALTER TABLE local_market_rates ADD CONSTRAINT local_market_rates_category_check 
  CHECK (category = ANY (ARRAY['currency', 'gold', 'bank', 'dollar', 'euro', 'transfer', 'gold_intl']));

-- Add international gold price row
INSERT INTO local_market_rates (id, name, name_ar, rate, change, flag, category, sort_order, updated_at)
VALUES ('gold_international', 'Gold (Troy Ounce)', 'الذهب العالمي (أونصة)', 0, 0, '🥇', 'gold_intl', 1, now())
ON CONFLICT (id) DO NOTHING;
