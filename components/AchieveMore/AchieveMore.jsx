import React from 'react';
import Image from 'next/image';
import Award from "../../public/in-award-icon.svg";
import AwardImage from "../../public/in-stena-2-image.png";
import { ChartNoAxesColumn, RefreshCw } from 'lucide-react';

const AchieveMore = () => {
  return (
    <section className='w-full bg-gray-100'>
      <div className="py-12 ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-5">
            <div className="mb-8 lg:mb-0">
              <span className="text-sm uppercase text-gray-500">Achieve more</span>
              <h1 className="mt-2 text-3xl font-bold">Purpose of a convoy is to keep your team</h1>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-4">
                <div className="bg-purple-500 rounded-full p-3">
                <ChartNoAxesColumn color='#fff' />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Designed for Impact</h3>
                  <p className="text-gray-600">
                    Our innovative solutions are tailored to deliver transformative results, leaving a lasting impression on your business. We prioritize excellence to fuel your growth and success.
                  </p>
                  <a href="#" className="text-blue-500 hover:underline">Discover More<i className="fas fa-circle-chevron-right ml-1"></i></a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-red-500 rounded-full p-3">
                <RefreshCw color='#fff' />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Harmonized with Your Vision</h3>
                  <p className="text-gray-600">
                    Whether your aim is to boost efficiency, amplify revenue, or elevate customer satisfaction, our dedicated team is committed to helping you reach your objectives and make a tangible impact in your sector.
                  </p>
                  <a href="#" className="text-blue-500 hover:underline">Explore Further<i className="fas fa-circle-chevron-right ml-1"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center mt-12">
            <div className="flex-shrink-0">
              <Image src={AwardImage} alt="Award" width={320} height={370} />
            </div>
            <div className="mt-8 lg:mt-0 lg:ml-8">
              <span className="text-sm uppercase text-gray-500">Fully regulated</span>
              <h1 className="mt-2 text-3xl font-bold">Trusted for more than 4 years</h1>
              <p className="text-gray-600 mt-4">Expert in creating tailored financial solutions, enhancing client satisfaction and operational efficiency.</p>
              <div className="flex flex-wrap gap-8 mt-8">
                <div className="flex items-center gap-4">
                  <Image src={Award} alt="Best CCT Broker" width={45} height={42} />
                  <div>
                    <h5 className="font-semibold">Best CCT Broker</h5>
                    <small className="text-gray-500">CryptoConsortium Summit 2020</small>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Image src={Award} alt="Best Execution Broker" width={45} height={42} />
                  <div>
                    <h5 className="font-semibold">Best Execution Broker</h5>
                    <small className="text-gray-500">Forex EXPO Dubai 2020</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchieveMore;

