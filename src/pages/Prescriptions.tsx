
import { Filter, Plus, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";
import { PrescriptionCard } from "@/components/prescriptions/PrescriptionCard";

// Mock prescription data
const prescriptions = [
  {
    id: "rx1",
    name: "Lisinopril 10mg",
    doctor: "Michael Chen",
    date: "Apr 16, 2025",
    dosage: "1 tablet daily",
    instructions: "Take in the morning with food",
    status: "active",
    refillsRemaining: 3,
    pharmacy: "HealthWise Pharmacy"
  },
  {
    id: "rx2",
    name: "Albuterol Inhaler",
    doctor: "Emily Rodriguez",
    date: "Apr 15, 2025",
    dosage: "2 puffs every 4-6 hours as needed",
    instructions: "Use before exercise if needed",
    status: "active",
    refillsRemaining: 5,
    pharmacy: "MedExpress Pharmacy"
  },
  {
    id: "rx3",
    name: "Vitamin D 1000 IU",
    doctor: "James Wilson",
    date: "Apr 10, 2025",
    dosage: "1 tablet daily",
    instructions: "",
    status: "active",
    refillsRemaining: 11,
    pharmacy: "HealthWise Pharmacy"
  },
  {
    id: "rx4",
    name: "Amoxicillin 500mg",
    doctor: "Lisa Thompson",
    date: "Mar 22, 2025",
    dosage: "1 capsule every 8 hours",
    instructions: "Complete entire prescription",
    status: "completed",
    refillsRemaining: 0
  },
  {
    id: "rx5",
    name: "Prednisone 20mg",
    doctor: "Robert Garcia",
    date: "Mar 15, 2025",
    dosage: "1 tablet daily for 7 days",
    instructions: "Take with food, taper as directed",
    status: "completed",
    refillsRemaining: 0
  }
];

const Prescriptions = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("active");
  
  // Filter prescriptions based on selected filter
  const filteredPrescriptions = prescriptions.filter(rx => {
    if (filter === "active") {
      return rx.status === "active";
    } else if (filter === "completed") {
      return rx.status === "completed";
    }
    return true; // all
  });
  
  return (
    <MobileLayout title="Prescriptions">
      <div className="p-4 space-y-4">
        {/* Search and Filter */}
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search prescriptions..." 
              className="ios-input pl-10 w-full"
            />
          </div>
          <button className="ios-button bg-gray-100 p-3 rounded-lg">
            <Filter size={18} className="text-gray-600" />
          </button>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex border-b border-healthcare-border">
          <button 
            className={`flex-1 py-3 text-sm font-medium ${filter === "active" ? "text-healthcare-primary tab-active" : "text-gray-500"}`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button 
            className={`flex-1 py-3 text-sm font-medium ${filter === "completed" ? "text-healthcare-primary tab-active" : "text-gray-500"}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button 
            className={`flex-1 py-3 text-sm font-medium ${filter === "all" ? "text-healthcare-primary tab-active" : "text-gray-500"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
        </div>
        
        {/* Prescriptions List */}
        <div className="space-y-3">
          {filteredPrescriptions.length > 0 ? (
            filteredPrescriptions.map(prescription => (
              <PrescriptionCard 
                key={prescription.id} 
                prescription={prescription as any}
                onClick={() => navigate(`/prescriptions/${prescription.id}`)}
              />
            ))
          ) : (
            <div className="health-card flex flex-col items-center justify-center py-6">
              <p className="text-healthcare-lightText mb-3">No {filter} prescriptions found</p>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Prescriptions;
