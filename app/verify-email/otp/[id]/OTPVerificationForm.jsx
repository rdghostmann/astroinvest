"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { verifyOTP } from "@/lib/verifyOTP"; // Import the OTP verification server action

const OTPVerificationForm = ({ userId }) => {
  const { toast } = useToast();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus on the next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast({ variant: "destructive", title: "Invalid OTP", description: "Please enter a valid OTP." });
      return;
    }

    setLoading(true);

    try {
      const result = await verifyOTP({ userId, otp: otpValue });

      if (result.success) {
        setVerified(true);
        toast({ title: "OTP Verified Successfully!" });
      } else {
        toast({
          variant: "destructive",
          title: "OTP Verification Failed",
          description: result.message,
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while verifying the OTP.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {verified ? (
        <div>
          <h2 className="text-2xl font-bold text-green-600">OTP Verified!</h2>
          <p>Your account has been successfully verified.</p>
        </div>
      ) : (
        <div>
          <div className="flex justify-center space-x-2 mb-4">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e.target, index)}
                className="w-12 h-12 text-center border border-gray-300 rounded"
              />
            ))}
          </div>
          <button
            onClick={handleVerifyOtp}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      )}
    </div>
  );
};

export default OTPVerificationForm;