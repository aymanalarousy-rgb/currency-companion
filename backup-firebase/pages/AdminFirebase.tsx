/**
 * BACKUP VERSION - Firebase Admin Page
 * This is the same as src/pages/Admin.tsx - included here for completeness
 */

import { useState, useEffect } from "react";
import { collection, doc, setDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/integrations/firebase/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface RateItem {
  id: string;
  name: string;
  nameAr: string;
  rate: number;
  change: number;
  flag: string;
  category: "currency" | "gold" | "bank";
  order: number;
}

// Default rates to initialize
const defaultRates: RateItem[] = [
  { id: "usd-blue", name: "USD Blue", nameAr: "الدولار (ازرق)", rate: 9.15, change: -0.11, flag: "🇺🇸", category: "currency", order: 1 },
  { id: "usd-white", name: "USD White", nameAr: "الدولار (ابيض)", rate: 9.05, change: 1.69, flag: "🇺🇸", category: "currency", order: 2 },
  { id: "usd-turkey", name: "USD Turkey", nameAr: "الدولار (تركيا)", rate: 9.17, change: -0.22, flag: "🇺🇸", category: "currency", order: 3 },
  { id: "usd-dubai", name: "USD Dubai", nameAr: "الدولار (دبي)", rate: 9.19, change: -0.22, flag: "🇺🇸", category: "currency", order: 4 },
  { id: "eur", name: "Euro", nameAr: "اليورو", rate: 10.63, change: -0.28, flag: "🇪🇺", category: "currency", order: 5 },
  { id: "gbp", name: "British Pound", nameAr: "الجنيه الإسترليني", rate: 12.00, change: 1.69, flag: "🇬🇧", category: "currency", order: 6 },
  { id: "tnd", name: "Tunisian Dinar", nameAr: "الدينار التونسي", rate: 0.33, change: -2.94, flag: "🇹🇳", category: "currency", order: 7 },
  { id: "gold", name: "Gold (Scrap)", nameAr: "الذهب (كسر)", rate: 1054.00, change: 0.38, flag: "🏅", category: "gold", order: 8 },
  { id: "bank-tanmiya", name: "Development Bank", nameAr: "المصارف (التنمية)", rate: 10.67, change: -0.28, flag: "🏦", category: "bank", order: 9 },
  { id: "bank-wahda", name: "Wahda Bank", nameAr: "المصارف (الوحدة)", rate: 10.65, change: -0.47, flag: "🏦", category: "bank", order: 10 },
];

export const Admin = () => {
  const [rates, setRates] = useState<RateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const ratesRef = collection(db, "local_market");
    const q = query(ratesRef, orderBy("order", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setRates(defaultRates);
      } else {
        const fetchedRates: RateItem[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          fetchedRates.push({
            id: doc.id,
            name: data.name || "",
            nameAr: data.nameAr || "",
            rate: Number(data.rate) || 0,
            change: Number(data.change) || 0,
            flag: data.flag || "",
            category: data.category || "currency",
            order: Number(data.order) || 0,
          });
        });
        setRates(fetchedRates);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateRate = (id: string, field: keyof RateItem, value: string | number) => {
    setRates((prev) =>
      prev.map((rate) =>
        rate.id === id ? { ...rate, [field]: value } : rate
      )
    );
  };

  const saveAllRates = async () => {
    setSaving(true);
    try {
      for (const rate of rates) {
        const docRef = doc(db, "local_market", rate.id);
        await setDoc(docRef, {
          name: rate.name,
          nameAr: rate.nameAr,
          rate: rate.rate,
          change: rate.change,
          flag: rate.flag,
          category: rate.category,
          order: rate.order,
          updatedAt: new Date(),
        });
      }
      toast({
        title: "تم الحفظ ✅",
        description: "تم تحديث جميع الأسعار بنجاح",
      });
    } catch (error) {
      console.error("Error saving rates:", error);
      toast({
        title: "خطأ",
        description: "فشل في حفظ البيانات",
        variant: "destructive",
      });
    }
    setSaving(false);
  };

  const initializeDefaults = async () => {
    setSaving(true);
    try {
      for (const rate of defaultRates) {
        const docRef = doc(db, "local_market", rate.id);
        await setDoc(docRef, {
          name: rate.name,
          nameAr: rate.nameAr,
          rate: rate.rate,
          change: rate.change,
          flag: rate.flag,
          category: rate.category,
          order: rate.order,
          updatedAt: new Date(),
        });
      }
      toast({
        title: "تم التهيئة ✅",
        description: "تم إضافة جميع البيانات الافتراضية",
      });
    } catch (error) {
      console.error("Error initializing:", error);
      toast({
        title: "خطأ",
        description: "فشل في التهيئة",
        variant: "destructive",
      });
    }
    setSaving(false);
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "currency": return "💱 العملات";
      case "gold": return "🥇 المعادن";
      case "bank": return "🏦 المصارف";
      default: return category;
    }
  };

  const groupedRates = rates.reduce((acc, rate) => {
    const cat = rate.category || "currency";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(rate);
    return acc;
  }, {} as Record<string, RateItem[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/local">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">لوحة التحكم</h1>
                <p className="text-sm text-muted-foreground">تحديث أسعار السوق المحلي</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={initializeDefaults} disabled={saving}>
                <Plus className="h-4 w-4 ml-2" />
                تهيئة الافتراضي
              </Button>
              <Button onClick={saveAllRates} disabled={saving}>
                <Save className="h-4 w-4 ml-2" />
                {saving ? "جاري الحفظ..." : "حفظ الكل"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {["currency", "gold", "bank"].map((category) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="text-lg">{getCategoryLabel(category)}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground px-2">
                  <div className="col-span-1">الرمز</div>
                  <div className="col-span-3">الاسم (عربي)</div>
                  <div className="col-span-3">الاسم (English)</div>
                  <div className="col-span-2">السعر</div>
                  <div className="col-span-2">التغيير %</div>
                  <div className="col-span-1">الترتيب</div>
                </div>

                {(groupedRates[category] || []).map((rate) => (
                  <div
                    key={rate.id}
                    className="grid grid-cols-12 gap-2 items-center p-2 rounded-lg bg-secondary/30"
                  >
                    <div className="col-span-1 text-2xl">{rate.flag}</div>
                    <div className="col-span-3">
                      <Input
                        value={rate.nameAr}
                        onChange={(e) => updateRate(rate.id, "nameAr", e.target.value)}
                        className="text-right"
                        dir="rtl"
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        value={rate.name}
                        onChange={(e) => updateRate(rate.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        step="0.01"
                        value={rate.rate}
                        onChange={(e) => updateRate(rate.id, "rate", parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        step="0.01"
                        value={rate.change}
                        onChange={(e) => updateRate(rate.id, "change", parseFloat(e.target.value) || 0)}
                        className={rate.change > 0 ? "text-green-500" : rate.change < 0 ? "text-red-500" : ""}
                      />
                    </div>
                    <div className="col-span-1">
                      <Input
                        type="number"
                        value={rate.order}
                        onChange={(e) => updateRate(rate.id, "order", parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="p-4 rounded-lg bg-secondary/50 border border-border">
          <p className="text-sm text-muted-foreground text-center">
            💡 اضغط "تهيئة الافتراضي" لإضافة كل البيانات دفعة واحدة، ثم عدّل الأرقام واضغط "حفظ الكل"
          </p>
        </div>
      </div>
    </div>
  );
};
