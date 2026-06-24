"use client";

import { useState } from "react";
import {
  CalendarDays,
  Clock,
  ArrowUpRight,
  MoreVertical,
} from "lucide-react";
import BookSessionModal from "../../../../../../../../components/modal/BookSessionModal";

interface Session {
  title: string;
  mentor: string;
  team: string;
  time: string;
  status: string;
}

const defaultSessions: Session[] = [
  {
    title: "Sprint 1 Review",
    mentor: "Nitika Agrawal",
    team: "POD 1",
    time: "10:00 AM",
    status: "Upcoming",
  },
  {
    title: "Career Guidance",
    mentor: "Priyanka Kumari",
    team: "POD 4",
    time: "1:30 PM",
    status: "Upcoming",
  },
  {
    title: "Design Critique",
    mentor: "Shishir Jha",
    team: "POD 2",
    time: "3:00 PM",
    status: "Completed",
  },
];

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>(defaultSessions);
  const [isBookSessionOpen, setIsBookSessionOpen] = useState(false);

  const handleBookSession = (newSession: Session) => {
    setSessions([...sessions, newSession]);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
            Upcoming Sessions
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Plan mentors and teams for the next mentoring windows.
          </p>
        </div>
        <button
          onClick={() => setIsBookSessionOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-102 cursor-pointer"
        >
          <CalendarDays size={16} />
          <span>Book Session</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session, index) => (
          <div
            key={index}
            className="group bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    session.status === "Upcoming"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      session.status === "Upcoming"
                        ? "bg-blue-500"
                        : "bg-emerald-500"
                    }`}
                  />
                  {session.status}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-gray-500">
                  <Clock size={14} className="text-gray-400" />
                  {session.time}
                </span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {session.title}
              </h4>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <p>
                  Mentor:{" "}
                  <span className="font-semibold text-gray-800">
                    {session.mentor}
                  </span>
                </p>
                <p>
                  Team:{" "}
                  <span className="font-semibold text-gray-800">
                    {session.team}
                  </span>
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 transition-colors">
                <span>View Details</span>
                <ArrowUpRight size={14} />
              </button>
              <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all cursor-pointer">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isBookSessionOpen && (
        <BookSessionModal
          onClose={() => setIsBookSessionOpen(false)}
          onBook={handleBookSession}
        />
      )}
    </div>
  );
}
