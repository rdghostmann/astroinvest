"use client";

import React, { useState } from "react";
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
import { Loader } from "lucide-react";

const RegisterForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [phone, setPhone] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({}); // To track field-specific errors
  const [loading, setLoading] = useState(false); // To track submission state

  const validateFields = (userData) => {
    const errors = {};

    if (!userData.username) {
      errors.username = "Username is required";
    }
    if (!userData.email) {
      errors.email = "Email is required";
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userData.email)) {
      errors.email = "Invalid email format";
    }
    if (!userData.password) {
      errors.password = "Password is required";
    }
    if (!phone) {
      errors.phone = "Phone number is required";
    }
    if (!userData.country) {
      errors.country = "Country is required";
    }
    if (!userData.state) {
      errors.state = "State is required";
    }
    if (!userData.city) {
      errors.city = "City is required";
    }

    return errors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate password confirmation
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    const userData = {
      username,
      email,
      password,
      phone,
      country: selectedCountry?.name || "",
      state: selectedState?.name || "",
      city: selectedCity?.name || "",
    };

    // Validate input fields
    const errors = validateFields(userData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true); // Set loading to true during submission
    try {
      const result = await registerUser(userData);

      if (result.success) {
        toast({
          title: "Registration successful!",
          description: "Check your email to verify your account.",
        });
        router.push(`/verify-email/confirm-email/${encodeURIComponent(email)}`);

        // Reset form fields
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setSelectedCountry(null);
        setSelectedState(null);
        setSelectedCity(null);
        setPhone("");
        setFieldErrors({});
        setPasswordError("");
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: result.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred. Please try again later.",
      });
    } finally {
      setLoading(false); // Reset loading state after submission
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Create an Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {fieldErrors.username && <p className="text-red-500 text-sm">{fieldErrors.username}</p>}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {fieldErrors.password && <p className="text-red-500 text-sm">{fieldErrors.password}</p>}
          </div>

          <div>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              type="password"
              name="confirm-password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
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
            {fieldErrors.phone && <p className="text-red-500 text-sm">{fieldErrors.phone}</p>}
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
              value={selectedCountry ? JSON.stringify(selectedCountry) : ""}
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
            {fieldErrors.country && <p className="text-red-500 text-sm">{fieldErrors.country}</p>}
          </div>

          <div>
            <Label htmlFor="state">State</Label>
            <Select
              onValueChange={(value) => {
                const state = JSON.parse(value);
                setSelectedState(state);
                setSelectedCity(null);
              }}
              value={selectedState ? JSON.stringify(selectedState) : ""}
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
            {fieldErrors.state && <p className="text-red-500 text-sm">{fieldErrors.state}</p>}
          </div>

          <div>
            <Label htmlFor="city">City</Label>
            <Select
              onValueChange={(value) => setSelectedCity(JSON.parse(value))}
              value={selectedCity ? JSON.stringify(selectedCity) : ""}
              disabled={!selectedState}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {selectedState &&
                  City.getCitiesOfState(selectedState.countryCode, selectedState.isoCode).map(
                    (city) => (
                      <SelectItem key={city.name} value={JSON.stringify(city)}>
                        {city.name}
                      </SelectItem>
                    )
                  )}
              </SelectContent>
            </Select>
            {fieldErrors.city && <p className="text-red-500 text-sm">{fieldErrors.city}</p>}
          </div>

          <div>
            <Button
              type="submit"
              disabled={loading} // Disable button while loading
              className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-sm ${
                loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-500"
              }`}
            >
              {loading ? <Loader size={20} /> : "Register"}
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