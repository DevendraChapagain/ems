"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  CheckSquare,
  Clock,
  AlertCircle,
  Circle,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreateTaskModal from "@/components/modals/CreateTaskModal";


interface Task {
  _id: string;
  title: string;
  description: string;
  assignedTo: { _id: string; name: string; email: string };
  assignedBy: { name: string };
  priority: string;
  status: string;
  dueDate: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const priorityColors: Record<string, string> = {
  high: "bg-red-50 text-red-700",
  medium: "bg-amber-50 text-amber-700",
  low: "bg-emerald-50 text-emerald-700",
};

const statusConfig: Record<string, { color: string; icon: typeof Circle }> = {
  pending: { color: "text-[#9ca3af]", icon: Circle },
  in_progress: { color: "text-amber-500", icon: Clock },
  completed: { color: "text-emerald-600", icon: CheckSquare },
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "medium",
    dueDate: "",
  });

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const res = await fetch("/api/task", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      if (res.ok) setTasks(data.tasks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const res = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      if (res.ok) setUsers(data.users);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setTasks((prev) => [data.task, ...prev]);
        setShowModal(false);
        setForm({
          title: "",
          description: "",
          assignedTo: "",
          priority: "medium",
          dueDate: "",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const res = await fetch(`/api/task/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.ok) setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.assignedTo?.name?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "All" || t.status === filter.toLowerCase().replace(" ", "_");
    return matchesSearch && matchesFilter;
  });

  const summaryStats = [
    {
      label: "Total Tasks",
      value: tasks.length,
      icon: CheckSquare,
      bg: "bg-[#4C62B3]/8",
      color: "#4C62B3",
    },
    {
      label: "Pending",
      value: tasks.filter((t) => t.status === "pending").length,
      icon: Circle,
      bg: "bg-[#9ca3af]/10",
      color: "#9ca3af",
    },
    {
      label: "In Progress",
      value: tasks.filter((t) => t.status === "in_progress").length,
      icon: Clock,
      bg: "bg-amber-50",
      color: "#f59e0b",
    },
    {
      label: "Completed",
      value: tasks.filter((t) => t.status === "completed").length,
      icon: CheckSquare,
      bg: "bg-emerald-50",
      color: "#10b981",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1a1d2e] tracking-tight">
            Tasks
          </h1>
          <p className="text-sm text-[#9ca3af] mt-0.5">
            {tasks.length} total tasks
          </p>
        </div>

        {/* Button */}
        <Button
          onClick={() => setShowModal(true)}
          className="bg-[#4C62B3] hover:bg-[#3a4e9a] text-white"
        >
          <Plus size={16} strokeWidth={2} />
          Add Task
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {summaryStats.map(({ label, value, icon: Icon, bg, color }) => (
          <div
            key={label}
            className="bg-white border border-[#e8eaf0] rounded-2xl p-5 flex items-center gap-4"
          >
            <div
              className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}
            >
              <Icon size={18} color={color} strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-[#1a1d2e] tracking-tight">
                {value}
              </p>
              <p className="text-xs text-[#9ca3af] font-medium">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        {/* Input */}
        <div className="relative flex-1 max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
          />
          <Input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 border-[#e8eaf0] focus-visible:ring-[#4C62B3]"
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
        {loading ? (
          <div className="py-16 text-center">
            <p className="text-sm text-[#9ca3af]">Loading tasks...</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e8eaf0] bg-[#f8f9fc]">
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
                  Task
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
                  Assignee
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
                  Due Date
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
                  Priority
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8eaf0]">
              {filtered.map((task) => {
                const { color, icon: StatusIcon } =
                  statusConfig[task.status] || statusConfig.pending;
                return (
                  <tr
                    key={task._id}
                    className="hover:bg-[#f8f9fc] transition-colors duration-100"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {task.status === "completed" ? (
                          <CheckSquare
                            size={15}
                            color="#10b981"
                            strokeWidth={1.75}
                          />
                        ) : task.priority === "high" ? (
                          <AlertCircle
                            size={15}
                            color="#ef4444"
                            strokeWidth={1.75}
                          />
                        ) : (
                          <Circle
                            size={15}
                            color="#9ca3af"
                            strokeWidth={1.75}
                          />
                        )}
                        <p
                          className={`text-sm font-medium ${task.status === "completed" ? "line-through text-[#9ca3af]" : "text-[#1a1d2e]"}`}
                        >
                          {task.title}
                        </p>
                      </div>
                      {task.description && (
                        <p className="text-xs text-[#9ca3af] mt-0.5 ml-5 truncate max-w-xs">
                          {task.description}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#4C62B3] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                          {task.assignedTo?.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm text-[#4a4f6a]">
                          {task.assignedTo?.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#4a4f6a]">
                        {new Date(task.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-1.5 ${color}`}>
                        <StatusIcon size={14} strokeWidth={1.75} />
                        <span className="text-xs font-medium">
                          {task.status.replace("_", " ")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {/* Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteTask(task._id)}
                        className="text-[#9ca3af] hover:text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={15} strokeWidth={1.75} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {!loading && filtered.length === 0 && (
          <div className="py-16 text-center">
            <CheckSquare size={32} color="#e8eaf0" className="mx-auto mb-3" />
            <p className="text-sm text-[#9ca3af]">No tasks found</p>
          </div>
        )}
      </div>

      {/* Dialog */}
      <CreateTaskModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateTask}
        form={form}
        setForm={setForm}
        users={users}
        submitting={submitting}
      />

    </div>  
  );
}