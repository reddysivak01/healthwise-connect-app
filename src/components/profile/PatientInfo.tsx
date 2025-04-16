
import { cn } from "@/lib/utils";
import { BadgeAlert, Mail, Phone } from "lucide-react";

interface PatientInfoProps {
  patient: {
    name: string;
    age: number;
    gender: string;
    photoUrl?: string;
    bloodType?: string;
    allergies?: string[];
    conditions?: string[];
    email?: string;
    phone?: string;
  };
  className?: string;
}

export function PatientInfo({ patient, className }: PatientInfoProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center space-x-4">
        <div className="relative">
          {patient.photoUrl ? (
            <img 
              src={patient.photoUrl} 
              alt={patient.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-healthcare-primary"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-healthcare-primary/10 flex items-center justify-center text-healthcare-primary text-xl font-bold">
              {patient.name.charAt(0)}
            </div>
          )}
          
          {patient.bloodType && (
            <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {patient.bloodType}
            </div>
          )}
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">{patient.name}</h2>
          <p className="text-healthcare-lightText text-sm">
            {patient.age} years • {patient.gender}
          </p>
          
          {(patient.email || patient.phone) && (
            <div className="flex items-center space-x-2 mt-1 text-sm text-healthcare-lightText">
              {patient.phone && (
                <a href={`tel:${patient.phone}`} className="flex items-center">
                  <Phone size={14} className="mr-1" />
                  <span className="text-xs">{patient.phone}</span>
                </a>
              )}
              
              {patient.email && (
                <a href={`mailto:${patient.email}`} className="flex items-center">
                  <Mail size={14} className="mr-1" />
                  <span className="text-xs truncate max-w-[150px]">{patient.email}</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      
      {(patient.allergies?.length || patient.conditions?.length) ? (
        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
          {patient.allergies?.length ? (
            <div>
              <div className="flex items-center text-red-600 mb-1.5">
                <BadgeAlert size={16} className="mr-1.5" />
                <span className="text-sm font-medium">Allergies</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {patient.allergies.map((allergy, i) => (
                  <span key={i} className="pill-badge bg-red-50 text-red-700">
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          
          {patient.conditions?.length ? (
            <div>
              <div className="flex items-center text-amber-600 mb-1.5">
                <BadgeAlert size={16} className="mr-1.5" />
                <span className="text-sm font-medium">Medical Conditions</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {patient.conditions.map((condition, i) => (
                  <span key={i} className="pill-badge bg-amber-50 text-amber-700">
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
