"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Loading from "@/app/loading";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { toast } = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email) {
      setLoading(false);
      return toast({ title: "Email field is required" });
    }

    if (!password) {
      setLoading(false);
      return toast({ title: "Password field is required" });
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      // console.log("SignIn Result:", result); // Debugging: Log the result

      if (result?.error) {
        setError(`Wrong Email or Password`);
        toast({ title: `Wrong Email or Password` });
        setLoading(false);
      } else {
        toast({ title: "Login successful!" });
        router.push("/dashboard"); // Use only router.push for redirection
      }
    } catch (err) {
      toast({ title: "Error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {loading && <Loading />}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="text-red-500">{error}</div>}
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </Label>
            <div className="mt-2">
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
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </Label>
              <div className="text-sm">
                <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                required
              />
            </div>
          </div>
          <div>
            <Button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? <Loader className="text-white animate-spin" size={20} /> : "Sign In"}
            </Button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          <span className="mr-1">Don't have an account?</span>
          <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;