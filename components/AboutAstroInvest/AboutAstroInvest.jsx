import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AboutImg from "@/public/images/about-image.jpg";
import About1 from "@/public/person-holding-silver-iphone-6.png";

const AboutAstroInvest = () => {
  return (
    <div className="w-full bg-white text-slate-700">
      {/* Section 1 */}
      <section className="w-full py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            {/* Image Section */}
            <div className="w-full lg:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={About1}
                  alt="Analytics Dashboard"
                  width={700}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Text Section */}
            <div className="w-full lg:w-1/2 space-y-6">
              <span className="text-sm text-blue-600 uppercase">
                About AstroInvest
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-blue-700">
                Stable Earnings
                <br />
                With a guaranteed
                <br />
                floating rate
              </h2>
              <p className="text-gray-600 leading-relaxed">
                There has always been a demand for quality investment services.<br className="hidden md:block" />
                In an attempt to satisfy this demand, the idea of creating an
                InvestFolio company came up.
              </p>
              <p className="text-gray-600 leading-relaxed">
                InvestFolio is a modern investment company that combines the
                most advanced projects in its work.
              </p>

              <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="w-full py-8 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            {/* Text Section */}
            <div className="w-full lg:w-1/2 space-y-6">

              <h2 className="text-2xl md:text-3xl font-bold text-blue-700">
                Get to know about <span>our company</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                InvestFolio is built on a foundation of trust, transparency, and strategic growth. Our firm is committed to helping investors make informed decisions by offering diversified portfolios, risk-managed opportunities, and consistent returns.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                We focus on delivering stable earnings through a guaranteed floating rate model, ensuring that your investments adapt to market trends while maintaining profitability.
              </p>
              <div>
                <Link href="/about" className="mt-7">
                  <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

            </div>


            {/* Image Section */}
            <div className="w-full lg:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={AboutImg}
                  alt="About AstroInvest"
                  width={700}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutAstroInvest;