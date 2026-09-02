import { useEffect, useState } from "react";
import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { Star, X } from "lucide-react";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.ayman.libyarates";
const STORAGE_KEY = "rate_popup_last_shown";

export const RateUsPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const listener = App.addListener("backButton", async ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
        return;
      }

      // At the root of the navigation stack: show rate prompt once per day,
      // otherwise exit immediately.
      const today = new Date().toISOString().split("T")[0];
      const lastShown = localStorage.getItem(STORAGE_KEY);

      if (lastShown === today) {
        await App.exitApp();
        return;
      }

      localStorage.setItem(STORAGE_KEY, today);
      setShow(true);
    });

    return () => {
      listener.then((l) => l.remove());
    };
  }, []);

  const handleRate = () => {
    window.open(PLAY_STORE_URL, "_system");
    setShow(false);
  };

  const handleExit = async () => {
    setShow(false);
    await App.exitApp();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-sm rounded-2xl bg-card p-6 shadow-card border border-border text-center">
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 p-2 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Star className="h-7 w-7 text-primary" />
        </div>

        <h2 className="mb-2 text-lg font-bold text-foreground">قيّم تطبيقنا</h2>
        <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
          هل تستمتع باستخدام التطبيق؟
          <br />
          تقييمك على Google Play يساعدنا كثيراً.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleRate}
            className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            التقييم على Google Play
          </button>

          <button
            onClick={handleExit}
            className="w-full rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            خروج
          </button>

          <button
            onClick={() => setShow(false)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors pt-1"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};
