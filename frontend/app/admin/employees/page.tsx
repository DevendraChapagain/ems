"use client";

import { useState } from "react";
import { Users, Search, Plus, MoreHorizontal, Mail, Phone } from "lucide-react";
import Sidebar from "@/components/admin/sidebar";

const employees = [
  { id: 1, name: "John Doe", role: "Software Engineer", department: "Engineering", email: "john@kinetic.com", phone: "+977-9801234567", status: "Active", avatar: "JD" },
  { id: 2, name: "Sarah Miller", role: "Product Designer", department: "Design", email: "sarah@kinetic.com", phone: "+977-9807654321", status: "Active", avatar: "SM" },
  { id: 3, name: "Raj Sharma", role: "HR Manager", department: "HR", email: "raj@kinetic.com", phone: "+977-9811234567", status: "Active", avatar: "RS" },
  { id: 4, name: "Emily Chen", role: "Marketing Lead", department: "Marketing", email: "emily@kinetic.com", phone: "+977-9812345678", status: "On Leave", avatar: "EC" },
  { id: 5, name: "David Park", role: "Backend Developer", department: "Engineering", email: "david@kinetic.com", phone: "+977-9823456789", status: "Active", avatar: "DP" },
  { id: 6, name: "Priya Thapa", role: "Accountant", department: "Finance", email: "priya@kinetic.com", phone: "+977-9834567890", status: "Active", avatar: "PT" },
];

const departments = ["All", "Engineering", "Design", "HR", "Marketing", "Finance"];

export default function EmployeesPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  const filtered = employees.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase());
    const matchesDept = department === "All" || e.department === department;
    return matchesSearch && matchesDept;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a1d2e] tracking-tight">Employees</h1>
          <p className="text-sm text-[#9ca3af] mt-0.5">{employees.length} total employees</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#4C62B3] text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#3a4e9a] transition-colors duration-150">
          <Plus size={16} strokeWidth={2} />
          Add Employee
        </button>
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
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setDepartment(dept)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-150 ${
                department === dept
                  ? "bg-[#4C62B3] text-white"
                  : "bg-white border border-[#e8eaf0] text-[#4a4f6a] hover:border-[#4C62B3]/30 hover:text-[#4C62B3]"
              }`}
            >
              {dept}
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
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">Contact</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">Status</th>
              <th className="px-6 py-3.5" />
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
                    <div>
                      <p className="text-sm font-semibold text-[#1a1d2e]">{emp.name}</p>
                      <p className="text-xs text-[#9ca3af]">{emp.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-[#4a4f6a]">{emp.department}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-[#4a4f6a] flex items-center gap-1.5">
                      <Mail size={11} color="#9ca3af" /> {emp.email}
                    </span>
                    <span className="text-xs text-[#4a4f6a] flex items-center gap-1.5">
                      <Phone size={11} color="#9ca3af" /> {emp.phone}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                    emp.status === "Active"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}>
                    {emp.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="p-1.5 rounded-lg hover:bg-[#f0f2ff] transition-colors duration-150">
                    <MoreHorizontal size={16} color="#9ca3af" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Users size={32} color="#e8eaf0" className="mx-auto mb-3" />
            <p className="text-sm text-[#9ca3af]">No employees found</p>
          </div>
        )}
      </div>
    </div>
  );
}