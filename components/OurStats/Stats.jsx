import React from 'react';
import Image from 'next/image';
import DepositImage from "../../public/depositImage2.png";
import MemberImage from "../../public/memberImage.png";
import CountriesImage from "../../public/countriesImage.png";

const stats = [
  {
    id: 1,
    path: DepositImage,
    title: "Total Deposited",
    desc: "62K",
  },
  {
    id: 2,
    path: MemberImage,
    title: "Total Members",
    desc: "70K+",
  },
  {
    id: 3,
    path: CountriesImage,
    title: "Support Countries",
    desc: "178",
  },
];

const Stats = () => {
  return (
    <section className='relative border-b-2 border-gray-200'>
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10 md:py-18">
        {/* Title */}
        {/* <h2 className="text-center text-3xl font-bold md:text-5xl">
          Our Stats
        </h2> */}

        {/* Content */}
        <div className="grid grid-cols-3 gap-6  py-8">
          {stats.map((stat) => (
            <div key={stat.id} className="shadow-xl rounded-lg p-3 text-center flex flex-col items-center justify-center gap-4">
              <div className='w-18 h-18 md:w-36 md:h-36 rounded-full'>
                <Image src={stat.path} alt={stat.title} width={400} height={400} className="rounded-full" />
              </div>
              <p className="text-sm">{stat.title}</p>
              <h2 className="text-xl text-indigo-900 font-bold md:text-3xl">{stat.desc}</h2>
            </div>
          ))}
        </div>
      </div>
    </section>
    
  );
};

export default Stats;

