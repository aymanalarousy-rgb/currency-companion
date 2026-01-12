interface SectionDividerProps {
  title: string;
  icon?: string;
}

export const SectionDivider = ({ title, icon }: SectionDividerProps) => {
  return (
    <div className="flex items-center gap-3 py-3">
      {icon && <span className="text-lg">{icon}</span>}
      <span className="text-sm font-medium text-muted-foreground">{title}</span>
      <div className="flex-1 h-px bg-border"></div>
    </div>
  );
};
