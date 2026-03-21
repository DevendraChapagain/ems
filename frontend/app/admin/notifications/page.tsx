"use client";

import { useState } from "react";
import { Bell, CheckCheck, Trash2, AlertCircle, Users, CheckSquare, CalendarCheck, Info } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "New Employee Added",
    message: "John Doe has been successfully added to the Engineering team.",
    time: "2 hours ago",
    type: "employee",
    read: false,
    icon: Users,
    color: "#4C62B3",
    bg: "bg-[#4C62B3]/8",
  },
  {
    id: 2,
    title: "Attendance Alert",
    message: "Sarah Miller has been marked absent for the 3rd time this month.",
    time: "4 hours ago",
    type: "attendance",
    read: false,
    icon: AlertCircle,
    color: "#ef4444",
    bg: "bg-red-50",
  },
  {
    id: 3,
    title: "Task Overdue",
    message: "Update employee handbook task is overdue by 2 days.",
    time: "Yesterday",
    type: "task",
    read: false,
    icon: CheckSquare,
    color: "#f59e0b",
    bg: "bg-amber-50",
  },
  {
    id: 4,
    title: "Leave Request",
    message: "Priya Thapa has submitted a leave request for Dec 20-22.",
    time: "Yesterday",
    type: "attendance",
    read: true,
    icon: CalendarCheck,
    color: "#10b981",
    bg: "bg-emerald-50",
  },
  {
    id: 5,
    title: "Task Completed",
    message: "David Park has completed the payroll system deployment task.",
    time: "2 days ago",
    type: "task",
    read: true,
    icon: CheckSquare,
    color: "#10b981",
    bg: "bg-emerald-50",
  },
  {
    id: 6,
    title: "System Update",
    message: "Kinetic EMS has been updated to the latest version successfully.",
    time: "3 days ago",
    type: "system",
    read: true,
    icon: Info,
    color: "#4C62B3",
    bg: "bg-[#4C62B3]/8",
  },
];

const filters = ["All", "Unread", "Employee", "Attendance", "Task"];

export default function NotificationsPage() {
  const [filter, setFilter] = useState("All");
  const [notifs, setNotifs] = useState(notifications);

  const filtered = notifs.filter((n) => {
    if (filter === "All") return true;
    if (filter === "Unread") return !n.read;
    return n.type === filter.toLowerCase();
  });

  const unreadCount = notifs.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotif = (id: number) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a1d2e] tracking-tight">Notifications</h1>
          <p className="text-sm text-[#9ca3af] mt-0.5">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#4C62B3] border border-[#4C62B3]/40 px-4 py-2.5 rounded-lg hover:bg-[#4C62B3]/5 transition-colors duration-150"
          >
            <CheckCheck size={16} strokeWidth={1.75} />
            Mark all as read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-150 ${
              filter === f
                ? "bg-[#4C62B3] text-white"
                : "bg-white border border-[#e8eaf0] text-[#4a4f6a] hover:border-[#4C62B3]/30 hover:text-[#4C62B3]"
            }`}
          >
            {f}
            {f === "Unread" && unreadCount > 0 && (
              <span className="ml-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      <div className="bg-white border border-[#e8eaf0] rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Bell size={32} color="#e8eaf0" className="mx-auto mb-3" />
            <p className="text-sm text-[#9ca3af]">No notifications found</p>
          </div>
        ) : (
          <div className="divide-y divide-[#e8eaf0]">
            {filtered.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-start gap-4 px-6 py-4 transition-colors duration-150 ${
                  !notif.read ? "bg-[#f8f9ff]" : "hover:bg-[#f8f9fc]"
                }`}
              >
                <div className={`w-9 h-9 rounded-xl ${notif.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <notif.icon size={17} color={notif.color} strokeWidth={1.75} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className={`text-sm font-semibold text-[#1a1d2e] ${!notif.read ? "" : "font-medium"}`}>
                      {notif.title}
                    </p>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-[#4C62B3] flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-[#6b7280] leading-snug">{notif.message}</p>
                  <p className="text-xs text-[#9ca3af] mt-1">{notif.time}</p>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  {!notif.read && (
                    <button
                      onClick={() => markRead(notif.id)}
                      className="p-1.5 rounded-lg hover:bg-[#f0f2ff] text-[#4C62B3] transition-colors duration-150"
                      title="Mark as read"
                    >
                      <CheckCheck size={15} strokeWidth={1.75} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotif(notif.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-[#9ca3af] hover:text-red-500 transition-colors duration-150"
                    title="Delete"
                  >
                    <Trash2 size={15} strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}