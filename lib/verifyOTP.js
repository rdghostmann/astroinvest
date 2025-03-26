"use server";

import bcrypt from "bcrypt";
import { connectToDB } from "@/lib/connectDB";
import Otp from "@/models/Otp";
import User from "@/models/User"; // Import the User model

// Server action for verifying OTP
export async function verifyOTP({ otp, userId }) {
  try {
    // Connect to the MongoDB database
    await connectToDB();

    // Validate input: Ensure OTP and userId are provided
    if (!otp || !userId) {
      return { success: false, message: "OTP and user ID are required" };
    }

    // Find OTP record by user ID
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
    await User.updateOne({ _id: userId }, { status: "active" });

    // Delete the OTP record after successful verification
    await Otp.deleteOne({ _id: otpRecord._id });

    // Return a success response
    return { success: true, message: "OTP verified successfully" };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { success: false, message: "Failed to verify OTP. Please try again." };
  }
}