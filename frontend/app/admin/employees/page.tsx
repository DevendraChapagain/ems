"use client";

import { useState, useEffect } from "react";
import { Users, Search, Plus, MoreHorizontal, Mail, Phone, Trash2 } from "lucide-react";
import CreateUserModal from "@/components/modals/AddEmployee";

interface Employee {
  _id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  phone: string;
  status?: string;
}

const departments = ["All", "Engineering", "Design", "HR", "Marketing", "Finance","Development"];

const roleColors: Record<string, string> = {
  admin: "bg-purple-50 text-purple-700",
  manager: "bg-blue-50 text-blue-700",
  employee: "bg-emerald-50 text-emerald-700",
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    phone: "",
    department: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

 const fetchEmployees = async () => {
  try {
    const accessToken = sessionStorage.getItem("accessToken");

    const res = await fetch("/api/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    let data = null;
    try {
      data = await res.json();
    } catch {
      console.log("No JSON response");
    }

    console.log("API RESPONSE:", data); 

    if (res.ok) {

      setEmployees(data?.users || data || []);
    } else {
      console.error("API ERROR:", data);
    }
  } catch (err) {
    console.error("FETCH ERROR:", err);
  } finally {
    setLoading(false);
  }
};

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setEmployees((prev) => [data.user, ...prev]);
        setShowModal(false);
        setForm({
          name: "",
          email: "",
          password: "",
          role: "employee",
          phone: "",
          department: "",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const res = await fetch(`/api/user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) setEmployees((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = employees.filter((e) => {
    const matchesSearch =
      e.name?.toLowerCase().includes(search.toLowerCase()) ||
      e.email?.toLowerCase().includes(search.toLowerCase());
    const matchesDept =
      department === "All" || e.department === department;
    return matchesSearch && matchesDept;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a1d2e] tracking-tight">
            Employees
          </h1>
          <p className="text-sm text-[#9ca3af] mt-0.5">
            {employees.length} total employees
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-[#4C62B3] text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#3a4e9a] transition-colors duration-150"
        >
          <Plus size={16} strokeWidth={2} />
          Add Employee
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Employees", value: employees.length, color: "#4C62B3" },
          { label: "Managers", value: employees.filter((e) => e.role === "manager").length, color: "#3b82f6" },
          { label: "Employees", value: employees.filter((e) => e.role === "employee").length, color: "#10b981" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-white border border-[#e8eaf0] rounded-2xl p-5 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-[#f8f9fc] flex items-center justify-center">
              <Users size={18} color={color} />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-[#1a1d2e]">{value}</p>
              <p className="text-xs text-[#9ca3af] font-medium">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
          />
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
        {loading ? (
          <div className="py-16 text-center">
            <p className="text-sm text-[#9ca3af]">Loading employees...</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e8eaf0] bg-[#f8f9fc]">
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
                  Employee
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
                  Role
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
                  Department
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8eaf0]">
              {filtered.map((emp) => (
                <tr
                  key={emp._id}
                  className="hover:bg-[#f8f9fc] transition-colors duration-100"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#4C62B3] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                        {emp.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1a1d2e]">
                          {emp.name}
                        </p>
                        <p className="text-xs text-[#9ca3af]">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${roleColors[emp.role]}`}
                    >
                      {emp.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#4a4f6a]">
                      {emp.department || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-[#4a4f6a] flex items-center gap-1.5">
                        <Mail size={11} color="#9ca3af" />
                        {emp.email}
                      </span>
                      <span className="text-xs text-[#4a4f6a] flex items-center gap-1.5">
                        <Phone size={11} color="#9ca3af" />
                        {emp.phone || "—"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteEmployee(emp._id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-[#9ca3af] hover:text-red-500 transition-colors duration-150"
                    >
                      <Trash2 size={15} strokeWidth={1.75} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && filtered.length === 0 && (
          <div className="py-16 text-center">
            <Users size={32} color="#e8eaf0" className="mx-auto mb-3" />
            <p className="text-sm text-[#9ca3af]">No employees found</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <CreateUserModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateUser}
        form={form}
        setForm={setForm}
        submitting={submitting}
      />
    </div>
  );
}