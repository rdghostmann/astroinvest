"use server";

import { connectToDB } from "./connectDB";
import User from "@/models/User";
import Investment from "@/models/Investment";
import Bank from "@/models/Bank";
import Deposit from "@/models/Deposit";

export async function addDeposit(depositDetails) {
  await connectToDB();

  try {
    const newDeposit = new Deposit(depositDetails);
    await newDeposit.save();
    return { ok: true };
  } catch (error) {
    console.error("Error adding deposit details:", error);
    return { ok: false, error };
  }
}

export async function fetchDepositsByUser(userID) {
  await connectToDB();

  try {
    const deposits = await Deposit.findById({ userId: userID });
    return deposits;
  } catch (error) {
    console.error("Error fetching deposits:", error);
    return [];
  }
}

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

export async function addBankAccount(bankDetails) {
  await connectToDB();

  try {
    const newBank = new Bank(bankDetails);
    await newBank.save();
    return { ok: true };
  } catch (error) {
    console.error("Error adding bank account:", error);
    return { ok: false, error };
  }
}

export async function fetchBanksByUser(userID) {
  await connectToDB();

  try {
    const banks = await Bank.find({ userID });
    return banks;
  } catch (error) {
    console.error("Error fetching banks:", error);
    return [];
  }
}

export async function addCardDetails(cardDetails) {
  await connectToDB();

  try {
    const newCard = new Card(cardDetails);
    await newCard.save();
    return { ok: true };
  } catch (error) {
    console.error("Error adding card details:", error);
    return { ok: false, error };
  }
}