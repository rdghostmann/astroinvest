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
import Link from "next/link";

const ROIPlan = () => {
  const plans = [
    { type: "gold", roi: 12, minInvest: 150000, maxInvest: 250000 },
    { type: "silver", roi: 8, minInvest: 50000, maxInvest: 150000 },
    { type: "bronze", roi: 5, minInvest: 100, maxInvest: 50000 },
  ];

  const [selectedPlan, setSelectedPlan] = useState(plans[0]); // Default to the first plan
  const [amount, setAmount] = useState(selectedPlan.minInvest); // Default to the minimum investment amount

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    setAmount(plan.minInvest); // Reset amount to the minimum investment of the selected plan
  };

  const handleAmountChange = (value) => {
    setAmount(value[0]);
  };

  const dailyProfit = (amount * selectedPlan.roi) / 100 / 30; // Calculate daily profit
  const totalProfit = (amount * selectedPlan.roi) / 100; // Calculate total profit

  return (
    <section id="investment-plans" className="plans w-full py-24">

      {/* Investment Plans */}
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Investment Plans</h2>
          <p className="text-gray-600">
            Choose a plan that suits your investment goals.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 p-2">
          <Splide
            options={{
              type: "loop",
              perPage: 2,
              gap: "0.4rem",
              drag: "free",
              autoScroll: {
                speed: 1,
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

      {/* Buttons to Choose Plan */}
      <div className="px-4 py-6  w-fit mx-auto flex items-center gap-5">
        <p className="">Choose a Plan:</p>
        {plans.map((plan) => (
          <button
            type="button"
            key={plan.type}
            onClick={() => handlePlanSelection(plan)}
            className={`p-2 text-xs rounded-lg font-bold ${selectedPlan.type === plan.type
              ? "bg-[#FFD700] text-black"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
          >
            {plan.type.charAt(0).toUpperCase() + plan.type.slice(1)} Plan
          </button>
        ))}
      </div>

      {/* Investment Calculator */}
      <div className="container mx-auto mt-4">


        <div className="grid grid-cols-1">
          <div className="mt-4 relative overflow-hidden snap-center shrink-0 w-full mx-auto">
            <h2 className="text-2xl font-bold text-center">Profit Calculator</h2>
            <Card className=" w-4/5 mx-auto bg-black backdrop-blur backdrop-contrast-100 text-white mt-8">
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
                          min={selectedPlan.minInvest}
                          max={selectedPlan.maxInvest}
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
                      <Link href="/dashboard">
                        <Button
                          type="submit"
                          className="w-fit mx-auto text-black bg-[#FFD700] hover:bg-[#ffd900d7] hover:text-white focus:bg-[#ffd900d7] focus:text-white"
                        >
                          Invest Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROIPlan;
