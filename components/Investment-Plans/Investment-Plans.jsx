"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function InvestmentPlans() {
  const [activePlan, setActivePlan] = useState("standard")

  const plans = [
    {
      id: "bronze",
      name: "Bronze Plan",
      percentage: "10%",
      timeframe: "30 days",
      min: "$100",
      max: "$50000",
      duration: "30 days",
      principalIncluded: true,
      recommended: false,
    },
    {
      id: "silver",
      name: "Silver Plan",
      percentage: "20%",
      timeframe: "30 days",
      min: "$50000",
      max: "$150000",
      duration: "30 days",
      principalIncluded: true,
      recommended: true,
    },
    {
      id: "gold",
      name: "Gold Plan",
      percentage: "30%",
      timeframe: "30 days",
      min: "$150000",
      max: "$250000",
      duration: "30 days",
      principalIncluded: true,
      recommended: false,
    },

  ]


  return (
    <div className="container mx-auto px-4 py-12">
      <h3 className="text-3xl font-bold text-gray-800 text-center">
        Investment  <span className="text-blue-600 ">Plans</span>
      </h3>
      <p className="text-gray-700 text-center my-5">Explore our tailored investment plans designed to meet your financial goals.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <Card key={plan.id} className="bg-[#2A2D33] border py-8 rounded-lg overflow-hidden">
            <CardHeader className="bg-[#2A2D33] text-white p-4 text-center font-bold text-xl relative">
              {plan.name}
              {plan.recommended && (
                <div className="absolute top-0 right-0 transform translate-x-[10%] translate-y-[-50%] bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                  RECOMMENDED
                </div>
              )}
            </CardHeader>
            <div className="bg-[#E5C234] text-white text-center py-8">
              <div className="text-5xl font-bold">{plan.percentage}</div>
              <div className="text-sm mt-2">{plan.timeframe}</div>
            </div>
            <CardContent className="bg-[#2A2D33] text-white p-6 space-y-3 text-center">
              <p>MIN : {plan.min}</p>
              <p>MAX : {plan.max}</p>
              <p>DURATION : {plan.duration}</p>
              {/* <p>PRINCIPAL INCLUDED</p> */}
            </CardContent>
            <CardFooter className="p-0 bg-[#2A2D33]">
              <Button
                className={`w-full rounded-none py-6 ${activePlan === plan.id
                    ? "bg-[#E5C234] hover:bg-[#d4b32f] text-black"
                    : "bg-transparent border border-[#E5C234] text-[#E5C234] hover:bg-[#E5C234] hover:text-black"
                  }`}
                onClick={() => setActivePlan(plan.id)}
              >
                DEPOSIT NOW
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

