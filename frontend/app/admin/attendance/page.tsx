"use client";

import { useState } from "react";
import { Search, CheckCircle, XCircle, Clock, CalendarCheck } from "lucide-react";

const attendanceData = [
  { id: 1, name: "John Doe", avatar: "JD", department: "Engineering", checkIn: "09:02 AM", checkOut: "06:05 PM", status: "Present", hours: "9h 3m" },
  { id: 2, name: "Sarah Miller", avatar: "SM", department: "Design", checkIn: "—", checkOut: "—", status: "Absent", hours: "—" },
  { id: 3, name: "Raj Sharma", avatar: "RS", department: "HR", checkIn: "08:55 AM", checkOut: "05:58 PM", status: "Present", hours: "9h 3m" },
  { id: 4, name: "Emily Chen", avatar: "EC", department: "Marketing", checkIn: "09:45 AM", checkOut: "05:00 PM", status: "Late", hours: "7h 15m" },
  { id: 5, name: "David Park", avatar: "DP", department: "Engineering", checkIn: "09:00 AM", checkOut: "—", status: "Present", hours: "—" },
  { id: 6, name: "Priya Thapa", avatar: "PT", department: "Finance", checkIn: "08:50 AM", checkOut: "06:10 PM", status: "Present", hours: "9h 20m" },
];

const summaryStats = [
  { label: "Present", value: "98", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Absent", value: "14", icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
  { label: "Late", value: "12", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
  { label: "On Leave", value: "6", icon: CalendarCheck, color: "text-[#4C62B3]", bg: "bg-[#4C62B3]/8" },
];

const statusColors: Record<string, string> = {
  Present: "bg-emerald-50 text-emerald-700",
  Absent: "bg-red-50 text-red-700",
  Late: "bg-amber-50 text-amber-700",
};

export default function AttendancePage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = attendanceData.filter((e) => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || e.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a1d2e] tracking-tight">Attendance</h1>
          <p className="text-sm text-[#9ca3af] mt-0.5">
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {summaryStats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white border border-[#e8eaf0] rounded-2xl p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
              <Icon size={18} className={color} strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-[#1a1d2e] tracking-tight">{value}</p>
              <p className="text-xs text-[#9ca3af] font-medium">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#e8eaf0] rounded-lg text-sm text-[#1a1d2e] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#4C62B3] transition-colors duration-150"
          />
        </div>
        <div className="flex items-center gap-2">
          {["All", "Present", "Absent", "Late"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-150 ${
                filter === s
                  ? "bg-[#4C62B3] text-white"
                  : "bg-white border border-[#e8eaf0] text-[#4a4f6a] hover:border-[#4C62B3]/30 hover:text-[#4C62B3]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e8eaf0] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e8eaf0] bg-[#f8f9fc]">
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">Employee</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">Department</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">Check In</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">Check Out</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">Hours</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e8eaf0]">
            {filtered.map((emp) => (
              <tr key={emp.id} className="hover:bg-[#f8f9fc] transition-colors duration-100">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#4C62B3] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                      {emp.avatar}
                    </div>
                    <p className="text-sm font-semibold text-[#1a1d2e]">{emp.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#4a4f6a]">{emp.department}</td>
                <td className="px-6 py-4 text-sm text-[#4a4f6a]">{emp.checkIn}</td>
                <td className="px-6 py-4 text-sm text-[#4a4f6a]">{emp.checkOut}</td>
                <td className="px-6 py-4 text-sm text-[#4a4f6a]">{emp.hours}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[emp.status]}`}>
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}