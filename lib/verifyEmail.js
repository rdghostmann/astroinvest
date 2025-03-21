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
    await connectToDB();

    if (!verificationToken || !userId) {
      return { success: false, message: "Invalid verification link" };
    }

    const verifyToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

    console.log("Hashed Verification Token:", verifyToken);
    console.log("User ID:", userId);

    const user = await User.findOne({
      _id: userId,
      verifyToken,
      verifyTokenExpire: { $gt: new Date() },
    });

    console.log("User Found:", user);

    if (!user) {
      return { success: false, message: "Invalid or expired token" };
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpire = undefined;

    await user.save();

    return { success: true, message: "Email verified successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error Verifying Email: "};
  }
}


