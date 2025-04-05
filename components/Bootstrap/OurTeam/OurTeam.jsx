import Link from "next/link";
import React from "react";
import team01 from "@/public/images/team_01.jpg";
import team02 from "@/public/images/team_02.jpg";
import team03 from "@/public/images/team_03.jpg";
import Image from "next/image";

const OurTeam = () => {
  const teamMembers = [
    {
      name: "Samantha Reynolds",
      role: "Marketing Manager",
      image: team01
    },
    {
      name: "Benjamin Martinez",
      role: "Sales Executive",
      image: team02
    },
    {
      name: "Emily Turner",
      role: "Customer Support",
      image: team03
    },
  ];

  return (
    <div className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-blue-900">
            Our Executive Team
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Meet our talented team, a dynamic group of experts driven by passion
            and innovation.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4 relative shrink-0 rounded-lg overflow-hidden w-36 h-36">
                <Image
                  src={member.image}
                  alt={`${member.name} avatar`}
                  width={370}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-lg font-semibold text-gray-800">
                <Link
                  href="#"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  {member.name}
                </Link>
              </h4>
              <span className="text-gray-500 font-medium">{member.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
