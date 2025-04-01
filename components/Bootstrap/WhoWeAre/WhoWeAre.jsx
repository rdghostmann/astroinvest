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
              <span className="text-blue-600 font-medium uppercase">
                Who we are
              </span>
              <h2 className="text-3xl font-bold text-gray-800">
                Get to know about <span className="text-blue-600">our company</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Curabitur pulvinar sem a leo tempus facilisis. Sed non sagittis neque. Nulla consequat tellus nibh, id molestie felis sagittis ut. Nam ullamcorper tempus ipsum in cursus.
                <br />
                <br />
                Praesent at dictum metus. Morbi id hendrerit lectus, nec dapibus ex. Etiam ipsum quam, luctus eu egestas eget, tincidunt.
              </p>
              <Link
                href="#"
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