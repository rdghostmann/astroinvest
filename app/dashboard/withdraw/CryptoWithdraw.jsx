"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getUserWallets, getWithdrawBalance, requestViaCrypto } from "@/lib/actions";

const CryptoWithdraw = ({ userID }) => {
  const { toast } = useToast();

  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null); // Store the full wallet object
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [availableBalance, setAvailableBalance] = useState(0);

  useEffect(() => {
    const fetchWalletsAndBalance = async () => {
      try {
        const userWallets = await getUserWallets(userID); // Fetch wallets for the user
        setWallets(userWallets);

        const balance = await getWithdrawBalance(userID); // Fetch the user's total profit
        setAvailableBalance(balance);
      } catch (error) {
        console.error("Error fetching wallets or balance:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchWalletsAndBalance();
    }
  }, [userID]);

  const handleWithdrawRequest = async (e) => {
    e.preventDefault();

    if (!selectedWallet) {
      toast({ title: "Please select a wallet.", variant: "destructive" });
      return;
    }

    if (!withdrawAmount || withdrawAmount <= 0) {
      toast({ title: "Please enter a valid withdrawal amount.", variant: "destructive" });
      return;
    }

    if (withdrawAmount > availableBalance) {
      toast({ title: "Cannot conclude with this request. Insufficient balance.", variant: "destructive" });
      return;
    }

    try {
      const response = await requestViaCrypto({
        userId: userID,
        withdrawWallet: selectedWallet.name, // Use the wallet name
        requestedAmount: parseFloat(withdrawAmount),
      });

      if (response.ok) {
        toast({ title: "Withdrawal request submitted successfully!", variant: "success" });
        setWithdrawAmount(""); // Clear the input field
        setSelectedWallet(null); // Reset the selected wallet
      } else {
        toast({ title: "Failed to submit withdrawal request.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error submitting withdrawal request:", error);
      toast({ title: "An error occurred. Please try again.", variant: "destructive" });
    }
  };

  return (
    <div className="w-full space-y-6 my-2">
      <h3 className="px-4 text-lg font-semibold">Withdraw Via Crypto Currency</h3>
      <form className="mb-2 bg-white shadow-md p-4 rounded-lg" onSubmit={handleWithdrawRequest}>
        <div className="space-y-4">
          {/* Select Wallet for Withdrawal */}
          <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg">
            <div className="w-full">
              <p className="text-sm text-gray-500">Select Wallet for Withdrawal:</p>
              {loading ? (
                <p className="text-sm text-gray-500">Loading wallets...</p>
              ) : (
                <Select
                  onValueChange={(walletId) => {
                    const wallet = wallets.find((w) => w.id === walletId); // Find the full wallet object
                    setSelectedWallet(wallet); // Store the full wallet object
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    {wallets.length > 0 ? (
                      wallets.map((wallet) => (
                        <SelectItem key={wallet.id} value={wallet.id}>
                          {wallet.name}
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
                placeholder="Amount"
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="bg-transparent p-2 rounded w-full"
              />
            </div>
          </div>
        </div>

        {/* Withdraw Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-medium py-3 rounded-lg mt-6"
          disabled={!selectedWallet || !withdrawAmount}
        >
          Withdrawal Via Crypto
        </button>
      </form>
    </div>
  );
};

export default CryptoWithdraw;