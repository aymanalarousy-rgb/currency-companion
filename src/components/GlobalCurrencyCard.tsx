import { GlobalCurrencyRate } from "@/types/currency";
import { TrendingUp, TrendingDown, Minus, RefreshCw } from "lucide-react";

interface GlobalCurrencyCardProps {
  currency: GlobalCurrencyRate;
  index: number;
  isLoading?: boolean;
}

export const GlobalCurrencyCard = ({ currency, index, isLoading }: GlobalCurrencyCardProps) => {
  const isPositive = currency.change > 0;
  const isNegative = currency.change < 0;
  const isNeutral = currency.change === 0;

  const getIndicatorColor = () => {
    if (isPositive) return "text-success";
    if (isNegative) return "text-destructive";
    return "text-muted-foreground";
  };

  const getIndicatorBg = () => {
    if (isPositive) return "bg-success/10";
    if (isNegative) return "bg-destructive/10";
    return "bg-muted";
  };

  const getGlowClass = () => {
    if (isPositive) return "hover:shadow-glow-green";
    if (isNegative) return "hover:shadow-glow-red";
    return "";
  };

  if (isLoading) {
    return (
      <div
        className="gradient-card rounded-lg p-4 shadow-card animate-pulse"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted"></div>
            <div>
              <div className="h-4 w-24 bg-muted rounded"></div>
              <div className="h-3 w-16 bg-muted rounded mt-2"></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-muted-foreground animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`gradient-card rounded-lg p-4 shadow-card transition-all duration-300 ${getGlowClass()} animate-slide-up`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{currency.flag}</span>
          <div>
            <h3 className="font-semibold text-foreground">{currency.nameAr}</h3>
            <p className="text-sm text-muted-foreground">{currency.code}</p>
          </div>
        </div>

        <div className="text-left">
          <div className="flex items-center gap-2 justify-end">
            <span className="text-lg font-bold text-foreground">
              {currency.rate.toFixed(4)}
            </span>
          </div>
          
          <div className={`flex items-center gap-1 justify-end mt-1 ${getIndicatorColor()}`}>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getIndicatorBg()}`}>
              {isPositive && "+"}
              {currency.change.toFixed(2)}%
            </span>
            {isPositive && <TrendingUp className="w-4 h-4" />}
            {isNegative && <TrendingDown className="w-4 h-4" />}
            {isNeutral && <Minus className="w-4 h-4" />}
          </div>
        </div>
      </div>
    </div>
  );
};
