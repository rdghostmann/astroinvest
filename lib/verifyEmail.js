"use server";

import { NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/models/User";
import { connectToDB } from "@/lib/connectDB";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const verificationToken = searchParams.get("verifyToken");
  const userId = searchParams.get("id");

  const result = await verifyEmail({ verificationToken, userId });

  if (result.success) {
    return NextResponse.json({ verified: true, message: result.message }, { status: 200 });
  } else {
    return NextResponse.json({ verified: false, message: result.message }, { status: 400 });
  }
}

// Helper function to verify email
export async function verifyEmail({ verificationToken, userId }) {
  try {
    // Connect to the database
    await connectToDB();

    // Validate input
    if (!verificationToken || !userId) {
      return { success: false, message: "Invalid verification link" };
    }

    // Hash the verification token
    const hashedToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

    // Find the user with the hashed token and valid expiration date
    const user = await User.findOne({
      _id: userId,
      verifyToken: hashedToken,
      verifyTokenExpire: { $gt: new Date() }, // Ensure the token is not expired
    });

    if (!user) {
      return { success: false, message: "Verification token is invalid or expired" };
    }

    // Activate the user and clear the token fields
    user.status = "active";
    user.verifyToken = undefined;
    user.verifyTokenExpire = undefined;

    await user.save();

    return { success: true, message: "Email verified successfully" };
  } catch (error) {
    console.error("Error verifying email:", error);
    return { success: false, message: "An error occurred while verifying the email" };
  }
}


