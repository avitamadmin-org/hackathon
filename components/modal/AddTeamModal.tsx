"use client";

import { useEffect, useState } from "react";
import {
  X,
  Sparkles,
  Mail,
  UserPlus,
  Users,
  Plus,
  User,
} from "lucide-react";

type Props = {
  onClose: () => void;
  onAdd: (team: {
    teamName: string;
    leaderName: string;
    leaderEmail: string;
    members: string[];
  }) => void;
};

export default function AddTeamModal({ onClose, onAdd }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [memberInput, setMemberInput] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setIsVisible(true);
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleAddMember = () => {
    const trimmed = memberInput.trim();
    if (!trimmed) return;
    if (!members.includes(trimmed)) {
      setMembers([...members, trimmed]);
    }
    setMemberInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddMember();
    }
  };

  const handleRemoveMember = (idx: number) => {
    setMembers(members.filter((_, i) => i !== idx));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!teamName.trim()) newErrors.teamName = "Team Name is required";
    if (!leaderName.trim()) newErrors.leaderName = "Leader Name is required";
    if (!leaderEmail.trim()) {
      newErrors.leaderEmail = "Leader Email is required";
    } else if (!/\S+@\S+\.\S+/.test(leaderEmail)) {
      newErrors.leaderEmail = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onAdd({
      teamName: teamName.trim(),
      leaderName: leaderName.trim(),
      leaderEmail: leaderEmail.trim(),
      members: members.map((m) => m.trim()),
    });
    onClose();
  };

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
        {/* Header */}
        <div className="relative bg-linear-to-r from-blue-500 to-blue-600 px-6 py-5 shrink-0 z-10">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Add New Team</h2>
                <p className="text-sm text-white/80">
                  Register a new team for your bootcamp
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

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar flex flex-col justify-between">
          <div className="space-y-5">
            {/* Team Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <Users size={16} className="text-blue-500" />
                Team Name *
              </label>
              <input
                type="text"
                placeholder="e.g. POD 6"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 ${
                  errors.teamName ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.teamName && (
                <p className="text-xs text-red-500 mt-1">{errors.teamName}</p>
              )}
            </div>

            {/* Leader Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <User size={16} className="text-blue-500" />
                Team Leader Name *
              </label>
              <input
                type="text"
                placeholder="Enter team leader's full name"
                value={leaderName}
                onChange={(e) => setLeaderName(e.target.value)}
                className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 ${
                  errors.leaderName ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.leaderName && (
                <p className="text-xs text-red-500 mt-1">{errors.leaderName}</p>
              )}
            </div>

            {/* Leader Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <Mail size={16} className="text-blue-500" />
                Team Leader Email *
              </label>
              <input
                type="email"
                placeholder="Enter team leader's email address"
                value={leaderEmail}
                onChange={(e) => setLeaderEmail(e.target.value)}
                className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 ${
                  errors.leaderEmail ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.leaderEmail && (
                <p className="text-xs text-red-500 mt-1">{errors.leaderEmail}</p>
              )}
            </div>

            {/* Team Members */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <UserPlus size={16} className="text-blue-500" />
                Add Team Members
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter member's name or initials and press Enter"
                  value={memberInput}
                  onChange={(e) => setMemberInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={handleAddMember}
                  className="px-4 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-md transition-all flex items-center justify-center"
                >
                  <Plus size={18} />
                </button>
              </div>

              {members.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  {members.map((member, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-medium rounded-full animate-in zoom-in-95 duration-150"
                    >
                      {member}
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(idx)}
                        className="text-blue-400 hover:text-blue-600 transition-colors focus:outline-none"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-105 cursor-pointer"
            >
              <Sparkles size={16} className="inline mr-2" />
              Create Team
            </button>
          </div>
        </form>
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
