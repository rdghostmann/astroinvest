"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import banner1 from "@/public/images/slide_01.jpg";
import banner2 from "@/public/images/slide_02.jpg";
import banner3 from "@/public/images/slide_03.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Banner = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const slides = [
    {
      id: 1,
      image: banner1,
      title: "We are ready to help you",
      subtitle: "Financial Analysis & Consulting",
      description:
        "Discover amazing products and services tailored just for you.",
      buttonText: "Learn More",
    },
    {
      id: 2,
      image: banner2,
      title: "We are here to support you",
      subtitle: "Accounting & Management",
      description:
        "Take advantage of our limited-time promotions and exclusive deals.",
      buttonText: "Get Started",
    },
    {
      id: 3,
      image: banner3,
      title: "We have a solid background",
      subtitle: "Market Analysis & Statistics",
      description:
        "Connect with like-minded individuals and be part of something special.",
      buttonText: "Sign Up",
    },
  ];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <>
      <div className="banner-container w-full md:[80vh] overflow-hidden relative">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="embla__slide flex-[0_0_100%] relative w-full h-[400px] md:h-[500px] lg:h-[600px]"
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* <div className="absolute inset-0 bg-black/40" /> */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 md:px-12 lg:px-16 text-left text-white">
                  <div className="flex flex-col w-11/12">
                    <h6 className="text-blue-600 uppercase text-lg md:text-2xl lg:text-3xl font-semibold mb-4">
                      {slide.title}
                    </h6>
                    <h4 className="text-xl md:text-4xl lg:text-5xl font-bold mb-4">
                      {slide.subtitle}
                    </h4>
                    <p className="text-sm md:text-lg lg:text-xl max-w-lg mb-6">
                      {slide.description}
                    </p>
                   <Link href="/login">
                   <button className="w-fit px-4 py-2 md:px-6 md:py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                      {slide.buttonText}
                    </button>
                   </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Previous and Next Buttons */}
        <button
          className="absolute top-1/2 left-1 transform -translate-y-1/2 text-white p-2 w-fit h-fit rounded-full hover:bg-gray-700 transition"
          onClick={scrollPrev}
        >
          <ChevronLeft />
        </button>
        <button
          className="absolute top-1/2 right-1 transform -translate-y-1/2 text-white p-2 w-fit h-fit rounded-full hover:bg-gray-700 transition"
          onClick={scrollNext}
        >
          <ChevronRight />
        </button>

        {/* Pagination Indicators */}
        <div className="absolute left-1/2 bottom-4 transform -translate-x-1/2 flex justify-center mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${index === selectedIndex
                ? "bg-blue-600"
                : "bg-gray-400 hover:bg-gray-500"
                }`}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
            />
          ))}
        </div>
      </div>

      {/* Request Form Section */}
      <div className="request-form hidden md:block bg-blue-600 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-xl font-bold text-white">
                Request a call back right now?
              </h4>
              <p className="text-white">
                Mauris ut dapibus velit cras interdum nisl ac urna tempor
                mollis.
              </p>
            </div>
            <div>
              <Link
                href="#contact"
                className="inline-block border-2 border-white bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;