UPDATE public.local_market_rates SET rate = 8.510, updated_at = now() WHERE id = 'usd_cash';
UPDATE public.local_market_rates SET rate = 8.620, updated_at = now() WHERE id = 'usd_bank_transfer';
UPDATE public.local_market_rates SET rate = 8.700, updated_at = now() WHERE id = 'usd_bank_card';
UPDATE public.local_market_rates SET rate = 9.695, updated_at = now() WHERE id = 'eur_cash';
UPDATE public.local_market_rates SET rate = 9.935, updated_at = now() WHERE id = 'eur_bank_transfer';
UPDATE public.local_market_rates SET rate = 10.015, updated_at = now() WHERE id = 'eur_bank_card';
UPDATE public.local_market_rates SET updated_at = now() WHERE id IN ('lyd_vodafone','bank_vodafone');