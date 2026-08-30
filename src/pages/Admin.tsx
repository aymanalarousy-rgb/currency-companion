import { useState, useEffect } from "react";
import { collection, doc, setDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/integrations/firebase/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";

interface RateItem {
  id: string;
  name: string;
  nameAr: string;
  rate: number;
  change: number;
  flag: string;
  category: "dollar" | "euro" | "transfer";
  order: number;
}

export const Admin = () => {
  const [rates, setRates] = useState<RateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const ratesRef = collection(db, "local_market");
    const q = query(ratesRef, orderBy("order", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
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
          category: data.category || "dollar",
          order: Number(data.order) || 0,
        });
      });
      setRates(fetchedRates);
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
          rate: Number(rate.rate),
          change: Number(rate.change),
          flag: rate.flag,
          category: rate.category,
          order: Number(rate.order),
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

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "dollar": return "🇺🇸 أسواق الدولار";
      case "euro": return "🇪🇺 أسواق اليورو";
      case "transfer": return "📱 الحوالات والخدمات";
      default: return category;
    }
  };

  const groupedRates = rates.reduce((acc, rate) => {
    const cat = rate.category || "dollar";
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
                <h1 className="text-xl font-bold">لوحة التحكم (Firebase)</h1>
                <p className="text-sm text-muted-foreground">تحديث أسعار السوق المحلي الحالية</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={saveAllRates} disabled={saving}>
                {saving ? "جاري الحفظ..." : "حفظ الكل"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {["dollar", "euro", "transfer"].map((category) => (
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
                  <div className="col-span-2">التغيير</div>
                  <div className="col-span-1">الترتيب</div>
                </div>

                {(groupedRates[category] || []).map((rate) => (
                  <div key={rate.id} className="grid grid-cols-12 gap-2 items-center border-b border-border/50 pb-2">
                    <div className="col-span-1 font-mono text-xs text-muted-foreground truncate">{rate.flag}</div>
                    <div className="col-span-3">
                      <Input value={rate.nameAr} onChange={(e) => updateRate(rate.id, "nameAr", e.target.value)} />
                    </div>
                    <div className="col-span-3">
                      <Input value={rate.name} onChange={(e) => updateRate(rate.id, "name", e.target.value)} />
                    </div>
                    <div className="col-span-2">
                      <Input type="number" step="0.001" value={rate.rate} onChange={(e) => updateRate(rate.id, "rate", parseFloat(e.target.value) || 0)} />
                    </div>
                    <div className="col-span-2">
                      <Input type="number" step="0.01" value={rate.change} onChange={(e) => updateRate(rate.id, "change", parseFloat(e.target.value) || 0)} />
                    </div>
                    <div className="col-span-1">
                      <Input type="number" value={rate.order} onChange={(e) => updateRate(rate.id, "order", parseInt(e.target.value) || 0)} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

