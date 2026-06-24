"use client";

import { useEffect, useState } from "react";
import {
  Upload,
  User,
  X,
  Sparkles,
  Mail,
  UserPlus,
  Briefcase,
} from "lucide-react";

type Props = {
  onClose: () => void;
};

export default function AddMentorModal({ onClose }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={`w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl transition-all duration-300 flex flex-col overflow-hidden ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="relative bg-linear-to-r from-blue-500 to-blue-600 px-6 py-5 shrink-0 z-10">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-2xl">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Add Mentor</h2>
                <p className="text-sm text-white/80">
                  Invite a new mentor to the bootcamp
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
          <div className="mb-8 flex flex-col sm:flex-row items-center gap-6 p-6 bg-linear-to-br from-blue-50/30 to-blue-50/10 rounded-2xl border border-blue-100/50">
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-blue-100 to-blue-200 flex items-center justify-center text-3xl font-semibold text-blue-600 shadow-lg group-hover:shadow-xl transition-all">
                <User size={40} className="text-blue-500" />
              </div>
              <label className="absolute -bottom-2 -right-2 p-2 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/25 cursor-pointer hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-105">
                <Upload size={14} />
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm font-medium text-gray-700">
                Upload Profile Picture
              </p>
              <p className="text-xs text-gray-500">
                Recommended: Square image, 200x200px
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG or GIF up to 2MB
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <User size={16} className="text-blue-500" />
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Enter mentor's full name"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <Mail size={16} className="text-blue-500" />
                Email Address *
              </label>
              <input
                type="email"
                placeholder="Enter mentor's email address"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <Briefcase size={16} className="text-blue-500" />
                Role
              </label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                <option>Select role</option>
                <option>Lead Mentor</option>
                <option>Senior Mentor</option>
                <option>Mentor</option>
                <option>Guest Mentor</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <Sparkles size={16} className="text-blue-500" />
                Bio
              </label>
              <textarea
                placeholder="Enter mentor's bio, expertise, and background..."
                rows={4}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 resize-none"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-gray-100">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button className="w-full sm:w-auto px-6 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-105 cursor-pointer">
              <Sparkles size={16} className="inline mr-2" />
              Add Mentor
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}
