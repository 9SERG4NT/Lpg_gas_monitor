
import { useState } from "react";
import { 
  Bell, 
  Phone, 
  Info, 
  HelpCircle,
  Bluetooth,
  Settings as SettingsIcon,
  LogOut,
  ChevronRight,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [autoBookingEnabled, setAutoBookingEnabled] = useState(false);
  
  const resetSensor = () => {
    toast.info("Sensor reset initiated. Please reconnect your device.");
  };

  return (
    <>
      <div className="glass-card p-5 mb-6 animate-fade-in">
        <h2 className="text-lg font-semibold mb-4">Notifications</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg mr-3">
                <Bell size={18} className="text-blue-500" />
              </div>
              <div>
                <p className="font-medium">Low Gas Alerts</p>
                <p className="text-sm text-gray-600">Get notified when gas is low</p>
              </div>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notificationEnabled}
                onChange={() => setNotificationEnabled(!notificationEnabled)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg mr-3">
                <Phone size={18} className="text-blue-500" />
              </div>
              <div>
                <p className="font-medium">Auto-Booking</p>
                <p className="text-sm text-gray-600">Book refill automatically when low</p>
              </div>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={autoBookingEnabled}
                onChange={() => setAutoBookingEnabled(!autoBookingEnabled)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-5 mb-6 animate-fade-in" style={{animationDelay: "0.1s"}}>
        <h2 className="text-lg font-semibold mb-4">Device Settings</h2>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg mr-3">
                <Bluetooth size={18} className="text-blue-500" />
              </div>
              <span className="font-medium">Bluetooth Settings</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
          
          <div 
            className="flex items-center justify-between p-3 border rounded-xl cursor-pointer hover:bg-gray-50"
            onClick={resetSensor}
          >
            <div className="flex items-center">
              <div className="p-2 bg-red-50 rounded-lg mr-3">
                <AlertTriangle size={18} className="text-red-500" />
              </div>
              <span className="font-medium">Reset Sensor</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="glass-card p-5 mb-6 animate-fade-in" style={{animationDelay: "0.2s"}}>
        <h2 className="text-lg font-semibold mb-4">Support</h2>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
            <div className="flex items-center">
              <div className="p-2 bg-purple-50 rounded-lg mr-3">
                <HelpCircle size={18} className="text-purple-500" />
              </div>
              <span className="font-medium">Help & Support</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
          
          <div className="flex items-center justify-between p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-lg mr-3">
                <Info size={18} className="text-green-500" />
              </div>
              <span className="font-medium">About</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
        </div>
      </div>
      
      <button className="flex items-center justify-center w-full p-3 mt-4 border rounded-xl text-red-500 font-medium hover:bg-red-50">
        <LogOut size={18} className="mr-2" />
        Reset App Data
      </button>
    </>
  );
};

export default Settings;
