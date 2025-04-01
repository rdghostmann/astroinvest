import React from "react";
import Link from "next/link";
import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";


import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Nav7 = ({
  logo = {
    url: "/",
    src: "https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "InvestFolio",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Products",
      url: "#",
      items: [
        {
          title: "Blog",
          description: "The latest industry news, updates, and info",
          icon: <Book className="size-5 shrink-0" />,
          url: "/blog",
        },
        {
          title: "Company",
          description: "Our mission is to innovate and empower the world",
          icon: <Trees className="size-5 shrink-0" />,
          url: "/company",
        },
        {
          title: "Careers",
          description: "Browse job listings and discover our workspace",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "/careers",
        },
        {
          title: "Support",
          description:
            "Get in touch with our support team or visit our community forums",
          icon: <Zap className="size-5 shrink-0" />,
          url: "/support",
        },
      ],
    },
    {
      title: "Resources",
      url: "#",
      items: [
        {
          title: "Help Center",
          description: "Get all the answers you need right here",
          icon: <Zap className="size-5 shrink-0" />,
          url: "/help-center",
        },
        {
          title: "Contact Us",
          description: "We are here to help you with any questions you have",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "/contact",
        },
        {
          title: "Status",
          description: "Check the current status of our services and APIs",
          icon: <Trees className="size-5 shrink-0" />,
          url: "/status",
        },
        {
          title: "Terms of Service",
          description: "Our terms and conditions for using our services",
          icon: <Book className="size-5 shrink-0" />,
          url: "/terms",
        },
      ],
    },
    {
      title: "Pricing",
      url: "/pricing",
    },
    {
      title: "Blog",
      url: "/blog",
    },
  ],
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
          <nav className="hidden lg:flex justify-between w-full">
            <div className="flex items-center gap-6">
              {/* Logo */}
              <Link
                href={logo.url}
                className="flex items-center gap-2 text-white"
              >
                <h3 className="text-lg font-semibold tracking-tighter pb-2">
                  {logo.title}
                </h3>
              </Link>
              <div className="flex items-center">
                <div className="flex items-center gap-6">
                  {/* Logo */}
                  <Link href={logo.url} className="flex items-center gap-2 text-white">
                    <h3 className="text-lg font-semibold tracking-tighter pb-2">
                      {logo.title}
                    </h3>
                  </Link>
                  {/* Navigation Links */}
                  <div className="flex items-center gap-6">
                    <Link
                      href="/"
                      className="text-white text-sm font-medium hover:text-blue-600 transition"
                    >
                      Home
                    </Link>
                    <Link
                      href="/pricing"
                      className="text-white text-sm font-medium hover:text-blue-600 transition"
                    >
                      Pricing
                    </Link>
                    <Link
                      href="/about"
                      className="text-white text-sm font-medium hover:text-blue-600 transition"
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      className="text-white text-sm font-medium hover:text-blue-600 transition"
                    >
                      Contact
                    </Link>
                  </div>
                </div>
              </div>
            </div>
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
              <Link
                href={logo.url}
                className="text-white flex items-center gap-2"
              >
                <div className="text-lg align-middle font-semibold tracking-tighter pb-2">
                  {logo.title}
                </div>
              </Link>
              <div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Menu className="size-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>
                        <Link
                          href={logo.url}
                          className="flex text-blue-600 items-center gap-2"
                        >
                          InvestFolio
                        </Link>
                      </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-6 p-4">
                      <Accordion
                        type="single"
                        collapsible
                        className="flex w-full flex-col gap-4"
                      >
                        {menu.map((item) => renderMobileMenuItem(item))}
                      </Accordion>

                      <div className="flex flex-col gap-3">
                        <Button asChild variant="outline">
                          <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button className="bg-blue-600" asChild>
                          <Link href={auth.signup.url}>{auth.signup.title}</Link>
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </section>
      <banner7 />
    </div>
  );
};

export default Nav7;