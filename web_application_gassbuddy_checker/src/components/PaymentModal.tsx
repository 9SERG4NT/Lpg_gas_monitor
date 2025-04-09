
import { useState } from "react";
import { X, CreditCard, Wallet, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentModalProps {
  amount: number;
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function PaymentModal({ 
  amount, 
  isOpen, 
  onClose,
  onComplete 
}: PaymentModalProps) {
  const [paymentOption, setPaymentOption] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handlePayment = () => {
    if (!paymentOption) return;
    
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
      
      // Simulate closing after completion
      setTimeout(() => {
        onComplete();
      }, 1500);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end justify-center sm:items-center sm:p-4 animate-fade-in">
      <div 
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md sm:max-h-[90vh] max-h-[85vh] overflow-auto shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b sticky top-0 bg-white z-10 flex items-center justify-between">
          <h2 className="text-lg font-medium">Payment</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            disabled={processing}
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {completed ? (
            <div className="text-center py-8 animate-scale-in">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="text-green-500" size={32} />
              </div>
              <h3 className="text-xl font-medium mb-2">Payment Successful</h3>
              <p className="text-gray-600 mb-6">Your LPG cylinder has been booked successfully.</p>
              <button 
                className="btn-primary w-full"
                onClick={onComplete}
              >
                Back to Home
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-1">Order Summary</h3>
                <p className="text-gray-600">14.2 kg Domestic LPG Cylinder</p>
                
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Cylinder Price</span>
                    <span>₹820.00</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>₹130.00</span>
                  </div>
                  <div className="border-t my-2 pt-2 flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Payment Method</h3>
                
                <div className="space-y-3">
                  <div 
                    className={cn(
                      "payment-option",
                      paymentOption === "gpay" && "border-primary bg-blue-50"
                    )}
                    onClick={() => setPaymentOption("gpay")}
                  >
                    <div className="flex items-center">
                      <div className="bg-white p-2 rounded-lg mr-3">
                        <Wallet size={24} className="text-blue-500" />
                      </div>
                      <span className="font-medium">Google Pay</span>
                    </div>
                    {paymentOption === "gpay" && (
                      <CheckCircle2 size={20} className="text-primary" />
                    )}
                  </div>
                  
                  <div 
                    className={cn(
                      "payment-option",
                      paymentOption === "card" && "border-primary bg-blue-50"
                    )}
                    onClick={() => setPaymentOption("card")}
                  >
                    <div className="flex items-center">
                      <div className="bg-white p-2 rounded-lg mr-3">
                        <CreditCard size={24} className="text-gray-700" />
                      </div>
                      <span className="font-medium">Credit/Debit Card</span>
                    </div>
                    {paymentOption === "card" && (
                      <CheckCircle2 size={20} className="text-primary" />
                    )}
                  </div>
                </div>
              </div>
              
              <button 
                className={cn(
                  "btn-primary w-full",
                  processing && "opacity-80 cursor-not-allowed"
                )}
                disabled={!paymentOption || processing}
                onClick={handlePayment}
              >
                {processing ? (
                  <span className="flex items-center justify-center">
                    Processing
                    <span className="ml-2 h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Pay ₹{amount.toFixed(2)}
                    <ArrowRight size={18} className="ml-2" />
                  </span>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
