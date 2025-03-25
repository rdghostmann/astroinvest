
"use client";

import React, { useActionState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { registerUser } from "@/lib/registerUser";
import { Country, State, City } from "country-state-city";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RegisterForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  // Form state
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const [selectedState, setSelectedState] = React.useState(null);
  const [selectedCity, setSelectedCity] = React.useState(null);
  const [phone, setPhone] = React.useState("");

  const handleRegister = async (prevState, formData) => {
    const username = formData.get("username").trim();
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();

    const userData = {
      username,
      email,
      password,
      phone,
      country: selectedCountry?.name || "",
      state: selectedState?.name || "",
      city: selectedCity?.name || "",
    };

    try {
      const result = await registerUser(userData);

      if (result.success) {
        return { type: "success", text: "Registration successful! Check your email to verify your account." };
      } else {
        return { type: "error", text: result.message };
      }
    } catch (error) {
      return { type: "error", text: "An error occurred. Please try again later." };
    }
  };

  const [message, registerUserAction, pending] = useActionState(handleRegister, null);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Create an Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {message && (
          <div
            className={`p-3 text-center text-sm font-semibold rounded-md ${message.type === "success" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
              }`}
          >
            {message.text}
          </div>
        )}

        <form action={registerUserAction} className="space-y-6">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input type="text" name="username" id="username" required />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" id="email" required />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" id="password" required />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <PhoneInput
              name="phone"
              id="phone"
              defaultCountry="us"
              value={phone}
              onChange={setPhone}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <Select
              onValueChange={(value) => {
                const country = JSON.parse(value);
                setSelectedCountry(country);
                setSelectedState(null);
                setSelectedCity(null);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                {Country.getAllCountries().map((country) => (
                  <SelectItem key={country.isoCode} value={JSON.stringify(country)}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
          </div>

          <div>
            <Label htmlFor="state">State</Label>
            <Select
              onValueChange={(value) => {
                const state = JSON.parse(value);
                setSelectedState(state);
                setSelectedCity(null);
              }}
              disabled={!selectedCountry}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {selectedCountry &&
                  State.getStatesOfCountry(selectedCountry.isoCode).map((state) => (
                    <SelectItem key={state.isoCode} value={JSON.stringify(state)}>
                      {state.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
          </div>

          <div>
            <Label htmlFor="city">City</Label>
            <Select
              onValueChange={(value) => setSelectedCity(JSON.parse(value))}
              disabled={!selectedState}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {selectedState &&
                  City.getCitiesOfState(selectedState.countryCode, selectedState.isoCode).map((city) => (
                    <SelectItem key={city.name} value={JSON.stringify(city)}>
                      {city.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          <div>
            <Button
              type="submit"
              disabled={pending}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              {pending ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
