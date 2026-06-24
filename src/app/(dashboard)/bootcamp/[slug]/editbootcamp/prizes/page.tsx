"use client";

import { useState, useEffect } from "react";
import {
  Award,
  CirclePlus,
  Gift,
  Trash2,
  Trophy,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Image,
  Link2,
  Strikethrough,
  Underline,
  Quote,
  X,
  Sparkles,
  CheckCircle,
  Zap,
  Crown,
  Medal,
  Star,
  Users,
  Calendar,
  Clock,
  BarChart3,
  TrendingUp,
  Edit,
  Save,
  Search,
  ArrowUpRight,
} from "lucide-react";

type Prize = {
  id: string;
  title: string;
  amount: string;
  description: string;
  type: "Main Prize" | "Special Prize";
  quantity: number;
  currency: string;
};

const initialPrizes: Prize[] = [
  {
    id: "1",
    title: "Best Overall Project",
    amount: "1000",
    description: "Recognizes the most impactful submission across the bootcamp.",
    type: "Main Prize",
    quantity: 1,
    currency: "USD",
  },
  {
    id: "2",
    title: "Most Innovative Solution",
    amount: "1000",
    description: "Celebrates the most creative and forward-thinking approach.",
    type: "Special Prize",
    quantity: 1,
    currency: "USD",
  },
];

export default function PrizesPage() {
  const [prizes, setPrizes] = useState<Prize[]>(initialPrizes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [search, setSearch] = useState("");
  const [hoveredPrize, setHoveredPrize] = useState<string | null>(null);
  const [draft, setDraft] = useState<Prize>({
    id: "",
    title: "",
    amount: "",
    description: "",
    type: "Main Prize",
    quantity: 1,
    currency: "USD",
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleAddPrize = () => {
    if (!draft.title.trim() || !draft.amount.trim()) return;

    const newPrize = {
      id: `${Date.now()}`,
      title: draft.title.trim(),
      amount: draft.amount.trim(),
      description: draft.description.trim(),
      type: draft.type,
      quantity: draft.quantity,
      currency: draft.currency,
    };

    setPrizes((current) => [newPrize, ...current]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    setDraft({
      id: "",
      title: "",
      amount: "",
      description: "",
      type: "Main Prize",
      quantity: 1,
      currency: "USD",
    });
    setIsModalOpen(false);
  };

  const handleRemovePrize = (id: string) => {
    setPrizes((current) => current.filter((prize) => prize.id !== id));
  };

  const handleChange = (field: keyof Prize, value: string | number) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const filteredPrizes = prizes.filter((prize) =>
    prize.title.toLowerCase().includes(search.toLowerCase()) ||
    prize.description.toLowerCase().includes(search.toLowerCase()) ||
    prize.type.toLowerCase().includes(search.toLowerCase())
  );

  const summaryCards = [
    {
      label: "Total Prizes",
      value: prizes.length,
      icon: Trophy,
      color: "blue",
    },
    {
      label: "Main Prizes",
      value: prizes.filter((p) => p.type === "Main Prize").length,
      icon: Crown,
      color: "blue",
    },
    {
      label: "Special Prizes",
      value: prizes.filter((p) => p.type === "Special Prize").length,
      icon: Medal,
      color: "blue",
    },
  ];

  const getPrizeIcon = (type: string) => {
    return type === "Main Prize" ? Crown : Medal;
  };

  const getPrizeColor = (type: string) => {
    return "blue";
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
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                    Rewards
                  </p>
                  <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mt-1">
                    Prize Management
                  </h1>
                </div>
              </div>
              <p className="text-slate-500 max-w-2xl ml-13">
                Configure prizes and rewards for your bootcamp participants.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-sm font-medium text-blue-700">
                  {prizes.length} Prizes
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <Sparkles size={16} />
                Add Prize
              </button>
            </div>
          </div>

          {/* Success Toast */}
          {showSuccess && (
            <div className="absolute top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl shadow-lg">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">
                  Prize added successfully!
                </span>
                <button onClick={() => setShowSuccess(false)} className="ml-2">
                  <X className="w-3 h-3 text-emerald-600 hover:text-emerald-800" />
                </button>
              </div>
            </div>
          )}
        </div>

  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {summaryCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className={`group bg-white rounded-2xl p-6 border border-slate-100/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Prize Categories
                </h2>
                <p className="text-sm text-slate-500">
                  Manage all prize categories for your bootcamp
                </p>
              </div>
              <div className="p-2 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>


          <div className="p-6 border-b border-slate-100/80">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search prizes..."
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

     
          <div className="p-6 space-y-4">
            {filteredPrizes.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex p-4 bg-slate-100 rounded-full mb-4">
                  <Trophy className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 font-medium">No prizes yet</p>
                <p className="text-sm text-slate-400 mt-1">
                  Add your first prize to showcase rewards for participants.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
                >
                  <CirclePlus size={16} />
                  Add Prize
                </button>
              </div>
            ) : (
              filteredPrizes.map((prize) => {
                const isHovered = hoveredPrize === prize.id;
                const Icon = getPrizeIcon(prize.type);

                return (
                  <div
                    key={prize.id}
                    className="group relative rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    onMouseEnter={() => setHoveredPrize(prize.id)}
                    onMouseLeave={() => setHoveredPrize(null)}
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
                          <Icon className="w-5 h-5 text-white" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <h3 className="text-base font-semibold text-slate-900">
                              {prize.title}
                            </h3>
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700`}
                            >
                              {prize.type}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600">
                            {prize.description}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                              {prize.quantity} × {prize.currency} {prize.amount}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleRemovePrize(prize.id)}
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

   
        <div className="mt-6 bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100/80">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Additional Information
                </h2>
                <p className="text-sm text-slate-500">
                  Add any other information regarding the prize.
                </p>
              </div>
              <div className="p-2 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                <Edit className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="flex flex-wrap items-center gap-1 px-3 py-2 bg-slate-50 border-b border-slate-200">
                <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                  <Bold className="h-4 w-4 text-slate-600" />
                </button>
                <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                  <Italic className="h-4 w-4 text-slate-600" />
                </button>
                <div className="w-px h-5 bg-slate-200 mx-1" />
                <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                  <Strikethrough className="h-4 w-4 text-slate-600" />
                </button>
                <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                  <Underline className="h-4 w-4 text-slate-600" />
                </button>
                <div className="w-px h-5 bg-slate-200 mx-1" />
                <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                  <AlignLeft className="h-4 w-4 text-slate-600" />
                </button>
                <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                  <AlignCenter className="h-4 w-4 text-slate-600" />
                </button>
                <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                  <AlignRight className="h-4 w-4 text-slate-600" />
                </button>
                <div className="w-px h-5 bg-slate-200 mx-1" />
                <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                  <List className="h-4 w-4 text-slate-600" />
                </button>
                <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                  <ListOrdered className="h-4 w-4 text-slate-600" />
                </button>
                <div className="w-px h-5 bg-slate-200 mx-1" />
                <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                  <Quote className="h-4 w-4 text-slate-600" />
                </button>
                <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                  <Image className="h-4 w-4 text-slate-600" />
                </button>
                <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                  <Link2 className="h-4 w-4 text-slate-600" />
                </button>
              </div>
              <textarea
                rows={4}
                className="w-full px-4 py-3 text-sm text-slate-900 outline-none resize-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Add any other information regarding the prize..."
              />
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-400">
          <p>All prizes are managed in real-time</p>
        </div>
      </div>

  
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="mb-6 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg">
                    <Trophy className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-900">Add Prize</h2>
                </div>
                <p className="text-sm text-slate-500">Create a new reward for the bootcamp page.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
             
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Prize Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Main Prize", "Special Prize"].map((type) => {
                    const isActive = draft.type === type;
                    const Icon = type === "Main Prize" ? Crown : Medal;
                    return (
                      <button
                        key={type}
                        onClick={() => handleChange("type", type)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                          isActive
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                        <span className={`text-sm font-medium ${isActive ? "text-blue-700" : "text-slate-600"}`}>
                          {type}
                        </span>
                        {isActive && <CheckCircle className="w-3 h-3 ml-auto text-blue-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

          
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Prize Title <span className="text-red-500">*</span>
                </label>
                <input
                  value={draft.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
                  placeholder="Enter prize title"
                />
              </div>

       
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Description <span className="text-red-500">*</span>
                </label>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="flex flex-wrap items-center gap-1 px-3 py-2 bg-slate-50 border-b border-slate-200">
                    <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                      <Bold className="h-4 w-4 text-slate-600" />
                    </button>
                    <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                      <Italic className="h-4 w-4 text-slate-600" />
                    </button>
                    <div className="w-px h-5 bg-slate-200 mx-1" />
                    <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                      <AlignLeft className="h-4 w-4 text-slate-600" />
                    </button>
                    <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                      <AlignCenter className="h-4 w-4 text-slate-600" />
                    </button>
                    <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                      <AlignRight className="h-4 w-4 text-slate-600" />
                    </button>
                    <div className="w-px h-5 bg-slate-200 mx-1" />
                    <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                      <List className="h-4 w-4 text-slate-600" />
                    </button>
                    <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                      <ListOrdered className="h-4 w-4 text-slate-600" />
                    </button>
                    <div className="w-px h-5 bg-slate-200 mx-1" />
                    <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                      <Image className="h-4 w-4 text-slate-600" />
                    </button>
                    <button className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
                      <Link2 className="h-4 w-4 text-slate-600" />
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={draft.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="w-full px-4 py-3 text-sm text-slate-900 outline-none resize-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Enter description"
                  />
                </div>
              </div>

    
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Prize Icon
                </label>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 border-2 border-dashed border-slate-200 rounded-xl text-sm text-slate-600 hover:border-blue-400 hover:bg-blue-50 transition-all">
                    <Image className="w-4 h-4 inline mr-2" />
                    Choose Icon
                  </button>
                  <span className="text-xs text-slate-400">or</span>
                  <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-all">
                    Upload Custom
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-1.5">
                  Choose an icon from the library or upload your own.
                </p>
              </div>

  
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={draft.quantity}
                    onChange={(e) => handleChange("quantity", parseInt(e.target.value) || 1)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Prize Value <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={draft.amount}
                    onChange={(e) => handleChange("amount", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
                    placeholder="e.g., 1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Currency <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={draft.currency}
                    onChange={(e) => handleChange("currency", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white cursor-pointer"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="INR">INR (₹)</option>
                    <option value="JPY">JPY (¥)</option>
                    <option value="CAD">CAD ($)</option>
                    <option value="AUD">AUD ($)</option>
                  </select>
                </div>
              </div>


              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setDraft({
                      id: "",
                      title: "",
                      amount: "",
                      description: "",
                      type: "Main Prize",
                      quantity: 1,
                      currency: "USD",
                    });
                  }}
                  className="px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPrize}
                  disabled={!draft.title.trim() || !draft.amount.trim()}
                  className="px-6 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  Add Prize
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}