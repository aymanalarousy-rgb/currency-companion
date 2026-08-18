export function formatBigUsd(value: number): string {
  if (!value) return "-";
  if (value >= 1e12) return `${(value / 1e12).toFixed(2)} تريليون $`;
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)} مليار $`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)} مليون $`;
  return `${value.toFixed(2)} $`;
}

export function formatPrice(value: number): string {
  if (value >= 1000) return value.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (value >= 1) return value.toFixed(2);
  return value.toFixed(4);
}
