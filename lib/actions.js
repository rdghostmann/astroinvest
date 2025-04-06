"use server";

import mongoose from "mongoose";
import { connectToDB } from "./connectDB";
import User from "@/models/User";
import Investment from "@/models/Investment";
import Bank from "@/models/Bank";
import Deposit from "@/models/Deposit";
import Wallet from "@/models/Wallet";
import Withdrawal from "@/models/Withdrawal";
import { revalidatePath } from "next/cache";
import axios from 'axios';
import Kyc from "@/models/kyc";

// Investment Logic
export async function investAmount({
  userID,
  planName,
  assetName,
  amount,
  profit,
  walletID,
}) {
  await connectToDB();

  try {
    // Find the user's wallet
    const wallet = await Wallet.findById(walletID);

    if (!wallet) {
      return { success: false, message: "Wallet not found" };
    }

    // Check if the wallet has sufficient balance
    if (wallet.balance < amount) {
      return { success: false, message: "Insufficient wallet balance" };
    }

    // Deduct the amount from the wallet balance
    wallet.balance -= amount;
    await wallet.save();

    // Create a new investment record
    const investment = new Investment({
      userID: userID.toString(),
      planName,
      assetName,
      amount,
      profit,
    });

    await investment.save();

    revalidatePath("dashboard/investment");

    return { success: true, message: "Investment created successfully" };
  } catch (error) {
    console.error("Error creating investment:", error);
    return { success: false, message: "Investment creation failed" };
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

//find User's Wallet
export async function findUserWallets(userID) {
  await connectToDB();

  try {
    // Fetch wallets for the given user ID
    const wallets = await Wallet.find({ user: userID })
      .select("_id name balance") // Select only the required fields
      .lean(); // Return plain JavaScript objects for better performance

    // Map the `_id` field to `id` for consistency
    return wallets.map((wallet) => ({
      id: wallet._id.toString(), // Convert ObjectId to string
      name: wallet.name,

      
      balance: wallet.balance,
    }));
  } catch (error) {
    console.error("Error fetching wallets:", error);
    return [];
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
    return users.map((user) => ({
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      phone: user.phone,
      country:user.country,
      state : user.state,
      role : user.role,
      isVerified: user.isVerified
    }));
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
    const user = await User.findById(userId).populate("wallets").lean();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
export async function getUserWithWallet(userId) {
  try {
    await connectToDB();

    // Fetch the user
    const user = await User.findById(userId).lean();
    if (!user) {
      throw new Error("User not found");
    }

    // Fetch all wallets associated with the user
    const wallets = await Wallet.find({ user: userId }).lean();

    // Convert MongoDB ObjectIds to strings
    const userWithWallets = {
      user: {
        ...user,
        _id: user._id.toString(),
      },
      wallets: wallets.map(wallet => ({
        ...wallet,
        _id: wallet._id.toString(),
        user: wallet.user.toString(),
      })),
    };

    return userWithWallets;
  } catch (error) {
    console.error("Error fetching user or wallets:", error);
    return null;
  }
}
// Update User Wallet Account
export async function updateUserWallet(walletId, newBalance) {
  try {
    await connectToDB();
    const wallet = await Wallet.findById(walletId);
    
    if (!wallet) return null;

    wallet.balance = newBalance;
    await wallet.save();
    revalidatePath("dashboard/");

    // Convert Mongoose Document to a plain object and convert ObjectIds to strings
    const updatedWallet = {
      ...wallet.toObject(),
      _id: wallet._id.toString(),
      user: wallet.user.toString(),
    };

    return updatedWallet;
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

export async function addCardDetails(cardDetails) {
  await connectToDB();

  try {
    const newCard = new Card(cardDetails); // Create a new card record
    await newCard.save(); // Save the card to the database
    return { ok: true };
  } catch (error) {
    console.error("Error adding card details:", error);
    return { ok: false, error };
  }
}

export async function fetchKycUsers() {
  await connectToDB();
  try {
    const users = await User.find({}).select("_id username email").lean();
    return users.map((user) => ({
      _id: user._id.toString(),
      username: user.username,
      email: user.email,

    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function fetchAllKycRecords() {
  await connectToDB();
  try {
    const kycRecords = await Kyc.find({}).lean();
    return kycRecords.map((kyc) => ({
      _id: kyc._id.toString(),
      user_id: kyc.user_id.toString(),
      status: kyc.status,
      idType: kyc.id_type,
      frontImage: kyc.kyc_front_image || null,
      backImage: kyc.kyc_back_image || null,
      selfieImage: kyc.kyc_selfie_image || null,
    }));
  } catch (error) {
    console.error("Error fetching KYC records:", error);
    return [];
  }
}

// Update KYC status
export async function updateKycStatus(kycId, status) {
  await connectToDB();
  try {
    const kyc = await Kyc.findById(kycId);
    if (!kyc) return { success: false, message: "KYC record not found" };

    kyc.status = status;
    await kyc.save();

    return { success: true, message: "KYC status updated", kyc };
  } catch (error) {
    console.error("Error updating KYC status:", error);
    return { success: false, message: "Failed to update KYC status" };
  }
}

export async function fetchDeposits() {
  await connectToDB();
  return await Deposit.find({}).lean();
}


export async function fetchMarketPrices() {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'bitcoin,ethereum,litecoin,dogecoin,xrp,bnb,solana,stellar',
        vs_currencies: 'usd',
        include_24hr_change: 'true',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching market prices:', error);
    return {};
  }
}



export async function updateUserRole(userId, newRole) {
  try {
    await connectToDB();
    const user = await User.findById(userId);
    
    if (!user) return null;

    user.role = newRole;
    await user.save();
    return user;
  } catch (error) {
    console.error("Error updating user role:", error);
    return null;
  }
}

export async function getUserBanks(userID) {
  await connectToDB();

  try {
    // Find all banks associated with the user
    const banks = await Bank.find({ userID }).lean();

    // Return banks with necessary details
    return banks.map((bank) => ({
      id: bank._id.toString(),
      name: bank.name || "Unnamed Bank",
      accountNumber: bank.accountNumber || "N/A",
    }));
  } catch (error) {
    console.error("Error fetching banks:", error);
    return [];
  }
}

export async function getUserWallets(userID) {
  await connectToDB();

  try {
    // Find all wallets associated with the user
    const wallets = await Wallet.find({ user: userID }).lean();

    // Return wallets with necessary details
    return wallets.map((wallet) => ({
      id: wallet._id.toString(),
      name: wallet.name || "Unnamed Wallet",
      balance: wallet.balance || 0,
    }));
  } catch (error) {
    console.error("Error fetching wallets:", error);
    return [];
  }
}

export async function getCurrentUser(userID) {
  await connectToDB();

  try {
    // Find the user by userID
    const user = await User.findOne({ _id: userID }).lean();

    if (!user) {
      return null; // Return null if the user is not found
    }

    // Return the required user details
    return {
      username: user.username,
      userID: user._id.toString(),
      email: user.email,
      walletBalance: user.walletBalance || 0, 
      profitTotal: user.profitTotal || 0, 
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return null; // Return null in case of an error
  }
}

export async function getLastDeposit(userID) {
  await connectToDB();

  try {
    // Find the most recent approved deposit for the user
    const lastDeposit = await Deposit.findOne({ userId: userID, status: "approved" })
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .lean();

    // Return the deposit amount or 0 if no approved deposit is found
    return lastDeposit?.amount || 0;
  } catch (error) {
    console.error("Error fetching last approved deposit:", error);
    return 0; // Return 0 in case of an error
  }
}

export async function getTotalDeposit(userID) {
  await connectToDB();

  try {
    // Aggregate the total deposit amount for the user with status === "approved"
    const total = await Deposit.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userID), status: "approved" } }, // Match deposits for the given user and approved status
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } }, // Sum the deposit amounts
    ]);

    // Return the total amount or 0 if no deposits are found
    return total.length > 0 ? total[0].totalAmount : 0;
  } catch (error) {
    console.error("Error fetching total approved deposit:", error);
    return 0; // Return 0 in case of an error
  }
}

export async function getTotalUserWalletBalance(userID) {
  await connectToDB();

  try {
    // Aggregate the total wallet balance for the user
    const total = await Wallet.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userID) } }, // Match wallets for the given user
      { $group: { _id: null, totalBalance: { $sum: "$balance" } } }, // Sum the wallet balances
    ]);

    // Return the total balance or 0 if no wallets are found
    return total.length > 0 ? total[0].totalBalance : 0;
  } catch (error) {
    console.error("Error fetching total wallet balance:", error);
    return 0; // Return 0 in case of an error
  }
}


export async function requestViaCrypto({ userId, withdrawWallet, requestedAmount }) {
  await connectToDB();

  try {
    const newWithdrawal = new Withdrawal({
      userId,
      withdrawWallet,
      requestedAmount,
    });

    await newWithdrawal.save(); // Save the withdrawal record to the database
    return { ok: true };
  } catch (error) {
    console.error("Error creating withdrawal request:", error);
    return { ok: false, error };
  }
}

export async function getWithdrawBalance(userID) {
  await connectToDB();

  try {
    // Aggregate the total profit for the user
    const result = await Investment.aggregate([
      { $match: { userID: new mongoose.Types.ObjectId(userID) } }, // Match investments for the given user
      { $group: { _id: null, totalProfit: { $sum: "$profit" } } }, // Sum the profit field
    ]);

    // Return the total profit or 0 if no investments are found
    return result.length > 0 ? result[0].totalProfit : 0;
  } catch (error) {
    console.error("Error fetching withdraw balance:", error);
    return 0; // Return 0 in case of an error
  }
}
