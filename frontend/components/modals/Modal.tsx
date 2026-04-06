"use client";

import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Title */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-[#1a1d2e]">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#f8f9fc] text-[#9ca3af]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        {children}
      </div>
    </div>,
    document.body
  );
}