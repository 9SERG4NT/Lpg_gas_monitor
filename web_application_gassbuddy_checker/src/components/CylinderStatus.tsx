
import { useState, useEffect } from "react";
import { Thermometer, AlertTriangle, Fuel } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface CylinderStatusProps {
  temperature: number;
  gasLeakage: boolean;
  connected: boolean;
  pressurePercentage?: number; // Add pressure percentage prop
}

export default function CylinderStatus({
  temperature,
  gasLeakage,
  connected,
  pressurePercentage = 0
}: CylinderStatusProps) {
  const [tempColor, setTempColor] = useState("text-blue-500");
  const [tempBg, setTempBg] = useState("bg-blue-100");
  const [tempProgress, setTempProgress] = useState(0);
  
  // Update temperature color based on value
  useEffect(() => {
    // Temperature thresholds
    const cold = 25;
    const normal = 35;
    const hot = 45;
    
    // Calculate progress percentage (0-100) based on temperature range (18-60°C)
    const progress = Math.max(0, Math.min(100, ((temperature - 18) / (60 - 18)) * 100));
    setTempProgress(progress);
    
    if (temperature <= cold) {
      setTempColor("text-blue-500");
      setTempBg("bg-blue-100");
    } else if (temperature <= normal) {
      setTempColor("text-green-500");
      setTempBg("bg-green-100");
    } else if (temperature <= hot) {
      setTempColor("text-amber-500");
      setTempBg("bg-amber-100");
    } else {
      setTempColor("text-red-500");
      setTempBg("bg-red-100");
    }
  }, [temperature]);

  return (
    <div className={cn(
      "glass-card p-5 mt-4 space-y-4 animate-fade-in", 
      !connected && "opacity-40"
    )}>
      <h3 className="font-medium text-sm text-center uppercase tracking-wider text-muted-foreground mb-2">
        Cylinder Status
      </h3>
      
      {/* Low pressure alert */}
      {pressurePercentage < 15 && connected && (
        <Alert variant="destructive" className="mb-4 bg-red-50 text-red-800 border-red-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Low Gas Pressure</AlertTitle>
          <AlertDescription>
            Gas level is below 15%. Please refill soon to avoid interruption.
          </AlertDescription>
        </Alert>
      )}
      
      {/* Temperature reading */}
      <div className="flex items-center">
        <div className={cn("p-3 rounded-full mr-4", tempBg)}>
          <Thermometer className={tempColor} size={24} />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between mb-1">
            <h4 className="font-medium">Temperature</h4>
            <span className={cn("font-medium", tempColor)}>{temperature}°C</span>
          </div>
          <Progress value={tempProgress} className="h-2" />
        </div>
      </div>
      
      {/* Gas leakage status */}
      <div className={cn(
        "flex items-center p-3 rounded-lg border", 
        gasLeakage ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
      )}>
        <AlertTriangle 
          className={cn(
            "mr-3", 
            gasLeakage ? "text-red-500" : "text-green-500"
          )} 
          size={20} 
        />
        <div className="flex-1">
          <h4 className="font-medium">Gas Leakage</h4>
          <p className="text-sm text-muted-foreground">
            {gasLeakage 
              ? "Leakage detected! Check connections." 
              : "No leakage detected"
            }
          </p>
        </div>
      </div>
    </div>
  );
}
