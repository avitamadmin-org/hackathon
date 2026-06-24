"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Plus,
  X,
  Pencil,
  Trash2,
  Sparkles,
  CheckCircle,
  HelpCircle,
  MessageSquare,
  FileQuestion,
  Zap,
  Crown,
  Shield,
  Users,
  Clock,
  Award,
  BookOpen,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type FaqTab = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  category?: string;
};

export default function FaqPage() {
  const [faqTabs, setFaqTabs] = useState<FaqTab[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTab, setEditingTab] = useState<FaqTab | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [hoveredFaq, setHoveredFaq] = useState<string | null>(null);
  
  const [newFaqTab, setNewFaqTab] = useState({
    title: "",
    description: "",
    category: "General",
  });
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const categories = ["General", "Registration", "Technical", "Payment", "Team", "Submission"];

  // Load from localStorage on mount
  useEffect(() => {
    setIsVisible(true);
    try {
      const stored = window.localStorage.getItem("bootcamp-Faqtabs");
      if (stored) {
        const parsed = JSON.parse(stored) as FaqTab[];
        if (parsed.length) {
          setFaqTabs(parsed);
        }
      }
    } catch {
      // Ignore storage issues
    }
  }, []);

  // Save to localStorage whenever faqTabs changes
  useEffect(() => {
    try {
      window.localStorage.setItem("bootcamp-Faqtabs", JSON.stringify(faqTabs));
    } catch {
      // Ignore storage issues
    }
  }, [faqTabs]);

  const validateForm = () => {
    let isValid = true;
    
    if (!newFaqTab.title.trim()) {
      setTitleError("Question is required");
      isValid = false;
    } else if (newFaqTab.title.length > 100) {
      setTitleError("Question must be 100 characters or less");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (!newFaqTab.description.trim()) {
      setDescriptionError("Answer is required");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    return isValid;
  };

  const addFaqTab = () => {
    if (!validateForm()) return;

    if (editingTab) {
      // Edit existing tab
      setFaqTabs((current) =>
        current.map((tab) =>
          tab.id === editingTab.id
            ? {
                ...tab,
                title: newFaqTab.title.trim(),
                description: newFaqTab.description.trim(),
                category: newFaqTab.category,
              }
            : tab
        )
      );
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      // Add new tab
      const newTab = {
        id: `${Date.now()}`,
        title: newFaqTab.title.trim(),
        description: newFaqTab.description.trim(),
        category: newFaqTab.category || "General",
        createdAt: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
      };
      setFaqTabs((current) => [newTab, ...current]);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }

    // Reset form
    setNewFaqTab({
      title: "",
      description: "",
      category: "General",
    });
    setEditingTab(null);
    setShowForm(false);
  };

  const editTab = (tab: FaqTab) => {
    setEditingTab(tab);
    setNewFaqTab({
      title: tab.title,
      description: tab.description,
      category: tab.category || "General",
    });
    setShowForm(true);
  };

  const deleteTab = (id: string) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      setFaqTabs((current) => current.filter((tab) => tab.id !== id));
    }
  };

  const cancelForm = () => {
    setNewFaqTab({
      title: "",
      description: "",
      category: "General",
    });
    setEditingTab(null);
    setTitleError("");
    setDescriptionError("");
    setShowForm(false);
  };

  const toggleExpand = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const filteredFaqs = faqTabs.filter((faq) =>
    faq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const summaryCards = [
    {
      label: "Total FAQs",
      value: faqTabs.length,
      icon: FileQuestion,
      color: "blue",
    },
    {
      label: "Categories",
      value: new Set(faqTabs.map(f => f.category || "General")).size,
      icon: BookOpen,
      color: "blue",
    },
    {
      label: "Last Updated",
      value: faqTabs.length > 0 ? faqTabs[0]?.createdAt || "Today" : "N/A",
      icon: Clock,
      color: "blue",
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "General": "blue",
      "Registration": "emerald",
      "Technical": "purple",
      "Payment": "amber",
      "Team": "indigo",
      "Submission": "rose",
    };
    return colors[category] || "blue";
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50/80">
      <div
        className={`w-full transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-100/80 shadow-sm p-6 mb-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-blue-50/30 to-blue-50/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-blue-50/20 to-blue-50/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                    Support
                  </p>
                  <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mt-1">
                    FAQ Management
                  </h1>
                </div>
              </div>
              <p className="text-slate-500 max-w-2xl ml-13">
                Add frequently asked questions to help participants find answers quickly and easily.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-2xl">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  {faqTabs.length} Questions
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingTab(null);
                  setNewFaqTab({ title: "", description: "", category: "General" });
                  setTitleError("");
                  setDescriptionError("");
                  setShowForm(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <Plus size={16} />
                Add FAQ
              </button>
            </div>
          </div>

          {/* Success Toast */}
          {showSuccess && (
            <div className="absolute top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl shadow-lg">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">
                  {editingTab ? "FAQ updated successfully!" : "FAQ added successfully!"}
                </span>
                <button onClick={() => setShowSuccess(false)} className="ml-2">
                  <X className="w-3 h-3 text-emerald-600 hover:text-emerald-800" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary Cards */}
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

        {/* Main Content */}
        <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100/80">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Frequently Asked Questions
                </h2>
                <p className="text-sm text-slate-500">
                  {faqTabs.length} questions available
                </p>
              </div>
              <div className="p-2 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                <FileQuestion className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-6 border-b border-slate-100/80">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search FAQs..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* FAQ List */}
          <div className="p-6 space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex p-4 bg-slate-100 rounded-full mb-4">
                  <HelpCircle className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 font-medium">
                  {searchTerm ? "No FAQs match your search" : "No FAQs yet"}
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  {searchTerm ? "Try adjusting your search terms" : "Add your first FAQ to help participants"}
                </p>
                {!searchTerm && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingTab(null);
                      setNewFaqTab({ title: "", description: "", category: "General" });
                      setTitleError("");
                      setDescriptionError("");
                      setShowForm(true);
                    }}
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
                  >
                    <Plus size={16} />
                    Add FAQ
                  </button>
                )}
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isExpanded = expandedFaq === faq.id;
                const isHovered = hoveredFaq === faq.id;
                const categoryColor = getCategoryColor(faq.category || "General");

                return (
                  <div
                    key={faq.id}
                    className="group rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-md"
                    onMouseEnter={() => setHoveredFaq(faq.id)}
                    onMouseLeave={() => setHoveredFaq(null)}
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-blue-400 transition-all duration-300 rounded-t-2xl ${
                        isHovered ? "h-1.5" : "h-1"
                      }`}
                    />

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div 
                          className="flex-1 cursor-pointer"
                          onClick={() => toggleExpand(faq.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="shrink-0 mt-0.5">
                              <div className={`p-2 rounded-xl bg-${categoryColor}-50`}>
                                <HelpCircle className={`w-4 h-4 text-${categoryColor}-600`} />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h3 className="text-sm font-semibold text-slate-900">
                                  {faq.title}
                                </h3>
                                {faq.category && (
                                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-${categoryColor}-100 text-${categoryColor}-700`}>
                                    {faq.category}
                                  </span>
                                )}
                              </div>
                              {isExpanded && faq.description && (
                                <div 
                                  className="mt-2 text-sm text-slate-600 prose prose-sm max-w-none"
                                  dangerouslySetInnerHTML={{ __html: faq.description }}
                                />
                              )}
                              {!isExpanded && faq.description && (
                                <p className="text-sm text-slate-500 line-clamp-2">
                                  {faq.description.replace(/<[^>]*>/g, '')}
                                </p>
                              )}
                              {faq.createdAt && (
                                <p className="text-xs text-slate-400 mt-2">
                                  Added: {faq.createdAt}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleExpand(faq.id)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            aria-label={isExpanded ? "Collapse" : "Expand"}
                          >
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4 cursor-pointer" />
                            ) : (
                              <ChevronDown className="h-4 w-4 cursor-pointer" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => editTab(faq)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                            aria-label="Edit FAQ"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteTab(faq.id)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                            aria-label="Delete FAQ"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-400">
          <p>All FAQs are managed in real-time</p>
        </div>
      </div>

      {/* Add/Edit FAQ Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg">
                    <HelpCircle className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {editingTab ? "Edit FAQ" : "Add FAQ"}
                  </h3>
                </div>
                <p className="text-sm text-slate-500">
                  {editingTab ? "Update the question and answer" : "Create a new frequently asked question"}
                </p>
              </div>
              <button
                type="button"
                onClick={cancelForm}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categories.map((category) => {
                    const isActive = newFaqTab.category === category;
                    const color = getCategoryColor(category);
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setNewFaqTab({ ...newFaqTab, category })}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all duration-300 ${
                          isActive
                            ? `border-${color}-500 bg-${color}-50 shadow-md`
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <span className={`text-xs font-medium ${isActive ? `text-${color}-700` : "text-slate-600"}`}>
                          {category}
                        </span>
                        {isActive && <CheckCircle className={`w-3 h-3 text-${color}-600`} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Question <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newFaqTab.title}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewFaqTab({ ...newFaqTab, title: value });
                    if (value.length > 100) {
                      setTitleError("Question must be 100 characters or less");
                    } else if (value.trim()) {
                      setTitleError("");
                    }
                  }}
                  placeholder="Enter the frequently asked question"
                  maxLength={100}
                  className={`w-full rounded-xl border ${
                    titleError ? "border-red-500" : "border-slate-200"
                  } px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`}
                />
                {titleError && (
                  <p className="mt-1 text-xs text-red-500">{titleError}</p>
                )}
                <p className="mt-1 text-xs text-slate-400">
                  {newFaqTab.title.length}/100 characters
                </p>
              </div>

              {/* Answer */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Answer <span className="text-red-500">*</span>
                </label>
                <div className={`border ${
                  descriptionError ? "border-red-500" : "border-slate-200"
                } rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500`}>
                  <textarea
                    value={newFaqTab.description}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewFaqTab({ ...newFaqTab, description: value });
                      if (value.trim()) {
                        setDescriptionError("");
                      }
                    }}
                    placeholder="Enter the answer to the question..."
                    rows={5}
                    className="w-full px-4 py-3 text-sm text-slate-900 outline-none resize-none placeholder:text-slate-400"
                  />
                </div>
                {descriptionError && (
                  <p className="mt-1 text-xs text-red-500">{descriptionError}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={cancelForm}
                  className="px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={addFaqTab}
                  disabled={!newFaqTab.title.trim() || !newFaqTab.description.trim()}
                  className="px-6 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  {editingTab ? "Update FAQ" : "Add FAQ"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}