"use client";

import Modal from "./Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface User {
  _id: string;
  name: string;
  role: string;
}

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  form: {
    title: string;
    description: string;
    assignedTo: string;
    priority: string;
    dueDate: string;
  };
  setForm: (form: any) => void;
  users: User[];
  submitting: boolean;
}

export default function CreateTaskModal({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  users,
  submitting,
}: CreateTaskModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Create New Task">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">

        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-[#4a4f6a] mb-1.5">Title</label>
          <Input
            required
            placeholder="Enter task title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border-[#e8eaf0] focus-visible:ring-[#4C62B3]"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-[#4a4f6a] mb-1.5">Description</label>
          <textarea
            placeholder="Enter task description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 bg-[#f8f9fc] border border-[#e8eaf0] rounded-lg text-sm text-[#1a1d2e] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#4C62B3] resize-none"
          />
        </div>

        {/* Assign To */}
        <div>
          <label className="block text-xs font-semibold text-[#4a4f6a] mb-1.5">Assign To</label>
          <select
            required
            value={form.assignedTo}
            onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
            className="w-full px-4 py-2.5 bg-[#f8f9fc] border border-[#e8eaf0] rounded-lg text-sm text-[#1a1d2e] focus:outline-none focus:border-[#4C62B3]"
          >
            <option value="">Select employee</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.role})
              </option>
            ))}
          </select>
        </div>

        {/* Priority & Due Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#4a4f6a] mb-1.5">Priority</label>
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#f8f9fc] border border-[#e8eaf0] rounded-lg text-sm text-[#1a1d2e] focus:outline-none focus:border-[#4C62B3]"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#4a4f6a] mb-1.5">Due Date</label>
            <Input
              type="date"
              required
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="border-[#e8eaf0] focus-visible:ring-[#4C62B3]"
            />
          </div>
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
            {submitting ? "Creating..." : "Create Task"}
          </Button>
        </div>

      </form>
    </Modal>
  );
}