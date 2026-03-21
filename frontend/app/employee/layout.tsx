"use client";

import {
  CalendarCheck,
  CheckSquare,
  Bell,
  User,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

const stats = [
  {
    label: "Today's Attendance",
    value: "Present",
    sub: "Checked in at 09:02 AM",
    positive: true,
    icon: CalendarCheck,
    bg: "bg-emerald-50",
    iconColor: "#10b981",
  },
  {
    label: "Pending Tasks",
    value: "4",
    sub: "1 due today",
    positive: false,
    icon: CheckSquare,
    bg: "bg-amber-50",
    iconColor: "#f59e0b",
  },
  {
    label: "Notifications",
    value: "3",
    sub: "2 unread",
    positive: false,
    icon: Bell,
    bg: "bg-[#4C62B3]/8",
    iconColor: "#4C62B3",
  },
  {
    label: "Department",
    value: "Engineering",
    sub: "Software Engineer",
    positive: true,
    icon: User,
    bg: "bg-[#4C62B3]/8",
    iconColor: "#4C62B3",
  },
];

const myTasks = [
  { id: 1, title: "Fix login page bug", due: "Today", priority: "High", status: "Pending" },
  { id: 2, title: "Update API documentation", due: "Dec 18", priority: "Medium", status: "In Progress" },
  { id: 3, title: "Review pull requests", due: "Dec 19", priority: "Low", status: "Pending" },
  { id: 4, title: "Write unit tests", due: "Dec 20", priority: "Medium", status: "Pending" },
];

const myAttendance = [
  { day: "Monday", checkIn: "09:02 AM", status: "Present" },
  { day: "Tuesday", checkIn: "08:55 AM", status: "Present" },
  { day: "Wednesday", checkIn: "09:45 AM", status: "Late" },
  { day: "Thursday", checkIn: "09:00 AM", status: "Present" },
  { day: "Friday", checkIn: "—", status: "Absent" },
];

const notifications = [
  {
    title: "Task Assigned",
    message: "You have been assigned: Fix login page bug.",
    time: "2 hours ago",
    read: false,
    icon: CheckSquare,
    color: "#f59e0b",
    bg: "bg-amber-50",
  },
  {
    title: "Leave Approved",
    message: "Your leave request for Dec 25 has been approved.",
    time: "Yesterday",
    read: false,
    icon: CheckCircle,
    color: "#10b981",
    bg: "bg-emerald-50",
  },
  {
    title: "Attendance Alert",
    message: "You were marked late on Wednesday Dec 18.",
    time: "2 days ago",
    read: true,
    icon: AlertCircle,
    color: "#ef4444",
    bg: "bg-red-50",
  },
];

const priorityColors: Record<string, string> = {
  High: "bg-red-50 text-red-700",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-emerald-50 text-emerald-700",
};

const statusColors: Record<string, string> = {
  Present: "text-emerald-600",
  Late: "text-amber-500",
  Absent: "text-red-500",
};

const statusIcons: Record<string, typeof CheckCircle> = {
  Present: CheckCircle,
  Late: Clock,
  Absent: XCircle,
};

export default function EmployeeDashboard() {
  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a1d2e] tracking-tight">
            My Dashboard
          </h1>
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
            E
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {stats.map(({ label, value, sub, positive, icon: Icon, bg, iconColor }) => (
          <div key={label} className="bg-white border border-[#e8eaf0] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-[#6b7280] font-medium">{label}</p>
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon size={18} color={iconColor} strokeWidth={1.75} />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-[#1a1d2e] tracking-tight mb-1">{value}</p>
            <p className={`text-xs font-medium ${positive ? "text-emerald-600" : "text-amber-500"}`}>
              {sub}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-3 gap-5">

        {/* My Tasks */}
        <div className="col-span-2 bg-white border border-[#e8eaf0] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-[#1a1d2e]">My Tasks</h2>
            <span className="text-xs text-[#9ca3af]">{myTasks.length} tasks</span>
          </div>
          <div className="space-y-3">
            {myTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-4 p-3 rounded-xl bg-[#f8f9fc] border border-[#e8eaf0]">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1a1d2e]">{task.title}</p>
                  <p className={`text-xs mt-0.5 ${task.due === "Today" ? "text-red-500 font-medium" : "text-[#9ca3af]"}`}>
                    Due {task.due}
                  </p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${priorityColors[task.priority]}`}>
                  {task.priority}
                </span>
                <span className="text-xs text-[#6b7280] font-medium">{task.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">

          {/* Notifications */}
          <div className="bg-white border border-[#e8eaf0] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#1a1d2e]">Notifications</h2>
              <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-medium">
                {notifications.filter((n) => !n.read).length}
              </span>
            </div>
            <div className="space-y-3">
              {notifications.map((notif, i) => (
                <div key={i} className={`flex items-start gap-3 ${!notif.read ? "opacity-100" : "opacity-60"}`}>
                  <div className={`w-8 h-8 rounded-lg ${notif.bg} flex items-center justify-center flex-shrink-0`}>
                    <notif.icon size={14} color={notif.color} strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1a1d2e]">{notif.title}</p>
                    <p className="text-xs text-[#6b7280] leading-snug mt-0.5">{notif.message}</p>
                    <p className="text-[10px] text-[#9ca3af] mt-1 flex items-center gap-1">
                      <Clock size={10} />
                      {notif.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* This week attendance */}
          <div className="bg-white border border-[#e8eaf0] rounded-2xl p-6">
            <h2 className="text-base font-bold text-[#1a1d2e] mb-4">This Week</h2>
            <div className="space-y-2.5">
              {myAttendance.map((day, i) => {
                const StatusIcon = statusIcons[day.status];
                return (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <StatusIcon size={14} className={statusColors[day.status]} strokeWidth={1.75} />
                      <span className="text-xs font-medium text-[#4a4f6a]">{day.day}</span>
                    </div>
                    <span className={`text-xs font-medium ${statusColors[day.status]}`}>
                      {day.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}