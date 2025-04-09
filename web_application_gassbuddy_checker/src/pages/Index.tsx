
import { useState, useEffect } from "react";
import GaugeMeter from "@/components/GaugeMeter";
import BluetoothManager from "@/components/BluetoothManager";
import BookingCard from "@/components/BookingCard";
import CylinderStatus from "@/components/CylinderStatus";
import { toast } from "sonner";

interface IndexProps {
  data: {
    pressure: number;
    pressurePercentage: number;
    temperature: number;
    gasLeakage: boolean;
    status: "disconnected" | "connecting" | "connected" | "error";
    lastUpdated: Date | null;
  };
  isLow: boolean;
  thresholds: {
    critical: number;
    warning: number;
    max: number;
  };
  connectBluetooth: () => void;
  disconnectBluetooth: () => void;
}

const Index = ({ 
  data, 
  isLow, 
  thresholds, 
  connectBluetooth, 
  disconnectBluetooth 
}: IndexProps) => {
  const [showReconnectReminder, setShowReconnectReminder] = useState(false);

  // Show reminder after inactivity
  useEffect(() => {
    if (data.status !== "connected") {
      const timer = setTimeout(() => {
        setShowReconnectReminder(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    } else {
      setShowReconnectReminder(false);
    }
  }, [data.status]);

  // When pressure is critically low, trigger notification
  useEffect(() => {
    if (isLow && data.status === "connected") {
      toast.warning("Gas pressure is low. Consider refilling soon.", {
        duration: 6000,
      });
    }
  }, [isLow, data.status]);

  // When gas leakage is detected, trigger notification
  useEffect(() => {
    if (data.gasLeakage && data.status === "connected") {
      toast.error("Gas leakage detected! Check your connections immediately.", {
        duration: 8000,
      });
    }
  }, [data.gasLeakage, data.status]);

  return (
    <>
      {/* Main gauge */}
      <div className={data.status === "connected" ? "animate-fade-in" : "opacity-40"}>
        <GaugeMeter
          value={data.pressure}
          percentage={data.pressurePercentage}
          max={thresholds.max}
          threshold={{
            critical: thresholds.critical,
            warning: thresholds.warning,
          }}
        />
      </div>
      
      {/* Cylinder status section with temperature and gas leakage */}
      <CylinderStatus
        temperature={data.temperature}
        gasLeakage={data.gasLeakage}
        connected={data.status === "connected"}
        pressurePercentage={data.pressurePercentage}
      />
      
      {/* Status section */}
      <BluetoothManager
        status={data.status}
        onConnect={connectBluetooth}
        onDisconnect={disconnectBluetooth}
        lastUpdated={data.lastUpdated}
      />
      
      {/* Booking section */}
      {data.status === "connected" && (
        <BookingCard 
          isLowPressure={isLow}
          currentPressure={data.pressure}
          triggerPressure={thresholds.critical}
        />
      )}
      
      {/* Reconnect reminder */}
      {showReconnectReminder && data.status === "disconnected" && (
        <div className="mt-6 text-center animate-fade-in">
          <p className="text-sm text-muted-foreground">
            Connect to your LPG sensor to monitor gas levels
          </p>
          <button 
            onClick={connectBluetooth}
            className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
          >
            Connect Now
          </button>
        </div>
      )}
    </>
  );
};

export default Index;
