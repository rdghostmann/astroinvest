"use server";

import bcrypt from "bcrypt";
import { connectToDB } from "@/lib/connectDB";
import Otp from "@/models/Otp";
import User from "@/models/User"; // Import the User model

// Server action for verifying OTP
export async function verifyOTP({ userId, email, otp }) {
  try {
    // Connect to the MongoDB database
    await connectToDB();

    // Validate input: Ensure email and OTP are provided
    if (!userId || !email || !otp ) {
      return { success: false, message: "UserId, Email and OTP are required" };
    }

    // Find OTP record by email
    const otpRecord = await Otp.findOne({ userId });

    // Check if OTP record exists
    if (!otpRecord) {
      return { success: false, message: "OTP not found or expired" };
    }

    // Compare provided OTP with the hashed OTP in the database
    const isMatch = await bcrypt.compare(otp, otpRecord.otp);

    // If OTP does not match, return an error
    if (!isMatch) {
      return { success: false, message: "Invalid OTP" };
    }

    // Update the user's status to active
    await User.updateOne({ email }, { status: "active", isVerified: true });

    // Delete the OTP record after successful verification
    await Otp.deleteOne({ email });

    // Return a success response
    return { success: true, message: "OTP verified successfully" };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { success: false, message: "Failed to verify OTP. Please try again." };
  }
}