"use server";

import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import Otp from "@/models/Otp";
import { connectToDB } from "@/lib/connectDB";

// Function to generate a 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Function to send an email with the OTP
const sendEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: "app@test.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

// Function to send an SMS with the OTP
const sendSms = async (phoneNumber, otp) => {
  const client = require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  await client.messages.create({
    body: `Your OTP code is ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  });
};

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

    // Generate a 6-digit OTP and hash it
    const otp = generateOtp();
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