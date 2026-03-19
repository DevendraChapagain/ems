"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("User Registered:", data);
        router.push("/auth/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#111522]">
      <Card className="w-300 max-w-md rounded-2xl bg-[#1A1F33]">
        <CardHeader>
          <CardTitle className="text-white text-3xl text-center font-Bold">
            Create Account
          </CardTitle>
          <p className="text-[16px] text-[#F5F1EA]/80 text-center mt-3">
            Create to your personal account.{" "}
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={submitHandler} className="flex flex-col gap-5">
            <div>
              <Label className="text-[#707070] text-[0.9rem] mb-2">Name</Label>
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-[#707070] py-5 px-4 focus:ring-[#4C62B3] focus:border-[#4C62B3] placeholder:text-gray-400 text-white"
              />
            </div>

            <div>
              <Label className="text-[#707070] text-[0.9rem] mb-2">Email</Label>
              <Input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-[#707070] py-5 px-4 focus:ring-[#4C62B3] focus:border-[#4C62B3] placeholder:text-gray-400 text-white"
              />
            </div>

            <div>
              <Label className="text-[#707070] text-[0.9rem] mb-2">
                Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-[#707070] py-5 px-4 focus:ring-[#4C62B3] focus:border-[#4C62B3] placeholder:text-gray-400 text-white"
                />
                <button
                type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707070] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="bg-[#4C62B3] hover:bg-[#405296] text-white font-semibold py-5 px-4 rounded-lg transition-all duration-200 mt-2"
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have Account?{" "}
            <Link href="/auth/login" className="text-[#4C62B3] hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
