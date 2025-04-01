import Link from "next/link";
import React from "react";

const Services = () => {
  return (
    <div className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <span className="text-lg font-medium text-blue-600">Services</span>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
            Provide Quality Services
          </h3>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Retirement Solution */}
          <div className="p-6 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md transition">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-4">
              <img
                src="/images/retirement.png" // Replace with the correct image path
                alt="Retirement Solution"
                className="w-full h-full object-contain"
              />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Retirement Solution
            </h4>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
              ipsum id enim finibus ullamcorper.
            </p>
            <Link
              href="#"
              className="text-blue-600 font-medium hover:underline"
            >
              Learn More
            </Link>
          </div>

          {/* Fraud & Protect */}
          <div className="p-6 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md transition">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-4">
              <img
                src="/images/fraud.png" // Replace with the correct image path
                alt="Fraud & Protect"
                className="w-full h-full object-contain"
              />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Fraud & Protect
            </h4>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
              ipsum id enim finibus ullamcorper.
            </p>
            <Link
              href="#"
              className="text-blue-600 font-medium hover:underline"
            >
              Learn More
            </Link>
          </div>

          {/* Risk & Compliance */}
          <div className="p-6 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md transition">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-4">
              <img
                src="/images/risk.png" // Replace with the correct image path
                alt="Risk & Compliance"
                className="w-full h-full object-contain"
              />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Risk & Compliance
            </h4>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
              ipsum id enim finibus ullamcorper.
            </p>
            <Link
              href="#"
              className="text-blue-600 font-medium hover:underline"
            >
              Learn More
            </Link>
          </div>

          {/* Wealth Management */}
          <div className="p-6 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md transition">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-4">
              <img
                src="/images/wealth.png" // Replace with the correct image path
                alt="Wealth Management"
                className="w-full h-full object-contain"
              />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Wealth Management
            </h4>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
              ipsum id enim finibus ullamcorper.
            </p>
            <Link
              href="#"
              className="text-blue-600 font-medium hover:underline"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
