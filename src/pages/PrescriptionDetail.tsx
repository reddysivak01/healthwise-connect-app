
import { ArrowLeft, Bookmark, MapPin, Phone, Share, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";

// Mock pharmacy data
const pharmacies = [
  {
    id: "pharm1",
    name: "HealthWise Pharmacy",
    address: "123 Medical Plaza, Suite 101",
    distance: "0.8 miles away",
    phone: "(555) 123-7890",
    hours: "Open until 9:00 PM"
  },
  {
    id: "pharm2",
    name: "MedExpress Pharmacy",
    address: "456 Healthcare Blvd",
    distance: "1.2 miles away",
    phone: "(555) 456-7890",
    hours: "Open until 8:00 PM"
  },
  {
    id: "pharm3",
    name: "Community Pharmacy",
    address: "789 Wellness Street",
    distance: "2.5 miles away",
    phone: "(555) 789-1234",
    hours: "Open until 6:00 PM"
  }
];

// Mock prescription detail
const prescriptionDetail = {
  id: "rx1",
  name: "Lisinopril 10mg",
  doctor: "Dr. Michael Chen",
  date: "Apr 16, 2025",
  dosage: "1 tablet daily",
  instructions: "Take in the morning with food. Avoid grapefruit juice. Monitor blood pressure regularly and report any dizziness or persistent cough.",
  status: "active",
  refillsRemaining: 3,
  pharmacy: "HealthWise Pharmacy",
  expirationDate: "Apr 16, 2026",
  rxNumber: "RX-78915623",
  genericName: "Lisinopril",
  quantity: "30 tablets",
  indication: "Hypertension"
};

const PharmacyCard = ({ 
  pharmacy, 
  isSelected, 
  onSelect 
}: { 
  pharmacy: typeof pharmacies[0];
  isSelected?: boolean;
  onSelect: () => void;
}) => (
  <div 
    className={`health-card ${isSelected ? 'border-healthcare-primary' : ''}`}
    onClick={onSelect}
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-medium">{pharmacy.name}</h3>
        <div className="flex items-center text-healthcare-lightText text-sm mt-1">
          <MapPin size={14} className="mr-1" />
          <span>{pharmacy.distance}</span>
        </div>
      </div>
      <div className="text-green-600 text-sm">
        {pharmacy.hours}
      </div>
    </div>
    
    <div className="mt-2 text-sm text-healthcare-lightText">
      {pharmacy.address}
    </div>
    
    <div className="flex justify-between items-center mt-3 pt-3 border-t border-healthcare-border">
      <a 
        href={`tel:${pharmacy.phone}`} 
        className="flex items-center text-healthcare-primary text-sm"
      >
        <Phone size={14} className="mr-1.5" />
        <span>{pharmacy.phone}</span>
      </a>
      
      {isSelected && (
        <span className="text-healthcare-primary text-sm font-medium">Selected</span>
      )}
    </div>
  </div>
);

const PrescriptionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">("pickup");
  const [selectedPharmacy, setSelectedPharmacy] = useState(pharmacies[0].id);
  
  // Right action for the header
  const rightAction = (
    <div className="flex space-x-3">
      <button className="text-healthcare-primary">
        <Bookmark size={20} />
      </button>
      <button className="text-healthcare-primary">
        <Share size={20} />
      </button>
    </div>
  );
  
  return (
    <MobileLayout title="Prescription Details" showBackButton={true} rightAction={rightAction}>
      <div className="p-4 space-y-4 pb-24">
        {/* Prescription Information */}
        <div className="bg-white rounded-xl p-4">
          <h2 className="text-xl font-semibold">{prescriptionDetail.name}</h2>
          <p className="text-healthcare-lightText">
            {prescriptionDetail.genericName} • {prescriptionDetail.quantity}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div>
              <p className="text-healthcare-lightText">Doctor</p>
              <p className="font-medium">{prescriptionDetail.doctor}</p>
            </div>
            <div>
              <p className="text-healthcare-lightText">Date Prescribed</p>
              <p className="font-medium">{prescriptionDetail.date}</p>
            </div>
            <div>
              <p className="text-healthcare-lightText">Refills Remaining</p>
              <p className="font-medium">{prescriptionDetail.refillsRemaining}</p>
            </div>
            <div>
              <p className="text-healthcare-lightText">Expiration</p>
              <p className="font-medium">{prescriptionDetail.expirationDate}</p>
            </div>
            <div>
              <p className="text-healthcare-lightText">Rx Number</p>
              <p className="font-medium">{prescriptionDetail.rxNumber}</p>
            </div>
            <div>
              <p className="text-healthcare-lightText">For</p>
              <p className="font-medium">{prescriptionDetail.indication}</p>
            </div>
          </div>
        </div>
        
        {/* Dosage & Instructions */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="font-medium mb-2">Dosage & Instructions</h3>
          
          <div className="bg-gray-50 p-3 rounded-lg mb-3">
            <p className="font-medium text-sm">{prescriptionDetail.dosage}</p>
          </div>
          
          <p className="text-sm">{prescriptionDetail.instructions}</p>
        </div>
        
        {/* Delivery Method Selection */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="font-medium mb-3">How would you like to get your medication?</h3>
          
          <div className="flex space-x-3">
            <button 
              className={`flex-1 py-3 flex flex-col items-center justify-center rounded-lg border ${
                deliveryMethod === "pickup" 
                  ? "border-healthcare-primary bg-blue-50" 
                  : "border-healthcare-border bg-white"
              }`}
              onClick={() => setDeliveryMethod("pickup")}
            >
              <ShoppingBag size={20} className={deliveryMethod === "pickup" ? "text-healthcare-primary" : "text-healthcare-lightText"} />
              <span className={`text-sm mt-1 ${deliveryMethod === "pickup" ? "text-healthcare-primary font-medium" : "text-healthcare-lightText"}`}>
                Pickup
              </span>
            </button>
            
            <button 
              className={`flex-1 py-3 flex flex-col items-center justify-center rounded-lg border ${
                deliveryMethod === "delivery" 
                  ? "border-healthcare-primary bg-blue-50" 
                  : "border-healthcare-border bg-white"
              }`}
              onClick={() => setDeliveryMethod("delivery")}
            >
              <Truck size={20} className={deliveryMethod === "delivery" ? "text-healthcare-primary" : "text-healthcare-lightText"} />
              <span className={`text-sm mt-1 ${deliveryMethod === "delivery" ? "text-healthcare-primary font-medium" : "text-healthcare-lightText"}`}>
                Delivery
              </span>
            </button>
          </div>
        </div>
        
        {/* Pharmacy Selection */}
        <div>
          <h3 className="font-medium mb-3 px-1">
            {deliveryMethod === "pickup" ? "Select Pharmacy for Pickup" : "Select Pharmacy for Delivery"}
          </h3>
          
          <div className="space-y-3">
            {pharmacies.map(pharmacy => (
              <PharmacyCard 
                key={pharmacy.id}
                pharmacy={pharmacy}
                isSelected={selectedPharmacy === pharmacy.id}
                onSelect={() => setSelectedPharmacy(pharmacy.id)}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Fixed Footer Button */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-healthcare-border p-4 max-w-md mx-auto">
        <button className="w-full ios-button bg-healthcare-primary text-white py-3 font-medium">
          {deliveryMethod === "pickup" 
            ? "Send to Pharmacy for Pickup" 
            : "Send to Pharmacy for Delivery"
          }
        </button>
      </div>
    </MobileLayout>
  );
};

export default PrescriptionDetail;
