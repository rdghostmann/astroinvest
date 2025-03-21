"use server";

import { connectToDB } from "@/lib/connectDB";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
// import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import User from "@/models/User";
import Wallet from "@/models/Wallet";
import { sendMagicLink } from "@/lib/sendEmail";
export async function POST(req) {
  
  const verificationEmailTemplate = (verificationLink) => {
    return `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 0;
          }
  
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            margin-top: 50px;
          }
  
          h1 {
            color: #333333;
            text-align: center;
          }
  
          p {
            color: #666666;
            line-height: 1.5;
          }
  
          .button {
            display: block;
            margin: 0 auto;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
          }
  
          .expire-time {
            text-align: center;
            margin-top: 10px;
            color: #999999;
          }
  
          .button:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Verify Your Email Address</h1>
          <p>
            Thank you for signing up! To complete your registration, please click
            the button below to verify your email address.
          </p>
          <a href=${verificationLink} class="button">Verify Email</a>
          <p class="expire-time">This link will expire in 30 minutes.</p>
        </div>
      </body>
      </html>
    `;
  };

  try {
    await connectToDB();

    const { username, email, password, confirmPassword, phone, country, state } = await req.json();

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

    console.log("New user created: ", newUser);
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
   
    // revalidatePath("/login")

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