// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { CircleX, SquareCheckBig } from "lucide-react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useToast } from "@/hooks/use-toast";
// import { verifyOTP } from "@/lib/verifyOTP"; // Import the verifyOTP server action
// import Link from "next/link";

// const VerifyEmail = () => {
//   const { toast } = useToast();
//   const router = useRouter();

//   const [loading, setLoading] = useState(false);
//   const [verified, setVerified] = useState(false);
//   const [error, setError] = useState(false);
//   const [otp, setOtp] = useState(new Array(6).fill("")); // State for OTP input
//   const [contactInfo, setContactInfo] = useState(""); // State for contact info
//   const [deliveryMethod, setDeliveryMethod] = useState("email"); // State for delivery method
//   const [isOtpSent, setIsOtpSent] = useState(false); // State to track if OTP is sent

//   const searchParams = useSearchParams();
//   const verifyToken = searchParams.get("verifyToken");
//   const id = searchParams.get("id");
//   const email = searchParams.get("email");
//   const phoneNumber = searchParams.get("phoneNumber");

//   const initialized = useRef(false);

//   useEffect(() => {
//     if (!initialized.current) {
//       initialized.current = true;
//       verifyEmailHandler();
//     }
//   }, []);

//   useEffect(() => {
//     if (email) {
//       setContactInfo(email);
//       setDeliveryMethod("email");
//     } else if (phoneNumber) {
//       setContactInfo(phoneNumber);
//       setDeliveryMethod("sms");
//     }
//   }, [email, phoneNumber]);

//   const verifyEmailHandler = async () => {
//     if (!verifyToken || !id) {
//       toast({ variant: "destructive", title: "Invalid URL" });
//       setError(true);
//       return;
//     }
//     setLoading(true);

//     // Add your email verification logic here

//     setLoading(false);
//   };

//   const handleChange = (element, index) => {
//     if (isNaN(element.value)) return false;
//     const newOtp = [...otp.map((d, idx) => (idx === index ? element.value : d))];
//     setOtp(newOtp);

//     // Focus on next input
//     if (element.nextSibling) {
//       element.nextSibling.focus();
//     }

//     // Automatically verify OTP when all digits are entered
//     if (newOtp.join("").length === 6) {
//       handleVerifyOtp(newOtp.join(""));
//     }
//   };

//   const handleVerifyOtp = async (otpValue) => {
//     if (otpValue.length !== 6) {
//       toast({ variant: "destructive", title: "OTP is required" });
//       return;
//     }

//     setLoading(true);

//     try {
//       const result = await verifyOTP({ userId: id, otp: otpValue }); // Pass userId or email/phone as needed

//       if (result.success) {
//         setVerified(true);
//         toast({ title: result.message });
//       } else {
//         setError(true);
//         toast({
//           variant: "destructive",
//           title: "OTP Verification Failed",
//           description: result.message,
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       setError(true);
//       toast({
//         variant: "destructive",
//         title: "Error Verifying OTP",
//         description: "Failed to verify OTP. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     if (!contactInfo) {
//       toast({ variant: "destructive", title: "Contact information is required" });
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch("/api/auth/generateOTP", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: deliveryMethod === "email" ? contactInfo : undefined,
//           phoneNumber: deliveryMethod === "sms" ? contactInfo : undefined,
//           deliveryMethod,
//         }),
//       });

//       const result = await res.json();
//       if (res.status === 200) {
//         setIsOtpSent(true);
//         toast({ title: "OTP sent successfully" });
//       } else {
//         toast({ variant: "destructive", title: "Failed to send OTP", description: result.message });
//       }
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       toast({ variant: "destructive", title: "Error sending OTP", description: "Failed to send OTP. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="font-semibold"> Verifying your account. Please wait...</p>
//       </div>
//     );

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="w-full flex items-center justify-center max-w-md mx-auto">
//         {verified ? (
//           <div className="max-w-md mx-auto flex items-center justify-center flex-col space-y-2">
//             <Alert variant="default" className="mb-5">
//               <SquareCheckBig color="green" />
//               <AlertTitle>Account Verified!</AlertTitle>
//               <AlertDescription>
//                 Your account has been verified successfully.
//               </AlertDescription>
//             </Alert>
//           </div>
//         ) : error ? (
//           <Alert variant="destructive" className="mb-5">
//             <CircleX color="red" />
//             <AlertTitle>Account Verification Failed!</AlertTitle>
//             <AlertDescription>
//               Your verification token is invalid or expired.
//             </AlertDescription>
//           </Alert>
//         ) : (
//           <div className="text-center">
//             <p className="font-semibold">Please enter the OTP sent to your {deliveryMethod}.</p>
//             <div className="flex justify-center space-x-2">
//               {otp.map((data, index) => (
//                 <input
//                   key={index}
//                   type="text"
//                   maxLength="1"
//                   value={data}
//                   onChange={(e) => handleChange(e.target, index)}
//                   onFocus={(e) => e.target.select()}
//                   className="w-12 p-3 border border-gray-300 rounded text-center"
//                 />
//               ))}
//             </div>
//             <div className="mt-4">
//               <p className="font-semibold">Didn't receive the OTP?</p>
//               <button
//                 onClick={handleResendOtp}
//                 className="w-full bg-purple-800 text-white p-3 rounded hover:bg-blue-600"
//               >
//                 Resend OTP
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VerifyEmail;