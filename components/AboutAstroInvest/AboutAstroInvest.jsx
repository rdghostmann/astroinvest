import React from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import About1 from "@/public/aboutX.png";

const AboutAstroInvest = () => {
  return (
    <div className="bg-white text-slate-700">
      <section className="w-full py-4 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="w-full border lg:w-4/6 mx-auto">
              <Image
                src={About1}
                alt="Analytics Dashboard"
                width={408}
                height={386}
                placeholder="blur"
                className="border rounded-lg w-full h-auto"
              />
            </div>
            <div className="w-full space-y-4">
              <span className="text-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-3 rounded-full" >
                About AstroInvest
              </span>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold text-blue-700">
                Stable Earnings
                <br className='block ' />
                With a guaranteed
                <br className='block' />
                floating rate
              </h2>
              <p className="text-gray-600 leading-relaxed">
                There has been always a demand for quality investment services. In an attempt to satisfy this demand,
                the idea of creating an AstroInvest company came up.
              </p>
              <p className="text-gray-600 leading-relaxed">
                AstroInvest is a modern investment company that combines the
                most advanced projects in its work.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We worked hard to develop a multifunctional cryptocurrency investment space where people from the whole
                globe can earn on digital currencies.
              </p>
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default AboutAstroInvest
