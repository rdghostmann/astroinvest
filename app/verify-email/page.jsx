"use client";

import React, { useEffect, useState, useRef } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleX, SquareCheckBig } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { verifyEmail } from "@/lib/verifyEmail";
import Link from "next/link";

const VerifyEmail = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

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


  useEffect(() => {
    if (verified) {
      // Redirect to /login after 8 seconds
      const timer = setTimeout(() => {
        router.push("/login");
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [verified, router]);

  const verifyEmailHandler = async () => {

    if (!verifyToken || !id) {
      toast({ variant: "destructive", title: "Invalid URL" });
      setError(true);
      return;
    }

    setLoading(true);

    try {
      const result = await verifyEmail({ verificationToken: verifyToken, userId: id });

      if (result.success) {
        setLoading(false);
        setVerified(true);
        toast({ title: result.message });
      } else {
        setError(true);
        setLoading(false);
        toast({ variant: "destructive", title: result.message, description: "Failed to verify email" });
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setLoading(false);
      toast({ variant: "destructive", title: "Error Verifying Email", description: "Failed to run verify email" });
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
            <Link className="bg-indigo-900 rounded-md p-4 text-white" href="/login">Proceed to Login</Link>
          </div>
        )}

        {error && (
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