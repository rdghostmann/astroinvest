"use client"

import { useMemo } from "react"
import Image from "next/image"
import { motion } from 'framer-motion'
import binance from "@/public/company/binance-logo.png"
import bybit from "@/public/company/bybit-logo.png"
import coinbase from "@/public/company/coinbase-logo.png"
import coindesk from "@/public/company/coindesk-logo.png"
import coingecko from "@/public/company/coingecko.png"
import coinmarketcap from "@/public/company/coinmarketcap.png"
import cointelegraph from "@/public/company/cointelegraph-logo.png"
import defiLlama from "@/public/company/defiLlama.jpg"
import kraken from "@/public/company/kraken.png"
import tradingview from "@/public/company/Tradingview.png"
import swissborg from "@/public/company/swissborg.png"
import messari from "@/public/company/messari.png"

export default function InfiniteLogoCarousel({
  logos = [
    { src: binance, alt: "Brand logo 1" },
    { src: tradingview, alt: "Brand logo 6" },
    { src: bybit, alt: "Brand logo 2" },
    { src: swissborg, alt: "Brand logo 6" },
    { src: coinbase, alt: "Brand logo 3" },
    { src: coindesk, alt: "Brand logo 4" },
    { src: coingecko, alt: "Brand logo 4" },
    { src: coinmarketcap, alt: "Brand logo 5" },
    { src: cointelegraph, alt: "Brand logo 6" },
    { src: defiLlama, alt: "Brand logo 6" },
    { src: kraken, alt: "Brand logo 6" },
    { src: messari, alt: "Brand logo 6" },
  ],
  speed = 20,
  direction = "left",
  pauseOnHover = true,
}) {
  // Memoize duplicated logos to avoid infinite re-renders
  const duplicatedLogos = useMemo(() => [...logos, ...logos], [logos])

  return (
    <div className="w-full overflow-hidden py-6 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight"> </h2>
          <h2 className="text-3xl font-bold text-gray-800">
          Our Trusted <span className="text-blue-600">Partners</span>
          </h2>
          <p className="text-muted-foreground mt-2">We work with the best brands in the industry</p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex"
          initial={{ x: direction === "right" ? "-100%" : "0%" }}
          animate={{ x: direction === "right" ? "0%" : "-100%" }}
          transition={{
            duration: speed,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
          }}
          whileHover={pauseOnHover ? { x: direction === "right" ? "-100%" : "0%" } : {}}
        >
          {duplicatedLogos.map((logo, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 px-8 py-2"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/* <div className="bg-background rounded-lg p-4 h-32 w-48 flex items-center justify-center"> */}
              <div className="bg-background rounded-lg px-4 h-32 w-48 flex items-center justify-center">
                <Image
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.alt}
                  width={160}
                  height={80}
                  className="max-h-16 w-auto object-contain"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
