
import { useState } from "react";
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  ChevronRight,
  MapPin,
  Home,
  CircleCheck
} from "lucide-react";
import { Link } from "react-router-dom";
import PaymentModal from "@/components/PaymentModal";
import { toast } from "sonner";

const Booking = () => {
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  
  // Delivery date options (next 5 days)
  const deliveryDates = Array.from({ length: 5 }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 1);
    return {
      id: index,
      day: date.toLocaleDateString('en-IN', { weekday: 'short' }),
      date: date.getDate(),
      month: date.toLocaleDateString('en-IN', { month: 'short' }),
      full: date.toLocaleDateString('en-IN', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
      }),
    };
  });
  
  // Time slots
  const timeSlots = [
    "09:00 AM - 12:00 PM",
    "12:00 PM - 03:00 PM",
    "03:00 PM - 06:00 PM",
  ];
  
  const proceedToPayment = () => {
    if (!selectedDate && !selectedTime && bookingStep === 2) {
      toast.error("Please select delivery date and time");
      return;
    }
    
    setPaymentModalOpen(true);
  };
  
  const completeBooking = () => {
    setPaymentModalOpen(false);
    toast.success("Booking confirmed! You will receive updates via SMS.");
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="glass-card sticky top-4 z-10 mx-4 px-4 py-3 flex items-center justify-between animate-fade-in">
        <div className="flex items-center">
          <Link to="/" className="p-2 mr-2 rounded-full hover:bg-gray-100">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-lg font-medium">Book LPG Refill</h1>
        </div>
        
        <div className="text-sm font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
          Step {bookingStep}/2
        </div>
      </header>
      
      <div className="max-w-md mx-auto px-4 pt-8">
        {bookingStep === 1 ? (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Cylinder Details</h2>
            
            <div className="glass-card p-5 mb-6">
              <h3 className="font-medium mb-4">Select Cylinder Type</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">14.2 kg Domestic LPG</p>
                  <p className="text-sm text-gray-600">Standard household cylinder</p>
                </div>
                <CircleCheck className="text-primary" size={20} />
              </div>
              
              <div className="border rounded-xl p-4 mb-3 opacity-60">
                <p className="font-medium">5 kg Free Trade LPG</p>
                <p className="text-sm text-gray-600">Portable cylinder</p>
              </div>
              
              <div className="border rounded-xl p-4 opacity-60">
                <p className="font-medium">19 kg Commercial LPG</p>
                <p className="text-sm text-gray-600">For business use</p>
              </div>
            </div>
            
            <div className="glass-card p-5">
              <h3 className="font-medium mb-4">Delivery Address</h3>
              
              <div className="bg-gray-50 border rounded-xl p-4 flex items-start mb-4">
                <div className="p-2 bg-white rounded-lg mr-3 mt-1">
                  <Home size={18} className="text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">Home</p>
                  <p className="text-sm text-gray-600">
                    123 Green Valley Apts, Sector 15, Navi Mumbai, Maharashtra 400614
                  </p>
                </div>
              </div>
              
              <button className="flex items-center text-primary text-sm font-medium">
                <MapPin size={16} className="mr-1" />
                Change address
              </button>
            </div>
            
            <button 
              className="btn-primary w-full mt-6"
              onClick={() => setBookingStep(2)}
            >
              Continue to Scheduling
              <ChevronRight size={18} className="ml-1 inline" />
            </button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Schedule Delivery</h2>
            
            <div className="glass-card p-5 mb-6">
              <div className="flex items-center mb-3">
                <Calendar size={18} className="text-gray-600 mr-2" />
                <h3 className="font-medium">Select Delivery Date</h3>
              </div>
              
              <div className="grid grid-cols-5 gap-2 mt-4">
                {deliveryDates.map((date) => (
                  <div
                    key={date.id}
                    className={`text-center p-2 rounded-xl cursor-pointer border transition-all ${
                      selectedDate === date.id
                        ? "border-primary bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedDate(date.id)}
                  >
                    <div className="text-xs font-medium">{date.day}</div>
                    <div className="text-lg font-medium">{date.date}</div>
                    <div className="text-xs">{date.month}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-card p-5 mb-6">
              <div className="flex items-center mb-3">
                <Clock size={18} className="text-gray-600 mr-2" />
                <h3 className="font-medium">Select Time Slot</h3>
              </div>
              
              <div className="space-y-3 mt-4">
                {timeSlots.map((time) => (
                  <div
                    key={time}
                    className={`p-3 rounded-xl cursor-pointer border transition-all ${
                      selectedTime === time
                        ? "border-primary bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    <div className="font-medium">{time}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass-card p-5 mb-6">
              <h3 className="font-medium mb-3">Order Summary</h3>
              
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-gray-600">Cylinder Price</span>
                <span>₹820.00</span>
              </div>
              <div className="flex justify-between mb-3 text-sm">
                <span className="text-gray-600">Delivery Fee</span>
                <span>₹130.00</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-medium">
                <span>Total</span>
                <span>₹950.00</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                className="btn-secondary flex-1"
                onClick={() => setBookingStep(1)}
              >
                <ChevronLeft size={18} className="mr-1 inline" />
                Back
              </button>
              
              <button
                className="btn-primary flex-1"
                onClick={proceedToPayment}
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        )}
      </div>
      
      <PaymentModal
        amount={950}
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onComplete={completeBooking}
      />
    </div>
  );
};

export default Booking;
