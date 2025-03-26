"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { getUserBanks } from "@/lib/actions"; // Import the server action to fetch banks

const BankWithdraw = ({ userID }) => {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const userBanks = await getUserBanks(userID); // Fetch banks for the user
        setBanks(userBanks);
      } catch (error) {
        console.error("Error fetching banks:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchBanks();
    }
  }, [userID]);

  return (
    <div className="w-full space-y-6 my-2 ">
      <h3 className="px-4 text-lg font-semibold">Withdraw Via Bank Account</h3>
      <div className="mb-2 bg-white shadow-md p-4 rounded-lg">
        <div className="space-y-4">
          {/* Select Bank Account for Withdrawal */}
          <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg">
            <div className="w-full">
              <p className="text-sm text-gray-500">Select Bank Account for Withdrawal:</p>
              {loading ? (
                <p className="text-sm text-gray-500">Loading bank accounts...</p>
              ) : (
                <Select onValueChange={(value) => setSelectedBank(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Bank Account" />
                  </SelectTrigger>
                  <SelectContent>
                    {banks.length > 0 ? (
                      banks.map((bank) => (
                        <SelectItem key={bank.id} value={bank.id}>
                          {bank.name} - {bank.accountNumber}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none">No Bank Accounts Found</SelectItem>
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
          disabled={!selectedBank}
        >
          Withdrawal Via Bank
        </button>
      </div>
    </div>
  );
};

export default BankWithdraw;