
import React from "react";
import { Home, User, Calendar, FileText, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  rightAction?: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  title,
  showBackButton = false,
  rightAction,
}) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-healthcare-background overflow-hidden">
      {/* Header/Nav Bar - iOS Style */}
      <header className="flex items-center justify-between px-4 h-14 bg-white border-b border-healthcare-border z-10">
        {showBackButton ? (
          <button className="text-healthcare-primary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : (
          <div className="w-6"></div>
        )}
        
        <h1 className="text-lg font-semibold">{title || "HealthWise Connect"}</h1>
        
        {rightAction || <div className="w-6"></div>}
      </header>

      {/* Main Content Area with iOS-style scrolling */}
      <main className="flex-1 overflow-y-auto pb-20" style={{ WebkitOverflowScrolling: 'touch' }}>
        {children}
      </main>

      {/* Tab Bar - iOS Style */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-healthcare-border flex items-center justify-around px-2 max-w-md mx-auto">
        <Link 
          to="/"
          className={cn(
            "flex flex-col items-center justify-center w-16 h-full", 
            path === "/" ? "text-healthcare-primary" : "text-gray-400"
          )}
        >
          <Home size={22} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link 
          to="/appointments"
          className={cn(
            "flex flex-col items-center justify-center w-16 h-full", 
            path.includes("/appointments") ? "text-healthcare-primary" : "text-gray-400"
          )}
        >
          <Calendar size={22} />
          <span className="text-xs mt-1">Appointments</span>
        </Link>
        
        <Link 
          to="/prescriptions"
          className={cn(
            "flex flex-col items-center justify-center w-16 h-full", 
            path.includes("/prescriptions") ? "text-healthcare-primary" : "text-gray-400"
          )}
        >
          <FileText size={22} />
          <span className="text-xs mt-1">Prescriptions</span>
        </Link>
        
        <Link 
          to="/profile"
          className={cn(
            "flex flex-col items-center justify-center w-16 h-full", 
            path.includes("/profile") ? "text-healthcare-primary" : "text-gray-400"
          )}
        >
          <User size={22} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
        
        <Link 
          to="/more"
          className={cn(
            "flex flex-col items-center justify-center w-16 h-full", 
            path.includes("/more") ? "text-healthcare-primary" : "text-gray-400"
          )}
        >
          <Menu size={22} />
          <span className="text-xs mt-1">More</span>
        </Link>
      </nav>
    </div>
  );
};

export default MobileLayout;
