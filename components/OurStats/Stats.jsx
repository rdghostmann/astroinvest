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


// import React from 'react';
// import Image from 'next/image';
// import DepositImage from "../../public/depositImage2.png";
// import MemberImage from "../../public/memberImage.png";
// import CountriesImage from "../../public/countriesImage.png";
// import Link from 'next/link';

// import backgroundImg from "../../public/in-avo-12-background.jpg";

// const stats = [
//   {
//     id: 1,
//     path: DepositImage,
//     title: "Total Deposited",
//     desc: "62K",
//   },
//   {
//     id: 2,
//     path: MemberImage,
//     title: "Total Members",
//     desc: "70K+",
//   },
//   {
//     id: 3,
//     path: CountriesImage,
//     title: "Support Countries",
//     desc: "178",
//   },
// ];

// const Stats = () => {
//   return (
//     <section className="relative w-full border-b-2 border-gray-200">
//       {/* background Image */}
//       <Image
//         className="absolute h-full w-full bg-cover bg-center"
//         src={backgroundImg}
//         alt=""
//         sizes="100vw"
//         style={{ objectFit: 'cover' }}
//         priority
//       />

//       <div className="py-5 mt-4 relative z-10">
//         <div className="container mx-auto">
//           <div className="text-center">
//             <h1 className="text-white">We are committed to meeting your CFD and FX trading needs</h1>
//             <p className="lead text-white hidden lg:block">
//               Excepteur occaeca cupidata non proident fugiat nulla pariatur quasi architecto beatae, sunt in culpa quila officia deserunt mollit anim id est aute laborum.
//             </p>
//             <Link href="#">
//               <span className="btn btn-primary rounded-pill mt-2 mb-4">Discover the benefits</span>
//             </Link>
//           </div>
//           {/* Content */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
//             {stats.map((stat) => (
//               <div key={stat.id} className="shadow-xl rounded-lg p-3 text-center flex flex-col items-center justify-center gap-4 bg-white">
//                 <div className="w-18 h-18 md:w-36 md:h-36 rounded-full overflow-hidden">
//                   <Image src={stat.path} alt={stat.title} width={400} height={400} className="rounded-full" />
//                 </div>
//                 <p className="text-sm">{stat.title}</p>
//                 <h2 className="text-xl text-indigo-900 font-bold md:text-3xl">{stat.desc}</h2>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Stats;