"use client";

import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css"; // Import Splide CSS
import { Slider } from "@/components/ui/slider";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Award } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import Loading from "@/app/loading";
import { investAmount } from "@/lib/actions";

import { useToast } from "@/hooks/use-toast";


const plans = [
  { type: "gold", roi: 12, minInvest: 150000, maxInvest: 250000, medal: 1 },
  { type: "silver", roi: 8, minInvest: 50000, maxInvest: 150000, medal: 2 },
  { type: "bronze", roi: 5, minInvest: 100, maxInvest: 50000, medal: 3 },
];

const InvestForm = ({ wallets, userID }) => {

  const { toast } = useToast();
  
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [amount, setAmount] = useState(plans[0].minInvest);
  const [loading, setLoading] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(wallets?.[0] || null);

  const dailyProfit = (amount * selectedPlan.roi) / (100 * 30);
  const totalProfit = dailyProfit * 30;

  const handleAmountChange = (value) => {
    setAmount(value[0]);
  };

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    setAmount(plan.minInvest); // Reset amount to the minimum investment for the selected plan
  };

  const handleInvest = async (event) => {
    event.preventDefault();

    if (!selectedWallet) {
      alert("Please select a wallet.");
      return;
    }

    if (amount < selectedPlan.minInvest || amount > selectedPlan.maxInvest) {
      alert(`Amount must be between ${selectedPlan.minInvest} and ${selectedPlan.maxInvest}.`);
      return;
    }

    if (amount > selectedWallet.balance) {
      alert("Insufficient wallet balance.");
      return;
    }

    setLoading(true);

    const payload = {
      userID: userID.toString(),
      planName: selectedPlan.type,
      assetName: selectedWallet.name,
      amount,
      profit: ((amount * selectedPlan.roi) / 100).toFixed(2),
      walletID: selectedWallet.id.toString(),
    };

   
    try {
      const response = await investAmount(payload);
      
      if (response.success) {
        toast({title: "Investment created successfully!"});
      } else {
        alert(response.message || "Failed to create investment.");
      }
    } catch (error) {
      console.error("Error creating investment:", error);
      toast({title: "An error occurred while creating the investment."});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleInvest} className="container mx-auto mb-2 bg-white shadow-md p-4 rounded-lg">
        {loading && <Loading />}
        {/* Display User's Current Balance */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <Label htmlFor="current-balance" className="text-sm text-gray-500">
            Select Wallet
          </Label>
          <Select onValueChange={(value) => setSelectedWallet(wallets.find((wallet) => wallet.id === value))}>
            <SelectTrigger>
              <SelectValue placeholder="Select a wallet" />
            </SelectTrigger>
            <SelectContent>
              {wallets.map((wallet) => (
                <SelectItem key={wallet.id} value={wallet.id}>
                  {wallet.name} - ${wallet.balance}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Investment Plans */}
        <div className="container mx-auto mt-4">
          <div className="grid grid-cols-1 p-2">
            <Splide
              options={{
                type: "loop",
                perPage: 3,
                gap: "1rem",
                drag: "free",
                autoScroll: {
                  speed: 2,
                },
                breakpoints: {
                  768: {
                    perPage: 1,
                  },
                  1024: {
                    perPage: 2,
                  },
                },
              }}
              extensions={{ AutoScroll }}
              aria-label="Investment Plans"
            >
              {plans.length > 0 ? (
                plans.map((plan) => (
                  <SplideSlide key={plan.type}>
                    <Card
                      className={`relative overflow-hidden snap-center shrink-0 w-full md:w-[300px] mx-auto ${plan.type === "gold"
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
                        <h3 className="text-xl font-bold uppercase mb-4">{plan.type} Plan</h3>
                        <div className="text-4xl font-bold mb-2">
                          {plan.roi}% <span className="text-sm">ROI</span>
                        </div>
                        <p className="text-sm text-white mb-4">Daily for 30 Days</p>
                        <div className="bg-black/20 rounded-lg p-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Min. Invest</span>
                            <span>${plan.minInvest}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Max. Invest</span>
                            <span>${plan.maxInvest}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </SplideSlide>
                ))
              ) : (
                <div className="p-4 text-center text-gray-600">No Investment Plans Available</div>
              )}
            </Splide>
          </div>
        </div>

        {/* Investment Calculator */}
        <div className="container mx-auto mt-4">
          {/* Buttons to Choose Plan */}
          <div className="py-4 w-full flex items-center gap-5">
            <p className="">Choose a Plan:</p>
            {plans.map((plan) => (
              <button
              type="button"
                key={plan.type}
                onClick={() => handlePlanSelection(plan)}
                className={`px-4 py-2 rounded-lg font-bold ${selectedPlan.type === plan.type
                  ? "bg-[#FFD700] text-black"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
              >
                {plan.type.charAt(0).toUpperCase() + plan.type.slice(1)} Plan
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1">
            <div className="mt-4 relative overflow-hidden snap-center shrink-0 w-full mx-auto">
              <h2 className="text-2xl font-bold text-center">Profit Calculator</h2>
              <Card className="w-full bg-black backdrop-blur backdrop-contrast-100 text-white mt-8">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1">
                    <div className="lg:col-span-3 space-y-6 mb-2">
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
                            max={selectedWallet?.balance || 0}
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="bg-white text-black border-[#2C1810]"
                            step="5"
                          />
                          <span>USD</span>
                        </div>
                        <Slider
                          value={[amount]}
                          min={selectedPlan.minInvest}
                          max={selectedPlan.maxInvest}
                          step={1}
                          onValueChange={handleAmountChange}
                          className="mt-4 text-white bg-gray-400"
                        />
                        <div className="text-sm text-white mt-2">{amount} USD</div>
                      </div>
                    </div>

                    <div className="w-full bg-gradient-to-br from-[#07071a] to-[#2c0323] text-white p-6 rounded-lg">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm">Daily Profit</div>
                          <div className="text-2xl font-bold">{dailyProfit.toFixed(2)} USD</div>
                        </div>
                        <div>
                          <div className="text-sm">Total Profit</div>
                          <div className="text-2xl font-bold">{totalProfit.toFixed(2)} USD</div>
                        </div>
                        <Button
                          // disabled={loading}
                          type="submit"
                          className="w-fit mx-auto text-black bg-[#FFD700]"
                        >
                          {loading ? "Processing..." : "Invest Now"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InvestForm;