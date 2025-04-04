"use client";
import React from "react";
import ParallaxImg from "@/public/images/fun-facts-bg.jpg"; // Ensure the correct path to your image
import CountUp from "react-countup";
import { Button } from "@/components/ui/button";

const OurSolution = () => {
  return (
    <div
      className="relative mx-auto h-fit py-10 w-full bg-fixed bg-cover bg-center bg-no-repeat shadow-lg"
      style={{
        backgroundImage: `url(${ParallaxImg.src})`, // Dynamically use the imported image
      }}
    >
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/10 z-0"></div> */}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Content */}
          <div className="text-white space-y-6">
            <span className="text-lg font-medium">Empowering Your Business for a Brighter Future</span>
            <h2 className="text-4xl font-bold">
              Strategic Solutions to accelerate your <span className="text-blue-400">business growth</span>
            </h2>
            <p className="text-gray-300">
              We specialize in delivering innovative, results-driven solutions designed to maximize your returns. By aligning smart investment strategies with your business goals, we empower you to achieve long-term profitability and sustained success.
              <br />
              <br />
              Whether you're aiming to optimize operations, increase revenue streams, or enhance customer experiences, our expert team is here to guide your journey. Together, we’ll transform your vision into measurable gains and a stronger market presence.
            </p>
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition text-white">

              Read More
            </Button>
          </div>

          {/* Right Content */}
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">
              <CountUp end={954} duration={20} />
              </div>
              <div className="text-gray-300">Work Hours</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">
                <CountUp end={68} duration={30} />K
              </div>
              <div className="text-gray-300">Total Deposited</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">
                <CountUp end={28} duration={30} />K
              </div>
              <div className="text-gray-300">Great Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">
                <CountUp end={73} duration={30} />K
              </div>
              <div className="text-gray-300">Total Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">
                <CountUp end={178} duration={30} />
              </div>
              <div className="text-gray-300">Support Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">
                <CountUp end={48} duration={30} />K
              </div>
              <div className="text-gray-300">Total Withdrawals</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OurSolution;
