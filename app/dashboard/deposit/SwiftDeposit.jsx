"use client";

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import CopyToClipboardButton from "./CopyToClipboardButton";

const availableNetworks = [
  "Ethereum (ERC20)",
  "Arbitrum One",
  "BSC (BEP20)",
  "OP Mainnet",
  "Mantle Network",
  "Arbitrum Nova",
  "Ripple",
  "Base Mainnet",
  "Linea",
];

export default function SwiftDeposit({ assets }) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState("");
  const [depositNumber, setDepositNumber] = useState("");
  const [depositAddress, setDepositAddress] = useState("");
  const [timeLeft, setTimeLeft] = useState(900);
  const [selectedAsset, setSelectedAsset] = useState(null);

  // When an asset is selected, find it in the assets array and set it.
  const handleAssetChange = (assetName) => {
    const asset = assets.find((a) => a.name === assetName);
    setSelectedAsset(asset);
  };

  // Load stored state on mount
  useEffect(() => {
    const storedStep = localStorage.getItem("depositStep");
    const storedDepositDetails = JSON.parse(localStorage.getItem("depositDetails"));
    const storedTimeLeft = localStorage.getItem("timeLeft");

    if (storedStep === "3" && storedDepositDetails) {
      setStep(3);
      setAmount(storedDepositDetails.amount);
      setNetwork(storedDepositDetails.network);
      setDepositNumber(storedDepositDetails.depositNumber);
      setDepositAddress(storedDepositDetails.depositAddress);

      // Calculate remaining time
      const lastTimestamp = localStorage.getItem("timestamp");
      const elapsedTime = Math.floor((Date.now() - lastTimestamp) / 1000);
      const remainingTime = Math.max(0, storedTimeLeft - elapsedTime);

      setTimeLeft(remainingTime);
    }
  }, []);

  // Save state to localStorage whenever step changes
  useEffect(() => {
    if (step === 3) {
      localStorage.setItem("depositStep", "3");
      localStorage.setItem(
        "depositDetails",
        JSON.stringify({ amount, network, depositAddress, depositNumber })
      );
      localStorage.setItem("timeLeft", timeLeft);
      localStorage.setItem("timestamp", Date.now());
    }
  }, [step, amount, network, depositAddress, depositNumber, timeLeft]);

  // Handle countdown timer
  useEffect(() => {
    let timerId;
    if (step === 3 && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            clearInterval(timerId);
            localStorage.removeItem("depositStep");
            setStep(1); // Reset to step 1 when time expires
            return 0;
          }
          localStorage.setItem("timeLeft", newTime);
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [step, timeLeft]);

  // Format the countdown as mm:ss
  const formattedTime = `${Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0")}:${(timeLeft % 60).toString().padStart(2, "0")}`;

  // Generate deposit details
  function generateDepositDetails() {
    const random19 = uuidv4().replace(/-/g, "").slice(0, 19).toUpperCase();
    setDepositNumber(random19);
    setDepositAddress(selectedAsset.depositAddress);
  }

  // Step 1: Fill in asset, amount, network
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!selectedAsset || !amount || !network) return alert("Please fill in all fields.");

    generateDepositDetails();
    setStep(2);
  };

  // Step 2: Proceed to step 3
  const handleProceedToPayment = () => {
    setStep(3);
    setTimeLeft(900);
  };

  // Step 3: Payment completed
  const handlePaymentCompleted = () => {
    alert("Payment completed! Thank you.");
    setAmount("");
    setNetwork(null);
    setSelectedAsset(null);
    localStorage.removeItem("depositStep");
    setStep(1);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {step === 1 && (
        <form onSubmit={handleSubmitForm} className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Deposit Form</h2>
          {/* Select Asset */}
          <div>
            <Label htmlFor="assetSelect">Select Asset:</Label>
            <Select onValueChange={handleAssetChange} value={selectedAsset?.name || ""}>
              <SelectTrigger className="bg-transparent p-2 rounded w-full">
                <SelectValue placeholder="-- Select Asset --" />
              </SelectTrigger>
              <SelectContent>
                {assets.map((asset) => (
                  <SelectItem key={asset._id || asset.name} value={asset.name}>
                    {asset.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Deposit Amount */}
          <div>
            <Label htmlFor="amount">Deposit Amount:</Label>
            <Input
              id="amount"
              type="number"
              className="w-full"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          {/* Network */}
          <div>
            <Label htmlFor="networkSelect">Choose Network:</Label>
            <select
              id="networkSelect"
              className="border p-2 w-full rounded"
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
            >
              <option value="">-- Select Network --</option>
              {availableNetworks.map((net) => (
                <option key={net} value={net}>
                  {net}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" className="w-full bg-blue-600 text-white">
            Continue
          </Button>
        </form>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Deposit Address</h2>
          <p className="text-sm text-gray-700">
            Please deposit your <strong>{selectedAsset?.name}</strong> on the <strong>{network}</strong> network to
            the following address:
          </p>
          <div className="p-2 bg-gray-100 rounded">
            {selectedAsset && (
              <div className="p-4">
                <p className="text-purple-700 text-sm">
                  {`Only send ${amount} of ${selectedAsset.name} to ${selectedAsset.depositAddress}.`}
                </p>
                <p className="text-purple-700 text-sm">
                  Ensure the sender is on the correct network.
                </p>
                <Label htmlFor="Asset_Address" className="flex justify-between text-sm text-gray-500">
                  <span>Wallet Address:</span>
                  <CopyToClipboardButton text={selectedAsset.depositAddress} />
                </Label>
                <Input
                  id="Asset_Address"
                  name="Asset_Address"
                  type="text"
                  value={selectedAsset.depositAddress}
                  disabled
                  readOnly
                  className="bg-transparent p-2 rounded w-full text-gray-700"
                />
              </div>
            )}
          </div>
          <Button onClick={handleProceedToPayment} className="w-full bg-purple-600 text-white">
            Proceed
          </Button>
        </div>
      )}
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Complete Your Payment</h2>
          {timeLeft > 0 ? (
            <p className="text-red-600">
              Please complete your payment within <strong>{formattedTime}</strong>.
            </p>
          ) : (
            <>
              <p className="text-red-600">Time expired. You can no longer complete this deposit.</p>
              {localStorage.removeItem("depositStep")}
              {setStep(1)}
            </>
          )}
          <div className="p-3 bg-gray-100 rounded">
            <p>Deposit Number: <strong>{depositNumber}</strong></p>
            <p>Asset: <strong>{selectedAsset?.name}</strong></p>
            <p>Network: <strong>{network}</strong></p>
            <p>Amount: <strong>{amount}</strong></p>
            <p>Deposit Address: <strong>{depositAddress}</strong></p>
          </div>
          <Button onClick={handlePaymentCompleted} disabled={timeLeft === 0} className="w-full bg-green-600 text-white">
            Payment Completed
          </Button>
        </div>
      )}
    </div>
  );
}