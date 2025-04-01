import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { getCurrentUser } from "@/lib/actions";
import ActiveDeposit from "../ActiveDeposit/ActiveDeposit";
import TotalDeposit from "../TotalDeposit/TotalDeposit";
import TotalWithdraw from "../TotalWithdraw/TotalWithdraw";
import TotalUserBalance from "../Totaluserbalance/Totaluserbalance";
import UserProfit from "../UserProfit/UserProfit";
import PendingWithdrawal from "../PendingWithdraw/PendingWithdraw";


const DashboardScreen = async () => {

  const session = await getServerSession(authOptions)
  const userID = session?.user?.id;

  const user = await getCurrentUser(userID);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="font-semibold text-red-500">Failed to load user data. Please log in.</p>
      </div>
    );
  }

  // Extract user details for display
  const userName = user?.username || "Guest";
  const ID = user?.userID?.slice(0, 5) || "N/A";
  const userEmail = user?.email || "No Email";
  const userTotalProfit = user?.profitTotal || 0;

  return (
    <>
      <Card className="bg-gradient-to-br from-blue-800 to-blue-900 text-white p-6 rounded-lg shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <Avatar className="h-8 w-8 rounded-lg bg-slate-700">
              <AvatarFallback className="rounded-lg font-semibold text-gray-700">
                {userEmail[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h3 className="font-semibold">{userName}</h3>
            <p className="text-sm text-white">ID: {ID}</p>
          </div>
        </div>
        <div className="flex justify-between mb-6 bg-white shadow-md p-4 rounded-lg">
          <div className="border-r-2 flex-1 p-2 w-1/2 lg:px-2">
            <p className="text-xs md:hidden text-gray-500">BALANCE</p>
            <p className="hidden md:block text-sm/8 text-gray-500">ACCOUNT BALANCE</p>
            <TotalUserBalance userID={userID} />
          </div>
          <div className="flex-1 p-2 w-1/2 lg:px-2">
            <p className="text-xs md:hidden text-gray-500">PROFIT</p>
            <p className="hidden md:block text-sm/8 text-gray-500">TOTAL PROFIT</p>
            <UserProfit userID={userID} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link
            href="/dashboard/deposit"
            className="bg-blue-400 text-blue-900 px-4 py-2 rounded-lg font-medium hover:bg-blue-300 transition-colors"
          >
            Make a Deposit
          </Link>
          <Link
            href="/dashboard/withdraw"
            className="bg-blue-700 text-blue-100 px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Withdraw Funds
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <ActiveDeposit />
          <PendingWithdrawal />
          <TotalDeposit />
          <TotalWithdraw />
        </div>
        
      </Card>
      <div className="w-full mx-auto px-4">
        {/* Main Stats */}




      </div>
      {/* <CryptoList /> */}

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white shadow-md p-4 rounded-lg">
        {/* My Portfolio */}
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-4">My Portfolio</h3>
          <div className="space-y-4">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-purple-500"></div>
                <div>
                  <p className="font-semibold text-gray-800">Ethereum (ETH)</p>
                  <p className="text-gray-500 text-sm">46%</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-800">0.124567 ETH</p>
                <p className="text-green-500 text-sm">+0.25%</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                <div>
                  <p className="font-semibold text-gray-800">XRP</p>
                  <p className="text-gray-500 text-sm">24%</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-800">0.6567 XRP</p>
                <p className="text-red-500 text-sm">-0.19%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          {/* Watchlist */}
          {/* <Watchlist /> */}
        </div>
      </div>
    </>
  );
};

export default DashboardScreen;