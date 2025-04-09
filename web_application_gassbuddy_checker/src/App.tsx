
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useBluetoothData } from "@/hooks/useBluetoothData";
import Index from "./pages/Index";
import Booking from "./pages/Booking";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import MQTTListener from "./components/MQTTListener";

const queryClient = new QueryClient();

const App = () => {
  const {
    data,
    isLow,
    isWarning,
    isGood,
    thresholds,
    connectBluetooth,
    disconnectBluetooth,
  } = useBluetoothData();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen px-4 pb-12 pt-4">
            <Header 
              status={data.status}
              onConnect={connectBluetooth}
              onDisconnect={disconnectBluetooth}
            />
            
            {/* <MQTTListener /> */}
            
            <div className="max-w-md mx-auto pt-8">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <Index 
                      data={data}
                      isLow={isLow}
                      thresholds={thresholds}
                      connectBluetooth={connectBluetooth}
                      disconnectBluetooth={disconnectBluetooth}
                    />
                  } 
                />
                <Route path="/booking" element={<Booking />} />
                <Route 
                  path="/settings" 
                  element={<Settings />} 
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
