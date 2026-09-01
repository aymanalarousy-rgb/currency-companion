# Firebase Backup Version

## How to Use This Backup

If Lovable Cloud is disrupted, you can switch the app to read local market rates from Firebase instead.

### Step 1: Replace the Local Market Hook

Replace the content of `src/hooks/useLocalMarketRates.ts` with the content from:

```
backup-firebase/hooks/useLocalMarketRatesFirebase.ts
```

That is the only code change needed. The app will then read from Firebase Firestore.

### Step 2: Manage Prices via Firebase Console

Update prices directly in the Firebase Console:

**Firebase Console URL:**
https://console.firebase.google.com/project/currency-companion/firestore

### Firebase Database Structure

The data is stored in the `local_market` collection. The app expects exactly these 8 documents:

```
local_market/
├── usd-cash/
│   ├── name: "USD Cash"
│   ├── nameAr: "الدولار (نقدي)"
│   ├── rate: 9.15
│   ├── change: -0.11
│   ├── flag: "🇺🇸"
│   ├── category: "dollar"
│   ├── order: 1
│   └── updatedAt: Timestamp
├── usd-transfer/
│   ├── name: "USD Bank Transfer"
│   ├── nameAr: "الدولار (حوالة)"
│   ├── rate: 9.25
│   ├── change: 0.05
│   ├── flag: "🇺🇸"
│   ├── category: "dollar"
│   ├── order: 2
│   └── updatedAt: Timestamp
├── usd-card/
│   ├── name: "USD Bank Card"
│   ├── nameAr: "الدولار (بطاقة)"
│   ├── rate: 9.30
│   ├── change: 0.03
│   ├── flag: "🇺🇸"
│   ├── category: "dollar"
│   ├── order: 3
│   └── updatedAt: Timestamp
├── eur-cash/
│   ├── name: "EUR Cash"
│   ├── nameAr: "اليورو (نقدي)"
│   ├── rate: 10.50
│   ├── change: 0.12
│   ├── flag: "🇪🇺"
│   ├── category: "euro"
│   ├── order: 4
│   └── updatedAt: Timestamp
├── eur-transfer/
│   ├── name: "EUR Bank Transfer"
│   ├── nameAr: "اليورو (حوالة)"
│   ├── rate: 10.65
│   ├── change: 0.08
│   ├── flag: "🇪🇺"
│   ├── category: "euro"
│   ├── order: 5
│   └── updatedAt: Timestamp
├── eur-card/
│   ├── name: "EUR Bank Card"
│   ├── nameAr: "اليورو (بطاقة)"
│   ├── rate: 10.72
│   ├── change: 0.04
│   ├── flag: "🇪🇺"
│   ├── category: "euro"
│   ├── order: 6
│   └── updatedAt: Timestamp
├── vodafone-lyd/
│   ├── name: "Vodafone LYD"
│   ├── nameAr: "فودافون (د.ل)"
│   ├── rate: 5.50
│   ├── change: 0.00
│   ├── flag: "📱"
│   ├── category: "transfer"
│   ├── order: 7
│   └── updatedAt: Timestamp
└── vodafone-bank/
    ├── name: "Vodafone Bank"
    ├── nameAr: "فودافون (بنك)"
    ├── rate: 5.36
    ├── change: 0.00
    ├── flag: "🏦"
    ├── category: "transfer"
    ├── order: 8
    └── updatedAt: Timestamp
```

### Document IDs

| Document ID    | Category  | Section in app       |
|----------------|-----------|----------------------|
| `usd-cash`     | `dollar`  | الدولار الأمريكي     |
| `usd-transfer` | `dollar`  | الدولار الأمريكي     |
| `usd-card`     | `dollar`  | الدولار الأمريكي     |
| `eur-cash`     | `euro`    | اليورو الأوروبي      |
| `eur-transfer` | `euro`    | اليورو الأوروبي      |
| `eur-card`     | `euro`    | اليورو الأوروبي      |
| `vodafone-lyd` | `transfer`| حوالات خارجية        |
| `vodafone-bank`| `transfer`| حوالات خارجية        |

### How to Update Prices in Firebase Console

1. Go to https://console.firebase.google.com/project/currency-companion/firestore
2. Open the `local_market` collection
3. Click the document you want to update (e.g. `usd-cash`)
4. Edit the `rate` and `change` fields
5. Update `updatedAt` to the current timestamp
6. Click **Update** — changes appear instantly in the app for all users

### Firebase Configuration

Already configured at `src/integrations/firebase/config.ts`:

- Project ID: currency-companion

## Files in This Backup

1. `hooks/useLocalMarketRatesFirebase.ts` — Hook to fetch rates from Firebase (replace `src/hooks/useLocalMarketRates.ts` with this)
2. `pages/AdminFirebase.tsx` — Optional admin page (not needed if managing via Firebase Console)
3. `README.md` — This file
