
import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";
import { DoctorCard } from "@/components/appointments/DoctorCard";

// Mock data for doctors
const doctors = [
  {
    id: "doc1",
    name: "Dr. Michael Chen",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 127,
    location: "Medical Center",
    nextAvailable: "Tomorrow, 10:30 AM",
    education: "Harvard Medical School",
    experience: 15
  },
  {
    id: "doc2",
    name: "Dr. Emily Rodriguez",
    specialty: "Pulmonologist",
    rating: 4.8,
    reviews: 98,
    location: "Health Hub Clinic",
    nextAvailable: "Fri, Apr 19 at 2:15 PM",
    education: "Johns Hopkins University",
    experience: 12
  },
  {
    id: "doc3",
    name: "Dr. James Wilson",
    specialty: "Neurologist",
    rating: 4.7,
    reviews: 85,
    location: "Medical Center",
    nextAvailable: "Today, 4:30 PM",
    education: "Stanford University",
    experience: 10
  },
  {
    id: "doc4",
    name: "Dr. Lisa Thompson",
    specialty: "Primary Care",
    rating: 4.9,
    reviews: 156,
    location: "Community Health Center",
    nextAvailable: "Mon, Apr 20 at 9:45 AM",
    education: "Yale School of Medicine",
    experience: 18
  },
  {
    id: "doc5",
    name: "Dr. Robert Garcia",
    specialty: "Dermatologist",
    rating: 4.6,
    reviews: 74,
    location: "Medical Center",
    nextAvailable: "Wed, Apr 22 at 11:15 AM",
    education: "University of California",
    experience: 8
  }
];

// List of specialties for filter
const specialties = [
  "All Specialties",
  "Cardiology",
  "Pulmonology",
  "Neurology",
  "Primary Care",
  "Dermatology",
  "Orthopedics",
  "Pediatrics",
  "OB/GYN"
];

const DoctorsList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  
  // Filter doctors based on search and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === "All Specialties" || 
                            doctor.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
    
    return matchesSearch && matchesSpecialty;
  });
  
  // Custom back button for header
  const leftAction = (
    <button onClick={() => navigate(-1)} className="flex items-center text-healthcare-primary">
      <ArrowLeft size={20} />
    </button>
  );
  
  return (
    <MobileLayout title="Find a Doctor" showBackButton={true}>
      <div className="p-4 space-y-4">
        {/* Search and Filter */}
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search doctors..." 
              className="ios-input pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="ios-button bg-gray-100 p-3 rounded-lg">
            <SlidersHorizontal size={18} className="text-gray-600" />
          </button>
        </div>
        
        {/* Specialty Filter */}
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-2 w-max">
            {specialties.map(specialty => (
              <button
                key={specialty}
                className={`py-1.5 px-3 rounded-full text-sm whitespace-nowrap ${
                  selectedSpecialty === specialty
                    ? "bg-healthcare-primary text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
        
        {/* Doctors List */}
        <div className="space-y-3">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map(doctor => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onClick={() => navigate(`/appointments/new/${doctor.id}`)}
              />
            ))
          ) : (
            <div className="health-card flex flex-col items-center justify-center py-6">
              <p className="text-healthcare-lightText">No doctors found matching your criteria</p>
              <button 
                className="mt-3 px-4 py-2 bg-healthcare-primary text-white rounded-full text-sm font-medium"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSpecialty("All Specialties");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default DoctorsList;
