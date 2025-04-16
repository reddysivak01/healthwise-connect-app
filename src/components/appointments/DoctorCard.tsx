
import { cn } from "@/lib/utils";
import { Calendar, MapPin, Star } from "lucide-react";

interface DoctorCardProps {
  doctor: {
    id: string;
    name: string;
    photoUrl?: string;
    specialty: string;
    rating: number;
    reviews?: number;
    location?: string;
    nextAvailable?: string;
    education?: string;
    experience?: number;
  };
  onClick?: () => void;
  className?: string;
}

export function DoctorCard({ doctor, onClick, className }: DoctorCardProps) {
  return (
    <div 
      className={cn(
        "health-card flex items-start space-x-3 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {doctor.photoUrl ? (
        <img 
          src={doctor.photoUrl} 
          alt={doctor.name} 
          className="w-16 h-16 rounded-full object-cover"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-healthcare-primary/10 flex items-center justify-center text-healthcare-primary text-xl font-bold">
          {doctor.name.split(' ').map(n => n[0]).join('')}
        </div>
      )}
      
      <div className="flex-1">
        <h3 className="font-medium text-base">{doctor.name}</h3>
        <p className="text-healthcare-lightText text-sm">{doctor.specialty}</p>
        
        <div className="flex items-center mt-1">
          <div className="flex items-center text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span className="text-xs ml-1">{doctor.rating}</span>
          </div>
          {doctor.reviews && (
            <span className="text-xs text-healthcare-lightText ml-1">
              ({doctor.reviews} reviews)
            </span>
          )}
        </div>
        
        {doctor.location && (
          <div className="flex items-center mt-1 text-xs text-healthcare-lightText">
            <MapPin size={12} className="mr-1" />
            <span>{doctor.location}</span>
          </div>
        )}
        
        {doctor.nextAvailable && (
          <div className="flex items-center mt-1 text-xs text-green-600">
            <Calendar size={12} className="mr-1" />
            <span>Next available: {doctor.nextAvailable}</span>
          </div>
        )}
      </div>
    </div>
  );
}
