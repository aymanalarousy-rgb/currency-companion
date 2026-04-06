UPDATE local_market_rates SET rate = 8.820, change = ROUND(((8.820 - 9.19) / 9.19) * 100, 2), updated_at = now() WHERE id = 'usd_cash';
UPDATE local_market_rates SET rate = 8.980, change = ROUND(((8.980 - 9.63) / 9.63) * 100, 2), updated_at = now() WHERE id = 'usd_bank_transfer';
UPDATE local_market_rates SET rate = 9.060, change = ROUND(((9.060 - 9.71) / 9.71) * 100, 2), updated_at = now() WHERE id = 'usd_bank_card';
UPDATE local_market_rates SET rate = 9.990, change = ROUND(((9.990 - 10.42) / 10.42) * 100, 2), updated_at = now() WHERE id = 'eur_cash';
UPDATE local_market_rates SET rate = 10.360, change = ROUND(((10.360 - 10.95) / 10.95) * 100, 2), updated_at = now() WHERE id = 'eur_bank_transfer';
UPDATE local_market_rates SET rate = 10.440, change = ROUND(((10.440 - 11.03) / 11.03) * 100, 2), updated_at = now() WHERE id = 'eur_bank_card';
UPDATE local_market_rates SET rate = 6.080, change = ROUND(((6.080 - 6.02) / 6.02) * 100, 2), updated_at = now() WHERE id = 'lyd_vodafone';
UPDATE local_market_rates SET rate = 5.850, change = ROUND(((5.850 - 5.66) / 5.66) * 100, 2), updated_at = now() WHERE id = 'bank_vodafone';