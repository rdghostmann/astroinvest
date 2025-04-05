
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaPinterest } from "react-icons/fa";
import Logo from "@/public/logo-white.png"; // Update the path to your logo

const Footer = () => {
  return (
    <footer className="w-full bg-gray-500 text-zinc-50 dark:bg-neutral-800 dark:text-gray-300">
      {/* Footer Top Section */}
      <div className="px-5 border-b border-gray-200 dark:border-gray-700 py-10">
        <div className="container mx-auto">
          <div className="widget-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="footer-widget logo-widget">
              <figure className="footer-logo mb-4 ">
                <Link className="flex space-x-2 items-baseline" href="/">
                  <Image src={Logo} alt="Logo" className="" width={30} height={8} /> <span className="">InvestFolio</span>
                </Link>
              </figure>
              <div className="text mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
              InvestFolio is a leading global investment company, providing clients with access to the most innovative and diversified investment opportunities.
                </p>
              </div>
              <ul className="info-list space-y-2">
                <li>
                  <i className="fas fa-map-marker-alt"></i> 6th floor, South Bank House, Barrow Street, 4 Dublin, Ireland
                </li>
                <li>
                  <i className="fas fa-envelope"></i> Email:{" "}
                  <Link href="mailto:support@bnbinvest.ltd" className="hover:text-blue-600 dark:hover:text-blue-400">
                    support@investfolio.com
                  </Link>
                </li>
              </ul>
        
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="px-5  bg-gray-100 text-gray-500 dark:bg-neutral-700 py-4 text-center">
        <p className="text-sm">
          © 2023 InvestFolio Investment. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;