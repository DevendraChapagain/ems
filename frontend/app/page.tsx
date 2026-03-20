"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Users,
  CalendarCheck,
  BarChart2,
  CheckSquare,
  Bell,
  Lock,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Employee Records",
    desc: "Store and manage all employee information, documents, and history in one secure place.",
  },
  {
    icon: CalendarCheck,
    title: "Attendance Tracking",
    desc: "Monitor check-ins, absences, and working hours with automated daily and weekly reports.",
  },
  {
    icon: BarChart2,
    title: "Performance Monitoring",
    desc: "Set goals, track KPIs, and generate detailed performance reviews for your entire team.",
  },
  {
    icon: CheckSquare,
    title: "Task Management",
    desc: "Assign tasks, set deadlines, and track progress across your entire team in real time.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    desc: "Get real-time alerts for leave requests, deadlines, and important team updates instantly.",
  },
  {
    icon: Lock,
    title: "Role-Based Access",
    desc: "Granular permissions for admins, managers, and employees keeping sensitive data secure.",
  },
];

const stats = [
  { value: "500+", label: "Companies using Kinetic" },
  { value: "10K+", label: "Employees managed" },
  { value: "99.9%", label: "Platform uptime" },
  { value: "24/7", label: "Customer support" },
];

const navLinks: [string, string][] = [
  ["Home", "/"],
  ["About", "/about"],
  ["Plan & Pricing", "/plan"],
  ["Contact", "/contact"],
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fc] text-[#1a1d2e]">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#4C62B3]/10">
        <div className="max-w-6xl mx-auto flex items-center px-6 py-3">

          <Link href="/" className="mr-12 flex-shrink-0">
            <Image
              src="/logo/kinetic Logo.png"
              width={140}
              height={140}
              alt="Kinetic Management System"
              className="h-10 w-auto"
            />
          </Link>

          <nav className="flex-1">
            <ul className="flex justify-center gap-10 list-none m-0 p-0">
              {navLinks.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[#4a4f6a] hover:text-[#4C62B3] text-sm font-medium transition-colors duration-200 no-underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3 ml-12">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-[#4C62B3] border border-[#4C62B3]/40 px-4 py-2 rounded-lg hover:bg-[#4C62B3]/5 transition-colors duration-200 no-underline"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="text-sm font-medium text-white bg-[#4C62B3] px-4 py-2 rounded-lg hover:bg-[#3a4e9a] transition-colors duration-200 no-underline"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* HeroSection */}
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#4C62B3]/8 border border-[#4C62B3]/20 text-[#4C62B3] text-xs font-semibold tracking-widest uppercase px-3.5 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4C62B3]" />
              Employee Management System
            </div>

            <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-[#1a1d2e] mb-5">
              Manage your team<br />
              <span className="text-[#4C62B3]">smarter</span>, not harder.
            </h1>

            <p className="text-[#6b7280] text-lg leading-relaxed mb-8 max-w-md">
              A unified platform to manage employees, track attendance, assign tasks, and monitor performance — all in one place.
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 bg-[#4C62B3] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#3a4e9a] transition-colors duration-200 no-underline"
              >
                Get Started Free
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/auth/login"
                className="text-sm font-medium text-[#6b7280] hover:text-[#4C62B3] transition-colors duration-200 no-underline"
              >
                Already have an account?
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="bg-white border border-[#e8eaf0] rounded-2xl p-6"
              >
                <div className="text-3xl font-extrabold text-[#4C62B3] tracking-tight mb-1">
                  {value}
                </div>
                <div className="text-[#6b7280] text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-xs mx-auto h-px bg-[#e8eaf0]" />

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#4C62B3] text-xs font-bold tracking-widest uppercase mb-3">
              Features
            </p>
            <h2 className="text-4xl font-extrabold tracking-tight text-[#1a1d2e]">
              Everything you need
            </h2>
            <p className="text-[#6b7280] mt-3 text-base max-w-md mx-auto">
              Built for modern teams. Powerful enough for enterprise, simple enough for everyone.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white border border-[#e8eaf0] rounded-2xl p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-[#4C62B3]/8 border border-[#4C62B3]/15 flex items-center justify-center mb-4">
                  <Icon size={20} color="#4C62B3" strokeWidth={1.75} />
                </div>
                <h3 className="font-semibold text-[#1a1d2e] text-[0.95rem] mb-2 tracking-tight">
                  {title}
                </h3>
                <p className="text-[#6b7280] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#4C62B3] rounded-3xl p-14 text-center">
            <p className="text-white/60 text-xs font-bold tracking-widest uppercase mb-3">
              Get Started Today
            </p>
            <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Ready to simplify<br />your HR workflow?
            </h2>
            <p className="text-white/70 text-base mb-8 max-w-sm mx-auto leading-relaxed">
              Join hundreds of companies already using Kinetic to manage their teams more effectively.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 bg-white text-[#4C62B3] text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#f0f2ff] transition-colors duration-200 no-underline"
              >
                Create Free Account
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/auth/login"
                className="text-sm font-medium text-white/80 hover:text-white border border-white/25 px-5 py-3 rounded-xl transition-colors duration-200 no-underline hover:border-white/50"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8eaf0] bg-white py-6 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-[#9ca3af] text-sm">
            © {new Date().getFullYear()} Kinetic. All rights reserved.
          </span>
          <div className="flex gap-6">
            {[["Privacy", "#"], ["Terms", "#"], ["Contact", "/contact"]].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-[#9ca3af] text-sm hover:text-[#4C62B3] transition-colors duration-200 no-underline"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}