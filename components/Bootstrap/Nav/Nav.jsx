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
import Banner from "../Banner/Banner";
import { CiMenuFries } from "react-icons/ci";

const Navbar1 = ({
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
                {/* <Link
                  href="/"
                  className="text-white text-sm font-medium hover:border-b-2 border-blue-600 hover:text-blue-600 transition"
                >
                  Home
                </Link> */}
                {/* <Link
                  href="/about"
                  className="text-white text-sm font-medium hover:border-b-2 border-blue-600 hover:text-blue-600 transition"
                >
                  About
                </Link> */}
                {/* <Link
                  href="#investment-plans"
                  className="text-white text-sm font-medium hover:border-b-2 border-blue-600 hover:text-blue-600 transition"
                >
                  Investment Plans
                </Link> */}
                {/* <Link
                  href="/service"
                  className="text-white text-sm font-medium hover:border-b-2 border-blue-600 hover:text-blue-600 transition"
                >
                  Service
                </Link> */}
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
              <Link href={logo.url} className="text-white flex items-center gap-2">
                <div className="text-lg align-middle font-semibold tracking-tighter pb-2">
                  {logo.title}
                </div>
              </Link>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <CiMenuFries className="size-4" />
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
                        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                          Home
                        </AccordionTrigger>
                      </AccordionItem>
                      <AccordionItem value="about" className="border-b-0">
                        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                          About
                        </AccordionTrigger>
                      </AccordionItem>
                      <AccordionItem value="investment-plans" className="border-b-0">
                        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                          Investment Plans
                        </AccordionTrigger>
                      </AccordionItem>
                      <AccordionItem value="service" className="border-b-0">
                        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                          Service
                        </AccordionTrigger>
                      </AccordionItem>
                    </Accordion>

                    <div className="flex flex-col gap-3">
                      <Button asChild variant="outline">
                        <Link href={auth.login.url}>{auth.login.title}</Link>
                      </Button>
                      <Button asChild>
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
      <Banner />
    </div>
  );
};

export default Navbar1;