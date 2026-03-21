"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import SideBar from "@/components/admin/sidebar"


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex bg-[#f8f9fc]">
      {/* Sidebar */}
  <SideBar/>
      {/* Page content */}
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  );
}
