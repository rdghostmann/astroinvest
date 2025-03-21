import { NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/models/User";
import { connectToDB } from "@/lib/connectDB";

// Helper function to verify email
export async function verifyEmail({ verificationToken, userId }) {
  try {
    await connectToDB();

    if (!verificationToken || !userId) {
      return { success: false, message: "Invalid verification link" };
    }

    const verifyToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    const user = await User.findOne({
      _id: userId,
      verifyToken,
      verifyTokenExpire: { $gt: new Date() },
    });

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
    return { success: false, message: "Something went wrong: " + error.message };
  }
}


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
