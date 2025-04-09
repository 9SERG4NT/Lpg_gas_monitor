
import { useEffect, useState } from "react";
import { Bluetooth, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BluetoothManagerProps {
  status: "disconnected" | "connecting" | "connected" | "error";
  onConnect: () => void;
  onDisconnect: () => void;
  lastUpdated: Date | null;
}

export default function BluetoothManager({
  status,
  onConnect,
  onDisconnect,
  lastUpdated,
}: BluetoothManagerProps) {
  const [timeAgo, setTimeAgo] = useState<string>("");

  // Update time ago string
  useEffect(() => {
    if (!lastUpdated) return;

    const updateTimeAgo = () => {
      const now = new Date();
      const diffMs = now.getTime() - lastUpdated.getTime();
      const diffSeconds = Math.floor(diffMs / 1000);
      
      if (diffSeconds < 60) {
        setTimeAgo(`${diffSeconds} seconds ago`);
      } else if (diffSeconds < 3600) {
        setTimeAgo(`${Math.floor(diffSeconds / 60)} minutes ago`);
      } else {
        setTimeAgo(`${Math.floor(diffSeconds / 3600)} hours ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 10000);
    
    return () => clearInterval(interval);
  }, [lastUpdated]);

  // Status configurations
  const statusConfig = {
    disconnected: {
      icon: Bluetooth,
      color: "text-gray-400",
      bgColor: "bg-gray-100",
      text: "Disconnected",
      action: "Connect",
      onClick: onConnect,
    },
    connecting: {
      icon: RefreshCw,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      text: "Connecting...",
      action: "Cancel",
      onClick: onDisconnect,
      iconAnimation: "animate-spin",
    },
    connected: {
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-50",
      text: "Connected",
      action: "Disconnect",
      onClick: onDisconnect,
    },
    error: {
      icon: AlertCircle,
      color: "text-red-500",
      bgColor: "bg-red-50",
      text: "Connection Failed",
      action: "Try Again",
      onClick: onConnect,
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="glass-card p-5 mt-4 animate-fade-in">
      <div className="flex items-center">
        <div className={cn("p-3 rounded-full mr-4", config.bgColor)}>
          <Icon 
            className={cn(
              config.color, 
              status === "connecting" ? "animate-spin" : ""
            )} 
            size={24} 
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium">{config.text}</h3>
          {lastUpdated && status === "connected" && (
            <p className="text-sm text-muted-foreground">Last updated: {timeAgo}</p>
          )}
        </div>
        
        <button
          onClick={config.onClick}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
            status === "connected" 
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" 
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {config.action}
        </button>
      </div>
    </div>
  );
}
