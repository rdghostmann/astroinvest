"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import placeholder from "@/public/images/team_01.jpg"; // Local placeholder image

const Testimonial = () => {
  const testimonials = [
    {
      name: "George Walker",
      role: "Chief Financial Analyst",
      feedback:
        "Nulla ullamcorper, ipsum vel condimentum congue, mi odio vehicula tellus, sit amet malesuada justo sem sit amet quam. Pellentesque in sagittis lacus.",
      image: placeholder,
    },
    {
      name: "John Smith",
      role: "Market Specialist",
      feedback:
        "In eget leo ante. Sed nibh leo, laoreet accumsan euismod quis, scelerisque a nunc. Mauris accumsan, arcu id ornare malesuada, est nulla luctus nisi.",
      image: placeholder,
    },
    {
      name: "David Wood",
      role: "Chief Accountant",
      feedback:
        "Ut ultricies maximus turpis, in sollicitudin ligula posuere vel. Donec finibus maximus neque, vitae egestas quam imperdiet nec. Proin nec mauris eu tortor consectetur tristique.",
      image: placeholder,
    },
    {
      name: "Andrew Boom",
      role: "Marketing Head",
      feedback:
        "Curabitur sollicitudin, tortor at suscipit volutpat, nisi arcu aliquet dui, vitae semper sem turpis quis libero. Quisque vulputate lacinia nisl ac lobortis.",
      image: placeholder,
    },
  ];

  const [viewportWidth, setViewportWidth] = useState(1);

  // Dynamically set the number of slides per view based on screen size
  useEffect(() => {
    const updateViewportWidth = () => {
      if (window.innerWidth >= 1024) {
        setViewportWidth(3); // Large screens
      } else if (window.innerWidth >= 768) {
        setViewportWidth(2); // Medium screens
      } else {
        setViewportWidth(1); // Small screens
      }
    };

    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  // Embla carousel for the left slider
  const [emblaRefLeft, emblaApiLeft] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      draggable: true,
      slidesToScroll: viewportWidth,
    },
    [
      AutoScroll({
        interval: 5000, // Auto-scroll every 5 seconds
        stopOnInteraction: true,
        direction: "ltr", // Slide left-to-right
      }),
    ]
  );

  // Embla carousel for the right slider
  const [emblaRefRight, emblaApiRight] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      draggable: true,
      slidesToScroll: viewportWidth,
    },
    [
      AutoScroll({
        interval: 5000, // Auto-scroll every 5 seconds
        stopOnInteraction: true,
        direction: "rtl", // Slide right-to-left
      }),
    ]
  );

  return (
    <div className="testimonials border w-full py-12 bg-gray-100">
      <div className="container mx-auto px-4 space-y-16">
        {/* Section Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            What they say <span className="text-blue-600">about us</span>
          </h2>
          <p className="text-gray-600">Testimonials from our greatest clients</p>
        </div>

        {/* Testimonial Slider sliding left */}
        <div className="embla" ref={emblaRefLeft}>
          <div className="embla__container flex">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`embla__slide flex-[0_0_${100 / viewportWidth}%] px-4`}
              >
                <div className="bg-white text-gray-800 flex flex-col gap-6 rounded-xl border shadow-sm max-w-96 p-6 select-none">
                  <div className="mb-4 flex gap-4">
                    <span className="relative flex shrink-0 overflow-hidden w-16 h-16 rounded-full ring-1 ring-gray-300">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="object-cover"
                        fill
                      />
                    </span>
                    <div className="text-sm">
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <q className="text-gray-600">{testimonial.feedback}</q>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Slider sliding right */}
        <div className="embla" ref={emblaRefRight}>
          <div className="embla__container flex">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`embla__slide flex-[0_0_${100 / viewportWidth}%] px-4`}
              >
                <div className="bg-white text-gray-800 flex flex-col gap-6 rounded-xl border shadow-sm max-w-96 p-6 select-none">
                  <div className="mb-4 flex gap-4">
                    <span className="relative flex shrink-0 overflow-hidden w-16 h-16 rounded-full ring-1 ring-gray-300">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="object-cover"
                        fill
                      />
                    </span>
                    <div className="text-sm">
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <q className="text-gray-600">{testimonial.feedback}</q>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;