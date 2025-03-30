import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import service_01 from '@/public/images/service_01.jpg';
import service_02 from '@/public/images/service_02.jpg';
import service_03 from '@/public/images/service_03.jpg';

const FinancialService = () => {
  return (
    <div className="py-12 bg-gray-100">
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service Item 1 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Image
              src={service_01}
              alt="Digital Currency"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Digital Currency
              </h4>
              <p className="text-gray-600 mb-4">
                Sed tincidunt dictum lobortis. Aenean tempus diam vel augue
                luctus dignissim. Nunc ornare leo tortor.
              </p>
              <Link
                href="#"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Read More
              </Link>
            </div>
          </div>

          {/* Service Item 2 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Image
              src={service_02}
              alt="Market Analysis"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Market Analysis
              </h4>
              <p className="text-gray-600 mb-4">
                Sed tincidunt dictum lobortis. Aenean tempus diam vel augue
                luctus dignissim. Nunc ornare leo tortor.
              </p>
              <Link
                href="#"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Read More
              </Link>
            </div>
          </div>

          {/* Service Item 3 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Image
              src={service_03}
              alt="Historical Data"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Historical Data
              </h4>
              <p className="text-gray-600 mb-4">
                Sed tincidunt dictum lobortis. Aenean tempus diam vel augue
                luctus dignissim. Nunc ornare leo tortor.
              </p>
              <Link
                href="#"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
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

export default FinancialService;
