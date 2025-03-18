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
    <section className='relative'>
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


// <section class="py-5 mt-4 in-avo-12" style="background: url(img/in-avo-12-background.jpg) no-repeat bottom center; background-size: cover;">
// 			<div class="container">
// 				<div class="row justify-content-center">
// 					<div class="col-lg-8 text-center">
// 						<h1 class="text-white">We are committed to meeting your CFD and FX trading needs</h1>
// 						<p class="lead text-white d-none d-lg-block">Excepteur occaeca cupidata non proident fugiat nulla pariatur quasi architecto beatae, sunt in culpa quila officia deserunt mollit anim id est aute laborum.</p>
// 						<a href="#" class="btn btn-primary rounded-pill mt-2 mb-4">Discover the benefits<i class="fas fa-arrow-right ms-1"></i></a>
// 					</div>
// 				</div>
// 				<div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 d-flex align-items-center gy-3 gy-lg-0">
// 					<div class="col">
// 						<div class="card card-body text-center">
// 							<h1 class="text-white mb-0">
// 								<span class="count" data-counter-end="250">250</span>M<span class="text-primary">+</span>
// 							</h1>
// 							<p class="text-white mb-0">Lorem ipsum dolor sit odin amet consectetur.</p>
// 						</div>
// 					</div>
// 					<div class="col">
// 						<div class="card card-body text-center">
// 							<h1 class="text-white mb-0">
// 								<span class="count" data-counter-end="90">90</span><span class="text-primary">%</span>
// 							</h1>
// 							<p class="text-white mb-0">Lorem ipsum dolor sit odin amet consectetur.</p>
// 						</div>
// 					</div>
// 					<div class="col">
// 						<div class="card card-body text-center">
// 							<h1 class="text-white mb-0">
// 								<span class="count" data-counter-end="131">131</span>M<span class="text-primary">+</span>
// 							</h1>
// 							<p class="text-white mb-0">Lorem ipsum dolor sit odin amet consectetur.</p>
// 						</div>
// 					</div>
// 					<div class="col">
// 						<div class="card card-body text-center">
// 							<h1 class="text-white mb-0">
// 								<span class="count" data-counter-end="35">35</span>M<span class="text-primary">+</span>
// 							</h1>
// 							<p class="text-white mb-0">Lorem ipsum dolor sit odin amet consectetur.</p>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</section>