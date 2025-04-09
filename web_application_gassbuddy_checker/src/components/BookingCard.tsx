
import { useState } from "react";
import { Fuel, ChevronRight, Calendar, Clock, TruckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface BookingCardProps {
  isLowPressure: boolean;
  currentPressure: number;
  triggerPressure: number;
}

export default function BookingCard({ 
  isLowPressure, 
  currentPressure,
  triggerPressure
}: BookingCardProps) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  // Estimated days remaining calculation
  const estimateDaysRemaining = () => {
    if (currentPressure <= triggerPressure) return 0;
    
    // Assume average daily consumption of 0.3 kPa
    const dailyConsumption = 0.3;
    const remaining = currentPressure - triggerPressure;
    const days = Math.ceil(remaining / dailyConsumption);
    
    return days;
  };

  const daysRemaining = estimateDaysRemaining();
  
  // Delivery date (3 days from now for demo)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  return (
    <div 
      className={cn(
        "glass-card p-5 mt-4 transition-all duration-500 ease-out overflow-hidden",
        isLowPressure ? "bg-red-50/70 border-red-200" : "",
        expanded ? "max-h-[500px]" : "max-h-24"
      )}
    >
      <div 
        className="flex items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className={cn(
          "p-3 rounded-full mr-4",
          isLowPressure ? "bg-red-100" : "bg-blue-50"
        )}>
          <Fuel 
            className={cn(
              isLowPressure ? "text-red-500" : "text-blue-500"
            )} 
            size={24} 
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium">
            {isLowPressure 
              ? "Low Gas Pressure" 
              : `${daysRemaining} days remaining`
            }
          </h3>
          <p className="text-sm text-muted-foreground">
            {isLowPressure 
              ? "Book a refill now" 
              : "Based on your usage pattern"
            }
          </p>
        </div>
        
        <ChevronRight 
          size={20} 
          className={cn(
            "text-gray-400 transition-transform",
            expanded ? "rotate-90" : ""
          )} 
        />
      </div>
      
      {/* Expanded content */}
      <div className={cn(
        "pt-5 mt-4 border-t transition-opacity duration-300",
        expanded ? "opacity-100" : "opacity-0"
      )}>
        {isLowPressure ? (
          <div className="space-y-4">
            <div className="bg-white/60 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Calendar size={16} className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">Estimated delivery</span>
              </div>
              <p className="font-medium">{formattedDeliveryDate}</p>
            </div>
            
            <div className="bg-white/60 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Clock size={16} className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">Delivery time</span>
              </div>
              <p className="font-medium">Between 09:00 AM - 12:00 PM</p>
            </div>
            
            <div className="bg-white/60 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <TruckIcon size={16} className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">Cylinder type</span>
              </div>
              <p className="font-medium">14.2 kg Domestic LPG</p>
            </div>
            
            <button 
              className="btn-primary w-full mt-4"
              onClick={() => navigate("/booking")}
            >
              Book Now ₹950.00
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white/60 rounded-xl p-4">
              <h4 className="font-medium mb-2">Usage Statistics</h4>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Average daily usage:</span>
                <span className="font-medium">0.3 kPa</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Next refill predicted:</span>
                <span className="font-medium">In {daysRemaining} days</span>
              </div>
            </div>
            
            <button 
              className="btn-secondary w-full"
              onClick={() => navigate("/booking")}
            >
              Schedule Refill
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
