import Image from "next/image";
import { PiggyBank, Coins, Percent } from "lucide-react";
import AboutAstroInvest from "@/components/AboutAstroInvest/AboutAstroInvest";
import OurSolution from "@/components/Bootstrap/OurSolution/OurSolution";
import Footer7 from "@/components/Footer/Footer";
import OurAmazingFeatures from "@/components/OurAmazingFeatures/OurAmazingFeatures";

import PageHeadingImg from "@/public/images/page-heading-bg.jpg";
import ImgBG from "@/public/Ui.png";
import AboutSection from "./AboutSection";


import React from "react";
import Link from "next/link";
import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CiMenuFries } from "react-icons/ci";

const Nav = ({
  logo = {
    url: "/",
    title: "InvestFolio",
  },
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/register" },
  },
}) => {
  return (
    <div className="w-full relative">
      <section className="w-full absolute top-0 left-0 z-20 py-4">
        <div className="flex items-center justify-between px-4 lg:px-10">
          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center justify-between w-full">
            <div className="flex items-center gap-6">
              {/* Logo */}
              <h3 className="text-xl flex items-center font-semibold tracking-tighter">
                <Link href={logo.url} className="flex items-center gap-2 text-white">
                  {logo.title}
                </Link>
              </h3>
              {/* Navigation Links */}
              <div className="flex items-center gap-6">
                <Link
                  href="/"
                  className="text-white text-sm font-medium hover:border-b-2 border-blue-600 hover:text-blue-600 transition"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-white text-sm font-medium hover:border-b-2 border-blue-600 hover:text-blue-600 transition"
                >
                  About
                </Link>
                <Link
                  href="/investment-plans"
                  className="text-white text-sm font-medium hover:border-b-2 border-blue-600 hover:text-blue-600 transition"
                >
                  Investment Plans
                </Link>
                <Link
                  href="/service"
                  className="text-white text-sm font-medium hover:border-b-2 border-blue-600 hover:text-blue-600 transition"
                >
                  Service
                </Link>
              </div>
            </div>
            {/* Auth Buttons */}
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={auth.login.url}>{auth.login.title}</Link>
              </Button>
              <Button asChild size="sm">
                <Link href={auth.signup.url}>{auth.signup.title}</Link>
              </Button>
            </div>
          </nav>

          {/* Mobile Menu */}
          <div className="block lg:hidden w-full">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href={logo.url} className="text-blue-500 flex items-center gap-2">
                <div className="text-lg align-middle font-semibold tracking-tighter pb-2">
                  {logo.title}
                </div>
              </Link>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <CiMenuFries className="size-4 text-blue-500" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <Link href={logo.url} className="flex items-center gap-2">
                        <img src={logo.src} className="max-h-8" alt={logo.alt} />
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 p-4">
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-4"
                    >
                      <AccordionItem value="home" className="border-b-0">
                        <AccordionTrigger className="text-md py-0 font-semibold text-blue-500 hover:text-blue-600 hover:underline">
                          Home
                        </AccordionTrigger>
                      </AccordionItem>
                      <AccordionItem value="about" className="border-b-0">
                        <AccordionTrigger className="text-md py-0 font-semibold text-blue-500 hover:text-blue-600 hover:underline">
                          About
                        </AccordionTrigger>
                      </AccordionItem>
                      <AccordionItem value="investment-plans" className="border-b-0">
                        <AccordionTrigger className="text-md py-0 font-semibold text-blue-500 hover:text-blue-600 hover:underline">
                          Investment Plans
                        </AccordionTrigger>
                      </AccordionItem>
                      <AccordionItem value="service" className="border-b-0">
                        <AccordionTrigger className="text-md py-0 font-semibold text-blue-500 hover:text-blue-600 hover:underline">
                          Service
                        </AccordionTrigger>
                      </AccordionItem>
                    </Accordion>

                    <div className="flex flex-col gap-3">
                      <Button
                        asChild
                        variant="outline"
                        className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                      >
                        <Link href={auth.login.url}>{auth.login.title}</Link>
                      </Button>
                      <Button
                        asChild
                        className="bg-blue-500 text-white hover:bg-blue-600"
                      >
                        <Link href={auth.signup.url}>{auth.signup.title}</Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};





export default function Page() {
  return (
    <>
      <Nav />
      <div
        className="page-heading header-text relative mx-auto h-fit py-24 w-full bg-fixed bg-cover bg-center bg-no-repeat shadow-lg"
        style={{
          backgroundImage: `url(${PageHeadingImg.src})`,
        }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center text-white">
            <h1 className="text-4xl font-bold text-pool">About Us</h1>
          </div>
        </div>
      </div>

      <AboutSection />
      <AboutAstroInvest />
      <div className="w-full py-12 bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-950">
        <div className="md:px-9 grid grid-cols-1 gap-8 items-center lg:grid-cols-2 lg:gap-12">
          {/* Left Section - Text Content */}
          <div className="space-y-6 text-center lg:text-left">
            <h3 className="text-blue-600 text-sm">Safe & Stable & Credible</h3>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Invest to Build Your Wealth
            </h2>
            <p className="text-[#fff] leading-relaxed">
              You have more spare time to do your favorite things and enjoy life. You just need to watch the amount in your account you earn every day.
            </p>

            {/* Features List */}
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                <PiggyBank className="w-8 h-8 text-[#edeb64] animate-bounce" />
                <p className="text-[#D6EAF8]">Daily interest is accrued to your balance</p>
              </div>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                <Coins className="w-8 h-8 text-[#6495ED] animate-bounce" />
                <p className="text-[#D6EAF8]">Several popular payment systems</p>
              </div>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                <Percent className="w-8 h-8 text-[#64ed66] animate-bounce" />
                <p className="text-[#D6EAF8]">Bonus of 3% from each deposit of any referral</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start">
              <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 hover:bg-blue-500 transition duration-300">
                Start Making Money →
              </button>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="flex justify-center mt-10 lg:mt-0">
            <Image
              src={ImgBG}
              alt="Investment Dashboard"
              width={500}
              height={500}
              className="w-full max-w-xs sm:max-w-sm lg:max-w-lg"
            />
          </div>
        </div>
      </div>
      <OurSolution />
      <OurAmazingFeatures />
      <Footer7 />
    </>
  );
}


