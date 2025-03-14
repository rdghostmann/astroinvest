"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Award } from "lucide-react";
import { Label } from "@/components/ui/label";
import { investAmount } from "@/lib/actions";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { useSession } from "next-auth/react";

const plans = [
  { type: "gold", roi: 12, minInvest: 150000, maxInvest: 250000, medal: 1 },
  { type: "silver", roi: 8, minInvest: 50000, maxInvest: 150000, medal: 2 },
  { type: "bronze", roi: 5, minInvest: 100, maxInvest: 50000, medal: 3 },
];

const InvestForm = () => {
  const { data: session } = useSession(); // Get the session data
  const userID = session?.user?.id; // Get the userID from the session

  // Retrieve user object from Zustand store
  const { user } = useUserStore();
  const balance = user?.walletBalance;

  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [amount, setAmount] = useState(plans[0].minInvest);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const dailyProfit = (amount * selectedPlan.roi) / (100 * 30);
  const totalProfit = dailyProfit * 30;

  const handleInvest = async (event) => {
    event.preventDefault();

    if (amount < 100) {
      alert("Invalid investment amount");
      return;
    }
    if (amount > balance) {
      alert("Insufficient balance");
      return;
    }

    setLoading(true);

    const payload = {
      userID,
      planName: selectedPlan.type,
      amount,
      profit: ((amount * selectedPlan.roi) / 100).toFixed(2),
    };

    // console.log("Payload:", payload);
    const response = await investAmount(payload);

    if (response.success) {
      router.push("/dashboard");
    } else {
      alert("Investment failed");
    }

    setLoading(false);
  };

  const handleAmountChange = (value) => {
    setAmount(value[0]);
  };

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    setAmount(plan.minInvest); // Reset amount when plan changes
  };

  return (
    <form onSubmit={handleInvest} className="mb-2 bg-white shadow-md p-4 rounded-lg">
      {loading && <Loading />}
      {/* Display User's Current Balance */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <Label htmlFor="current-balance" className="text-sm text-gray-500">
          Current Balance
        </Label>
        <Input
          placeholder="$0"
          type="number"
          id="current-balance"
          name="current-balance"
          className="border-none bg-transparent p-3 rounded w-full"
          value={!balance ? "..." : balance}
          disabled
        />
      </div>

      {/* Investment Plans */}
      <div className="py-3 overflow-x-auto">
        <div className="w-[90%] md:w-[300px] flex space-x-6 snap-x snap-mandatory">
          {plans.map((plan) => (
            <Card
              key={plan.type}
              className={`relative overflow-hidden snap-center shrink-0 w-[90%] md:w-[300px] mx-auto ${plan.type === "gold"
                ? "bg-[#FFD700]/10 bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-black"
                : plan.type === "silver"
                  ? "bg-[#C0C0C0]/10 bg-gradient-to-r from-[#C0C0C0] to-[#A9A9A9]"
                  : "bg-gradient-to-r from-[#CD7F32] to-[#8B4513] border-[#CD7F32]"
                } border-2`}
              onClick={() => handlePlanSelection(plan)}
            >
              <CardHeader className="flex items-center pb-2">
                <div
                  className={`border-4 p-3 rounded-full ${plan.type === "gold"
                    ? "bg-[#FFD700]/10 border-[#FFD700]"
                    : plan.type === "silver"
                      ? "bg-[#C0C0C0]/10 border-[#C0C0C0]"
                      : "bg-[#CD7F32]/10 border-[#CD7F32]"
                    }`}
                >
                  <Award
                    className={`h-8 w-8 ${plan.type === "gold"
                      ? "text-[#FFD700]"
                      : plan.type === "silver"
                        ? "text-[#C0C0C0]"
                        : "text-[#CD7F32]"
                      }`}
                  />
                </div>
              </CardHeader>

              <CardContent className="pt-12 text-center">
                <h3 className="text-xl font-bold uppercase mb-4">
                  {plan.type} plan
                </h3>
                <div className="text-4xl font-bold mb-2">
                  {plan.roi}% <span className="text-sm">ROI</span>
                </div>
                <p className="text-sm text-white mb-4">Daily for 30 Days</p>
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="">Min. Invest</span>
                    <span className="">${plan.minInvest}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="">Max. Invest</span>
                    <span className="">${plan.maxInvest}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Investment Calculator */}
      <Card className="w-full bg-black backdrop-blur backdrop-contrast-100 text-white mt-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <div>
                <Label htmlFor="amount" className="text-lg font-medium">
                  Enter Amount:
                </Label>
                <div className="flex items-center gap-4 mt-2">
                  <Input
                    type="number"
                    id="amount"
                    name="amount"
                    min="20"
                    max={balance}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="bg-white text-black border-[#2C1810]"
                  />
                  <span>USD</span>
                </div>
                <Slider
                  value={[amount]}
                  min={selectedPlan.minInvest}
                  max={selectedPlan.maxInvest}
                  step={1}
                  onValueChange={handleAmountChange}
                  className="mt-4"
                />
                <div className="text-sm text-white mt-2">{amount} USD</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#07071a] to-[#2c0323] text-white p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <div className="text-sm">Daily Profit</div>
                  <div className="text-2xl font-bold">
                    {dailyProfit.toFixed(2)} USD
                  </div>
                </div>
                <div>
                  <div className="text-sm">Total Profit</div>
                  <div className="text-2xl font-bold">
                    {totalProfit.toFixed(2)} USD
                  </div>
                </div>
                <Button
                  onClick={handleInvest}
                  disabled={loading}
                  type="submit"
                  className="w-full text-black bg-[#FFD700]"
                >
                  {loading ? "Processing..." : "Invest Now"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default InvestForm;