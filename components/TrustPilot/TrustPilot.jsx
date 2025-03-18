import React from 'react';
import Image from 'next/image';
import TrustPilotImage from "../../public/trustpilot-hd-png-download.png";
import ReviewStarImage from "../../public/5-star-customer-feedback-trustpilot-logo-hd-png.png";

const TrustPilot = () => {
  return (
    <div className="w-full bg-gray-100 py-5">
      <div className="container mx-auto px-4 text-center">
        {/* For small screens */}
        <div className="block sm:hidden">
          <div className="flex flex-col items-center">
          <span className="font-bold mx-1">Excellent</span>
            <Image src={ReviewStarImage} alt="Review Stars" width={100} height={20} className="inline-block mx-2" priority />
            <Image src={TrustPilotImage} alt="TrustPilot" width={100} height={20} className="inline-block mx-2" priority />
          </div>
        </div>
        {/* For larger screens */}
        <div className="hidden sm:block">
          <p className="text-lg flex items-center justify-center">
            Our customer says <span className="font-bold mx-1">Excellent</span>
            <Image src={ReviewStarImage} alt="Review Stars" width={100} height={20} className="inline-block mx-2" priority />
            4.5 out of 5 based on 2,954 reviews
            <Image src={TrustPilotImage} alt="TrustPilot" width={100} height={20} className="inline-block mx-2" priority />
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrustPilot;