"use client";

import { useState, useEffect } from "react";
import {
  CalendarDays,
  Clock3,
  Plus,
  Sparkles,
  Users,
  Star,
  TrendingUp,
  Award,
  UserPlus,
  Calendar,
  CheckCircle,
  ArrowUpRight,
  Menu,
  X,
  Filter,
  Download,
  Search,
  MoreVertical,
  MessageSquare,
  Video,
  Clock,
  UserCheck,
  BarChart3,
  Target,
  LayoutGrid,
  List,
} from "lucide-react";

import AddMentorModal from "../../../../../../../components/modal/AddMentorModal";
import BookSessionModal from "../../../../../../../components/modal/BookSessionModal";

const evaluationCards = [
  { label: "Average Score", value: "87.4%", icon: TrendingUp, change: "+5.2%" },
  { label: "Mentor Reviews", value: "24", icon: MessageSquare, change: "+8" },
  { label: "Pending Reviews", value: "5", icon: Clock, change: "-2" },
];

const mentorList = [
  {
    name: "Nitika Agrawal",
    role: "Lead Mentor",
    focus: "Product & Design",
    sessions: 12,
  },
  {
    name: "Shishir Jha",
    role: "Mentor",
    focus: "Frontend Engineering",
    sessions: 8,
  },
  {
    name: "Priyanka Kumari",
    role: "Mentor",
    focus: "Career Readiness",
    sessions: 6,
  },
];

const sessionList = [
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

const criteriaList = [
  { name: "Problem-solving clarity", weight: "25%", status: "Active" },
  { name: "Technical execution", weight: "30%", status: "Active" },
  { name: "Communication and collaboration", weight: "20%", status: "Active" },
  { name: "Presentation quality", weight: "25%", status: "Active" },
];

const scheduleList = [
  { label: "Mid Evaluation", date: "18 Jun 2026", status: "Upcoming" },
  { label: "Final Review", date: "02 Jul 2026", status: "Upcoming" },
  { label: "Mentor Sync", date: "09 Jul 2026", status: "Completed" },
];

export function MentoringContent({ section }: { section: string }) {
  const [isAddMentorOpen, setIsAddMentorOpen] = useState(false);
  const [isBookSessionOpen, setIsBookSessionOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <div
        className={`space-y-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-50/30 to-blue-50/20 border border-gray-100/80 p-6 lg:p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-blue-500/5 to-blue-600/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                    Mentoring
                  </p>
                  <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
                    Manage mentoring flow
                  </h2>
                </div>
              </div>
              <p className="text-gray-500 ml-13 max-w-3xl">
                Review performance, manage mentors, schedule sessions, and track
                evaluation criteria in one place.
              </p>
            </div>

            <div className="flex items-center gap-3 ml-13 lg:ml-0">
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-medium text-emerald-700">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {section === "evaluation" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {evaluationCards.map((card, index) => {
                const Icon = card.icon;
                const isPositive = card.change.startsWith("+");

                return (
                  <div
                    key={card.label}
                    className="group bg-white rounded-2xl p-6 border border-gray-100/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {card.label}
                        </p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">
                          {card.value}
                        </h3>
                      </div>
                      <div className="p-3 rounded-2xl bg-blue-50 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          isPositive
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {card.change}
                      </span>
                      <span className="text-xs text-gray-400">
                        from last sprint
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100/80">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Latest Evaluation Summary
                    </h3>
                    <p className="text-sm text-gray-500">
                      Mentor feedback and participant performance for the
                      current sprint.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all">
                      <Filter size={16} />
                      Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-105">
                      <Download size={16} />
                      Export
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-sm text-gray-600">
                        Average Score
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        87.4%
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-sm text-gray-600">
                        Total Reviews
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        24
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-sm text-gray-600">
                        Completion Rate
                      </span>
                      <span className="text-sm font-semibold text-emerald-600">
                        92%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center p-6 bg-linear-to-br from-blue-50/30 to-blue-50/20 rounded-2xl border border-blue-100/50">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600">A+</div>
                      <p className="text-sm text-gray-500 mt-1">
                        Overall Rating
                      </p>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-4 h-4 text-yellow-400 fill-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {section === "mentors" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Mentor Directory
                </h3>
                <p className="text-sm text-gray-500">
                  Invite and manage mentors supporting the bootcamp.
                </p>
              </div>
              <button
                onClick={() => setIsAddMentorOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <UserPlus size={16} />
                Add Mentor
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentorList.map((mentor, index) => (
                <div
                  key={mentor.name}
                  className="group bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-xl font-semibold text-white shadow-lg shadow-blue-500/25">
                          {mentor.name.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                          <UserCheck className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900">
                          {mentor.name}
                        </h4>
                        <p className="text-xs text-blue-600 font-medium">
                          {mentor.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Focus: {mentor.focus}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MessageSquare className="w-4 h-4" />
                        {mentor.sessions} sessions
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {section === "sessions" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Upcoming Sessions
                </h3>
                <p className="text-sm text-gray-500">
                  Plan mentors and teams for the next mentoring windows.
                </p>
              </div>
              <button
                onClick={() => setIsBookSessionOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <CalendarDays size={16} />
                Book Session
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessionList.map((session, index) => (
                <div
                  key={session.title}
                  className="group bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6"
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
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
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock3 size={13} />
                      {session.time}
                    </span>
                  </div>
                  <h4 className="text-base font-semibold text-gray-900 mb-2">
                    {session.title}
                  </h4>
                  <div className="space-y-1.5 text-sm text-gray-500">
                    <p>
                      Mentor:{" "}
                      <span className="font-medium text-gray-700">
                        {session.mentor}
                      </span>
                    </p>
                    <p>
                      Team:{" "}
                      <span className="font-medium text-gray-700">
                        {session.team}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                      View Details
                      <ArrowUpRight size={14} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {section === "criteria" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Evaluation Criteria
              </h3>
              <p className="text-sm text-gray-500">
                Use these standards to review mentor and participant performance
                consistently.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {criteriaList.map((item, index) => (
                <div
                  key={item.name}
                  className="group bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-300 p-5"
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Weight: {item.weight}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle size={12} />
                      {item.status}
                    </span>
                  </div>
                  <div className="mt-3 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000"
                      style={{ width: "75%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {section === "schedule" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Evaluation Schedule
              </h3>
              <p className="text-sm text-gray-500">
                Timeline for mentor check-ins, evaluations, and final reviews.
              </p>
            </div>
            <div className="space-y-4">
              {scheduleList.map((item, index) => (
                <div
                  key={item.label}
                  className="group bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-wrap items-center justify-between gap-4"
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-linear-to-br from-blue-50 to-blue-100">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-500">
                        Mentoring milestone
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-200">
                      {item.date}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "Upcoming"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.status === "Upcoming"
                            ? "bg-blue-500"
                            : "bg-emerald-500"
                        }`}
                      />
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isAddMentorOpen && (
        <AddMentorModal onClose={() => setIsAddMentorOpen(false)} />
      )}
      {isBookSessionOpen && (
        <BookSessionModal onClose={() => setIsBookSessionOpen(false)} />
      )}
    </>
  );
}
