"use server";

import bcrypt from "bcrypt";
import { connectToDB } from "@/lib/connectDB";
import Otp from "@/models/Otp";
import User from "@/models/User"; // Import the User model

// Server action for verifying OTP
export async function verifyOTP({ userId, email, phone, otp }) {
  try {
    // Connect to the MongoDB database
    await connectToDB();

    // Validate input: Ensure OTP is provided along with either userId or email/phone
    if (!otp || (!userId && !email && !phone)) {
      return { success: false, message: "OTP and either userId, email, or phone are required" };
    }

    // Find OTP record by userId, email, or phone
    let otpRecord;
    if (userId) {
      otpRecord = await Otp.findOne({ userId });
    }
    
    if (email) {
      otpRecord = await Otp.findOne({ email });
    } else if (phone) {
      otpRecord = await Otp.findOne({ phoneNumber: phone });
    }

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
    const updateQuery = userId ? { _id: userId } : { email };
    await User.updateOne(updateQuery, { status: "active", isVerified: true });

    // Delete the OTP record after successful verification
    if (userId) {
      await Otp.deleteOne({ userId });
    } else if (email) {
      await Otp.deleteOne({ email });
    } else if (phone) {
      await Otp.deleteOne({ phoneNumber: phone });
    }

    // Return a success response
    return { success: true, message: "OTP verified successfully" };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { success: false, message: "Failed to verify OTP. Please try again." };
  }
}