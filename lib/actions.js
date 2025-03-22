"use server";

import { connectToDB } from "./connectDB";
import User from "@/models/User";
import Investment from "@/models/Investment";
import Bank from "@/models/Bank";
import Deposit from "@/models/Deposit";
import Wallet from "@/models/Wallet";
import { revalidatePath } from "next/cache";
import axios from 'axios';
import Kyc from "@/models/Kyc";

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
        ids: 'bitcoin,ethereum,litecoin,dogecoin,xrp,bnb,solana', // Add the coin IDs you needd the coin IDs you needd the coin IDs you need
        vs_currencies: 'usd',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching market prices:', error);
    return {};
  }
}

// export async function fetchWithdrawals() {
//   await connectToDB();
//   return await Withdrawal.find({}).lean();
// }


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