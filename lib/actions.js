"use server";

import User from "@/models/User";
import { connectToDB } from "./connectDB";
import Investment from "@/models/Investment";


export async function investAmount({ investId, planName, amount, profit }) {
  try {
    await connectToDB();

    // Find the user
    const user = await User.findById(investId);
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Check if the user has enough balance
    if (user.walletBalance < amount) {
      return { success: false, message: "Insufficient balance" };
    }

    // Deduct amount from wallet balance
    user.walletBalance -= amount;
    await user.save();

    const investment = new Investment({
      investId,
      planName,
      amount,
      profit,
    });

    await investment.save();

    return { success: true, message: "Investment successful" };
  } catch (error) {
    console.error("Error creating investment:", error);
    return { success: false, message: "Investment failed" };
  }
}


export async function topUpUser({ userId, topUpAmount }) {
  try {
    await connectToDB();
    const user = await User.findById(userId);
    if (!user) return { success: false, error: "User not found" };

    user.walletBalance += topUpAmount;
    await user.save();

    return { success: true };
  } catch (error) {
    console.error("Top-up error:", error);
    return { success: false, error: "Failed to top-up user wallet" };
  }
}

export async function getAllUsers() {
  try {
    await connectToDB();
    // Fetch all users and convert them to plain objects
    const users = await User.find({}).lean();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}