"use client";
import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
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
        "Sed tincidunt dictum lobortis. Aenean tempus diam vel augue luctus dignissim. Nunc ornare leo tortor.",
    },
    {
      id: 2,
      image: service_02,
      title: "Market Analysis",
      description:
        "Sed tincidunt dictum lobortis. Aenean tempus diam vel augue luctus dignissim. Nunc ornare leo tortor.",
    },
    {
      id: 3,
      image: service_03,
      title: "Historical Data",
      description:
        "Sed tincidunt dictum lobortis. Aenean tempus diam vel augue luctus dignissim. Nunc ornare leo tortor.",
    },
  ];

  return (
    <div className="w-full py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Financial <em className="text-blue-600">Services</em>
          </h2>
          <p className="text-gray-600">
            Aliquam id urna imperdiet libero mollis hendrerit
          </p>
        </div>

        {/* Services Slider for Small Screens */}
        <div className="block md:hidden">
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
            aria-label="Financial Services"
          >
            {services.map((service) => (
              <SplideSlide key={service.id}>
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
              </SplideSlide>
            ))}
          </Splide>
        </div>

        {/* Services Grid for Larger Screens */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialService;