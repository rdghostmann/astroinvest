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
        <p className="text-sm w-fit text-center mx-auto text-blue-600 uppercase" >
          TRY OUR SERVICE
        </p>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Request a <span className="text-blue-600">call back</span>
          </h2>
          <span className="text-gray-600">
            The investment team has a unique mixture of technology and operating expertise in the distributed ledger systems as well as financial and capital markets experience
          </span>
        </div>
        <div className="w-full md:w-10/12 lg:w-9/12 mx-auto bg-blue-600 shadow-md rounded-lg p-6">
          <form id="contact" action="" metod="post" className="">
            <div className="grid grid-cols-1 gap-3 ">
              <div>
                <Input
                  name="name"
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  required
                  className="w-full bg-white outline-none"
                />
              </div>
              <div>
                <Input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="E-Mail Address"
                  required
                  className="w-full bg-white outline-none"
                />
              </div>
              <div>
                <Input
                  name="subject"
                  type="text"
                  id="subject"
                  placeholder="Subject"
                  required
                  className="w-full bg-white outline-none"
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
                className="w-full border border-gray-300 bg-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              ></Textarea>
            </div>
            <div className="mt-6 text-center">
              <Button
                type="submit"
                id="form-submit"
                className="bg-blue-600 border-2 border-white rounded-full text-white px-6 py-3 hover:bg-blue-700 transition"
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestCallbackForm;
