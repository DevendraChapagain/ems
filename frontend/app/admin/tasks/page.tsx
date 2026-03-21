"use client";

import { useState } from "react";
import { Plus, Search, CheckSquare, Clock, AlertCircle, Circle } from "lucide-react";

const tasks = [
  { id: 1, title: "Review Q4 performance reports", assignee: "Admin", assigneeAvatar: "A", department: "Admin", due: "Today", priority: "High", status: "Pending" },
  { id: 2, title: "Approve 3 leave requests", assignee: "Raj Sharma", assigneeAvatar: "RS", department: "HR", due: "Today", priority: "High", status: "Pending" },
  { id: 3, title: "Update employee handbook", assignee: "Raj Sharma", assigneeAvatar: "RS", department: "HR", due: "Dec 18", priority: "Medium", status: "In Progress" },
  { id: 4, title: "Schedule team meetings for Q1", assignee: "Sarah Miller", assigneeAvatar: "SM", department: "Design", due: "Dec 19", priority: "Low", status: "Pending" },
  { id: 5, title: "Complete onboarding for new hires", assignee: "Priya Thapa", assigneeAvatar: "PT", department: "Finance", due: "Dec 20", priority: "Medium", status: "In Progress" },
  { id: 6, title: "Deploy new payroll system", assignee: "David Park", assigneeAvatar: "DP", department: "Engineering", due: "Dec 22", priority: "High", status: "Completed" },
];

const priorityColors: Record<string, string> = {
  High: "bg-red-50 text-red-700",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-emerald-50 text-emerald-700",
};

const statusConfig: Record<string, { color: string; icon: typeof Circle }> = {
  Pending: { color: "text-[#9ca3af]", icon: Circle },
  "In Progress": { color: "text-amber-500", icon: Clock },
  Completed: { color: "text-emerald-600", icon: CheckSquare },
};

const summaryStats = [
  { label: "Total Tasks", value: tasks.length.toString(), icon: CheckSquare, bg: "bg-[#4C62B3]/8", color: "#4C62B3" },
  { label: "Pending", value: tasks.filter(t => t.status === "Pending").length.toString(), icon: Circle, bg: "bg-[#9ca3af]/10", color: "#9ca3af" },
  { label: "In Progress", value: tasks.filter(t => t.status === "In Progress").length.toString(), icon: Clock, bg: "bg-amber-50", color: "#f59e0b" },
  { label: "Completed", value: tasks.filter(t => t.status === "Completed").length.toString(), icon: CheckSquare, bg: "bg-emerald-50", color: "#10b981" },
];

export default function TasksPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.assignee.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || t.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a1d2e] tracking-tight">Tasks</h1>
          <p className="text-sm text-[#9ca3af] mt-0.5">{tasks.length} total tasks</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#4C62B3] text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#3a4e9a] transition-colors duration-150">
          <Plus size={16} strokeWidth={2} />
          Add Task
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {summaryStats.map(({ label, value, icon: Icon, bg, color }) => (
          <div key={label} className="bg-white border border-[#e8eaf0] rounded-2xl p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
              <Icon size={18} color={color} strokeWidth={1.75} />
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
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#e8eaf0] rounded-lg text-sm text-[#1a1d2e] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#4C62B3] transition-colors duration-150"
          />
        </div>
        <div className="flex items-center gap-2">
          {["All", "Pending", "In Progress", "Completed"].map((s) => (
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
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">Task</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">Assignee</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">Due Date</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">Priority</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e8eaf0]">
            {filtered.map((task) => {
              const { color, icon: StatusIcon } = statusConfig[task.status];
              return (
                <tr key={task.id} className="hover:bg-[#f8f9fc] transition-colors duration-100">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {task.status === "Completed"
                        ? <CheckSquare size={15} color="#10b981" strokeWidth={1.75} />
                        : task.priority === "High"
                        ? <AlertCircle size={15} color="#ef4444" strokeWidth={1.75} />
                        : <Circle size={15} color="#9ca3af" strokeWidth={1.75} />
                      }
                      <p className={`text-sm font-medium ${task.status === "Completed" ? "line-through text-[#9ca3af]" : "text-[#1a1d2e]"}`}>
                        {task.title}
                      </p>
                    </div>
                    <p className="text-xs text-[#9ca3af] mt-0.5 ml-5">{task.department}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#4C62B3] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                        {task.assigneeAvatar}
                      </div>
                      <span className="text-sm text-[#4a4f6a]">{task.assignee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${task.due === "Today" ? "text-red-500 font-medium" : "text-[#4a4f6a]"}`}>
                      {task.due}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-1.5 ${color}`}>
                      <StatusIcon size={14} strokeWidth={1.75} />
                      <span className="text-xs font-medium">{task.status}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <CheckSquare size={32} color="#e8eaf0" className="mx-auto mb-3" />
            <p className="text-sm text-[#9ca3af]">No tasks found</p>
          </div>
        )}
      </div>
    </div>
  );
}