"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Plus,
  Save,
  Sparkles,
  X,
  Clock,
  Calendar,
  Edit,
  Trash2,
  CheckCircle,
  Zap,
  ArrowUpRight,
  BarChart3,
  Gift,
  Trophy,
  Users,
  Search,
  ChevronRight,
  AlertCircle,
  Play,
  Pause,
  Flag,
  CalendarIcon,
  Timer,
} from "lucide-react";

export default function TimelinePage() {
  const [bootcampName, setBootcampName] = useState("Java Costco Training 2026");
  const [timelines, setTimelines] = useState<any[]>([]);
  const [saved, setSaved] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredTimeline, setHoveredTimeline] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTimeline, setNewTimeline] = useState({
    title: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("bootcamp-timeline");
      if (stored) {
        const parsed = JSON.parse(stored) as {
          bootcampName?: string;
          timelines?: any[];
        };
        if (parsed.bootcampName) {
          setBootcampName(parsed.bootcampName);
        }
        if (parsed.timelines?.length) {
          setTimelines(parsed.timelines);
        }
      }
    } catch {
      // Ignore storage issues and fall back to defaults.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "bootcamp-timeline",
        JSON.stringify({ bootcampName, timelines })
      );
    } catch {
      // Ignore storage issues.
    }
  }, [bootcampName, timelines]);

  const addTimeline = () => {
    if (newTimeline.title && newTimeline.startDate) {
      const newItem = {
        id: `${Date.now()}`,
        title: newTimeline.title,
        date: newTimeline.startDate,
        endDate: newTimeline.endDate,
        description: newTimeline.description,
        owner: "Owner",
        status: "Planned",
        createdAt: new Date().toISOString(),
      };
      setTimelines((current) => [newItem, ...current]);
      setNewTimeline({
        title: "",
        startDate: "",
        endDate: "",
        description: "",
      });
      setShowForm(false);
      setSaved(false);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const removeTimeline = (id: string) => {
    setTimelines((prev) => prev.filter((item) => item.id !== id));
  };

  const updateTimelineStatus = (id: string, status: string) => {
    setTimelines((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const filteredTimelines = timelines.filter((timeline) =>
    timeline.title.toLowerCase().includes(search.toLowerCase()) ||
    timeline.description?.toLowerCase().includes(search.toLowerCase())
  );

  const summaryCards = [
    {
      label: "Total Events",
      value: timelines.length,
      icon: Calendar,
      color: "blue",
    },
    {
      label: "Upcoming",
      value: timelines.filter((t) => new Date(t.date) > new Date()).length,
      icon: Clock,
      color: "blue",
    },
    {
      label: "Completed",
      value: timelines.filter((t) => new Date(t.date) < new Date()).length,
      icon: CheckCircle,
      color: "blue",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "emerald";
      case "In Progress":
        return "blue";
      case "Planned":
        return "amber";
      default:
        return "gray";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return CheckCircle;
      case "In Progress":
        return Play;
      case "Planned":
        return Pause;
      default:
        return AlertCircle;
    }
  };


  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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
                  <CalendarDays className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                    Timeline
                  </p>
                  <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mt-1">
                    Event Timeline
                  </h1>
                </div>
              </div>
              <p className="text-slate-500 max-w-2xl ml-13">
                Set the start and end dates and times for your bootcamp so participants know when the program runs.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-sm font-medium text-blue-700">
                  {timelines.length} Events
                </span>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <Sparkles size={16} />
                Add Event
              </button>
            </div>
          </div>
        </div>

  
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
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100/80">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Timeline Events
                </h2>
                <p className="text-sm text-slate-500">
                  Manage all events and milestones for your bootcamp
                </p>
              </div>
              <div className="p-2 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                <CalendarDays className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

   
          <div className="p-6 border-b border-slate-100/80">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>


          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm">
              <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Add Timeline Event</h3>
                    <p className="text-sm text-slate-500">Fill in the details to create a new event.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-5">
     
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Event Title <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={newTimeline.title}
                        onChange={(e) => setNewTimeline({ ...newTimeline, title: e.target.value })}
                        placeholder="Enter event title"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Start Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                          <CalendarIcon className="w-4 h-4" />
                        </div>
                        <input
                          type="datetime-local"
                          value={newTimeline.startDate}
                          onChange={(e) => setNewTimeline({ ...newTimeline, startDate: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 [&::-webkit-calendar-picker-indicator]:hover:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
                        />
                      </div>
                      <p className="mt-1 text-xs text-slate-400">
                        {newTimeline.startDate && formatDate(newTimeline.startDate)}
                      </p>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        End Date <span className="text-slate-400 text-xs">(Optional)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                          <Timer className="w-4 h-4" />
                        </div>
                        <input
                          type="datetime-local"
                          value={newTimeline.endDate}
                          onChange={(e) => setNewTimeline({ ...newTimeline, endDate: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 [&::-webkit-calendar-picker-indicator]:hover:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
                        />
                      </div>
                      <p className="mt-1 text-xs text-slate-400">
                        {newTimeline.endDate && formatDate(newTimeline.endDate)}
                      </p>
                    </div>
                  </div>

             
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-slate-500 font-medium mr-1">Quick select:</span>
                    {[
                      { label: "Today", days: 0 },
                      { label: "Tomorrow", days: 1 },
                      { label: "Next Week", days: 7 },
                      { label: "Next Month", days: 30 },
                    ].map(({ label, days }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => {
                          const date = new Date();
                          date.setDate(date.getDate() + days);
                          // Set to 9:00 AM
                          date.setHours(9, 0, 0, 0);
                          const dateString = date.toISOString().slice(0, 16);
                          setNewTimeline({ ...newTimeline, startDate: dateString });
                        }}
                        className="px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors"
                      >
                        {label}
                      </button>
                    ))}
                  </div>

               
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Description <span className="text-slate-400 text-xs">(Optional)</span>
                    </label>
                    <textarea
                      value={newTimeline.description}
                      onChange={(e) => setNewTimeline({ ...newTimeline, description: e.target.value })}
                      placeholder="Enter event description"
                      rows={3}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400 resize-none"
                    />
                  </div>

 
                  <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setNewTimeline({
                          title: "",
                          startDate: "",
                          endDate: "",
                          description: "",
                        });
                      }}
                      className="w-full sm:w-auto rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={addTimeline}
                      disabled={!newTimeline.title || !newTimeline.startDate}
                      className="w-full sm:w-auto rounded-xl bg-linear-to-r from-blue-500 to-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                    >
                      <Plus className="w-4 h-4 inline mr-2" />
                      Create Event
                    </button>
                  </div>


                  {(!newTimeline.title || !newTimeline.startDate) && (
                    <p className="text-xs text-amber-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Please fill in all required fields (*)
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="p-6 space-y-4">
            {filteredTimelines.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex p-4 bg-slate-100 rounded-full mb-4">
                  <CalendarDays className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 font-medium">No events yet</p>
                <p className="text-sm text-slate-400 mt-1">
                  Add your first timeline event to get started
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <Plus size={16} />
                  Add Event
                </button>
              </div>
            ) : (
              filteredTimelines.map((timeline) => {
                const isHovered = hoveredTimeline === timeline.id;
                const StatusIcon = getStatusIcon(timeline.status);
                const statusColor = getStatusColor(timeline.status);

                return (
                  <div
                    key={timeline.id}
                    className="group relative rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    onMouseEnter={() => setHoveredTimeline(timeline.id)}
                    onMouseLeave={() => setHoveredTimeline(null)}
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-blue-400 transition-all duration-300 ${
                        isHovered ? "h-1.5" : "h-1"
                      }`}
                    />

                    <div className="flex items-start justify-between gap-4 relative">
                      <div className="flex items-start gap-4 flex-1">
                        <div
                          className={`p-2.5 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 transition-all duration-300 ${
                            isHovered ? "scale-110" : ""
                          }`}
                        >
                          <CalendarDays className="w-5 h-5 text-white" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <h3 className="text-base font-semibold text-slate-900">
                              {timeline.title}
                            </h3>
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-${statusColor}-100 text-${statusColor}-700`}
                            >
                              <StatusIcon size={12} />
                              {timeline.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                            <span className="inline-flex items-center gap-1">
                              <Clock size={12} />
                              {formatDate(timeline.date)}
                            </span>
                            {timeline.endDate && (
                              <span className="inline-flex items-center gap-1">
                                <Flag size={12} />
                                {formatDate(timeline.endDate)}
                              </span>
                            )}
                          </div>
                          {timeline.description && (
                            <p className="mt-2 text-sm text-slate-600">
                              {timeline.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const statuses = ["Planned", "In Progress", "Completed"];
                            const currentIndex = statuses.indexOf(timeline.status);
                            const nextIndex = (currentIndex + 1) % statuses.length;
                            updateTimelineStatus(timeline.id, statuses[nextIndex]);
                          }}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                          title="Update status"
                        >
                          <Zap size={16} />
                        </button>
                        <button
                          onClick={() => removeTimeline(timeline.id)}
                          className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-400">
          <p>All timeline events are managed in real-time</p>
        </div>
      </div>
    </div>
  );
}