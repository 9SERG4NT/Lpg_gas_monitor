
import { useState, useEffect } from "react";
import { Bluetooth, Home, Settings, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface HeaderProps {
  status: "disconnected" | "connecting" | "connected" | "error";
  onConnect: () => void;
  onDisconnect: () => void;
}

export default function Header({ status, onConnect, onDisconnect }: HeaderProps) {
  const location = useLocation();
  const [animateStatus, setAnimateStatus] = useState(false);

  // Trigger pulse animation when status changes
  useEffect(() => {
    setAnimateStatus(true);
    const timer = setTimeout(() => setAnimateStatus(false), 1000);
    return () => clearTimeout(timer);
  }, [status]);

  const statusColors = {
    disconnected: "bg-gray-400",
    connecting: "bg-yellow-400 animate-pulse-gentle",
    connected: "bg-green-500",
    error: "bg-red-500",
  };

  return (
    <header className="glass-card sticky top-4 z-10 mx-4 px-4 py-3 flex items-center justify-between animate-fade-in">
      <div className="flex items-center">
        <h1 className="text-lg font-medium mr-3">GasTracker</h1>
        
        <button
          onClick={status === "connected" ? onDisconnect : onConnect}
          className={cn(
            "relative p-2 rounded-full flex items-center transition-all",
            status === "connected" ? "text-green-500" : "text-gray-400",
            animateStatus && "animate-scale-in"
          )}
          aria-label={status === "connected" ? "Disconnect" : "Connect"}
        >
          {status === "connected" ? (
            <Bluetooth size={20} className="animate-blur-in" />
          ) : (
            <Bluetooth size={20} />
          )}
          <span className={cn("bluetooth-dot ml-1", statusColors[status])} />
        </button>
      </div>
      
      <nav className="flex space-x-1">
        <Link 
          to="/" 
          className={cn(
            "p-2 rounded-full transition-all hover:bg-secondary",
            location.pathname === "/" && "bg-secondary text-primary"
          )}
        >
          <Home size={20} />
        </Link>
        <Link 
          to="/settings" 
          className={cn(
            "p-2 rounded-full transition-all hover:bg-secondary",
            location.pathname === "/settings" && "bg-secondary text-primary"
          )}
        >
          <Settings size={20} />
        </Link>
      </nav>
    </header>
  );
}
