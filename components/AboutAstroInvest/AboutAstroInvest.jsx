import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import About1 from "@/public/aboutX.png";
import AboutImg from "@/public/images/about-image.jpg";

const AboutAstroInvest = () => {
  return (
    <div className="w-full bg-white text-slate-700">
      {/* About Section */}
      <section className="w-full py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image Section */}
            <div className="w-full lg:w-4/6 mx-auto">
              <Image
                src={About1}
                alt="Analytics Dashboard"
                width={408}
                height={386}
                placeholder="blur"
                className="rounded-lg w-full h-auto shadow-md"
              />
            </div>

            {/* Text Section */}
            <div className="w-full space-y-6">
              <span className="text-sm text-blue-600 uppercase">
                About AstroInvest
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-blue-700">
                Stable Earnings With a guaranteed
                <br />
                floating rate
              </h2>
              <p className="text-gray-600 leading-relaxed">
                There has been always a demand for quality investment services.
                In an attempt to satisfy this demand, the idea of creating an
                AstroInvest company came up.
              </p>
              <p className="text-gray-600 leading-relaxed">
                AstroInvest is a modern investment company that combines the
                most advanced projects in its work.
              </p>

              <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* More Info Section */}
      <section className="w-full py-8 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="border grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-between">
            {/* Text Section */}
            <div className="space-y-6">
              <span className="text-sm text-blue-600 uppercase">
                Our Solid Background on Finance
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-blue-700">
                Get to know about <em>our company</em>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Fusce nec ultrices lectus. Duis nec scelerisque risus. Ut id
                tempor turpis, ac dignissim ipsum. Nulla ullamcorper, ipsum vel
                condimentum congue, mi odio vehicula tellus, sit amet malesuada
                justo sem.
              </p>
              <Link
                href="/about"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
              >
                Read More
              </Link>
            </div>

            {/* Image Section */}
            <div className="w-2/3 mx-auto">
              <Image
                src={AboutImg}
                alt="About AstroInvest"
                width={500}
                height={400}
                placeholder="blur"
                className="rounded-lg w-fit h-auto shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutAstroInvest;
