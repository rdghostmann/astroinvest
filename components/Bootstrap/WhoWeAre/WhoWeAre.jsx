import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import moreinfo from '@/public/images/more-info.jpg';

const WhoWeAre = () => {
  return (
    <div className="w-full bg-white py-12">
      <div className="container mx-auto px-4">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center"> */}
        <div className="flex flex-wrap items-center justify-center">
          {/* Left Image */}
          <div className="w-full lg:w-[33.75rem]">
            <Image
              src={moreinfo}
              alt="Who we are"
              className="rounded-lg md:mx-auto shadow-md"
              placeholder="blur"
            />
          </div>

          {/* Right Content */}
          <div className="w-full py-7 pl-7 h-full lg:w-[33.75rem]">
            <div className="space-y-4">
              <span className="text-blue-600 text-sm font-medium uppercase">
                Who we are
              </span>
              <h2 className="text-3xl font-bold text-gray-800">
                Get to know about <span className="text-blue-600">our company</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We worked hard to develop a multifunctional cryptocurrency investment space where people from the whole
                globe can earn on digital currencies.
              </p>
              <p className="text-gray-600 leading-relaxed">
                InvestFolio is a dynamic, cutting-edge investment platform that empowers individuals and institutions to grow their wealth and achieve their financial goals.
              </p>
              <p className="text-gray-600 leading-relaxed">
             With a team of experienced professionals and a commitment to excellence, we strive to deliver exceptional value and growth for our clients.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We are dedicated to providing innovative solutions, personalized service, and a transparent investment process that builds trust and confidence.
              </p>             
              <Link
                href="/about"
                className="px-6 py-3 rounded inline-block bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white transition">
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;