import { NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/models/User";
import { connectToDB } from "@/lib/connectDB";

export async function GET(request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const verificationToken = searchParams.get("verifyToken");
    const userId = searchParams.get("id");

    if (!verificationToken || !userId) {
      return NextResponse.json(
        { message: "Invalid verification link" },
        { status: 400 }
      );
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
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpire = undefined;

    await user.save();

    return NextResponse.json({ verified: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong: " + error.message },
      { status: 500 }
    );
  }
}