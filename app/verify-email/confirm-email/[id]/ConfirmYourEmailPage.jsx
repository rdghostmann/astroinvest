"use client";

import React from "react";
import Link from "next/link";
import mailSentImg from "../../../../public/mail-sent.gif";
import Image from "next/image";
import { useParams } from "next/navigation";

// import { useSearchParams } from 'next/navigation';


const ConfirmYourEmailPage = () => {
  const params = useParams();
  const email = params.id; // Get the email from the dynamic route

  // const searchParams = useSearchParams();
  // const email = searchParams.get('id'); // Extract email from query


  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Error</h1>
            <p className="text-gray-600 mb-8">
              No email address found. Please try again.
            </p>
            <Link
              href="/"
              className="bg-cyan-400 hover:bg-cyan-500 text-white font-medium py-2 px-12 rounded-full mb-6 transition-colors"
            >
              Go Back
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
        <div className="relative flex justify-center mb-6">
          {/* Envelope icon */}
          <div className="bg-purple-400 rounded-full w-24 h-24 flex items-center justify-center z-10">
            <Image src={mailSentImg} alt="Mail sent" className="" priority />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Check your inbox, please!</h1>
          <p className="text-gray-600 mb-8">
            We've already sent out the email verification link to <strong>{email}</strong>. Please check it and confirm it's really you to continue.
          </p>

          <Link
            href="/login"
            className="bg-cyan-400 hover:bg-cyan-500 text-white font-medium py-2 px-12 rounded-full mb-6 transition-colors"
          >
            Sure!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmYourEmailPage;