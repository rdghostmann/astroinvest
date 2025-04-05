"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"


export default function LogoCarousel({
  logos = [
    { src: "/placeholder.svg?height=80&width=160", alt: "Brand logo 1" },
    { src: "/placeholder.svg?height=80&width=160", alt: "Brand logo 2" },
    { src: "/placeholder.svg?height=80&width=160", alt: "Brand logo 3" },
    { src: "/placeholder.svg?height=80&width=160", alt: "Brand logo 4" },
    { src: "/placeholder.svg?height=80&width=160", alt: "Brand logo 5" },
    { src: "/placeholder.svg?height=80&width=160", alt: "Brand logo 6" },
  ],
  autoPlay = true,
  interval = 3000,
} ) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const visibleLogos = 3 // Number of logos visible at once on desktop

  const totalSlides = Math.max(0, logos.length - visibleLogos + 1)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
    setTimeout(() => setIsAnimating(false), 500) // Match this with the CSS transition time
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
    setTimeout(() => setIsAnimating(false), 500) // Match this with the CSS transition time
  }

  useEffect(() => {
    let intervalId

    if (autoPlay && !isPaused) {
      intervalId = setInterval(() => {
        nextSlide()
      }, interval)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [currentIndex, autoPlay, isPaused, interval])

  return (
    <div
      className="w-full relative py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Our Trusted Partners</h2>
          <p className="text-muted-foreground mt-2">We work with the best brands in the industry</p>
        </div>

        <div className="relative overflow-hidden" ref={containerRef}>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleLogos)}%)`,
            }}
          >
            {logos.map((logo, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/3 flex-shrink-0 px-4">
                <div className="bg-background border rounded-lg p-6 h-32 flex items-center justify-center">
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.alt}
                    width={160}
                    height={80}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            aria-label="Previous logos"
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: totalSlides }).map((_, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => {
                setIsAnimating(true)
                setCurrentIndex(index)
                setTimeout(() => setIsAnimating(false), 500)
              }}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-2 h-2 p-0 rounded-full ${currentIndex === index ? "bg-primary" : "bg-muted"}`}
            />
          ))}

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={currentIndex === totalSlides - 1}
            aria-label="Next logos"
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

