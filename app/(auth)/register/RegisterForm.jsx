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
import { RegionSelect, CountrySelect, StateSelect, CitySelect, PhonecodeSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const RegisterForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // State for region, country, state, city, and phone code
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!username || !email || !password || !confirmPassword || !phone || !region || !country || !state || !city) {
      setLoading(false);
      return toast({ title: "All fields are required" });
    }

    if (password !== confirmPassword) {
      setLoading(false);
      return toast({ title: "Passwords do not match" });
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
          phone: `${phoneCode}${phone}`,
          region,
          country,
          state,
          city,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast({ title: "Registration successful!" });
      router.push("/login");
    } catch (error) {
      toast({ title: "An error occurred while registering" });
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
            <div className="flex gap-2">
              <PhonecodeSelect
                value={phoneCode}
                onChange={(value) => setPhoneCode(value)}
                className="block w-1/3 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
              />
              <Input
                type="number"
                name="phone"
                id="phone"
                placeholder="Contact Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="block w-2/3 h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="region" className="block text-sm font-medium text-gray-900">
              Region
            </Label>
            <RegionSelect
              value={region}
              onChange={(value) => setRegion(value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
          <div>
            <Label htmlFor="country" className="block text-sm font-medium text-gray-900">
              Country
            </Label>
            <CountrySelect
              value={country}
              onChange={(value) => setCountry(value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
          <div>
            <Label htmlFor="state" className="block text-sm font-medium text-gray-900">
              State
            </Label>
            <StateSelect
              country={country}
              value={state}
              onChange={(value) => setState(value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
          <div>
            <Label htmlFor="city" className="block text-sm font-medium text-gray-900">
              City
            </Label>
            <CitySelect
              country={country}
              state={state}
              value={city}
              onChange={(value) => setCity(value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
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