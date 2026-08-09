
UPDATE public.local_market_rates SET rate=8.510, change=ROUND(((8.510-8.555)/8.555*100)::numeric,2), updated_at=now() WHERE id='usd_cash';
UPDATE public.local_market_rates SET rate=8.685, change=ROUND(((8.685-8.760)/8.760*100)::numeric,2), updated_at=now() WHERE id='usd_bank_transfer';
UPDATE public.local_market_rates SET rate=8.765, change=ROUND(((8.765-8.840)/8.840*100)::numeric,2), updated_at=now() WHERE id='usd_bank_card';
UPDATE public.local_market_rates SET rate=9.850, change=ROUND(((9.850-9.900)/9.900*100)::numeric,2), updated_at=now() WHERE id='eur_cash';
UPDATE public.local_market_rates SET rate=10.150, change=ROUND(((10.150-10.210)/10.210*100)::numeric,2), updated_at=now() WHERE id='eur_bank_transfer';
UPDATE public.local_market_rates SET rate=10.230, change=ROUND(((10.230-10.290)/10.290*100)::numeric,2), updated_at=now() WHERE id='eur_bank_card';
UPDATE public.local_market_rates SET rate=5.900, change=ROUND(((5.900-5.880)/5.880*100)::numeric,2), updated_at=now() WHERE id='lyd_vodafone';
UPDATE public.local_market_rates SET rate=5.680, change=ROUND(((5.680-5.660)/5.660*100)::numeric,2), updated_at=now() WHERE id='bank_vodafone';
