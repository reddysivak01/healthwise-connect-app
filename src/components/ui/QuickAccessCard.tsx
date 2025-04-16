
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface QuickAccessCardProps {
  icon: LucideIcon;
  label: string;
  count?: number;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
  className?: string;
}

export function QuickAccessCard({
  icon: Icon,
  label,
  count,
  variant = "primary",
  onClick,
  className,
}: QuickAccessCardProps) {
  const styles = {
    primary: "bg-healthcare-primary text-white",
    secondary: "bg-healthcare-secondary text-white",
    outline: "bg-white border border-healthcare-border text-healthcare-text",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "health-card flex flex-col items-center justify-center p-4 cursor-pointer",
        styles[variant],
        className
      )}
    >
      <div className="flex items-center justify-center w-10 h-10 mb-2">
        <Icon size={24} />
      </div>
      <p className="text-sm font-medium">{label}</p>
      {count !== undefined && (
        <span className="mt-1 text-xs opacity-80">{count}</span>
      )}
    </div>
  );
}
