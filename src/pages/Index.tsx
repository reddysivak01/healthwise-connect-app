
import { Calendar, FileText, History, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";
import { QuickAccessCard } from "@/components/ui/QuickAccessCard";
import { PatientInfo } from "@/components/profile/PatientInfo";

// Mock data - would normally come from an API
const patientData = {
  name: "Sarah Johnson",
  age: 42,
  gender: "Female",
  photoUrl: "/placeholder.svg",
  bloodType: "A+",
  allergies: ["Penicillin", "Peanuts"],
  conditions: ["Hypertension", "Asthma"],
  email: "sarah.j@example.com",
  phone: "(555) 123-4567"
};

// Mock counts for quick access cards
const quickAccessData = {
  appointments: 2,
  prescriptions: 5,
  reports: 3,
  history: 12
};

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold mb-1">Welcome back, Sarah</h1>
          <p className="text-healthcare-lightText">
            Let's stay healthy today
          </p>
        </div>
        
        {/* Patient Information Card */}
        <div className="health-card">
          <PatientInfo patient={patientData} />
        </div>
        
        {/* Quick Access Section */}
        <div>
          <h2 className="text-lg font-medium mb-3">Quick Access</h2>
          <div className="grid grid-cols-2 gap-3">
            <QuickAccessCard 
              icon={Calendar} 
              label="Appointments" 
              count={quickAccessData.appointments}
              variant="primary"
              onClick={() => navigate("/appointments")}
            />
            <QuickAccessCard 
              icon={FileText} 
              label="Prescriptions" 
              count={quickAccessData.prescriptions}
              variant="secondary"
              onClick={() => navigate("/prescriptions")}
            />
            <QuickAccessCard 
              icon={User} 
              label="Reports" 
              count={quickAccessData.reports}
              variant="outline"
              onClick={() => navigate("/reports")}
            />
            <QuickAccessCard 
              icon={History} 
              label="History" 
              count={quickAccessData.history}
              variant="outline"
              onClick={() => navigate("/history")}
            />
          </div>
        </div>
        
        {/* Upcoming Appointments */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium">Upcoming Appointments</h2>
            <button 
              className="text-healthcare-primary text-sm"
              onClick={() => navigate("/appointments")}
            >
              See all
            </button>
          </div>
          
          {quickAccessData.appointments > 0 ? (
            <div className="space-y-3">
              <div className="health-card">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-healthcare-primary font-medium">TOMORROW</p>
                    <h3 className="font-medium">Dr. Michael Chen</h3>
                    <p className="text-sm text-healthcare-lightText">Cardiologist</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">10:30 AM</p>
                    <p className="text-sm text-healthcare-lightText">30 min</p>
                  </div>
                </div>
                <div className="flex justify-between mt-3 pt-3 border-t border-healthcare-border">
                  <button className="text-red-500 text-sm">Cancel</button>
                  <button className="text-healthcare-primary text-sm">Reschedule</button>
                </div>
              </div>
              
              <div className="health-card">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-healthcare-primary font-medium">FRI, APR 19</p>
                    <h3 className="font-medium">Dr. Emily Rodriguez</h3>
                    <p className="text-sm text-healthcare-lightText">Pulmonologist</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">2:15 PM</p>
                    <p className="text-sm text-healthcare-lightText">45 min</p>
                  </div>
                </div>
                <div className="flex justify-between mt-3 pt-3 border-t border-healthcare-border">
                  <button className="text-red-500 text-sm">Cancel</button>
                  <button className="text-healthcare-primary text-sm">Reschedule</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="health-card flex flex-col items-center justify-center py-6">
              <p className="text-healthcare-lightText mb-3">No upcoming appointments</p>
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

export default Index;
