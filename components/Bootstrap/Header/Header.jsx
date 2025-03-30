import React from "react";
import Link from "next/link";
import { FaClock, FaPhone, FaFacebook, FaTwitter, FaLinkedin, FaBehance } from "react-icons/fa";

const Header = () => {
  return (
    <div className="w-full bg-blue-600 py-2 hidden md:block">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Left Info */}
          <div className="flex space-x-6">
            <div className="flex items-center space-x-2 border-l pl-4 border-r border-white pr-4">
              <FaClock className="text-white" />
              <span className="text-white text-sm font-medium">Mon-Fri 09:00-17:00</span>
            </div>
            <div className="flex items-center space-x-2 border-r border-white pr-4">
              <FaPhone className="text-white" />
              <span className="text-white text-sm font-medium">090-080-0760</span>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex space-x-4">
            <Link href="#" className="text-white hover:opacity-75 transition border-l pl-4 border-r border-white pr-4">
              <FaFacebook />
            </Link>
            <Link href="#" className="text-white hover:opacity-75 transition">
              <FaTwitter />
            </Link>
            <Link href="#" className="text-white hover:opacity-75 transition border-l pl-4 border-r border-white pr-4">
              <FaLinkedin />
            </Link>
            <Link href="#" className="text-white hover:opacity-75 transition pr-2 border-r border-white ">
              <FaBehance />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;