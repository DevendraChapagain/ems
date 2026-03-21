"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, UserPlus } from "lucide-react";

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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
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
    <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center px-4">
      <div className=" flex flex-col w-full max-w-md gap-6">
        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src="/logo/kinetic-logo.png"
              width={140}
              height={46}
              alt="Kinetic"
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#e8eaf0] rounded-2xl p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-[#1a1d2e] tracking-tight">
              Create account
            </h1>
            <p className="text-sm text-[#9ca3af] mt-1">
              Fill in your details to get started
            </p>
          </div>

          <form onSubmit={submitHandler} className="flex flex-col gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <label className="block text-xs font-semibold text-[#4a4f6a] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-[#f8f9fc] border border-[#e8eaf0] rounded-lg text-sm text-[#1a1d2e] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#4C62B3] transition-colors duration-150"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="block text-xs font-semibold text-[#4a4f6a] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-[#f8f9fc] border border-[#e8eaf0] rounded-lg text-sm text-[#1a1d2e] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#4C62B3] transition-colors duration-150"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="block text-xs font-semibold text-[#4a4f6a] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 pr-10 bg-[#f8f9fc] border border-[#e8eaf0] rounded-lg text-sm text-[#1a1d2e] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#4C62B3] transition-colors duration-150"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#4C62B3] transition-colors duration-150"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 bg-[#4C62B3] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#3a4e9a] transition-colors duration-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                "Creating account..."
              ) : (
                <>
                  <UserPlus size={16} strokeWidth={2} />
                  Create Account
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-[#9ca3af] mt-5">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-[#4C62B3] font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#9ca3af] mt-6">
          © {new Date().getFullYear()} Kinetic. All rights reserved.
        </p>
      </div>
    </div>
  );
}
