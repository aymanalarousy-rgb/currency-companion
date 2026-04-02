import { CurrencyRate } from "@/types/currency";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface CurrencyCardProps {
  currency: CurrencyRate;
  index: number;
}

export const CurrencyCard = ({ currency, index }: CurrencyCardProps) => {
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

  const getCategoryStyle = () => {
    if (currency.category === 'dollar') return "border-r-4 border-r-accent";
    if (currency.category === 'euro') return "border-r-4 border-r-chart-blue";
    return "";
  };

  return (
    <div
      className={`gradient-card rounded-lg p-4 shadow-card transition-all duration-300 ${getGlowClass()} ${getCategoryStyle()} animate-slide-up`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{currency.flag}</span>
          <div>
            <h3 className="font-semibold text-foreground">{currency.nameAr}</h3>
            <p className="text-sm text-muted-foreground">{currency.name}</p>
          </div>
        </div>

        <div className="text-left">
          <div className="flex items-center gap-2 justify-end">
            <span className="text-lg font-bold text-foreground">
              {currency.rate.toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground">
              {currency.category === 'gold' ? 'جرام' : 'دينار'}
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
