import { Globe, Store, Calculator, LineChart, Bitcoin } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    {
      id: "global",
      label: "الأسعار العالمية",
      icon: Globe,
      path: "/",
    },
    {
      id: "local",
      label: "السوق المحلي",
      icon: Store,
      path: "/local",
    },
    {
      id: "stocks",
      label: "الأسهم",
      icon: LineChart,
      path: "/stocks",
    },
    {
      id: "crypto",
      label: "الرقمية",
      icon: Bitcoin,
      path: "/crypto",
    },
    {
      id: "calculator",
      label: "حاسبة",
      icon: Calculator,
      path: "/calculator",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border safe-area-pb">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all duration-300 ${
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon
                className={`w-6 h-6 transition-transform duration-300 ${
                  isActive ? "scale-110" : ""
                }`}
              />
              <span className={`text-xs font-medium ${isActive ? "font-semibold" : ""}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
