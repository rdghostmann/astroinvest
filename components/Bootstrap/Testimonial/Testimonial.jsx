"use client";
import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
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

  return (
    <div className="testimonials py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            What they say <em className="text-blue-600">about us</em>
          </h2>
          <p className="text-gray-600">Testimonials from our greatest clients</p>
        </div>

        {/* Testimonial Slider */}
        <Splide
          options={{
            type: "loop",
            perPage: 1,
            autoplay: true,
            pauseOnHover: true,
            interval: 5000,
            arrows: true,
            pagination: true,
          }}
          aria-label="Testimonials"
        >
          {testimonials.map((testimonial, index) => (
            <SplideSlide key={index}>
              <div className="testimonial-item bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="rounded-full mb-4"
                />
                <h4 className="text-lg font-semibold text-gray-800">
                  {testimonial.name}
                </h4>
                <span className="text-sm text-blue-600 font-medium">
                  {testimonial.role}
                </span>
                <p className="text-gray-600 mt-4">{testimonial.feedback}</p>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default Testimonial;