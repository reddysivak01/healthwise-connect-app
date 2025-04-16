
import { ArrowLeft, File, Image, Paperclip, Send } from "lucide-react";
import { useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

// Doctor Portal: Screen for doctors to upload prescriptions and reports

const DoctorUpload = () => {
  const [sendToPharmacy, setSendToPharmacy] = useState(false);
  const [documentType, setDocumentType] = useState<"prescription" | "report" | "note">("prescription");
  const [files, setFiles] = useState<File[]>([]);
  const [notes, setNotes] = useState("");

  // Mock patient data
  const patient = {
    name: "Sarah Johnson",
    age: 42,
    gender: "Female",
    id: "P-24589",
    appointment: {
      id: "A-78921",
      date: "April 16, 2025",
      type: "Follow-up"
    }
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  // Remove a file from the list
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <MobileLayout title="Doctor Portal" showBackButton={true}>
      <div className="p-4 space-y-4">
        {/* Patient Information */}
        <div className="health-card">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{patient.name}</h3>
              <p className="text-sm text-healthcare-lightText">
                {patient.age} years • {patient.gender} • ID: {patient.id}
              </p>
            </div>
            <div className="bg-blue-100 text-blue-800 pill-badge">
              Active Patient
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-healthcare-border">
            <p className="text-sm">
              <span className="font-medium">Appointment:</span> {patient.appointment.type}
            </p>
            <p className="text-sm text-healthcare-lightText">
              {patient.appointment.date} • ID: {patient.appointment.id}
            </p>
          </div>
        </div>

        {/* Document Type Selection */}
        <div className="bg-white rounded-xl p-3">
          <p className="font-medium mb-2 text-sm">Document Type</p>
          <div className="flex space-x-2">
            <button 
              className={cn(
                "flex-1 py-2 rounded-lg text-sm font-medium",
                documentType === "prescription"
                  ? "bg-healthcare-primary text-white"
                  : "bg-gray-100 text-gray-700"
              )}
              onClick={() => setDocumentType("prescription")}
            >
              Prescription
            </button>
            <button 
              className={cn(
                "flex-1 py-2 rounded-lg text-sm font-medium",
                documentType === "report"
                  ? "bg-healthcare-primary text-white"
                  : "bg-gray-100 text-gray-700"
              )}
              onClick={() => setDocumentType("report")}
            >
              Report
            </button>
            <button 
              className={cn(
                "flex-1 py-2 rounded-lg text-sm font-medium",
                documentType === "note"
                  ? "bg-healthcare-primary text-white"
                  : "bg-gray-100 text-gray-700"
              )}
              onClick={() => setDocumentType("note")}
            >
              Note
            </button>
          </div>
        </div>

        {/* Upload Files Section */}
        <div className="bg-white rounded-xl p-4">
          <p className="font-medium mb-3 text-sm">Attached Files</p>
          
          {/* File list */}
          {files.length > 0 && (
            <div className="space-y-2 mb-4">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                  <div className="flex items-center">
                    {file.type.includes('image') ? (
                      <Image size={18} className="text-healthcare-primary mr-2" />
                    ) : (
                      <File size={18} className="text-healthcare-primary mr-2" />
                    )}
                    <div>
                      <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                      <p className="text-xs text-healthcare-lightText">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <button 
                    className="text-red-500 text-sm"
                    onClick={() => removeFile(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* Upload button */}
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
            <Paperclip size={24} className="text-healthcare-lightText mb-2" />
            <p className="text-healthcare-lightText text-sm mb-1">
              {documentType === "prescription" ? "Upload Prescription" : documentType === "report" ? "Upload Medical Report" : "Upload Clinical Note"}
            </p>
            <p className="text-xs text-healthcare-lightText">
              PDF, JPG, PNG (Max: 10MB)
            </p>
            <input 
              type="file" 
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              multiple
            />
          </label>
        </div>

        {/* Notes Section */}
        <div className="bg-white rounded-xl p-4">
          <p className="font-medium mb-3 text-sm">Additional Notes</p>
          <textarea 
            className="w-full border border-healthcare-border rounded-lg p-3 text-sm min-h-[100px]"
            placeholder="Add notes for the patient here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        {/* Send to Pharmacy Toggle - Only show for prescriptions */}
        {documentType === "prescription" && (
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Send to Patient's Pharmacy</p>
                <p className="text-healthcare-lightText text-xs">
                  Directly send to preferred pharmacy
                </p>
              </div>
              <Switch
                checked={sendToPharmacy}
                onCheckedChange={setSendToPharmacy}
              />
            </div>
          </div>
        )}

        {/* Send Button */}
        <div className="pt-4">
          <button className="w-full ios-button bg-healthcare-primary text-white py-3 flex items-center justify-center">
            <Send size={18} className="mr-2" />
            Send to Patient
          </button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default DoctorUpload;
