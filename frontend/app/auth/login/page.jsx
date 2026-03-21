"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const router = useRouter();

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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {                                          // ← inside try
      const { user, accessToken } = data;

      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        router.push("/admin/dashboard");
      } else if (user.role === "manager") {
        router.push("/manager/dashboard");
      } else if (user.role === "hr") {
        router.push("/hr/dashboard");
      } else {
        router.push("/employee/dashboard");
      }
    } else {
      setError(data.message || "Login failed");
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
        <CardHeader className=" text-white rounded-t-2xl">
          <CardTitle className="text-3xl text-center font-medium">
            EMS Login
          </CardTitle>
          <p className="text-[16px] text-[#F5F1EA]/80 text-center mt-3">
            Login to your personal account.{" "}
          </p>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={submitHandler} className="flex flex-col gap-5">
            <div>
              <Label className="text-[#707070] text-[0.9rem] mb-2">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
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
                  placeholder="Enter your password"
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

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="bg-[#4C62B3] hover:bg-[#405296] text-white font-semibold py-5 px-4 rounded-lg transition-all duration-200 mt-2"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don’t have an account?{" "}
            <Link href="/auth/register" className="text-[#4C62B3] hover:underline">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
