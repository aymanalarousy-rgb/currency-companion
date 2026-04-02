
DELETE FROM public.local_market_rates;

INSERT INTO public.local_market_rates (id, name, name_ar, category, rate, change, flag, sort_order) VALUES
-- الدولار الأمريكي
('usd_cash', 'USD Cash', 'دولار / نقدي', 'dollar', 9.190, 0, '🇺🇸', 1),
('usd_bank_transfer', 'USD Bank Transfer', 'دولار / حوالة بنكية', 'dollar', 9.630, 0, '🇺🇸', 2),
('usd_bank_card', 'USD Bank Card', 'دولار / بطاقة مصرفية', 'dollar', 9.710, 0, '🇺🇸', 3),
-- اليورو الأوروبي
('eur_cash', 'EUR Cash', 'يورو / نقدي', 'euro', 10.420, 0, '🇪🇺', 4),
('eur_bank_transfer', 'EUR Bank Transfer', 'يورو / حوالة بنكية', 'euro', 10.950, 0, '🇪🇺', 5),
('eur_bank_card', 'EUR Bank Card', 'يورو / بطاقة مصرفية', 'euro', 11.030, 0, '🇪🇺', 6),
-- حوالات خارجية
('lyd_vodafone', 'LYD Vodafone Cash', 'دينار ليبي / فودافون كاش', 'transfer', 6.015, 0, '📱', 7),
('bank_vodafone', 'Bank Transfer Vodafone Cash', 'حوالة بنكية / فودافون كاش', 'transfer', 5.655, 0, '🏦', 8);
