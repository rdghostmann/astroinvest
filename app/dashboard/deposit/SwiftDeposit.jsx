"use client";

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Available Assets & Networks
const availableAssets = ["ETH", "BTC", "USDT", "BNB"];
const availableNetworks = [
  "Ethereum (ERC20)", "Arbitrum One", "BSC (BEP20)",
  "OP Mainnet", "Mantle Network", "Arbitrum Nova",
  "Ripple", "Base Mainnet", "Linea"
];

export default function SwiftDeposit() {
  const [step, setStep] = useState(1);
  const [asset, setAsset] = useState("");
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState("");
  const [depositAddress, setDepositAddress] = useState("");
  const [depositNumber, setDepositNumber] = useState("");
  const [timeLeft, setTimeLeft] = useState(900); // 15 min countdown

  function generateDepositDetails(assetName) {
    setDepositAddress("0x5e55591530c2001e42123b0440d3f948b9027698");
    setDepositNumber(uuidv4().replace(/-/g, "").slice(0, 19).toUpperCase());
  }

  useEffect(() => {
    if (step === 3) {
      setTimeLeft(900);
      const timerId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerId);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [step]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!asset || !amount || !network) return alert("Please fill in all fields.");
    generateDepositDetails(asset);
    setStep(2);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {step === 1 && (
        <form onSubmit={handleSubmitForm} className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Deposit Form</h2>
          <div>
            <Label htmlFor="assetSelect">Select Asset:</Label>
            <select id="assetSelect" className="border p-2 w-full rounded"
              value={asset} onChange={(e) => setAsset(e.target.value)}>
              <option value="">-- Choose Asset --</option>
              {availableAssets.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="amount">Deposit Amount:</Label>
            <Input id="amount" type="number" className="w-full" placeholder="Enter amount"
              value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="networkSelect">Choose Network:</Label>
            <select id="networkSelect" className="border p-2 w-full rounded"
              value={network} onChange={(e) => setNetwork(e.target.value)}>
              <option value="">-- Select Network --</option>
              {availableNetworks.map((net) => <option key={net} value={net}>{net}</option>)}
            </select>
          </div>
          <Button type="submit" className="w-full bg-blue-600 text-white">Continue</Button>
        </form>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Deposit Address</h2>
          <p className="text-sm text-gray-700">
            Please deposit your <strong>{asset}</strong> on the <strong>{network}</strong> network to:
          </p>
          <div className="p-2 bg-gray-100 rounded">
            <p className="font-mono text-sm break-all">{depositAddress}</p>
          </div>
          <Button onClick={() => setStep(3)} className="w-full bg-purple-600 text-white">
            Proceed
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Complete Your Payment</h2>
          <p className="text-red-600">
            {timeLeft > 0 ? `Complete payment within ${Math.floor(timeLeft / 60)}:${timeLeft % 60}` : "Time expired."}
          </p>
          <div className="p-3 bg-gray-100 rounded">
            <p>Deposit Number: <strong>{depositNumber}</strong></p>
            <p>Asset: <strong>{asset}</strong></p>
            <p>Network: <strong>{network}</strong></p>
            <p>Amount: <strong>{amount}</strong></p>
            <p>Deposit Address: <strong>{depositAddress}</strong></p>
          </div>
          <Button onClick={() => alert("Payment completed!")} disabled={timeLeft === 0}
            className="w-full bg-green-600 text-white">
            Payment Completed
          </Button>
        </div>
      )}
    </div>
  );
}
