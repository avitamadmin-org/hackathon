"use client";

import { useEffect, useState } from "react";
import {
  X,
  Calendar,
  Clock,
  Users,
  Video,
  MessageSquare,
  Sparkles,
  CalendarDays,
  User,
  Building,
  Link,
  FileText,
  ChevronDown,
} from "lucide-react";

type Props = {
  onClose: () => void;
  onBook?: (session: {
    title: string;
    mentor: string;
    team: string;
    time: string;
    status: string;
  }) => void;
};

export default function BookSessionModal({ onClose, onBook }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [sessionType, setSessionType] = useState("1-on-1");
  const [mentor, setMentor] = useState("");
  const [team, setTeam] = useState("");
  const [date, setDate] = useState("2026-06-18");
  const [time, setTime] = useState("10:00 AM");
  const [duration, setDuration] = useState(40);
  const [mode, setMode] = useState("Virtual");
  const [provider, setProvider] = useState("Zoom");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setIsVisible(true);
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "Session Title is required";
    if (!mentor) newErrors.mentor = "Mentor selection is required";
    if (!team) newErrors.team = "Team selection is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (onBook) {
      onBook({
        title: title.trim(),
        mentor,
        team,
        time,
        status: "Upcoming",
      });
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={`w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl transition-all duration-300 flex flex-col overflow-hidden ${
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
                <CalendarDays className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Book New Session
                </h2>
                <p className="text-sm text-white/80">
                  Schedule a mentoring session
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

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar flex flex-col justify-between">
          <div className="space-y-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <Sparkles size={16} className="text-blue-500" />
                Session Title *
              </label>
              <input
                type="text"
                placeholder="e.g., Sprint 1 Review with Team Alpha"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 ${
                  errors.title ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.title && (
                <p className="text-xs text-red-500 mt-1">{errors.title}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                  <Users size={16} className="text-blue-500" />
                  Session Type
                </label>
                <select
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="1-on-1">1-on-1</option>
                  <option value="Group">Group</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Panel Discussion">Panel Discussion</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                  <User size={16} className="text-blue-500" />
                  Mentor *
                </label>
                <select
                  value={mentor}
                  onChange={(e) => setMentor(e.target.value)}
                  className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                    errors.mentor ? "border-red-500" : "border-gray-200"
                  }`}
                >
                  <option value="">Select mentor</option>
                  <option value="Nitika Agrawal">Nitika Agrawal</option>
                  <option value="Shishir Jha">Shishir Jha</option>
                  <option value="Priyanka Kumari">Priyanka Kumari</option>
                  <option value="Abhishek Prakash">Abhishek Prakash</option>
                </select>
                {errors.mentor && (
                  <p className="text-xs text-red-500 mt-1">{errors.mentor}</p>
                )}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <Building size={16} className="text-blue-500" />
                Team *
              </label>
              <select
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                  errors.team ? "border-red-500" : "border-gray-200"
                }`}
              >
                <option value="">Select team</option>
                <option value="POD 1">POD 1</option>
                <option value="POD 2">POD 2</option>
                <option value="POD 3">POD 3</option>
                <option value="POD 4">POD 4</option>
                <option value="POD 5">POD 5</option>
                <option value="POD 6">POD 6</option>
              </select>
              {errors.team && (
                <p className="text-xs text-red-500 mt-1">{errors.team}</p>
              )}
              <p className="mt-1.5 text-xs text-gray-400 flex items-center gap-1">
                <Clock size={12} />
                1-on-1 sessions allow only one team
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                  <Calendar size={16} className="text-blue-500" />
                  Session Date *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                  <Clock size={16} className="text-blue-500" />
                  Session Time *
                </label>
                <div className="relative">
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                  >
                    <option value="8:00 AM">8:00 AM</option>
                    <option value="8:30 AM">8:30 AM</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="9:30 AM">9:30 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="12:30 PM">12:30 PM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="1:30 PM">1:30 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="2:30 PM">2:30 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="3:30 PM">3:30 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="4:30 PM">4:30 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                    <option value="5:30 PM">5:30 PM</option>
                    <option value="6:00 PM">6:00 PM</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                  <Clock size={16} className="text-blue-500" />
                  Duration (minutes) *
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Math.max(1, Number(e.target.value)))}
                  min={15}
                  step={5}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                  <Video size={16} className="text-blue-500" />
                  Mode
                </label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="Virtual">Virtual</option>
                  <option value="In-person">In-person</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                  <Video size={16} className="text-blue-500" />
                  Meeting Provider
                </label>
                <select
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="Zoom">Zoom</option>
                  <option value="Google Meet">Google Meet</option>
                  <option value="Microsoft Teams">Microsoft Teams</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                  <Link size={16} className="text-blue-500" />
                  Meeting Link
                </label>
                <input
                  type="url"
                  placeholder="https://meet.google.com/..."
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <MessageSquare size={16} className="text-blue-500" />
                Description
              </label>
              <textarea
                placeholder="Add session agenda or important context..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 resize-none"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                <FileText size={16} className="text-blue-500" />
                Additional Notes
              </label>
              <textarea
                placeholder="Any additional notes or special requirements..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 resize-none"
              />
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
              Book Session
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
