# Firebase Backup Version

## How to Use This Backup

If you need to switch from Lovable Cloud to Firebase, follow these simple steps:

### Step 1: Replace the Local Market Hook
Replace the content of `src/hooks/useLocalMarketRates.ts` with the content from `backup-firebase/hooks/useLocalMarketRatesFirebase.ts`

That's it! The app will now read data from Firebase instead of Lovable Cloud.

### Step 2: Manage Prices via Firebase Console
You will manage all prices directly in the Firebase Console (NOT via the app's Admin page):

**Firebase Console URL:**
https://console.firebase.google.com/project/currency-companion/firestore

### Firebase Database Structure
The data is stored in the `local_market` collection with this structure:

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

### Document IDs:
- **Currencies**: `usd-blue`, `usd-white`, `usd-turkey`, `usd-dubai`, `eur`, `gbp`, `tnd`
- **Gold**: `gold`
- **Banks**: `bank-tanmiya`, `bank-wahda`

### How to Update Prices in Firebase Console:
1. Go to https://console.firebase.google.com/project/currency-companion/firestore
2. Click on `local_market` collection
3. Click on the document you want to update (e.g., `usd-blue`)
4. Edit the `rate` and `change` fields
5. Click "Update" - changes appear instantly in the app!

### Firebase Configuration
Already configured at `src/integrations/firebase/config.ts`:
- Project ID: currency-companion

## Files in This Backup

1. `hooks/useLocalMarketRatesFirebase.ts` - Hook to fetch rates from Firebase (replace src/hooks/useLocalMarketRates.ts with this)
2. `pages/AdminFirebase.tsx` - Optional admin page (not needed if managing via Firebase Console)
3. `README.md` - This file
