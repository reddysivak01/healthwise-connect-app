
import { Filter, Plus, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";
import { StatusBadge } from "@/components/ui/StatusBadge";

// Mock data
const appointments = [
  {
    id: "apt1",
    doctor: "Dr. Michael Chen",
    specialty: "Cardiologist",
    date: "Apr 17, 2025",
    time: "10:30 AM",
    duration: "30 min",
    status: "pending",
    location: "Medical Center, Building A, Room 304"
  },
  {
    id: "apt2",
    doctor: "Dr. Emily Rodriguez",
    specialty: "Pulmonologist",
    date: "Apr 19, 2025",
    time: "2:15 PM",
    duration: "45 min",
    status: "pending",
    location: "Health Hub Clinic, Suite 201"
  },
  {
    id: "apt3",
    doctor: "Dr. James Wilson",
    specialty: "Neurologist",
    date: "Apr 3, 2025",
    time: "11:00 AM",
    duration: "60 min",
    status: "completed",
    location: "Medical Center, Building B, Room 118"
  },
  {
    id: "apt4",
    doctor: "Dr. Lisa Thompson",
    specialty: "Primary Care",
    date: "Mar 22, 2025",
    time: "9:45 AM",
    duration: "30 min",
    status: "completed",
    location: "Community Health Center, Room 7"
  },
  {
    id: "apt5",
    doctor: "Dr. Robert Garcia",
    specialty: "Dermatologist",
    date: "Mar 15, 2025",
    time: "3:30 PM",
    duration: "30 min",
    status: "cancelled",
    location: "Medical Center, Building C, Room 215"
  }
];

const AppointmentCard = ({ appointment }: { appointment: typeof appointments[0] }) => {
  const isPast = appointment.status === "completed" || appointment.status === "cancelled";
  
  return (
    <div className="health-card">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-healthcare-primary font-medium">
            {appointment.date.toUpperCase()} • {appointment.time}
          </p>
          <h3 className="font-medium">{appointment.doctor}</h3>
          <p className="text-sm text-healthcare-lightText">{appointment.specialty}</p>
        </div>
        <StatusBadge status={appointment.status as any} />
      </div>
      
      <div className="mt-3 pt-3 border-t border-healthcare-border">
        <p className="text-xs text-healthcare-lightText mb-2">
          <span className="font-medium">Duration:</span> {appointment.duration}
        </p>
        <p className="text-xs text-healthcare-lightText">
          <span className="font-medium">Location:</span> {appointment.location}
        </p>
      </div>
      
      {!isPast && (
        <div className="flex justify-between mt-3 pt-3 border-t border-healthcare-border">
          <button className="text-red-500 text-sm">Cancel</button>
          <button className="text-healthcare-primary text-sm">Reschedule</button>
        </div>
      )}
    </div>
  );
};

const Appointments = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("upcoming");
  
  // Filter appointments based on selected filter
  const filteredAppointments = appointments.filter(apt => {
    if (filter === "upcoming") {
      return apt.status === "pending";
    } else if (filter === "past") {
      return apt.status === "completed" || apt.status === "cancelled";
    }
    return true; // all
  });
  
  // Right action for the header
  const rightAction = (
    <button 
      onClick={() => navigate("/appointments/new")} 
      className="w-8 h-8 flex items-center justify-center rounded-full bg-healthcare-primary text-white"
    >
      <Plus size={18} />
    </button>
  );
  
  return (
    <MobileLayout title="Appointments" rightAction={rightAction}>
      <div className="p-4 space-y-4">
        {/* Search and Filter */}
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search appointments..." 
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
            className={`flex-1 py-3 text-sm font-medium ${filter === "upcoming" ? "text-healthcare-primary tab-active" : "text-gray-500"}`}
            onClick={() => setFilter("upcoming")}
          >
            Upcoming
          </button>
          <button 
            className={`flex-1 py-3 text-sm font-medium ${filter === "past" ? "text-healthcare-primary tab-active" : "text-gray-500"}`}
            onClick={() => setFilter("past")}
          >
            Past
          </button>
          <button 
            className={`flex-1 py-3 text-sm font-medium ${filter === "all" ? "text-healthcare-primary tab-active" : "text-gray-500"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
        </div>
        
        {/* Appointments List */}
        <div className="space-y-3">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map(appointment => (
              <AppointmentCard 
                key={appointment.id} 
                appointment={appointment} 
              />
            ))
          ) : (
            <div className="health-card flex flex-col items-center justify-center py-6">
              <p className="text-healthcare-lightText mb-3">No {filter} appointments found</p>
              <button 
                className="px-4 py-2 bg-healthcare-primary text-white rounded-full text-sm font-medium"
                onClick={() => navigate("/appointments/new")}
              >
                Schedule New Appointment
              </button>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Appointments;
