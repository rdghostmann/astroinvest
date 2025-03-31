import Link from "next/link";
import Logo from "../../public/logo-white.png";

import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const sections = [
  {
    // title: "Product",
    links: [
      { name: "Overview", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Features", href: "#" },
    ],
  },
  {
    // title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Team", href: "#" },
      { name: "Blog", href: "#" },
    ],
  },
  {
    // title: "Resources",
    links: [
      { name: "Sales", href: "#" },
      { name: "Advertise", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  },
];


const Footer7 = ({
  logo = {
    url: "https://www.astroinvest.vercel.app",
    src: "https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "InvestFolio",
  },
}) => {
  return (
    <section className="w-full pt-4">
      <div className="container mx-auto">
        <footer className="w-full">
          <div className="flex flex-col justify-between px-4 pb-4 gap-10 text-center lg:flex-row lg:text-left">
            {/* Left Section */}
            <div className="text-left flex w-full max-w-96 shrink flex-col items-start justify-between gap-6">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">{logo.title}</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                A collection of 100+ responsive HTML templates for your startup business or side project.
              </p>
              <ul className="flex items-center space-x-6 text-muted-foreground">
                <li className="font-medium hover:text-primary">
                  <Link href="#">
                    <FaInstagram className="size-6" />
                  </Link>
                </li>
                <li className="font-medium hover:text-primary">
                  <Link href="#">
                    <FaFacebook className="size-6" />
                  </Link>
                </li>
                <li className="font-medium hover:text-primary">
                  <Link href="#">
                    <FaTwitter className="size-6" />
                  </Link>
                </li>
                <li className="font-medium hover:text-primary">
                  <Link href="#">
                    <FaLinkedin className="size-6" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Right Section */}
            <div className="grid grid-cols-3 gap-6 lg:gap-20">
              {sections.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h3 className="mb-6 font-bold">{section.title}</h3>
                  <ul className="space-y-4 text-sm text-muted-foreground">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx} className="font-medium hover:text-primary">
                        <Link href={link.href}>{link.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-300 text-gray-100 flex flex-col justify-between gap-4 border-t py-4 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left">
            <p>© 2021 InvestFolio.com. All rights reserved.</p>
            <ul className="flex items-center justify-center gap-4 lg:justify-start">
              <li className="hover:text-primary">
                <Link href="#"> Terms and Conditions</Link>
              </li>
              <li className="hover:text-primary">
                <Link href="#"> Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer7;
