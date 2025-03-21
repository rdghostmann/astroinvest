"use client";

import React, { useEffect, useState, useRef } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleX, SquareCheckBig } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { verifyEmail } from "@/lib/verifyEmail";

const VerifyEmail = () => {
  const { toast } = useToast();

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
        toast({ variant: "destructive", title: result.message });
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setLoading(false);
      toast({ variant: "destructive", title: "Something went wrong" });
    }
  };

  if (loading)
    return (
      <h1 className="flex justify-center items-center h-screen">
        Verifying your Email address. Please wait...
      </h1>
    );

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        {verified && (
          <Alert variant="default" className="mb-5">
            <SquareCheckBig color="green" />
            <AlertTitle>Email Verified!</AlertTitle>
            <AlertDescription>
              Your email has been verified successfully.
            </AlertDescription>
          </Alert>
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