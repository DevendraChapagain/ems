"use client";

import Modal from "./Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  form: {
    name: string;
    email: string;
    password: string;
    role: string;
    phone: string;
    department: string;
  };
  setForm: (form: any) => void;
  submitting: boolean;
}

export default function CreateUserModal({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  submitting,
}: CreateUserModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Add New Member">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">

        {/* Name & Email */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#4a4f6a] mb-1.5">Name</label>
            <Input
              required
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border-[#e8eaf0]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#4a4f6a] mb-1.5">Email</label>
            <Input
              required
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border-[#e8eaf0]"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-[#4a4f6a] mb-1.5">Password</label>
          <Input
            required
            type="password"
            placeholder="Set password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border-[#e8eaf0]"
          />
        </div>

        {/* Role & Department */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#4a4f6a] mb-1.5">Role</label>
            <select
              required
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f8f9fc] border border-[#e8eaf0] rounded-lg text-sm text-[#1a1d2e] focus:outline-none focus:border-[#4C62B3]"
            >
              <option value="">Select role</option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#4a4f6a] mb-1.5">Department</label>
            <Input
              placeholder="e.g. Engineering"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              className="border-[#e8eaf0]"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-[#4a4f6a] mb-1.5">Phone Number</label>
          <Input
            placeholder="+1 234 567 8900"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="border-[#e8eaf0]"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 mt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 border-[#e8eaf0] text-[#4a4f6a]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-[#4C62B3] hover:bg-[#3a4e9a] text-white"
          >
            {submitting ? "Adding..." : "Add Member"}
          </Button>
        </div>

      </form>
    </Modal>
  );
}