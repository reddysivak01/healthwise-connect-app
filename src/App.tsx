
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Appointments from "./pages/Appointments";
import DoctorsList from "./pages/DoctorsList";
import DoctorUpload from "./pages/DoctorUpload";
import Prescriptions from "./pages/Prescriptions";
import PrescriptionDetail from "./pages/PrescriptionDetail";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointments/new" element={<DoctorsList />} />
          <Route path="/appointments/new/:doctorId" element={<DoctorsList />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
          <Route path="/prescriptions/:id" element={<PrescriptionDetail />} />
          <Route path="/doctor-portal" element={<DoctorUpload />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
