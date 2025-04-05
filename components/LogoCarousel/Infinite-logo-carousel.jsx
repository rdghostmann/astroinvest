"use client"

import { useMemo } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function InfiniteLogoCarousel({
  logos = [
    { src: "/placeholder.svg?height=80&width=160", alt: "Brand logo 1" },
    { src: "/placeholder.svg?height=80&width=160", alt: "Brand logo 2" },
    { src: "/placeholder.svg?height=80&width=160", alt: "Brand logo 3" },
    { src: "/placeholder.svg?height=80&width=160", alt: "Brand logo 4" },
    { src: "/placeholder.svg?height=80&width=160", alt: "Brand logo 5" },
    { src: "/placeholder.svg?height=80&width=160", alt: "Brand logo 6" },
  ],
  speed = 20,
  direction = "left",
  pauseOnHover = true,
}) {
  // Memoize duplicated logos to avoid infinite re-renders
  const duplicatedLogos = useMemo(() => [...logos, ...logos], [logos])

  return (
    <div className="w-full overflow-hidden py-10 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Our Trusted Partners</h2>
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
              <div className="bg-background border rounded-lg p-6 h-32 w-48 flex items-center justify-center">
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
