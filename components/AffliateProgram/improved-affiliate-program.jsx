import Image from "next/image"
import Link from "next/link"

import AffiliateWomanImage from "../../public/affiliatewoman.png";

export default function AffiliateProgram() {
  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-r from-blue-500 to-indigo-500  text-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left side with woman image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              <Image
                src={AffiliateWomanImage}
                alt="Affiliate program representative"
                width={500}
                height={600}
                className="max-w-full h-auto z-10 relative"
                priority
              />
            </div>
          </div>

          {/* Right side with content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-medium text-indigo-900">What You'll get as</h3>
              <h2 className="text-4xl md:text-5xl font-bold">Affiliate Program</h2>
            </div>

            <div className="space-y-4 max-w-xl">
              <p className="text-base md:text-lg">
                Riovest provides an adaptive and profitable affiliate program for long-term partnership. You will
                receive referral commissions from your partner's deposits and also from his daily income
              </p>

              <p className="text-base md:text-lg">
                The affiliate program is working up to 3 referral levels. To join to the affiliate program, you should
                have an active deposit in the project.
              </p>
            </div>

            {/* Referral levels */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-indigo-900 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <span className="text-4xl md:text-5xl font-bold">10%</span>
                <span className="text-indigo-900">Level 1</span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-indigo-900 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <span className="text-4xl md:text-5xl font-bold">5%</span>
                <span className="text-indigo-900">Level 2</span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-indigo-900 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <span className="text-4xl md:text-5xl font-bold">2%</span>
                <span className="text-indigo-900">Level 3</span>
              </div>
            </div>

            {/* Join button */}
            <div className="pt-6">
              <Link
                href="#"
                className="inline-flex items-center px-8 py-3 bg-indigo-900 text-white hover:bg-indigo-900/90 font-medium rounded-full hover:bg-blue-300 transition-colors"
              >
                Join Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bitcoin scale image - positioned absolutely on smaller screens, as part of the layout on larger ones */}
        {/* <div className="absolute right-4 bottom-4 lg:absolute lg:right-8 lg:bottom-8 xl:right-16 xl:bottom-16">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/btcscale-mpomKfeKcROKvOSMpbgGj0qGhjmnr2.png"
            alt="Bitcoin and dollar scale"
            width={300}
            height={300}
            className="max-w-[150px] md:max-w-[200px] lg:max-w-[300px] h-auto"
          />
        </div> */}
      </div>
    </section>
  )
}

