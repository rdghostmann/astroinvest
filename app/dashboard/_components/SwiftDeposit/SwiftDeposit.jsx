"use client";

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // For generating random deposit no. (or you can write your own random function)
import { Button, Input, Label } from "@/components/ui"; // Adjust imports to match your UI library

// Example assets & networks for demonstration
const availableAssets = ["ETH", "BTC", "USDT", "BNB"];
const availableNetworks = [
  "Ethereum (ERC20)",
  "Arbitrum One",
  "BSC (BEP20)",
  "OP Mainnet",
  "Mantle Network",
  "Arbitrum Nova",
  "zkSync Era",
  "Base Mainnet",
  "Linea",
];

export default function SwiftDeposit() {
  const [step, setStep] = useState(1); // Step of the flow: 1->form, 2->show deposit address, 3->complete deposit
  const [asset, setAsset] = useState("");
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState("");

  // For deposit address & summary
  const [depositAddress, setDepositAddress] = useState("");
  const [depositNumber, setDepositNumber] = useState("");

  // Countdown timer (15 minutes = 900 seconds)
  const [timeLeft, setTimeLeft] = useState(900);

  // Generate a deposit address & deposit no. (simulate random generation)
  // You might fetch these from your server in a real app
  function generateDepositDetails() {
    setDepositAddress("0x5e55591530c2001e42123b0440d3f948b9027698");
    // Generate a random 19-char deposit no.
    const random19 = uuidv4().replace(/-/g, "").slice(0, 19).toUpperCase();
    setDepositNumber(random19);
  }

  // Start or reset countdown when we reach the final step
  useEffect(() => {
    let timerId;

    if (step === 3) {
      setTimeLeft(900); // reset countdown to 15 minutes
      timerId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerId);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [step]);

  // Format the countdown as mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  // Step 1: fill in asset, amount, network
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!asset || !amount || !network) return alert("Please fill in all fields.");

    // Go to step 2 => show deposit address
    generateDepositDetails();
    setStep(2);
  };

  // Step 2: show deposit address, proceed to payment summary
  const handleProceedToPayment = () => {
    setStep(3);
  };

  // Step 3: user sees deposit summary with 15-min countdown
  const handlePaymentCompleted = () => {
    // Here you might confirm the deposit on the server side or mark it as completed
    alert("Payment completed! Thank you.");
    // Possibly reset state or navigate away
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {step === 1 && (
        <form onSubmit={handleSubmitForm} className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Deposit Form</h2>
          {/* Select Asset */}
          <div>
            <Label htmlFor="assetSelect">Select Asset:</Label>
            <select
              id="assetSelect"
              className="border p-2 w-full rounded"
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
            >
              <option value="">-- Choose Asset --</option>
              {availableAssets.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
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
            Please deposit your <strong>{asset}</strong> on the <strong>{network}</strong> network to
            the following address:
          </p>
          <div className="p-2 bg-gray-100 rounded">
            <p className="font-mono text-sm break-all">{depositAddress}</p>
          </div>
          <Button
            onClick={handleProceedToPayment}
            className="w-full bg-purple-600 text-white"
          >
            Proceed
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Complete Your Payment</h2>
          {timeLeft > 0 ? (
            <p className="text-red-600">
              Please complete your payment within{" "}
              <strong>{formattedTime}</strong>. Otherwise, the order will be canceled.
            </p>
          ) : (
            <p className="text-red-600">Time expired. You can no longer complete this deposit.</p>
          )}
          <div className="p-3 bg-gray-100 rounded">
            <p>
              Deposit Number: <strong>{depositNumber}</strong>
            </p>
            <p>
              Asset: <strong>{asset}</strong>
            </p>
            <p>
              Network: <strong>{network}</strong>
            </p>
            <p>
              Amount: <strong>{amount}</strong>
            </p>
            <p>
              Deposit Address: <strong>{depositAddress}</strong>
            </p>
          </div>
          {/* Payment Completed button (only clickable if timeLeft > 0) */}
          <Button
            onClick={handlePaymentCompleted}
            disabled={timeLeft === 0}
            className="w-full bg-green-600 text-white"
          >
            Payment Completed
          </Button>
        </div>
      )}
    </div>
  );
}
