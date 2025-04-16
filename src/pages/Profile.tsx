
import { BadgeAlert, Bell, ChevronRight, FileText, Heart, Lock, LogOut, Settings, Shield, User } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
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

const ProfileMenuItem = ({
  icon: Icon,
  label,
  onClick,
  danger = false
}: {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  danger?: boolean;
}) => (
  <div 
    className={`flex items-center justify-between p-4 cursor-pointer ${danger ? 'text-red-500' : ''}`} 
    onClick={onClick}
  >
    <div className="flex items-center">
      <Icon size={20} className="mr-3" />
      <span>{label}</span>
    </div>
    <ChevronRight size={18} className="text-gray-400" />
  </div>
);

const ProfileSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h3 className="text-sm font-medium text-healthcare-lightText px-4 mb-1">{title}</h3>
    <div className="bg-white rounded-xl overflow-hidden divide-y divide-healthcare-border">
      {children}
    </div>
  </div>
);

const Profile = () => {
  return (
    <MobileLayout title="My Profile">
      <div className="pb-6">
        {/* Profile Info Card */}
        <div className="px-4 pt-4 pb-6">
          <PatientInfo patient={patientData} />
          <button className="mt-4 w-full ios-button bg-healthcare-primary text-white py-2.5 font-medium">
            Edit Profile
          </button>
        </div>
        
        {/* Health */}
        <ProfileSection title="Health Information">
          <ProfileMenuItem icon={Heart} label="Health Records" />
          <ProfileMenuItem icon={BadgeAlert} label="Allergies & Conditions" />
          <ProfileMenuItem icon={FileText} label="Medical History" />
        </ProfileSection>
        
        {/* Account */}
        <ProfileSection title="Account">
          <ProfileMenuItem icon={User} label="Personal Information" />
          <ProfileMenuItem icon={Bell} label="Notifications" />
          <ProfileMenuItem icon={Lock} label="Privacy & Security" />
          <ProfileMenuItem icon={Shield} label="Insurance Details" />
          <ProfileMenuItem icon={Settings} label="App Settings" />
        </ProfileSection>
        
        {/* Logout */}
        <ProfileSection title="Session">
          <ProfileMenuItem icon={LogOut} label="Logout" danger={true} />
        </ProfileSection>
      </div>
    </MobileLayout>
  );
};

export default Profile;
