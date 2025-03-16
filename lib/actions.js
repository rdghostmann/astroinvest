"use server";

import { connectToDB } from "./connectDB";
import User from "@/models/User";
import Investment from "@/models/Investment";
import Bank from "@/models/Bank";
import Deposit from "@/models/Deposit";
import Wallet from "@/models/Wallet";



// Add User Depositories
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

// Fetch Deposits by User
export async function fetchDepositsByUser(userID) {
  await connectToDB();

  try {
    const deposits = await Deposit.find({ userId: userID });
    return deposits;
  } catch (error) {
    console.error("Error fetching deposits:", error);
    return [];
  }
}


// Investment Logic 
export async function investAmount({ userID, planName, amount, profit }) {
  try {
    await connectToDB();

    // Find the user
    const user = await User.findById(userID);
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
      userID,
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


// Fetch Investment by User
export async function fetchInvestmentByUser(userID) {
  await connectToDB();

  try {
    const investments = await Investment.find({ userID });
    return investments;
  } catch (error) {
    console.error("Error fetching investments:", error);
    return [];
  }
}


// Topping up user wallet
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

// Get all users
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

export async function getUsers() {
  try {
    await connectToDB();
    const users = await User.find({}).lean();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}


// get User by id 
export async function getUserById(userId) {
  try {
    await connectToDB();
    const user = await User.findById(userId).populate('wallets').lean();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

// Update User Wallet Account 
export async function updateUserWallet(walletId, newBalance) {
  try {
    await connectToDB();
    const wallet = await Wallet.findById(walletId);
    wallet.balance = newBalance;
    await wallet.save();
    return wallet;
  } catch (error) {
    console.error("Error updating wallet:", error);
    return null;
  }
}

// Add BankAccount 
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


// Fetch Banks by User
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

// Add Card Details
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

// Fetch Cards by User
export async function fetchWalletsByUser(userID) {
  await connectToDB();

  try {
    const wallets = await Wallet.find({ user: userID });
    return wallets;
  } catch (error) {
    console.error("Error fetching wallets:", error);
    return [];
  }
}