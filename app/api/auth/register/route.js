"use server";

import { connectToDB } from "@/lib/connectDB";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import User from "@/models/User";
import Wallet from "@/models/Wallet";

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

    if (!username || !email || !password || !phone || !country || !state) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 401 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
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

    await newUser.save();

    // Create default wallets for the user
    const wallets = [
      { user: newUser._id, name: 'Bitcoin', balance: 0 },
      { user: newUser._id, name: 'Ethereum', balance: 0 },
      { user: newUser._id, name: 'Solana', balance: 0 },
      { user: newUser._id, name: 'XRP', balance: 0 },
      { user: newUser._id, name: 'Dogecoin', balance: 0 },
      { user: newUser._id, name: 'BNB', balance: 0 },
    ];

    await Wallet.insertMany(wallets);

    // TODO: Trigger Magic Link email verification via nodemailer

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