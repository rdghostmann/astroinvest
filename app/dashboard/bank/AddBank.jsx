"use client";

import { addBankAccount } from "@/lib/actions";
import React, { useState } from "react";

export default function AddBank() {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bankAddress, setBankAddress] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [swiftCode, setSwiftCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bankDetails = {
      bankName,
      accountNumber,
      accountName,
      bankAddress,
      routingNumber,
      swiftCode,
    };

    try {
      const response = await addBankAccount(bankDetails);

      if (response.ok) {
        alert("Bank account added successfully!");
        // Clear the form
        setBankName("");
        setAccountNumber("");
        setAccountName("");
        setBankAddress("");
        setRoutingNumber("");
        setSwiftCode("");
      } else {
        alert("Failed to add bank account.");
      }
    } catch (error) {
      console.error("Error adding bank account:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="space-y-4 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-4">Add Bank Account</h3>
          <div className="w-full">
            <p className="text-sm text-gray-500">Bank Name:</p>
            <input
              placeholder="Enter Bank Name"
              type="text"
              className="bg-transparent p-2 rounded w-full"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg">
          <div className="w-full">
            <p className="text-sm text-gray-500">Account Number:</p>
            <input
              placeholder="Enter Account Number"
              type="number"
              className="bg-transparent p-2 rounded w-full"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg">
          <div className="w-full">
            <p className="text-sm text-gray-500">Account Name:</p>
            <input
              placeholder="Enter Account Name"
              type="text"
              className="bg-transparent p-2 rounded w-full"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg">
          <div className="w-full">
            <p className="text-sm text-gray-500">Bank Address:</p>
            <input
              placeholder="Enter Bank Address"
              type="text"
              className="bg-transparent p-2 rounded w-full"
              value={bankAddress}
              onChange={(e) => setBankAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg">
          <div className="w-full">
            <p className="text-sm text-gray-500">Routing No.:</p>
            <input
              placeholder="Enter Routing Number"
              type="number"
              className="bg-transparent p-2 rounded w-full"
              value={routingNumber}
              onChange={(e) => setRoutingNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg">
          <div className="w-full">
            <p className="text-sm text-gray-500">Swift Code:</p>
            <input
              placeholder="Enter Swift Code"
              type="number"
              className="bg-transparent p-2 rounded w-full"
              value={swiftCode}
              onChange={(e) => setSwiftCode(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="w-full bg-purple-600 text-white font-medium py-3 rounded-lg mt-6">
          Add Bank Account
        </button>
      </form>
    </div>
  );
}