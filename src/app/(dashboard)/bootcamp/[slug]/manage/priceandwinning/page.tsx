"use client";

import { useMemo, useState, useEffect } from "react";
import {
  Award,
  Gift,
  Medal,
  Search,
  Sparkles,
  Trophy,
  Users,
  X,
  ShieldCheck,
  CalendarRange,
  ArrowUpRight,
  Crown,
  Star,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Zap,
  UserPlus,
  Clock,
  BarChart3,
  ChevronRight,
} from "lucide-react";

const starterPrizes = [
  {
    tier: "Gold Award",
    amount: "$1,500",
    note: "Best overall project",
    icon: Crown,
  },
  {
    tier: "Silver Award",
    amount: "$900",
    note: "Strongest execution",
    icon: Medal,
  },
  {
    tier: "Bronze Award",
    amount: "$500",
    note: "Most improved team",
    icon: Award,
  },
];

const starterWinners = [
  {
    rank: "1st Prize",
    team: "Team Alpha",
    mentor: "Nitika Agrawal",
    category: "Innovation",
    score: 98,
  },
  {
    rank: "2nd Prize",
    team: "Team Beta",
    mentor: "Shishir Jha",
    category: "Execution",
    score: 92,
  },
  {
    rank: "3rd Prize",
    team: "Team Gamma",
    mentor: "Priyanka Kumari",
    category: "Presentation",
    score: 87,
  },
];

export default function PriceAndWinningPage() {
  const [prizes, setPrizes] = useState(starterPrizes);
  const [winners, setWinners] = useState(starterWinners);
  const [search, setSearch] = useState("");
  const [isAddingPrize, setIsAddingPrize] = useState(false);
  const [form, setForm] = useState({ tier: "", amount: "", note: "" });
  const [hoveredPrize, setHoveredPrize] = useState<string | null>(null);
  const [hoveredWinner, setHoveredWinner] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredWinners = useMemo(() => {
    const term = search.toLowerCase();
    return winners.filter((winner) =>
      [winner.team, winner.mentor, winner.category, winner.rank].some((value) =>
        value.toLowerCase().includes(term),
      ),
    );
  }, [search, winners]);

  const handleAddPrize = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.tier.trim() || !form.amount.trim() || !form.note.trim()) return;

    setPrizes((prev) => [
      ...prev,
      {
        tier: form.tier.trim(),
        amount: form.amount.trim(),
        note: form.note.trim(),
        icon: Award,
      },
    ]);
    setForm({ tier: "", amount: "", note: "" });
    setIsAddingPrize(false);
  };

  const removePrize = (tier: string) => {
    setPrizes((prev) => prev.filter((item) => item.tier !== tier));
  };

  const announceWinner = (team: string) => {
    setWinners((prev) =>
      prev.map((item) =>
        item.team === team
          ? {
              ...item,
              rank: item.rank.includes("🏆") ? item.rank : `${item.rank} 🏆`,
            }
          : item,
      ),
    );
  };

  const summaryCards = [
    {
      label: "Total Prizes",
      value: prizes.length,
      icon: Gift,
      color: "blue",
    },
    {
      label: "Winners Announced",
      value: winners.length,
      icon: Trophy,
      color: "blue",
    },
    {
      label: "Categories",
      value: new Set(winners.map((item) => item.category)).size,
      icon: BarChart3,
      color: "blue",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50/80 ">
      <div
        className={`w-full transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-100/80 shadow-sm p-6  mb-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-blue-50/30 to-blue-50/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-blue-50/20 to-blue-50/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                    Prizes & Winners
                  </p>
                  <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mt-1">
                    Prize Management
                  </h1>
                </div>
              </div>
              <p className="text-gray-500 max-w-2xl ml-13">
                Showcase the prize pool, recognize winning teams, and keep the
                results easy to review for participants and mentors.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-sm font-medium text-blue-700">Live</span>
              </div>
              <button
                onClick={() => setIsAddingPrize(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
              >
                <Sparkles size={16} />
                Add New Prize
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
                className={`group bg-white rounded-2xl p-6 border border-gray-100/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
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
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    +12%
                  </span>
                  <span className="text-xs text-gray-400">from last cycle</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100/80">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Prize Categories
                  </h2>
                  <p className="text-sm text-gray-500">
                    Manage award levels for the bootcamp cycle
                  </p>
                </div>
                <div className="p-2 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>

            {isAddingPrize && (
              <div className="p-6 border-b border-gray-100/80 bg-linear-to-br from-blue-50/30 to-blue-50/20">
                <form onSubmit={handleAddPrize} className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Add New Prize
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsAddingPrize(false)}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white transition-all"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Prize Tier
                      </label>
                      <input
                        value={form.tier}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, tier: e.target.value }))
                        }
                        placeholder="e.g., Gold Award"
                        className="mt-1.5 w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Amount
                      </label>
                      <input
                        value={form.amount}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            amount: e.target.value,
                          }))
                        }
                        placeholder="e.g., $1,500"
                        className="mt-1.5 w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Description
                      </label>
                      <textarea
                        value={form.note}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, note: e.target.value }))
                        }
                        placeholder="Describe the prize criteria..."
                        rows={2}
                        className="mt-1.5 w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddingPrize(false)}
                      className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-105"
                    >
                      <Plus size={16} className="inline mr-1" />
                      Add Prize
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="p-6 space-y-4">
              {prizes.map((item) => {
                const Icon = item.icon || Award;
                const isHovered = hoveredPrize === item.tier;

                return (
                  <div
                    key={item.tier}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    onMouseEnter={() => setHoveredPrize(item.tier)}
                    onMouseLeave={() => setHoveredPrize(null)}
                  >
                    {/* Single Color Accent */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-blue-400 transition-all duration-300 ${isHovered ? "h-1.5" : "h-1"}`}
                    />

                    <div className="flex items-start justify-between gap-4 relative">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-2.5 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 transition-all duration-300 ${isHovered ? "scale-110" : ""}`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-gray-900">
                            {item.tier}
                          </h3>
                          <p className="text-sm text-gray-500">{item.note}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25">
                          {item.amount}
                        </span>
                        <button
                          onClick={() => removePrize(item.tier)}
                          className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {prizes.length === 0 && (
                <div className="text-center py-12">
                  <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
                    <Gift className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No prizes added yet</p>
                  <button
                    onClick={() => setIsAddingPrize(true)}
                    className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Add your first prize
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100/80">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Winner Highlights
                  </h2>
                  <p className="text-sm text-gray-500">
                    Search and announce winning teams
                  </p>
                </div>
                <div className="p-2 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search winners, mentors, categories..."
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="space-y-3 max-h-120 overflow-y-auto pr-1 custom-scrollbar">
                {filteredWinners.map((item) => {
                  const isHovered = hoveredWinner === item.team;
                  const isAnnounced = item.rank.includes("🏆");

                  return (
                    <div
                      key={item.team}
                      className="group relative rounded-2xl border border-gray-200 p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                      onMouseEnter={() => setHoveredWinner(item.team)}
                      onMouseLeave={() => setHoveredWinner(null)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-linear-to-r from-blue-500 to-blue-600 text-white">
                              {item.rank}
                            </span>
                            {isAnnounced && (
                              <span className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                <CheckCircle size={12} />
                                Announced
                              </span>
                            )}
                          </div>
                          <h3 className="text-sm font-semibold text-gray-900">
                            {item.team}
                          </h3>
                          <p className="text-xs text-gray-500">
                            Category: {item.category}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <button
                            onClick={() => announceWinner(item.team)}
                            disabled={isAnnounced}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                              isAnnounced
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
                            }`}
                          >
                            {isAnnounced ? (
                              <CheckCircle size={12} />
                            ) : (
                              <Zap size={12} />
                            )}
                            {isAnnounced ? "Announced" : "Announce"}
                          </button>
                          {item.score && (
                            <div className="flex items-center gap-1 text-xs">
                              <span className="text-gray-400">Score:</span>
                              <span className="font-semibold text-gray-700">
                                {item.score}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2 p-2 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="w-6 h-6 rounded-full bg-linear-to-br from-blue-100 to-blue-200 flex items-center justify-center text-xs font-semibold text-blue-700">
                          {item.mentor.charAt(0)}
                        </div>
                        <span className="text-xs text-gray-500">Mentor:</span>
                        <span className="text-xs font-medium text-gray-700">
                          {item.mentor}
                        </span>
                        <ArrowUpRight
                          size={12}
                          className="text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-all"
                        />
                      </div>
                    </div>
                  );
                })}

                {filteredWinners.length === 0 && (
                  <div className="text-center py-12">
                    <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500">
                      No winners match your search
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          <p>All prizes and winner announcements are managed in real-time</p>
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
