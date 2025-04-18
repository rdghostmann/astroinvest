import React from 'react'
import Image from 'next/image';
import { ArrowRight } from "lucide-react"
import { FcSafe, FcPrivacy, FcCurrencyExchange, FcBriefcase } from "react-icons/fc";
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'

import wallpaperImg from '@/public/3368024.jpg'
import bitcoinImg from '@/public/bitcoin-blockchain.png'

const OurAmazingFeatures = () => {
  const features = [
    {
      icon: <FcBriefcase className="w-8 h-8 text-blue-400" />,
      title: "Fast & Simple",
      description: "Start investing in under 10 minutes.",
      bgColor: "bg-blue-500/10",
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
      description: "Quickly add & withdraw funds to your Wallet/bank account.",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: <FcSafe className="w-8 h-8 text-blue-400" />,
      title: "Safe and Secure",
      description: "World-class security features ensure your investments and credential safety.",
      bgColor: "bg-blue-500/10",
    },

  ]

  return (
    <div className='w-full relative bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-950'>
      <Image src={wallpaperImg} width={3000} height={2000} alt='' className='absolute top-0 left-0 w-full h-full opacity-20 object-contain' />

      <div className='w-full relative bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-950'>
        {/* Background Gradients */}

        <div className="relative py-10 px-7 md:px-12 lg:px-14 overflow-hidden ">
          {/* Background Gradients */}
          {/* <div className="absolute inset-0 " /> */}
          {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" /> */}
          {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.1),transparent_50%)]" /> */}

          <div className="w-full relative py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <span className="inline-block text-blue-400 font-medium">Our Amazing Features</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Why Should You
                  <br />
                  Invest
                </h2>
                <p className="text-blue-100/80 max-w-lg">
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
                    className={`${feature.bgColor} z-20 border-0 backdrop-blur-sm relative ${index === 1 ? "lg:translate-y-10" : ""} ${index === 3 ? "lg:translate-y-12" : ""}`}
                  >
                    <CardContent className="p-6 space-y-4">
                      <div
                        className={`${feature.bgColor} w-16 h-16 rounded-full flex items-center justify-center bg-opacity-30`}
                      >
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                      <p className="text-blue-100/70">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}

                {/* Decorative Image */}
                {/* <div className="absolute -right-20 z-30 bottom-0 hidden lg:block">
                  <Image
                    src={bitcoinImg}
                    alt="Investment Illustration"
                    width={1016}
                    height={1018}
                    className="object-contain size-8"
                  />
                </div> */}
                {/* <div className="absolute -right-20 z-30 bottom-0 hidden lg:block">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Amazing-Features.PNG-NJG8g5ifzOYIMKY2ZB0KSr13yjQg7S.png"
                    alt="Investment Illustration"
                    width={300}
                    height={300}
                    className="object-contain"
                  />
                </div> */}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default OurAmazingFeatures
