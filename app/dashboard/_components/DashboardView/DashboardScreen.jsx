import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { getCurrentUser, findUserWallets, fetchMarketPrices } from "@/lib/actions";
import TotalUserBalance from "../Totaluserbalance/Totaluserbalance";
import UserProfit from "../UserProfit/UserProfit";
import ActiveDeposit from "../ActiveDeposit/ActiveDeposit";
import PendingWithdrawal from "../PendingWithdraw/PendingWithdraw";
import TotalDeposit from "../TotalDeposit/TotalDeposit";
import TotalWithdraw from "../TotalWithdraw/TotalWithdraw";
import WalletPortfolio from "./WalletPortFiolio"; // New client component

const DashboardScreen = async () => {
  const session = await getServerSession(authOptions);
  const userID = session?.user?.id;

  if (!userID) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="font-semibold text-red-500">Error: Please log in to access your dashboard.</p>
      </div>
    );
  }

  // Fetch user data and wallets on the server
  const [user, userWallets, initialMarketPrices] = await Promise.all([
    getCurrentUser(userID),
    findUserWallets(userID),
    fetchMarketPrices(),
  ]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="font-semibold text-red-500">Error: Failed to load user data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* User Info Card */}
      <Card className="bg-gradient-to-r from-blue-900 to-gray-800 text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 rounded-full bg-gray-700">
            <AvatarFallback className="rounded-full font-semibold text-gray-300">
              {user.email?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{user.username || "Guest"}</h3>
            <p className="text-sm text-gray-300">User ID: {userID.slice(0, 6) || "N/A"}</p>
          </div>
        </div>
      </Card>

      {/* Account Overview */}
      <Card className="bg-gray-100 shadow-md p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-r md:border-r-2 pr-4">
            <p className="text-xs md:text-sm text-gray-500">Account Balance</p>
            <TotalUserBalance userID={userID} />
          </div>
          <div>
            <p className="text-xs md:text-sm text-gray-500">Total Profit</p>
            <UserProfit userID={userID} />
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/dashboard/deposit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-center hover:bg-blue-700 transition">
          Make a Deposit
        </Link>
        <Link href="/dashboard/withdraw" className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium text-center hover:bg-red-700 transition">
          Withdraw Funds
        </Link>
      </div>

      {/* Transaction Summary */}
      <Card className="bg-white shadow-md p-6 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ActiveDeposit />
          <PendingWithdrawal />
          <TotalDeposit />
          <TotalWithdraw />
        </div>
      </Card>

      {/* Portfolio Section */}
      <h3 className="font-semibold text-gray-800 text-lg">My Portfolio</h3>
      <WalletPortfolio userWallets={userWallets} initialMarketPrices={initialMarketPrices} />
    </div>
  );
};

export default DashboardScreen;
