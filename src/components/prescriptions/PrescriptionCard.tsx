
import { cn } from "@/lib/utils";
import { Calendar, Clock, Pill } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface PrescriptionCardProps {
  prescription: {
    id: string;
    name: string;
    doctor: string;
    date: string;
    dosage: string;
    instructions?: string;
    status: "pending" | "active" | "completed" | "cancelled";
    refillsRemaining?: number;
    pharmacy?: string;
  };
  onClick?: () => void;
  className?: string;
}

export function PrescriptionCard({ prescription, onClick, className }: PrescriptionCardProps) {
  return (
    <div 
      className={cn(
        "health-card space-y-2",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-base">{prescription.name}</h3>
          <p className="text-healthcare-lightText text-sm">Dr. {prescription.doctor}</p>
        </div>
        <StatusBadge status={prescription.status} />
      </div>
      
      <div className="pt-1 border-t border-dashed border-healthcare-border">
        <div className="flex items-center text-sm text-healthcare-lightText">
          <Pill size={14} className="mr-1.5" />
          <span>{prescription.dosage}</span>
        </div>
        
        {prescription.instructions && (
          <p className="text-xs text-healthcare-lightText mt-1">
            {prescription.instructions}
          </p>
        )}
      </div>
      
      <div className="flex justify-between items-center pt-1 text-xs text-healthcare-lightText">
        <div className="flex items-center">
          <Calendar size={12} className="mr-1" />
          <span>{prescription.date}</span>
        </div>
        
        {prescription.refillsRemaining !== undefined && (
          <div className="flex items-center">
            <Clock size={12} className="mr-1" />
            <span>
              {prescription.refillsRemaining > 0 
                ? `${prescription.refillsRemaining} refills remaining` 
                : "No refills remaining"}
            </span>
          </div>
        )}
      </div>
      
      {prescription.pharmacy && (
        <div className="pt-1 border-t border-dotted border-healthcare-border flex justify-between items-center">
          <span className="text-xs">Pharmacy:</span>
          <span className="text-xs font-medium">{prescription.pharmacy}</span>
        </div>
      )}
    </div>
  );
}
