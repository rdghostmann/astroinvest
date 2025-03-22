"use server";

import bcrypt from "bcrypt";
import { connectToDB } from "@/lib/connectDB";
import Otp from "@/models/Otp";

// Server action for verifying OTP
export async function verifyOTP({ email, phoneNumber, otp }) {
  try {
    // Connect to the MongoDB database
    await connectToDB();

    // Validate input: Ensure either email or phone number, and OTP are provided
    if ((!email && !phoneNumber) || !otp) {
      return { success: false, message: "Email or phone number and OTP are required" };
    }

    // Find OTP record by email or phone number
    const otpRecord = email
      ? await Otp.findOne({ email }) // Find by email if email is provided
      : await Otp.findOne({ phoneNumber }); // Find by phone number if phone number is provided

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

    // Delete the OTP record after successful verification
    if (email) {
      await Otp.deleteOne({ email });
    } else if (phoneNumber) {
      await Otp.deleteOne({ phoneNumber });
    }

    // Return a success response
    return { success: true, message: "OTP verified successfully" };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { success: false, message: "Failed to verify OTP. Please try again." };
  }
}