import { RefreshCw } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  lastUpdate?: string;
}

export const Header = ({ title, subtitle, onRefresh, isRefreshing, lastUpdate }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border px-4 py-4 safe-area-pt">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇱🇾</span>
            <h1 className="text-xl font-bold text-foreground">{title}</h1>
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
          {lastUpdate && (
            <p className="text-xs text-muted-foreground mt-1">
              آخر تحديث: {lastUpdate}
            </p>
          )}
        </div>
        
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors disabled:opacity-50"
          >
            <RefreshCw
              className={`w-5 h-5 text-foreground ${isRefreshing ? "animate-spin" : ""}`}
            />
          </button>
        )}
      </div>
    </header>
  );
};
