//RegisterForm.jsx// app/components/RegisterForm.jsx
"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader } from "lucide-react";
import Loading from "@/app/loading";

const RegisterForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Use the correct event parameter
    setLoading(true);

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!username || !email || !password || !confirmPassword) {
      setLoading(false);
      return toast({title:"All fields are required"});
    }

    if (password !== confirmPassword) {
      setLoading(false);
      return toast({title:"Passwords do not match"});
    }

    try {
      // Call the API route using fetch and pass the complete formData
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
      toast({title: "Registration successful!"});
      router.push("/login");
    } catch (error) {
      toast({title: "An error occurred while registering"});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {loading && <Loading />}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Create an Account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="username" className="block text-sm font-medium text-gray-900">
              Username
            </Label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              required
              autoComplete="username"
            />
          </div>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              required
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
              Confirm Password
            </Label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone" className="block text-sm font-medium text-gray-900">
              Phone
            </Label>
            <Input
              type="number"
              name="phone"
              id="phone"
              placeholder="Contact Number"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              required
              autoComplete="phone"
            />
          </div>
          <div>
            <Label htmlFor="country" className="block text-sm font-medium text-gray-900">
              Country
            </Label>
            <Input
              type="text"
              name="country"
              id="country"
              placeholder="Country"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              required
              autoComplete="country"
            />
          </div>
          <div>
            <Label htmlFor="state" className="block text-sm font-medium text-gray-900">
              State
            </Label>
            <Input
              type="text"
              name="state"
              id="state"
              placeholder="State"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
              required
            />
          </div>

          <div>
            <Button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? <Loader className="text-white animate-spin" size={20} /> : "Register"}
            </Button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          <span className="mr-1">Already have an account?</span>
          <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
