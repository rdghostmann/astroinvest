"use client";

import React, { useEffect, useState, useRef } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleX, SquareCheckBig } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { verifyOTP } from "@/lib/verifyOTP"; // Import the verifyOTP server action
import Link from "next/link";

const VerifyEmail = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [otp, setOtp] = useState(""); // State for OTP input
  const [isOtpSent, setIsOtpSent] = useState(false); // State to track OTP sent status

  const searchParams = useSearchParams();
  const verifyToken = searchParams.get("verifyToken");
  const id = searchParams.get("id");

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      verifyEmailHandler();
    }
  }, []);


  const verifyEmailHandler = async () => {
    if (!verifyToken || !id) {
      toast({ variant: "destructive", title: "Invalid URL" });
      setError(true);
      return;
    }
    setLoading(true);

  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast({ variant: "destructive", title: "OTP is required" });
      return;
    }
  
    setLoading(true);
  
    try {
      const result = await verifyOTP({ userId: id, otp }); // Pass userId or email/phone as needed
  
      if (result.success) {
        setVerified(true);
        toast({ title: result.message });
      } else {
        setError(true);
        toast({
          variant: "destructive",
          title: "OTP Verification Failed",
          description: result.message,
        });
      }
    } catch (error) {
      console.error(error);
      setError(true);
      toast({
        variant: "destructive",
        title: "Error Verifying OTP",
        description: "Failed to verify OTP. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="font-semibold"> Verifying your Email address. Please wait...</p>
      </div>
    );

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full flex items-center justify-center max-w-md mx-auto">
        {verified && (
          <div className="max-w-md mx-auto flex items-center justify-center flex-col space-y-2">
            <Alert variant="default" className="mb-5">
              <SquareCheckBig color="green" />
              <AlertTitle>Email Verified!</AlertTitle>
              <AlertDescription>
                Your email has been verified successfully.
              </AlertDescription>
            </Alert>
            <div>
              <p className="text-center font-semibold">
                Enter the 6-digit OTP sent to your email.
              </p>
              <input
                type="text"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded mb-4 text-center"
                placeholder="Enter OTP"
              />
              <button
                onClick={handleVerifyOtp}
                className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
              >
                Verify OTP
              </button>
            </div>
          </div>)}
   
          { error && (
            <Alert variant="destructive" className="mb-5">
              <CircleX color="red" />
              <AlertTitle>Email Verification Failed!</AlertTitle>
              <AlertDescription>
                Your verification token is invalid or expired.
              </AlertDescription>
            </Alert>
          )}
        


      </div>
    </div>
  );
};

export default VerifyEmail;