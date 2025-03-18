'use client';

import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Logo from "../../public/logo-white.png";
import Image from "next/image";
import { TriangleAlert } from "lucide-react";

const sections = [
  {
    title: "Product",
    links: [
      { name: "Pricing", href: "#" },
      { name: "Marketplace", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Team", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
];

const Footer7 = () => {
  return (
    <section className="pt-20 pb-10 px-8 bg-black w-full text-cyan-50 text-center">
      <div className="container mx-auto">
        <footer>
          <div className="flex flex-col items-center justify-between gap-10 text-center ">
            <div className="flex w-full max-w-96 mx-auto shrink flex-col items-center justify-center gap-6">
              <div className="text-center">
                <span className="w-full py-2 mx-auto flex items-center justify-center gap-4">
                  <Image
                    src={Logo}
                    alt="logo"
                    style={{
                      width: '40px',
                      height: 'auto',
                    }}
                    className="object-cover"
                  />
                  <p className="text-3xl text-white font-semibold">AstroInvest</p>
                </span>
                <p className="mt-6 text-sm text-center text-muted-foreground">
                  Empowering your financial future,<br/> one smart investment at a time.
                </p>
              </div>
              <ul className="flex items-center justify-center space-x-6 text-muted-foreground">
                <li className="font-medium hover:text-white">
                  <a href="#">
                    <FaInstagram className="size-6" />
                  </a>
                </li>
                <li className="font-medium hover:text-white">
                  <a href="#">
                    <FaFacebook className="size-6" />
                  </a>
                </li>
                <li className="font-medium hover:text-white">
                  <a href="#">
                    <FaTwitter className="size-6" />
                  </a>
                </li>
                <li className="font-medium hover:text-white">
                  <a href="#">
                    <FaLinkedin className="size-6" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-6 lg:gap-20">
              {sections.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h3 className="mb-6 font-bold">{section.title}</h3>
                  <ul className="space-y-4 text-sm text-muted-foreground">
                    {section.links.map((link, linkIdx) => (
                      <li
                        key={linkIdx}
                        className="font-medium hover:text-white">
                        <a href={link.href}>{link.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left">
            <p>© 2025 AstroInvest. All rights reserved.</p>
            <ul className="flex justify-center gap-4 lg:justify-start">
              <li className="hover:text-white">
                <a href="#"> Terms and Conditions</a>
              </li>
              <li className="hover:text-white">
                <a href="#"> Privacy Policy</a>
              </li>
            </ul>
          </div>
          {/* <div className="mt-8 text-left text-muted-foreground text-xs">
            <h6 className="mt-4 text-lg font-semibold flex items-center"><TriangleAlert size={20} className="inline-block" color="#ee5353" /> Risk warning</h6>
            <p className="mt-2 text-sm">
              Financial spread trading comes with a high risk of losing money rapidly due to leverage. 83.5% of retail investor accounts lose money when trading CFDs with this provider.
              You should consider whether you understand how spread trading works and whether you can afford to take the high risk of losing your money.
            </p>
            <p className="mt-2 text-sm">
              The content of this website must not be construed as personal advice. We recommend that you seek advice from an independent financial advisor.
            </p>
          </div> */}
        </footer>
      </div>
    </section>
  )
};

export default Footer7;