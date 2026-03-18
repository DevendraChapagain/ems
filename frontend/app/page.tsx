"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold">EMS</h1>
          <nav className="space-x-4">
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/register" className="hover:underline">Register</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center py-20 px-6 bg-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          Welcome to Employee Management System
        </h2>
        <p className="text-gray-600 max-w-xl mb-6">
          Manage your employees, track attendance, and monitor performance efficiently with EMS.
        </p>
        <Link
          href="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="container mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Employee Records</h3>
            <p className="text-gray-600">
              Store and manage all employee information in one secure place.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Attendance Tracking</h3>
            <p className="text-gray-600">
              Keep track of employee attendance and working hours effortlessly.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Performance Monitoring</h3>
            <p className="text-gray-600">
              Analyze employee performance and generate detailed reports.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6 mt-auto">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} EMS. All rights reserved.
        </div>
      </footer>
    </div>
  );
}