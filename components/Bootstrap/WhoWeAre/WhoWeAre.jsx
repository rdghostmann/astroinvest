import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import moreinfo from '@/public/images/more-info.jpg';

const WhoWeAre = () => {
  return (
    <div className="w-full bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Image */}
          <div className="w-full">
            <Image
              src={moreinfo}
              alt="Who we are"
              className="rounded-lg shadow-md"
              placeholder="blur"
            />
          </div>

          {/* Right Content */}
          <div className="w-full">
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
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
              >
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