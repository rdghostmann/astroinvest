"use client";

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function SwiftDeposit({ assets }) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState("");
  const [depositNumber, setDepositNumber] = useState("");
  const [depositAddress, setDepositAddress] = useState("");
  const [timeLeft, setTimeLeft] = useState(900);
  const [selectedAsset, setSelectedAsset] = useState(null);

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
      setSelectedAsset(assets.find((a) => a.name === storedDepositDetails.asset));

      const lastTimestamp = localStorage.getItem("timestamp");
      const elapsedTime = Math.floor((Date.now() - lastTimestamp) / 1000);
      const remainingTime = Math.max(0, storedTimeLeft - elapsedTime);
      setTimeLeft(remainingTime);
    }
  }, [assets]);

  useEffect(() => {
    if (step === 3) {
      localStorage.setItem(
        "depositDetails",
        JSON.stringify({
          asset: selectedAsset.name,
          amount,
          network,
          depositAddress,
          depositNumber,
        })
      );
      localStorage.setItem("depositStep", "3");
      localStorage.setItem("timeLeft", timeLeft);
      localStorage.setItem("timestamp", Date.now());
    }
  }, [step]);

  useEffect(() => {
    let timerId;
    if (step === 3 && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerId);
            localStorage.removeItem("depositStep");
            return 0;
          }
          localStorage.setItem("timeLeft", prev - 1);
          return prev - 1;
        });
      }, 1000);
    }
    return () => timerId && clearInterval(timerId);
  }, [step, timeLeft]);

  const handleAssetChange = (assetName) => {
    const asset = assets.find((a) => a.name === assetName);
    setSelectedAsset(asset);
    setDepositAddress(asset?.depositAddress || "");
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!selectedAsset || !amount || !network) {
      toast({ description: "Please fill in all fields." });
      return;
    }
    setDepositNumber(uuidv4().replace(/-/g, "").slice(0, 19).toUpperCase());
    setStep(2);
  };

  const handleProceedToPayment = () => {
    setStep(3);
    setTimeLeft(900);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {step === 1 && (
        <form onSubmit={handleSubmitForm} className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Deposit Form</h2>
          <div>
            <Label>Select Asset:</Label>
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
          <div>
            <Label>Deposit Amount:</Label>
            <Input type="number" className="w-full" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <Button type="submit" className="w-full bg-blue-600 text-white">Continue</Button>
        </form>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Deposit Address</h2>
          <p>Deposit {selectedAsset?.name} on the {network} network to:</p>
          <div className="p-2 bg-gray-100 rounded">{depositAddress}</div>
          <Button onClick={handleProceedToPayment} className="w-full bg-purple-600 text-white">Proceed</Button>
        </div>
      )}
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Complete Your Payment</h2>
          {timeLeft > 0 ? <p>Time left: {`${Math.floor(timeLeft / 60)}:${timeLeft % 60}`}</p> : <p>Time expired.</p>}
          <p>Deposit Address: <strong>{depositAddress}</strong></p>
        </div>
      )}
    </div>
  );
}
