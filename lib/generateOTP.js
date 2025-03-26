"use server";

import bcrypt from "bcrypt";
import Otp from "@/models/Otp";
import { connectToDB } from "@/lib/connectDB";
import { sendEmail } from "@/lib/sendEmail"; // Import the sendEmail function
import { sendSms } from "@/lib/sendSms"; // Import the sendSms function

// Server action for generating and sending OTP
export async function generateOTP({ email, phoneNumber, deliveryMethod }) {
  try {
    // Connect to the MongoDB database
    await connectToDB();

    // Validate input
    if (!email && !phoneNumber) {
      return { success: false, message: "Email or phone number is required" };
    }

    if (!deliveryMethod || !["email", "sms"].includes(deliveryMethod)) {
      return { success: false, message: "Valid delivery method is required" };
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash the OTP
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Create a new OTP record in the database
    const newOtp = new Otp({
      email: deliveryMethod === "email" ? email : undefined,
      phoneNumber: deliveryMethod === "sms" ? phoneNumber : undefined,
      otp: hashedOtp,
    });
    await newOtp.save();

    // Send the OTP via the selected delivery method
    if (deliveryMethod === "email" && email) {
      await sendEmail(email, otp);
    } else if (deliveryMethod === "sms" && phoneNumber) {
      await sendSms(phoneNumber, otp);
    } else {
      return {
        success: false,
        message: "Invalid delivery method or missing contact information",
      };
    }

    // Return a success response
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("Error generating OTP:", error);
    return { success: false, message: "Failed to generate OTP. Please try again." };
  }
}