"use client";

import {
  Users,
  CalendarCheck,
  CheckSquare,
  Bell,
  TrendingUp,
  Clock,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    label: "Total Employees",
    value: "124",
    change: "+4 this month",
    positive: true,
    icon: Users,
    bg: "bg-[#4C62B3]/8",
    iconColor: "#4C62B3",
  },
  {
    label: "Present Today",
    value: "98",
    change: "79% attendance",
    positive: true,
    icon: CalendarCheck,
    bg: "bg-emerald-50",
    iconColor: "#10b981",
  },
  {
    label: "Pending Tasks",
    value: "17",
    change: "3 overdue",
    positive: false,
    icon: CheckSquare,
    bg: "bg-amber-50",
    iconColor: "#f59e0b",
  },
  {
    label: "Notifications",
    value: "5",
    change: "2 urgent",
    positive: false,
    icon: Bell,
    bg: "bg-red-50",
    iconColor: "#ef4444",
  },
];

const recentActivity = [
  {
    message: "New employee John Doe joined the Engineering team",
    time: "2 hours ago",
    icon: Users,
    color: "#4C62B3",
    bg: "bg-[#4C62B3]/8",
  },
  {
    message: "Sarah Miller marked absent — 3rd time this month",
    time: "4 hours ago",
    icon: AlertCircle,
    color: "#ef4444",
    bg: "bg-red-50",
  },
  {
    message: "Project Alpha deadline extended to Dec 20",
    time: "Yesterday",
    icon: CheckSquare,
    color: "#f59e0b",
    bg: "bg-amber-50",
  },
  {
    message: "Monthly attendance report generated",
    time: "Yesterday",
    icon: TrendingUp,
    color: "#10b981",
    bg: "bg-emerald-50",
  },
  {
    message: "5 tasks completed by the Design team",
    time: "2 days ago",
    icon: CheckSquare,
    color: "#10b981",
    bg: "bg-emerald-50",
  },
];

const pendingTasks = [
  { title: "Review Q4 performance reports", assignee: "Admin", due: "Today", urgent: true },
  { title: "Approve 3 leave requests", assignee: "HR", due: "Today", urgent: true },
  { title: "Update employee handbook", assignee: "HR", due: "Dec 18", urgent: false },
  { title: "Schedule team meetings", assignee: "Manager", due: "Dec 19", urgent: false },
];

export default function AdminDashboard() {
  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a1d2e] tracking-tight">Dashboard</h1>
          <p className="text-sm text-[#9ca3af] mt-0.5">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg hover:bg-white border border-transparent hover:border-[#e8eaf0] transition-all duration-150">
            <Bell size={18} color="#4a4f6a" strokeWidth={1.75} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <div className="w-9 h-9 rounded-full bg-[#4C62B3] flex items-center justify-center text-white text-sm font-semibold">
            A
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {stats.map(({ label, value, change, positive, icon: Icon, bg, iconColor }) => (
          <div key={label} className="bg-white border border-[#e8eaf0] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-[#6b7280] font-medium">{label}</p>
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon size={18} color={iconColor} strokeWidth={1.75} />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-[#1a1d2e] tracking-tight mb-1">{value}</p>
            <p className={`text-xs font-medium ${positive ? "text-emerald-600" : "text-red-500"}`}>
              {change}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-3 gap-5">

        {/* Recent Activity */}
        <div className="col-span-2 bg-white border border-[#e8eaf0] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-[#1a1d2e]">Recent Activity</h2>
            <button className="text-xs text-[#4C62B3] font-medium hover:underline">View all</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <item.icon size={15} color={item.color} strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#1a1d2e] leading-snug">{item.message}</p>
                  <p className="text-xs text-[#9ca3af] mt-0.5 flex items-center gap-1">
                    <Clock size={11} />
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white border border-[#e8eaf0] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-[#1a1d2e]">Pending Tasks</h2>
            <Link href="/admin/tasks" className="text-xs text-[#4C62B3] font-medium hover:underline no-underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {pendingTasks.map((task, i) => (
              <div key={i} className="p-3 rounded-xl bg-[#f8f9fc] border border-[#e8eaf0]">
                <div className="flex items-start gap-2">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${task.urgent ? "bg-red-500" : "bg-[#4C62B3]"}`} />
                  <p className="text-sm text-[#1a1d2e] font-medium leading-snug">{task.title}</p>
                </div>
                <div className="flex items-center justify-between mt-2 pl-4">
                  <p className="text-xs text-[#9ca3af]">{task.assignee}</p>
                  <p className={`text-xs font-medium ${task.urgent ? "text-red-500" : "text-[#6b7280]"}`}>
                    {task.due}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/admin/tasks"
            className="mt-4 flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-[#4C62B3]/30 text-[#4C62B3] text-sm font-medium hover:bg-[#4C62B3]/5 transition-colors duration-150 no-underline"
          >
            Manage Tasks
            <ChevronRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}