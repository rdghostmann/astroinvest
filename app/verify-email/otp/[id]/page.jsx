import User from "@/models/User"; // Import your User model
import { connectToDB } from "@/lib/connectDB"; // Import your database connection logic
import OTPVerificationForm from "./OTPVerificationForm";

export default async function VerifyOtpPage({ params }) {

  const { id } = params;

  // Connect to the database
  await connectToDB();

  // Find the user by ID
  const user = await User.findById(id);

  const userID = user._id.toString();

  if (!user) {
    // If the user is not found
    return (
      <div>
        <h1>User not found</h1>
      </div>
    )
  }

  // Pass user data to the client-side OTP form
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>
        <p className="text-gray-600 mb-4">
          Please enter the OTP sent to your {user.email ? "email" : "phone number"}.
        </p>
        <OTPVerificationForm userId={userID}  />
      </div>
    </div>
  );
}