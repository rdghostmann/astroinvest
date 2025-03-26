"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { getUserWallets } from "@/lib/actions"; // Import the server action to fetch wallets

const CryptoWithdraw = ({ userID }) => {
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const userWallets = await getUserWallets(userID); // Fetch wallets for the user
        setWallets(userWallets);
      } catch (error) {
        console.error("Error fetching wallets:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchWallets();
    }
  }, [userID]);

  return (
    <div className="w-full  space-y-6 my-2 ">
      <h3 className="px-4 text-lg font-semibold">Withdraw Via Crypto Currency</h3>
      <div className="mb-2 bg-white shadow-md p-4 rounded-lg">
        <div className="space-y-4">
          {/* Available Balance */}
          <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg">
            <div className="w-full">
              <p className="text-sm text-gray-500">Available Balance:</p>
              <input
                placeholder="$0"
                type="number"
                className="bg-transparent p-2 rounded w-full"
                disabled
              />
            </div>
          </div>

          {/* Select Wallet for Withdrawal */}
          <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg">
            <div className="w-full">
              <p className="text-sm text-gray-500">Select Wallet for Withdrawal:</p>
              {loading ? (
                <p className="text-sm text-gray-500">Loading wallets...</p>
              ) : (
                <Select onValueChange={(value) => setSelectedWallet(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    {wallets.length > 0 ? (
                      wallets.map((wallet) => (
                        <SelectItem key={wallet.id} value={wallet.id}>
                          {wallet.name} - ${wallet.balance}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none">No Wallets Found</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          {/* Withdrawal Amount */}
          <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg">
            <div className="w-full">
              <p className="text-sm text-gray-500">Enter Withdrawal Amount:</p>
              <input
                placeholder="Enter Withdrawal Amount Here"
                type="number"
                className="bg-transparent p-2 rounded w-full"
              />
            </div>
          </div>
        </div>

        {/* Withdraw Button */}
        <button
          className="w-full bg-purple-600 text-white font-medium py-3 rounded-lg mt-6"
          disabled={!selectedWallet}
        >
          Withdrawal Via Crypto
        </button>
      </div>
    </div>
  );
};

export default CryptoWithdraw;