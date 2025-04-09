import { createContext, useContext, useEffect, useState } from "react";
import client from "@/components/MQTTClient";
import {toast} from "sonner";

interface MQTTData {
    pressure: number;
    pressurePercentage: number;
    temperature: number;
    gasLeakage: boolean;
    lastUpdated: Date | null;
}

const MOCK_DATA = {
    max: 15,
}

const MQTTDataContext = createContext<MQTTData | null>(null);

export const MQTTDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<MQTTData>({
      pressure: 0,
      pressurePercentage: 0,
      temperature: 25,
      gasLeakage: false,
      lastUpdated: null,
    });
  
    useEffect(() => {
      if (!client.connected) {
        client.on("connect", () => {
          console.log("MQTT Provider: Connected");
          client.subscribe("proteus_sensor_data");
        });
      }
  
      client.on("message", (topic, message) => {
        const msg = message.toString();
  
        try {
          const parsed = JSON.parse(msg); // assuming MQTT payload is JSON
  
          const pressure = parseFloat(parsed.pressure);
          const temperature = parseFloat(parsed.temperature);
          const gasLeakage = Boolean(parsed.gasLeakage);
  
          if (gasLeakage && !data.gasLeakage) {
            toast.error("Gas leakage detected! Please check your connections.");
          }
  
          const pressurePercentage = (pressure / MOCK_DATA.max) * 100;
  
          setData({
            pressure,
            pressurePercentage: parseFloat(pressurePercentage.toFixed(1)),
            temperature,
            gasLeakage,
            lastUpdated: new Date(),
          });
        } catch (err) {
          console.error("MQTT Provider: Failed to parse message", err);
        }
      });
  
      return () => {
        if (client.connected) client.end();
      };
    }, []);
  
    return (
      <MQTTDataContext.Provider value={data}>
        {children}
      </MQTTDataContext.Provider>
    );
  };
  
  export const useMQTTData = () => {
    const context = useContext(MQTTDataContext);
    if (!context) {
      throw new Error("useMQTTData must be used within MQTTDataProvider");
    }
    return context;
};