
import { Calendar, FileText, Filter, Search, Stethoscope } from "lucide-react";
import { useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";

// Mock history data
const historyItems = [
  {
    id: "hist1",
    type: "appointment",
    doctor: "Dr. Michael Chen",
    specialty: "Cardiologist",
    date: "Apr 16, 2025",
    status: "Completed",
    notes: "Routine checkup, blood pressure normal."
  },
  {
    id: "hist2",
    type: "prescription",
    name: "Lisinopril 10mg",
    doctor: "Dr. Michael Chen",
    date: "Apr 16, 2025",
    status: "Active",
    pharmacy: "HealthWise Pharmacy"
  },
  {
    id: "hist3",
    type: "appointment",
    doctor: "Dr. Emily Rodriguez",
    specialty: "Pulmonologist",
    date: "Apr 15, 2025",
    status: "Completed",
    notes: "Follow-up for asthma management, prescribed new inhaler."
  },
  {
    id: "hist4",
    type: "prescription",
    name: "Albuterol Inhaler",
    doctor: "Dr. Emily Rodriguez",
    date: "Apr 15, 2025",
    status: "Active",
    pharmacy: "MedExpress Pharmacy"
  },
  {
    id: "hist5",
    type: "diagnostic",
    name: "Chest X-Ray",
    doctor: "Dr. Emily Rodriguez",
    date: "Apr 15, 2025",
    status: "Completed",
    result: "Normal findings"
  },
  {
    id: "hist6",
    type: "appointment",
    doctor: "Dr. James Wilson",
    specialty: "Neurologist",
    date: "Apr 10, 2025",
    status: "Completed",
    notes: "Initial consultation for headaches."
  },
  {
    id: "hist7",
    type: "diagnostic",
    name: "Blood Test - Vitamin Panel",
    doctor: "Dr. James Wilson",
    date: "Apr 10, 2025",
    status: "Completed",
    result: "Vitamin D deficiency detected"
  },
  {
    id: "hist8",
    type: "prescription",
    name: "Vitamin D 1000 IU",
    doctor: "Dr. James Wilson",
    date: "Apr 10, 2025",
    status: "Active",
    pharmacy: "HealthWise Pharmacy"
  }
];

// Group history items by date
const groupByDate = (items: typeof historyItems) => {
  const grouped: Record<string, typeof historyItems> = {};
  
  items.forEach(item => {
    if (!grouped[item.date]) {
      grouped[item.date] = [];
    }
    grouped[item.date].push(item);
  });
  
  // Convert to array sorted by date (most recent first)
  return Object.entries(grouped)
    .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
    .map(([date, items]) => ({
      date,
      items
    }));
};

// History item card based on type
const HistoryItemCard = ({ item }: { item: typeof historyItems[0] }) => {
  const renderIcon = () => {
    switch (item.type) {
      case 'appointment':
        return <Stethoscope size={16} className="text-healthcare-primary" />;
      case 'prescription':
        return <FileText size={16} className="text-healthcare-secondary" />;
      case 'diagnostic':
        return <Calendar size={16} className="text-green-600" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="health-card">
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
          {renderIcon()}
        </div>
        <h3 className="font-medium text-sm capitalize">{item.type}</h3>
      </div>
      
      {item.type === 'appointment' ? (
        <div>
          <p className="font-medium">{item.doctor}</p>
          <p className="text-sm text-healthcare-lightText">{item.specialty}</p>
          {item.notes && (
            <div className="mt-2 text-sm">
              <p className="text-healthcare-lightText">Notes:</p>
              <p>{item.notes}</p>
            </div>
          )}
        </div>
      ) : item.type === 'prescription' ? (
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-healthcare-lightText">Prescribed by {item.doctor}</p>
          {item.pharmacy && (
            <p className="text-sm mt-1">Pharmacy: {item.pharmacy}</p>
          )}
        </div>
      ) : (
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-healthcare-lightText">Ordered by {item.doctor}</p>
          {item.result && (
            <div className="mt-2 text-sm">
              <p className="text-healthcare-lightText">Result:</p>
              <p>{item.result}</p>
            </div>
          )}
        </div>
      )}
      
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-healthcare-border">
        <span className={`text-xs pill-badge ${
          item.status === 'Completed' ? 'bg-green-100 text-green-800' :
          item.status === 'Active' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {item.status}
        </span>
        
        <button className="text-healthcare-primary text-sm">View Details</button>
      </div>
    </div>
  );
};

const History = () => {
  const [filter, setFilter] = useState<string>("all");
  
  // Filter history items based on selected type
  const filteredItems = historyItems.filter(item => {
    if (filter === "all") return true;
    return item.type === filter;
  });
  
  // Group filtered items by date
  const groupedHistory = groupByDate(filteredItems);
  
  return (
    <MobileLayout title="Medical History">
      <div className="p-4 space-y-4">
        {/* Search and Filter */}
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search medical history..." 
              className="ios-input pl-10 w-full"
            />
          </div>
          <button className="ios-button bg-gray-100 p-3 rounded-lg">
            <Filter size={18} className="text-gray-600" />
          </button>
        </div>
        
        {/* Filter Tabs */}
        <div className="overflow-x-auto">
          <div className="flex space-x-2 w-max">
            <button 
              className={`py-1.5 px-3 rounded-full text-sm whitespace-nowrap ${
                filter === "all"
                  ? "bg-healthcare-primary text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button 
              className={`py-1.5 px-3 rounded-full text-sm whitespace-nowrap ${
                filter === "appointment"
                  ? "bg-healthcare-primary text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setFilter("appointment")}
            >
              Appointments
            </button>
            <button 
              className={`py-1.5 px-3 rounded-full text-sm whitespace-nowrap ${
                filter === "prescription"
                  ? "bg-healthcare-primary text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setFilter("prescription")}
            >
              Prescriptions
            </button>
            <button 
              className={`py-1.5 px-3 rounded-full text-sm whitespace-nowrap ${
                filter === "diagnostic"
                  ? "bg-healthcare-primary text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setFilter("diagnostic")}
            >
              Diagnostics
            </button>
          </div>
        </div>
        
        {/* History Timeline */}
        <div className="space-y-6">
          {groupedHistory.length > 0 ? (
            groupedHistory.map(group => (
              <div key={group.date}>
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 rounded-full bg-healthcare-primary mr-2"></div>
                  <h3 className="font-medium">{group.date}</h3>
                </div>
                
                <div className="space-y-3 ml-1 pl-3 border-l-2 border-dashed border-healthcare-border">
                  {group.items.map(item => (
                    <HistoryItemCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="health-card flex flex-col items-center justify-center py-6">
              <p className="text-healthcare-lightText">No history records found matching your filter</p>
              <button 
                className="mt-3 px-4 py-2 bg-healthcare-primary text-white rounded-full text-sm font-medium"
                onClick={() => setFilter("all")}
              >
                View All Records
              </button>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default History;
