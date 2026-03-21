"use client";

import { useState } from "react";
import { User, Lock, Bell, Shield, Save } from "lucide-react";

const tabs = [
  { icon: User, label: "Profile" },
  { icon: Lock, label: "Password" },
  { icon: Bell, label: "Notifications" },
  { icon: Shield, label: "Security" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@kinetic.com",
    phone: "+977-9801234567",
    role: "Administrator",
  });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [notifSettings, setNotifSettings] = useState({
    emailNotifications: true,
    attendanceAlerts: true,
    taskReminders: true,
    leaveRequests: true,
    systemUpdates: false,
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#1a1d2e] tracking-tight">Settings</h1>
        <p className="text-sm text-[#9ca3af] mt-0.5">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-4 gap-6">

        {/* Tabs */}
        <div className="col-span-1">
          <div className="bg-white border border-[#e8eaf0] rounded-2xl p-2">
            {tabs.map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  activeTab === label
                    ? "bg-[#4C62B3] text-white"
                    : "text-[#4a4f6a] hover:bg-[#f0f2ff] hover:text-[#4C62B3]"
                }`}
              >
                <Icon size={17} strokeWidth={1.75} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="col-span-3 bg-white border border-[#e8eaf0] rounded-2xl p-6">

          {/* Profile Tab */}
          {activeTab === "Profile" && (
            <div>
              <h2 className="text-base font-bold text-[#1a1d2e] mb-6">Profile Information</h2>

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#e8eaf0]">
                <div className="w-16 h-16 rounded-full bg-[#4C62B3] flex items-center justify-center text-white text-xl font-bold">
                  A
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1a1d2e]">Profile Photo</p>
                  <p className="text-xs text-[#9ca3af] mt-0.5">JPG or PNG. Max size 2MB</p>
                  <button className="mt-2 text-xs text-[#4C62B3] font-medium hover:underline">
                    Upload new photo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#4a4f6a] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f8f9fc] border border-[#e8eaf0] rounded-lg text-sm text-[#1a1d2e] focus:outline-none focus:border-[#4C62B3] transition-colors duration-150"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4a4f6a] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f8f9fc] border border-[#e8eaf0] rounded-lg text-sm text-[#1a1d2e] focus:outline-none focus:border-[#4C62B3] transition-colors duration-150"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4a4f6a] mb-1.5">Phone Number</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f8f9fc] border border-[#e8eaf0] rounded-lg text-sm text-[#1a1d2e] focus:outline-none focus:border-[#4C62B3] transition-colors duration-150"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4a4f6a] mb-1.5">Role</label>
                  <input
                    type="text"
                    value={profile.role}
                    disabled
                    className="w-full px-4 py-2.5 bg-[#f8f9fc] border border-[#e8eaf0] rounded-lg text-sm text-[#9ca3af] cursor-not-allowed"
                  />
                </div>
              </div>

              <button className="mt-6 inline-flex items-center gap-2 bg-[#4C62B3] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#3a4e9a] transition-colors duration-150">
                <Save size={15} strokeWidth={1.75} />
                Save Changes
              </button>
            </div>
          )}

          {/* Password Tab */}
          {activeTab === "Password" && (
            <div>
              <h2 className="text-base font-bold text-[#1a1d2e] mb-6">Change Password</h2>
              <div className="max-w-md space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4a4f6a] mb-1.5">Current Password</label>
                  <input
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    placeholder="Enter current password"
                    className="w-full px-4 py-2.5 bg-[#f8f9fc] border border-[#e8eaf0] rounded-lg text-sm text-[#1a1d2e] focus:outline-none focus:border-[#4C62B3] transition-colors duration-150 placeholder:text-[#9ca3af]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4a4f6a] mb-1.5">New Password</label>
                  <input
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    placeholder="Enter new password"
                    className="w-full px-4 py-2.5 bg-[#f8f9fc] border border-[#e8eaf0] rounded-lg text-sm text-[#1a1d2e] focus:outline-none focus:border-[#4C62B3] transition-colors duration-150 placeholder:text-[#9ca3af]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4a4f6a] mb-1.5">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-2.5 bg-[#f8f9fc] border border-[#e8eaf0] rounded-lg text-sm text-[#1a1d2e] focus:outline-none focus:border-[#4C62B3] transition-colors duration-150 placeholder:text-[#9ca3af]"
                  />
                </div>
                <button className="inline-flex items-center gap-2 bg-[#4C62B3] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#3a4e9a] transition-colors duration-150">
                  <Save size={15} strokeWidth={1.75} />
                  Update Password
                </button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "Notifications" && (
            <div>
              <h2 className="text-base font-bold text-[#1a1d2e] mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                {Object.entries(notifSettings).map(([key, value]) => {
                  const labels: Record<string, { title: string; desc: string }> = {
                    emailNotifications: { title: "Email Notifications", desc: "Receive notifications via email" },
                    attendanceAlerts: { title: "Attendance Alerts", desc: "Get alerted when employees are absent or late" },
                    taskReminders: { title: "Task Reminders", desc: "Receive reminders for upcoming and overdue tasks" },
                    leaveRequests: { title: "Leave Requests", desc: "Get notified when employees submit leave requests" },
                    systemUpdates: { title: "System Updates", desc: "Receive notifications about system updates" },
                  };
                  const { title, desc } = labels[key];
                  return (
                    <div key={key} className="flex items-center justify-between py-4 border-b border-[#e8eaf0] last:border-0">
                      <div>
                        <p className="text-sm font-medium text-[#1a1d2e]">{title}</p>
                        <p className="text-xs text-[#9ca3af] mt-0.5">{desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifSettings((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                        className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${value ? "bg-[#4C62B3]" : "bg-[#e8eaf0]"}`}
                      >
                        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${value ? "translate-x-5" : "translate-x-0.5"}`} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "Security" && (
            <div>
              <h2 className="text-base font-bold text-[#1a1d2e] mb-6">Security Settings</h2>
              <div className="space-y-4">
                {[
                  { title: "Two-Factor Authentication", desc: "Add an extra layer of security to your account", enabled: false },
                  { title: "Login Notifications", desc: "Get notified when a new login is detected", enabled: true },
                  { title: "Session Timeout", desc: "Automatically log out after 30 minutes of inactivity", enabled: true },
                ].map(({ title, desc, enabled }) => (
                  <div key={title} className="flex items-center justify-between py-4 border-b border-[#e8eaf0] last:border-0">
                    <div>
                      <p className="text-sm font-medium text-[#1a1d2e]">{title}</p>
                      <p className="text-xs text-[#9ca3af] mt-0.5">{desc}</p>
                    </div>
                    <button
                      className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${enabled ? "bg-[#4C62B3]" : "bg-[#e8eaf0]"}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${enabled ? "translate-x-5" : "translate-x-0.5"}`} />
                    </button>
                  </div>
                ))}

                <div className="pt-4">
                  <p className="text-sm font-medium text-[#1a1d2e] mb-3">Active Sessions</p>
                  <div className="bg-[#f8f9fc] border border-[#e8eaf0] rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-[#1a1d2e]">Current Session</p>
                        <p className="text-xs text-[#9ca3af] mt-0.5">Windows • Chrome • Kathmandu, Nepal</p>
                      </div>
                      <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2.5 py-1 rounded-full">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}