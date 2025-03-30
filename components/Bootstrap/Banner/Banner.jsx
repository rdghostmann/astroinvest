"use client"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css"

export default function Banner() {
  return (
    <div className="banner-container">
      <Splide
        options={{
          type: "loop",
          perPage: 1,
          autoplay: true,
          pauseOnHover: false,
          resetProgress: false,
          height: "500px",
          arrows: true,
          pagination: true,
          interval: 5000,
        }}
        aria-label="Banner Slides"
      >
        <SplideSlide>
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/placeholder.svg?height=500&width=1200')" }}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 md:px-8 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Welcome to Our Website</h2>
              <p className="text-lg md:text-xl max-w-2xl">
                Discover amazing products and services tailored just for you.
              </p>
              <button className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </SplideSlide>

        <SplideSlide>
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/placeholder.svg?height=500&width=1200')" }}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 md:px-8 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Special Offers</h2>
              <p className="text-lg md:text-xl max-w-2xl">
                Take advantage of our limited-time promotions and exclusive deals.
              </p>
              <button className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </SplideSlide>

        <SplideSlide>
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/placeholder.svg?height=500&width=1200')" }}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 md:px-8 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Join Our Community</h2>
              <p className="text-lg md:text-xl max-w-2xl">
                Connect with like-minded individuals and be part of something special.
              </p>
              <button className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </SplideSlide>
      </Splide>
    </div>
  )
}

