"use client";
import React from "react";
import ParallaxImg from "@/public/images/fun-facts-bg.jpg"; // Ensure the correct path to your image
import CountUp from "react-countup";

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
            <span className="text-lg font-medium">Lorspan ipsum dolor sit amet</span>
            <h2 className="text-4xl font-bold">
              Our solutions for your <span className="text-blue-400">business growth</span>
            </h2>
            <p className="text-gray-300">
            Our innovative solutions are tailored to deliver transformative results, leaving a lasting impression on your business. We prioritize excellence to fuel your growth and success.
              <br />
              <br />
              Whether your aim is to boost efficiency, amplify revenue, or elevate customer satisfaction, our dedicated team is committed to helping you reach your objectives and make a tangible impact in your sector.
            </p>
            <a
              href="#"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Read More
            </a>
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
                <CountUp end={68} duration={20} />K
              </div>
              <div className="text-gray-300">Total Deposited</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">
              <CountUp end={128} duration={20} />K
              </div>
              <div className="text-gray-300">Great Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">
              <CountUp end={73} duration={20} />K
              </div>
              <div className="text-gray-300">Total Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">
                <CountUp end={178} duration={20} />
              </div>
              <div className="text-gray-300">Support Countries</div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurSolution;
