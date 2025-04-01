 {/* Social Media Section */}
//  <div className="border-b border-gray-200 dark:border-gray-700 py-6">
//  <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-4">
//    <div className="mb-4 lg:mb-0">
//      <span>Get connected with us on social networks:</span>
//    </div>
//    <div className="flex space-x-6">
//      <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//        <FaFacebook className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" size={20} />
//      </Link>
//      <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//        <FaTwitter className="text-gray-600 hover:text-blue-400 dark:text-gray-300 dark:hover:text-blue-400" size={20} />
//      </Link>
//      <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//        <FaInstagram className="text-gray-600 hover:text-pink-500 dark:text-gray-300 dark:hover:text-pink-400" size={20} />
//      </Link>
//      <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
//        <FaLinkedin className="text-gray-600 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-500" size={20} />
//      </Link>
//    </div>
//  </div>
// </div>
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaPinterest } from "react-icons/fa";
import Logo from "@/public/logo-white.png"; // Update the path to your logo

const Footer = () => {
  return (
    <footer className="main-footer alternet-2 bg-zinc-50 text-gray-600 dark:bg-neutral-800 dark:text-gray-300">
      {/* Footer Top Section */}
      <div className="footer-top border-b border-gray-200 dark:border-gray-700 py-10">
        <div className="container mx-auto">
          <div className="widget-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="footer-widget logo-widget">
              <figure className="footer-logo mb-4">
                <Link href="/">
                  <Image src={Logo} alt="Logo" width={200} height={50} />
                </Link>
              </figure>
              <div className="text mb-4">
                <p>
                  Binance investment is the first registered digital asset investment company that provides services with a secure and fast transaction infrastructure developed by world standards, governed by an expert team and experienced advisory board.
                </p>
              </div>
              <ul className="info-list space-y-2">
                <li>
                  <i className="fas fa-map-marker-alt"></i> 6th floor, South Bank House, Barrow Street, 4 Dublin, Ireland
                </li>
                <li>
                  <i className="fas fa-envelope"></i> Email:{" "}
                  <Link href="mailto:support@bnbinvest.ltd" className="hover:text-blue-600 dark:hover:text-blue-400">
                    support@bnbinvest.ltd
                  </Link>
                </li>
              </ul>
              <ul className="social-links flex space-x-4 mt-4">
                <li>
                  <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FaTwitter className="text-gray-600 hover:text-blue-400 dark:text-gray-300 dark:hover:text-blue-400" size={20} />
                  </Link>
                </li>
                <li>
                  <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" size={20} />
                  </Link>
                </li>
                <li>
                  <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-gray-600 hover:text-pink-500 dark:text-gray-300 dark:hover:text-pink-400" size={20} />
                  </Link>
                </li>
                <li>
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-gray-600 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-500" size={20} />
                  </Link>
                </li>
                <li>
                  <Link href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                    <FaPinterest className="text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400" size={20} />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Useful Links */}
            <div className="footer-widget links-widget">
              <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
              <ul className="list space-y-2">
                <li>
                  <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-blue-600 dark:hover:text-blue-400">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* What We Do */}
            <div className="footer-widget links-widget">
              <h4 className="text-lg font-semibold mb-4">What We Do</h4>
              <ul className="list space-y-2">
                <li>
                  <Link href="/team" className="hover:text-blue-600 dark:hover:text-blue-400">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="hover:text-blue-600 dark:hover:text-blue-400">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-blue-600 dark:hover:text-blue-400">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom bg-gray-100 dark:bg-neutral-700 py-4 text-center">
        <p className="text-sm">
          © 2023 Binance Investment. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;