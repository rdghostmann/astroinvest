"use client";
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card'
import { ArrowUpRight, Loader } from 'lucide-react';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"
import { useFetchUser } from "@/hooks/useFetchUser";
import { useUserStore } from "@/store/userStore";
import Loading from '@/app/loading';


const DashboardView = ({ userId }) => {
  // extracting data from usesession as session
  // const { data: session } = useSession();

  // if (!session) {
  //   return <Loading />
  // }
  // const userName = session.user?.username || "Guest";
  // // const ID = session.user?.userID.slice(0, 5) || 0;
  // const userEmail = session.user?.email || "No Email";
  // const userBalance = session.user.walletBalance || 0;
  // const userTotalProfit = session.user.profitTotal || 0;

  // Trigger fetching and updating the store on mount or when userId changes.
  useFetchUser(userId);
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Loading />
  }
  // Extract user details for display.
  const userName = user?.username || "Guest";
  const ID = user?.userID.slice(0, 5);
  const userEmail = user?.email || "No Email";
  const userBalance = user.walletBalance;
  const userTotalProfit = user.profitTotal;


  return (
    <>
      <Card className="bg-gradient-to-br from-blue-800 to-blue-900 text-white p-6 rounded-lg shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarFallback className="rounded-lg">{userEmail[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h3 className="font-semibold">{userName}</h3>
            <p className="text-sm text-white">ID:{ID}</p>
          </div>
        </div>
        <div className="flex justify-between mb-6 bg-white shadow-md p-4 rounded-lg">
          <div className="border-r-2 flex-1 p-2 w-1/2 lg:px-2">
            <p className="text-sm/8 text-gray-500">ACCOUNT BALANCE</p>
            <div className="flex items-center gap-2">
              {!userBalance ? <Loader className="animate-spin" /> : (
                <>
                  <h2 className="text-2xl text-black font-bold md:text-3xl">${userBalance}</h2>
                  <span className="flex items-center text-sm text-green-500">
                    <ArrowUpRight className="h-4 w-4" />
                    1.25%
                  </span>
                </>
              )}

            </div>
          </div>
          <div className="flex-1 p-2 w-1/2 lg:px-2">
            <p className="text-sm/8 text-gray-500">TOTAL PROFIT</p>
            <div className="flex items-center gap-2">
              {!userTotalProfit ? <Loader className="animate-spin" /> : (
                <>
                  <h2 className="text-2xl text-black font-bold md:text-3xl">${userTotalProfit}</h2>
                  <span className="flex items-center text-sm text-green-500">
                    <ArrowUpRight className="h-4 w-4" />
                    1.25%
                  </span>
                </>
              )}

            </div>
          </div>
        </div>


        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link href="/dashboard/deposit" className="bg-blue-400 text-blue-900 px-4 py-2 rounded-lg font-medium hover:bg-blue-300 transition-colors">
            Make a Deposit
          </Link>
          <Link href="/dashboard/withdraw" className="bg-blue-700 text-blue-100 px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
            Withdraw Funds
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {["$5789.00", "$2500.00", "$7000.00", "$7000.00"].map((amount, index) => (
            <div key={index} className="bg-amber-800/50 p-3 rounded-lg">
              <p className="text-lg font-semibold">{amount}</p>
              <p className="text-xs text-amber-200">
                {["Active Deposits", "Earn Total", "Total Deposits", "Total Withdraw"][index]}
              </p>
            </div>
          ))}
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
  )
}

export default DashboardView
