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
import { ToastAction } from "@/components/ui/toast";

const RegisterForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form state
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [phone, setPhone] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.username) errors.username = "Username is required.";
    if (!formData.email) errors.email = "Email is required.";
    else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
    )
      errors.email = "Invalid email address.";
    if (!formData.password) errors.password = "Password is required.";
    if (!formData.confirmPassword)
      errors.confirmPassword = "Confirm Password is required.";
    else if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match.";
    if (!phone) errors.phone = "Phone number is required.";
    if (!selectedCountry) errors.country = "Country is required.";
    if (!selectedState) errors.state = "State is required.";
    if (!selectedCity) errors.city = "City is required.";

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    const errors = validateForm({ username, email, password, confirmPassword });
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
          phone,
          country: selectedCountry.name,
          state: selectedState.name,
          city: selectedCity.name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast({
        title: "Registration successful!",
        description: "Check your email to verify your account",
        action: (
          <ToastAction altText="verify-email-account">Undo</ToastAction>
        ),
      });
      router.refresh();
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
            <Label htmlFor="username">Username</Label>
            <Input type="text" name="username" id="username" />
            {formErrors.username && (
              <p className="text-red-600 text-sm">{formErrors.username}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" id="email" />
            {formErrors.email && (
              <p className="text-red-600 text-sm">{formErrors.email}</p>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" id="password" />
            {formErrors.password && (
              <p className="text-red-600 text-sm">{formErrors.password}</p>
            )}
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"

            />
            {formErrors.confirmPassword && (
              <p className="text-red-600 text-sm">
                {formErrors.confirmPassword}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <PhoneInput
              name="phone"
              id="phone"
              defaultCountry="us"
              value={phone}
              onChange={(value) => setPhone(value)}

            />
            {formErrors.phone && (
              <p className="text-red-600 text-sm">{formErrors.phone}</p>
            )}
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
            {formErrors.country && (
              <p className="text-red-600 text-sm">{formErrors.country}</p>
            )}
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
            {formErrors.state && (
              <p className="text-red-600 text-sm">{formErrors.state}</p>
            )}
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
            {formErrors.city && (
              <p className="text-red-600 text-sm">{formErrors.city}</p>
            )}
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