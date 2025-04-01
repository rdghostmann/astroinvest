import React from 'react'
import { ArrowRight } from "lucide-react"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FcCalendar, FcSafe, FcCurrencyExchange, FcBriefcase, FcPrivacy } from "react-icons/fc";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FcBriefcase className="w-8 h-8 text-blue-400" />,
      title: "Investor Relations",
      description: "Start investing in under 10 minutes.",
      bgColor: "bg-blue-100",
    },
  {
       icon: <FcPrivacy className="w-8 h-8 text-blue-400" />,
       title: "Deep Encryption",
       description: "All data is encrypted to secure your passwords & personal data.",
       bgColor: "bg-indigo-500/10",
     },
      {
          icon: <FcCurrencyExchange className="w-8 h-8 text-blue-400" />,
          title: "Easy Deposit & Withdrawals",
          description: "Quickly add & withdraw funds to your bank account.",
          bgColor: "bg-blue-500/10",
        },
        {
          icon: <FcSafe className="w-8 h-8 text-blue-400" />,
          title: "Safe and Secure",
          description: "World-class security features ensure your investments are safe.",
          bgColor: "bg-blue-500/10",
        },
  ];

  return (
    <section className="w-full bg-white">
      <div className="container mx-auto">
        <div className="relative py-10 px-7 overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute inset-0 " />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.1),transparent_50%)]" />

          <div className="w-full relative px-2 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <span className="inline-block text-sm text-blue-600 font-medium">WHY CHOOSE US</span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                  Why Should You
                  <br />
                  Invest
                </h2>
                <p className="text-gray-600 max-w-lg">
                  We are a worldwide investment company committed to the principle of revenue maximization and
                  reduction of financial risks in investing.
                </p>
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition text-white">
                  Discover More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Right Content - Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className={`bg-white shadow-md rounded-lg relative ${index === 1 ? "lg:translate-y-10" : ""} ${index === 3 ? "lg:translate-y-12" : ""}`}
                  >
                    <CardContent className="p-6 space-y-4">
                      <div
                        className={`${feature.bgColor} w-16 h-16 rounded-full flex items-center justify-center bg-opacity-30`}
                      >
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;