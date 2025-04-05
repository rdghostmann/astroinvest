import React from "react";
import Link from "next/link";
import { FaClock, FaPhone, FaFacebook, FaTwitter, FaLinkedin, FaBehance } from "react-icons/fa";

const Header = () => {
  return (
    // <div className="w-full bg-blue-600 py-2 hidden md:block">
    <div className="w-full bg-blue-600 py-2 hidden lg:block  ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-between items-center sm:flex-row ">
          {/* Left Info */}
          <div className="flex my-auto space-x-6 mb-4 sm:mb-0">
            <div className="flex p-1 text-xs sm:text-sm items-center space-x-2 border-l-0 border-r-0 border-white ">
              <FaClock className="text-white" />
              <span className="text-white text-xs font-medium">Mon-Fri 09:00 - 17:00</span>
            </div>
            <div className="flex p-1 text-xs sm:text-sm items-center space-x-2 border-r-0 border-white ">
              <FaPhone className="text-white" />
              <span className="text-white text-xs font-medium">090 - 080 - 0760</span>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex space-x-6">
            <Link href="#" className="text-white hover:opacity-75 transition border rounded-md border-white p-1">
              <FaFacebook />
            </Link>
            <Link href="#" className="text-white hover:opacity-75 transition border rounded-md border-white p-1">
              <FaTwitter />
            </Link>
            <Link href="#" className="text-white hover:opacity-75 transition border rounded-md border-white p-1">
              <FaLinkedin />
            </Link>
            <Link href="#" className="text-white hover:opacity-75 transition border rounded-md border-white p-1">
              <FaBehance />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;