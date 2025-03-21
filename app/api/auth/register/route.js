"use server";

import { connectToDB } from "@/lib/connectDB";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import User from "@/models/User";
import Wallet from "@/models/Wallet";
import { verificationEmailTemplate } from "@/lib/verificationEmailTemplate ";
import { sendMagicLink } from "@/lib/sendEmail";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const phone = formData.get("phone");
    const country = formData.get("country");
    const state = formData.get("state");

    // Improved validation messages for each field
    if (!username) {
      return NextResponse.json(
        { message: "Username is required" },
        { status: 400 }
      );
    }
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }
    if (!password) {
      return NextResponse.json(
        { message: "Password is required" },
        { status: 400 }
      );
    }
    if (!confirmPassword) {
      return NextResponse.json(
        { message: "Confirm Password is required" },
        { status: 400 }
      );
    }
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }
    if (!phone) {
      return NextResponse.json(
        { message: "Phone number is required" },
        { status: 400 }
      );
    }
    if (!country) {
      return NextResponse.json(
        { message: "Country is required" },
        { status: 400 }
      );
    }
    if (!state) {
      return NextResponse.json(
        { message: "State is required" },
        { status: 400 }
      );
    }

    await connectToDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userID = uuidv4();

    const newUser = new User({
      userID,
      username,
      email,
      password: hashedPassword,
      phone,
      country,
      state,
      isVerified: false,
    });

    // Create default wallets for the user
    const wallets = [
      { user: newUser._id, name: "Bitcoin", balance: 0 },
      { user: newUser._id, name: "Ethereum", balance: 0 },
      { user: newUser._id, name: "Solana", balance: 0 },
      { user: newUser._id, name: "XRP", balance: 0 },
      { user: newUser._id, name: "Dogecoin", balance: 0 },
      { user: newUser._id, name: "BNB", balance: 0 },
      { user: newUser._id, name: "XLM", balance: 0 },
    ];

    await Wallet.insertMany(wallets);

    // Generate verification token and save user
    const verificationToken = newUser.getVerificationToken();
    await newUser.save();

    // Generate verification link
    const verificationLink = `${process.env.NEXTAUTH_URL}/auth/verify-email?verifyToken=${verificationToken}&id=${newUser?._id}`;
    const message = verificationEmailTemplate(verificationLink);

    // Send verification email
    await sendMagicLink(newUser?.email, "Email Verification", message);

    return NextResponse.json(
      { message: "User registered and wallets created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating user and wallets" },
      { status: 500 }
    );
  }
}