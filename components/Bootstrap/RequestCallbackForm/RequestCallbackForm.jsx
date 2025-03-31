"use client";
import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const RequestCallbackForm = () => {
  return (
    <div className="callback-form w-full bg-gray-100 py-12" id="contactus">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Request a <em className="text-blue-600">call back</em>
          </h2>
          <span className="text-gray-600">
            Etiam suscipit ante a odio consequat
          </span>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <form id="contact" action="" method="post">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Input
                  name="name"
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <Input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="E-Mail Address"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <Input
                  name="subject"
                  type="text"
                  id="subject"
                  placeholder="Subject"
                  required
                  className="w-full"
                />
              </div>
            </div>
            <div className="mt-6">
              <Textarea
                name="message"
                rows="6"
                id="message"
                placeholder="Your Message"
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              ></Textarea>
            </div>
            <div className="mt-6 text-center">
              <Button
                type="submit"
                id="form-submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
        <div className="text-center mt-6">
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RequestCallbackForm;
