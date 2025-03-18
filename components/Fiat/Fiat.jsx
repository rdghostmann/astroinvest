import React from 'react';
import Image from 'next/image';
import bitcoinImage from '../../public/crypto/btc.png';
import ethereumImage from '../../public/crypto/eth.png';
import solanaImage from '../../public/crypto/sol.png';
import xrpImage from '../../public/crypto/xrp.png';
import dogeImage from '../../public/crypto/doge.png';
import bnbImage from '../../public/crypto/bnb.png';

const Fiat = () => {

  const cryptos = [
    { id: 1, name: 'Bitcoin', path: bitcoinImage },
    { id: 2, name: 'Ethereum', path: ethereumImage },
    { id: 3, name: 'Solana', path: solanaImage },
    { id: 4, name: 'XRP', path: xrpImage },
    { id: 5, name: 'Dogecoin', path: dogeImage },
    { id: 6, name: 'BNB', path: bnbImage },
  ];

  return (
    
    <div className='py-7 px-4'>
      <h3 className='capitalize text-indigo-900 text-center text-lg md:text-3xl font-semibold mb-5'>We accept payment methods</h3>
      <div className='grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 items-center justify-center gap-5'>
        {cryptos.map((crypto) => (
          <div key={crypto.id} className='border w-24 md:w-32 flex flex-col items-center justify-center text-center rounded-xl p-3'>
            <Image src={crypto.path} alt={crypto.name} width={50} height={50} priority/>
            <p>{crypto.name}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Fiat

{/* <section class="py-5 bg-primary in-avo-15" style="background: url(img/in-avo-15-background.webp) no-repeat bottom">
			<div class="container">
				<div class="row gy-3 gy-lg-0">
					<div class="col-md-12 col-lg-4 border-end-lg">
						<div class="pe-1">
							<h2 class="text-white mb-1">Trading products</h2>
							<p class="text-white mb-0">Choose from 6 asset classes and get access to 500+ trading instruments</p>
						</div>
					</div>
					<div class="col-md-12 col-lg-8">
						<div class="row row-cols-3 row-cols-md-6 row-cols-lg-6 d-flex align-items-center gx-0">
							<div class="col text-center">
								<div class="icon-wrap bg-primary rounded-circle flex-shrink-0 mb-1">
									<i class="fas fa-euro-sign fa-lg"></i>
								</div>
								<h6 class="text-white mb-0">Forex</h6>
							</div>
							<div class="col text-center">
								<div class="icon-wrap bg-primary rounded-circle flex-shrink-0 mb-1">
									<i class="fas fa-bitcoin-sign fa-lg"></i>
								</div>
								<h6 class="text-white mb-0">Crypto</h6>
							</div>
							<div class="col text-center">
								<div class="icon-wrap bg-primary rounded-circle flex-shrink-0 mb-1">
									<i class="fas fa-chart-area fa-lg"></i>
								</div>
								<h6 class="text-white mb-0">Indexes</h6>
							</div>
							<div class="col text-center">
								<div class="icon-wrap bg-primary rounded-circle flex-shrink-0 mb-1">
									<i class="fas fa-file-contract fa-lg"></i>
								</div>
								<h6 class="text-white mb-0">Stocks</h6>
							</div>
							<div class="col text-center">
								<div class="icon-wrap bg-primary rounded-circle flex-shrink-0 mb-1">
									<i class="fas fa-tint fa-lg"></i>
								</div>
								<h6 class="text-white mb-0">Energy</h6>
							</div>
							<div class="col text-center">
								<div class="icon-wrap bg-primary rounded-circle flex-shrink-0 mb-1">
									<i class="fas fa-cube fa-lg"></i>
								</div>
								<h6 class="text-white mb-0">Commodities</h6>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section> */}



    // <section class="py-5 mt-1 in-avo-16" style="background: url(img/in-avo-16-background.webp) no-repeat bottom">
		// 	<div class="container">
		// 		<div class="row row-cols-1 row-cols-md-2 gy-2">
		// 			<div class="col d-flex align-items-start">
		// 				<div class="icon-wrap icon-wrap-large bg-primary rounded-circle flex-shrink-0 me-2">
		// 					<img src="img/in-avo-16-icon-1.png" alt="icon" width="54" height="54">
		// 				</div>
		// 				<div>
		// 					<h3>Expert service</h3>
		// 					<p class="mb-0">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.</p>
		// 					<a href="#" class="btn btn-link link-primary text-decoration-none mt-1 mb-2 px-0">Learn more<i class="fas fa-arrow-right ms-1"></i></a>
		// 				</div>
		// 			</div>
		// 			<div class="col d-flex align-items-start">
		// 				<div class="icon-wrap icon-wrap-large bg-primary rounded-circle flex-shrink-0 me-2">
		// 					<img src="img/in-avo-16-icon-2.png" alt="icon" width="54" height="54">
		// 				</div>
		// 				<div>
		// 					<h3>Won an award</h3>
		// 					<p class="mb-0">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.</p>
		// 					<a href="#" class="btn btn-link link-primary text-decoration-none mt-1 mb-2 px-0">Learn more<i class="fas fa-arrow-right ms-1"></i></a>
		// 				</div>
		// 			</div>
		// 			<div class="col d-flex align-items-start">
		// 				<div class="icon-wrap icon-wrap-large bg-primary rounded-circle flex-shrink-0 me-2">
		// 					<img src="img/in-avo-16-icon-3.png" alt="icon" width="54" height="54">
		// 				</div>
		// 				<div>
		// 					<h3>Financial strength</h3>
		// 					<p class="mb-0">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.</p>
		// 					<a href="#" class="btn btn-link link-primary text-decoration-none mt-1 mb-2 px-0">Learn more<i class="fas fa-arrow-right ms-1"></i></a>
		// 				</div>
		// 			</div>
		// 			<div class="col d-flex align-items-start">
		// 				<div class="icon-wrap icon-wrap-large bg-primary rounded-circle flex-shrink-0 me-2">
		// 					<img src="img/in-avo-16-icon-4.png" alt="icon" width="54" height="54">
		// 				</div>
		// 				<div>
		// 					<h3>Integrated support</h3>
		// 					<p class="mb-0">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.</p>
		// 					<a href="#" class="btn btn-link link-primary text-decoration-none mt-1 mb-2 px-0">Learn more<i class="fas fa-arrow-right ms-1"></i></a>
		// 				</div>
		// 			</div>
		// 		</div>
		// 		<div class="row justify-content-center mt-4">
		// 			<div class="col-md-12 col-lg-10">
		// 				<div class="card card-body text-center">
		// 					<h2 class="mt-2 mb-3">Fast account opening in <span class="text-highlight">3 simple steps</span></h2>
		// 					<div class="row row-cols-1 row-cols-md-3">
		// 						<div class="col">
		// 							<div class="icon-wrap bg-primary rounded-circle flex-shrink-0 mb-1">
		// 								<span class="fw-bold fs-4 text-primary">1</span>
		// 							</div>
		// 							<h5 class="mt-1">Register</h5>
		// 							<p>Choose an account type and submit your application</p>
		// 						</div>
		// 						<div class="col">
		// 							<div class="icon-wrap bg-primary rounded-circle flex-shrink-0 mb-1">
		// 								<span class="fw-bold fs-4 text-primary">2</span>
		// 							</div>
		// 							<h5 class="mt-1">Fund</h5>
		// 							<p>Fund your account using a wide range of funding methods</p>
		// 						</div>
		// 						<div class="col">
		// 							<div class="icon-wrap bg-primary rounded-circle flex-shrink-0 mb-1">
		// 								<span class="fw-bold fs-4 text-primary">3</span>
		// 							</div>
		// 							<h5 class="mt-1">Invest</h5>
		// 							<p>Start investing in investment instruments that you like</p>
		// 						</div>
		// 					</div>
		// 					<a href="#" class="btn btn-outline-primary rounded-pill mt-2">Create Account<i class="fas fa-arrow-right fa-sm ms-1"></i></a>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// </section>