# Firebase Backup Version

## How to Use This Backup

If you need to switch from Supabase (Lovable Cloud) to Firebase, follow these steps:

### Step 1: Replace the Local Market Hook
Replace `src/hooks/useLocalMarketRates.ts` with `hooks/useLocalMarketRatesFirebase.ts`

### Step 2: Use the Admin Page
The Admin page at `/admin` is already configured to work with Firebase. It allows you to:
- View all rates
- Edit rates (name, Arabic name, price, change %)
- Save all changes to Firebase
- Initialize default data

### Step 3: Firebase Configuration
The Firebase config is already set up at `src/integrations/firebase/config.ts` with these credentials:
- Project ID: currency-companion
- The config includes all necessary Firebase settings

### Step 4: Firebase Database Structure
The data is stored in the `local_market` collection with the following structure:

```
local_market/
├── usd-blue/
│   ├── name: "USD Blue"
│   ├── nameAr: "الدولار (ازرق)"
│   ├── rate: 9.15
│   ├── change: -0.11
│   ├── flag: "🇺🇸"
│   ├── category: "currency"
│   ├── order: 1
│   └── updatedAt: Timestamp
├── eur/
│   ├── name: "Euro"
│   ├── nameAr: "اليورو"
│   ├── rate: 10.63
│   └── ...
└── ...
```

### Available IDs:
- **Currencies**: usd-blue, usd-white, usd-turkey, usd-dubai, eur, gbp, tnd
- **Gold**: gold
- **Banks**: bank-tanmiya, bank-wahda

### Firebase Console Access
You can manage your data directly in Firebase Console:
https://console.firebase.google.com/project/currency-companion

### Security Notes
- The current setup allows read access to everyone
- For production, set up Firebase Security Rules to restrict write access
- Consider adding authentication for the admin page

## Files in This Backup

1. `hooks/useLocalMarketRatesFirebase.ts` - Hook to fetch rates from Firebase
2. `pages/AdminFirebase.tsx` - Admin page for managing rates (same as current Admin.tsx)
3. `README.md` - This file

## Current Admin Page Location
The Admin page is accessible at: `/admin`
