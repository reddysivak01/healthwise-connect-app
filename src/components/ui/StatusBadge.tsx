
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "pending" | "active" | "completed" | "cancelled";
  className?: string;
}

const statusConfig = {
  pending: {
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
    label: "Pending"
  },
  active: {
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
    label: "Active"
  },
  completed: {
    bgColor: "bg-green-100",
    textColor: "text-green-800",
    label: "Completed"
  },
  cancelled: {
    bgColor: "bg-red-100",
    textColor: "text-red-800",
    label: "Cancelled"
  }
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      "pill-badge", 
      config.bgColor, 
      config.textColor,
      className
    )}>
      {config.label}
    </span>
  );
}
