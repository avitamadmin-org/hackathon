"use client";

import React, { useEffect, useState } from "react";
import {
  MessageSquare,
  MessageSquareOff,
  Settings,
  Eye,
  Send,
  Sparkles,
  CheckCircle,
  X,
  Users,
  Clock,
  Shield,
  Image,
  Link2,
  Bold,
  Italic,
  List,
  Quote,
  Smile,
  Paperclip,
  Mic,
  Zap,
  Crown,
  Award,
  ThumbsUp,
  Reply,
  MoreHorizontal,
  Search,
} from "lucide-react";

export default function DiscussionForumPage() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [settings, setSettings] = useState({
    allowAnonymous: false,
    requireApproval: false,
    allowMedia: true,
    notifyAdmins: true,
    allowReactions: true,
    allowThreads: true,
  });

  useEffect(() => {
    setIsVisible(true);
    setIsMounted(true);
    try {
      const storedEnabled = window.localStorage.getItem(
        "bootcamp-discussion-forum-enabled",
      );
      if (storedEnabled !== null) {
        setIsEnabled(storedEnabled === "true");
      }
      const storedSettings = window.localStorage.getItem(
        "bootcamp-discussion-forum-settings",
      );
      if (storedSettings !== null) {
        setSettings(JSON.parse(storedSettings));
      }
    } catch (e) {
      // Ignore localStorage errors
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    try {
      window.localStorage.setItem(
        "bootcamp-discussion-forum-enabled",
        String(isEnabled),
      );
      window.localStorage.setItem(
        "bootcamp-discussion-forum-settings",
        JSON.stringify(settings),
      );
    } catch (e) {
      // Ignore localStorage errors
    }
  }, [isEnabled, settings, isMounted]);

  const handleToggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleToggleForum = () => {
    setIsEnabled(!isEnabled);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const summaryCards = [
    {
      label: "Total Posts",
      value: "247",
      icon: MessageSquare,
      color: "blue",
      trend: "+12%",
    },
    {
      label: "Active Users",
      value: "89",
      icon: Users,
      color: "blue",
      trend: "+8%",
    },
    {
      label: "Response Rate",
      value: "94%",
      icon: Clock,
      color: "blue",
      trend: "+5%",
    },
  ];

  if (!isMounted) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="h-6 w-48 rounded bg-slate-200 mb-2"></div>
          <div className="h-4 w-96 rounded bg-slate-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50/80">
      <div
        className={`w-full transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-100/80 shadow-sm p-6 mb-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-blue-50/30 to-blue-50/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-blue-50/20 to-blue-50/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                    Community
                  </p>
                  <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mt-1">
                    Discussion Forum
                  </h1>
                </div>
              </div>
              <p className="text-slate-500 max-w-2xl ml-13">
                Enable the discussion forum to allow participants to ask
                questions, share ideas, and collaborate during the bootcamp.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border ${
                  isEnabled
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${isEnabled ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`}
                />
                <span
                  className={`text-sm font-medium ${isEnabled ? "text-emerald-700" : "text-slate-500"}`}
                >
                  {isEnabled ? "Active" : "Disabled"}
                </span>
              </div>
              <button
                onClick={handleToggleForum}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-medium text-sm shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer ${
                  isEnabled
                    ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/25 hover:shadow-blue-500/30"
                    : "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/25 hover:shadow-blue-500/30"
                }`}
              >
                <Sparkles size={16} />
                {isEnabled ? "Forum Active" : "Enable Forum"}
              </button>
            </div>
          </div>

          {showSuccess && (
            <div className="absolute top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl shadow-lg">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">
                  {isEnabled
                    ? "Forum enabled successfully!"
                    : "Forum disabled successfully!"}
                </span>
                <button onClick={() => setShowSuccess(false)} className="ml-2">
                  <X className="w-3 h-3 text-emerald-600 hover:text-emerald-800" />
                </button>
              </div>
            </div>
          )}
        </div>

        {isEnabled && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {summaryCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className={`group bg-white rounded-2xl p-6 border border-slate-100/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {card.label}
                      </p>
                      <h3 className="text-3xl font-bold text-slate-900 mt-1">
                        {card.value}
                      </h3>
                    </div>
                    <div className="p-3 rounded-2xl bg-blue-50 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {card.trend}
                    </span>
                    <span className="text-xs text-slate-400">
                      from last week
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!isEnabled ? (
          <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden">
            <div className="p-12 text-center flex flex-col items-center justify-center min-h-100">
              <div className="flex flex-col items-center justify-center max-w-lg">
                <div className="mb-4 rounded-2xl bg-slate-50 p-4 text-slate-400 border border-slate-200">
                  <MessageSquareOff className="h-8 w-8" />
                </div>
                <p className="text-lg font-semibold text-slate-900">
                  Discussion Forum Disabled
                </p>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  Enable the discussion forum to create a space for participants
                  to interact, ask questions, and collaborate.
                </p>
                <button
                  onClick={handleToggleForum}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
                >
                  <Sparkles size={16} />
                  Enable Forum
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="space-y-4 lg:col-span-2">
              <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">
                        Forum Settings
                      </h2>
                      <p className="text-sm text-slate-500">
                        Configure your discussion forum
                      </p>
                    </div>
                    <div className="p-2 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                      <Settings className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5 flex-1">
                      <label className="text-sm font-medium text-slate-900 cursor-pointer">
                        Allow Anonymous Questions
                      </label>
                      <p className="text-xs text-slate-500">
                        Participants can post without showing identity.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleSetting("allowAnonymous")}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                        settings.allowAnonymous ? "bg-blue-600" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out ${
                          settings.allowAnonymous
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-start justify-between gap-3 pt-4 border-t border-slate-100">
                    <div className="space-y-0.5 flex-1">
                      <label className="text-sm font-medium text-slate-900 cursor-pointer">
                        Moderate Posts
                      </label>
                      <p className="text-xs text-slate-500">
                        Admins must review questions before they appear.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleSetting("requireApproval")}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                        settings.requireApproval
                          ? "bg-blue-600"
                          : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out ${
                          settings.requireApproval
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-start justify-between gap-3 pt-4 border-t border-slate-100">
                    <div className="space-y-0.5 flex-1">
                      <label className="text-sm font-medium text-slate-900 cursor-pointer">
                        Allow Media Attachments
                      </label>
                      <p className="text-xs text-slate-500">
                        Enable images and code snippets in posts.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleSetting("allowMedia")}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                        settings.allowMedia ? "bg-blue-600" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out ${
                          settings.allowMedia
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-start justify-between gap-3 pt-4 border-t border-slate-100">
                    <div className="space-y-0.5 flex-1">
                      <label className="text-sm font-medium text-slate-900 cursor-pointer">
                        New Post Alerts
                      </label>
                      <p className="text-xs text-slate-500">
                        Receive notifications for new questions.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleSetting("notifyAdmins")}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                        settings.notifyAdmins ? "bg-blue-600" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out ${
                          settings.notifyAdmins
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-start justify-between gap-3 pt-4 border-t border-slate-100">
                    <div className="space-y-0.5 flex-1">
                      <label className="text-sm font-medium text-slate-900 cursor-pointer">
                        Allow Reactions
                      </label>
                      <p className="text-xs text-slate-500">
                        Enable likes and emoji reactions on posts.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleSetting("allowReactions")}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                        settings.allowReactions ? "bg-blue-600" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out ${
                          settings.allowReactions
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-start justify-between gap-3 pt-4 border-t border-slate-100">
                    <div className="space-y-0.5 flex-1">
                      <label className="text-sm font-medium text-slate-900 cursor-pointer">
                        Allow Threads
                      </label>
                      <p className="text-xs text-slate-500">
                        Enable nested replies and threaded discussions.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleSetting("allowThreads")}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                        settings.allowThreads ? "bg-blue-600" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out ${
                          settings.allowThreads
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-br from-blue-50 to-blue-50/30 rounded-2xl border border-blue-100/50 p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Quick Tip</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Discussion boards are highly effective during active hackathon
                  hours. Pin a welcome post with instructions on guidelines and
                  resources for all participants.
                </p>
              </div>
            </div>

            <div className="space-y-4 lg:col-span-3">
              <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100/80">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-blue-600" />
                      <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                          Live Preview
                        </h2>
                        <p className="text-sm text-slate-500">
                          Participant view of the forum
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 border border-blue-200">
                      <Shield className="w-3 h-3" />
                      Preview Mode
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search discussions..."
                      disabled
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-400 outline-none cursor-not-allowed select-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all duration-200">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
                            JS
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              Julia Smith
                            </p>
                            <p className="text-xs text-slate-500">
                              2 hours ago • Team Beta
                            </p>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 border border-indigo-100">
                          <Crown className="w-3 h-3" />
                          Team Formation
                        </span>
                      </div>
                      <h5 className="text-sm font-semibold text-slate-900 mt-2.5">
                        How do we merge individual team members if we do not
                        have a full team of 5?
                      </h5>
                      <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">
                        We currently have 3 people in our team. Is there a
                        matchmaking session or should we just find other members
                        in this discussion forum?
                      </p>

                      <div className="mt-3 pl-3 border-l-2 border-blue-200 space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <div className="h-5 w-5 rounded-full bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-[10px] font-bold text-white">
                            O
                          </div>
                          <span className="text-xs font-semibold text-slate-900">
                            Organizer
                          </span>
                          <span className="text-[10px] text-slate-400">
                            • 1 hour ago
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 bg-white p-2 rounded-lg border border-slate-100">
                          Hi Julia! You can recruit members directly here. We
                          will also host a matchmaking session today at 4:00 PM
                          EST.
                        </p>
                      </div>

                      <div className="flex items-center gap-4 mt-3 pt-2 border-t border-slate-100">
                        <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600 transition-colors">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>12</span>
                        </button>
                        <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600 transition-colors">
                          <Reply className="w-3.5 h-3.5" />
                          <span>3 replies</span>
                        </button>
                        {settings.allowReactions && (
                          <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600 transition-colors">
                            <Smile className="w-3.5 h-3.5" />
                            <span>React</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all duration-200">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                            {settings.allowAnonymous ? "A" : "MK"}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {settings.allowAnonymous
                                ? "Anonymous Participant"
                                : "Marcus K."}
                            </p>
                            <p className="text-xs text-slate-500">
                              4 hours ago
                            </p>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 border border-amber-100">
                          <Zap className="w-3 h-3" />
                          API Access
                        </span>
                      </div>
                      <h5 className="text-sm font-semibold text-slate-900 mt-2.5">
                        Is it possible to get sandbox credentials for the
                        Payment API?
                      </h5>
                      <p className="text-xs text-slate-600 mt-1.5">
                        We are trying to test our payment logic and need some
                        dummy credentials to write our integration tests.
                      </p>

                      <div className="flex items-center gap-4 mt-3 pt-2 border-t border-slate-100">
                        <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600 transition-colors">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>8</span>
                        </button>
                        <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600 transition-colors">
                          <Reply className="w-3.5 h-3.5" />
                          <span>1 reply</span>
                        </button>
                      </div>
                    </div>

                    {settings.allowMedia && (
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all duration-200">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-xs font-bold text-white">
                              TR
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-900">
                                Tom Richards
                              </p>
                              <p className="text-xs text-slate-500">
                                6 hours ago • Team Alpha
                              </p>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 border border-rose-100">
                            <Award className="w-3 h-3" />
                            Design
                          </span>
                        </div>
                        <h5 className="text-sm font-semibold text-slate-900 mt-2.5">
                          Looking for UI/UX feedback on our prototype
                        </h5>
                        <p className="text-xs text-slate-600 mt-1.5">
                          We've created a Figma prototype and would love some
                          feedback from the community.
                        </p>
                        <div className="mt-3 p-3 bg-white rounded-lg border border-slate-200 flex items-center gap-3">
                          <Image className="w-4 h-4 text-blue-600" />
                          <span className="text-xs text-slate-600">
                            prototype-preview.figma
                          </span>
                          <span className="text-xs text-slate-400 ml-auto">
                            2.4 MB
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                      <input
                        type="text"
                        placeholder="Ask a question or start a topic..."
                        disabled
                        className="flex-1 bg-transparent px-2 py-1.5 text-sm text-slate-400 outline-none cursor-not-allowed select-none placeholder:text-slate-400"
                      />
                      <div className="flex items-center gap-1">
                        {settings.allowMedia && (
                          <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Paperclip className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Smile className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1.5">
                      {settings.allowMedia
                        ? "💡 Attachments & formatting available"
                        : "💬 Text-only posts"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-xs text-slate-400">
          <p>All forum settings are managed in real-time</p>
        </div>
      </div>
    </div>
  );
}
