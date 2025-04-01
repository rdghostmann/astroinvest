"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import { PrevButton, NextButton, usePrevNextButtons } from "./EmblaCarouselArrowButtons";
import Image from "next/image";
import Link from "next/link";
import service_01 from "@/public/images/service_01.jpg";
import service_02 from "@/public/images/service_02.jpg";
import service_03 from "@/public/images/service_03.jpg";

const FinancialService = () => {
  const services = [
    {
      id: 1,
      image: service_01,
      title: "Digital Currency",
      description:
        "Explore the world of digital assets and cryptocurrencies. Our platform provides secure and efficient digital currency solutions.",
    },
    {
      id: 2,
      image: service_02,
      title: "Market Analysis",
      description:
        "Stay ahead with in-depth market insights. We offer real-time data and expert analysis to help you make informed financial decisions.",
    },
    {
      id: 3,
      image: service_03,
      title: "Historical Data",
      description:
        "Access detailed historical data to track market trends and make strategic investment choices with confidence.",
    },
  ];
  

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      draggable: true,
      align: "start",
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  return (
    <div className="w-full py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Financial <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-gray-600">
            Aliquam id urna imperdiet libero mollis hendrerit
          </p>
        </div>

        {/* Services Carousel */}
        <section className="embla">
          <div className="embla__viewport overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] p-4"
                >
                  <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">
                        {service.title}
                      </h4>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <Link
                        href="#"
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="embla__controls flex justify-between items-center mt-4">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>

          {/* Pagination Dots */}
          <div className="embla__dots flex justify-center mt-4">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={`embla__dot ${
                  index === selectedIndex ? "embla__dot--selected" : ""
                }`}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FinancialService;