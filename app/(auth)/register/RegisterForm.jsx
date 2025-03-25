"use client";

import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader } from "lucide-react";
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
import { registerUser } from "@/lib/registerUser";

const initialState = { errors: null };

function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [state, formAction] = useFormState(registerUser, initialState);
  const { pending } = useFormStatus();

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [phone, setPhone] = useState("");

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Create an Account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={formAction} className="space-y-6">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input type="text" name="username" id="username" required />
            {state.errors?.username && (
              <p className="text-red-600 text-sm">{state.errors.username}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" id="email" required />
            {state.errors?.email && (
              <p className="text-red-600 text-sm">{state.errors.email}</p>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" id="password" required />
            {state.errors?.password && (
              <p className="text-red-600 text-sm">{state.errors.password}</p>
            )}
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input type="password" name="confirmPassword" id="confirmPassword" required />
            {state.errors?.confirmPassword && (
              <p className="text-red-600 text-sm">{state.errors.confirmPassword}</p>
            )}
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <PhoneInput name="phone" id="phone" defaultCountry="us" value={phone} onChange={setPhone} />
            {state.errors?.phone && <p className="text-red-600 text-sm">{state.errors.phone}</p>}
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
            {state.errors?.country && <p className="text-red-600 text-sm">{state.errors.country}</p>}
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
            {state.errors?.state && <p className="text-red-600 text-sm">{state.errors.state}</p>}
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Select onValueChange={(value) => setSelectedCity(JSON.parse(value))} disabled={!selectedState}>
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
            {state.errors?.city && <p className="text-red-600 text-sm">{state.errors.city}</p>}
          </div>
          <div>
            <Button type="submit" disabled={pending} className="flex w-full justify-center bg-indigo-600 text-white px-3 py-1.5 text-sm font-semibold rounded-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              {pending ? <Loader className="text-white animate-spin" size={20} /> : "Register"}
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
}

export default RegisterForm;
