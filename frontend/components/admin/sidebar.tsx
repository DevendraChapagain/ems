"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CheckSquare,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "Employees", href: "/admin/employees" },
  { icon: CalendarCheck, label: "Attendance", href: "/admin/attendance" },
  { icon: CheckSquare, label: "Tasks", href: "/admin/tasks" },
  { icon: Bell, label: "Notifications", href: "/admin/notifications" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function SideBar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    router.push("/auth/login");
  };

  return (
    <aside className="w-64 bg-white border-r border-[#e8eaf0] flex flex-col fixed h-full z-40">
      <div className="px-6 py-5 border-b border-[#e8eaf0]">
        <Link href="/">
          <Image
            src="/logo/kinetic-logo.png"
            width={120}
            height={40}
            alt="Kinetic"
            className="h-9 w-auto"
          />
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 no-underline ${
                isActive
                  ? "bg-[#4C62B3] text-white"
                  : "text-[#4a4f6a] hover:bg-[#f0f2ff] hover:text-[#4C62B3]"
              }`}
            >
              <Icon size={18} strokeWidth={1.75} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-[#e8eaf0]">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-[#4C62B3] flex items-center justify-center text-white text-xs font-semibold">
            A
          </div>
          <div>
            <p className="text-sm font-medium text-[#1a1d2e]">Admin</p>
            <p className="text-xs text-[#9ca3af]">admin@kinetic.com</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#ef4444] hover:bg-red-50 transition-colors duration-150 w-full"
        >
          <LogOut size={18} strokeWidth={1.75} />
          Logout
        </button>
      </div>
    </aside>
  );
}