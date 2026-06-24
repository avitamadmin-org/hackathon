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
  Grid3X3,
  Layers,
  FolderOpen,
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
  GripVertical,
} from "lucide-react";

type CustomTab = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  category?: string;
  icon?: string;
};

export default function CustomTabsPage() {
  const [customTabs, setCustomTabs] = useState<CustomTab[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTab, setEditingTab] = useState<CustomTab | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [expandedTab, setExpandedTab] = useState<string | null>(null);
  
  const [newCustomTab, setNewCustomTab] = useState({
    title: "",
    description: "",
    category: "General",
  });
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const categories = ["General", "Resources", "FAQ", "Guidelines", "Tutorials", "Links"];

  // Load from localStorage on mount
  useEffect(() => {
    setIsVisible(true);
    try {
      const stored = window.localStorage.getItem("bootcamp-customtabs");
      if (stored) {
        const parsed = JSON.parse(stored) as CustomTab[];
        if (parsed.length) {
          setCustomTabs(parsed);
        }
      }
    } catch {
      // Ignore storage issues
    }
  }, []);

  // Save to localStorage whenever customTabs changes
  useEffect(() => {
    try {
      window.localStorage.setItem("bootcamp-customtabs", JSON.stringify(customTabs));
    } catch {
      // Ignore storage issues
    }
  }, [customTabs]);

  const validateForm = () => {
    let isValid = true;
    
    if (!newCustomTab.title.trim()) {
      setTitleError("Tab title is required");
      isValid = false;
    } else if (newCustomTab.title.length > 30) {
      setTitleError("Tab title must be 30 characters or less");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (!newCustomTab.description.trim()) {
      setDescriptionError("Description is required");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    return isValid;
  };

  const addCustomTab = () => {
    if (!validateForm()) return;

    if (editingTab) {
      // Edit existing tab
      setCustomTabs((current) =>
        current.map((tab) =>
          tab.id === editingTab.id
            ? {
                ...tab,
                title: newCustomTab.title.trim(),
                description: newCustomTab.description.trim(),
                category: newCustomTab.category,
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
        title: newCustomTab.title.trim(),
        description: newCustomTab.description.trim(),
        category: newCustomTab.category || "General",
        createdAt: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
      };
      setCustomTabs((current) => [newTab, ...current]);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }

    // Reset form
    setNewCustomTab({
      title: "",
      description: "",
      category: "General",
    });
    setEditingTab(null);
    setShowForm(false);
  };

  const editTab = (tab: CustomTab) => {
    setEditingTab(tab);
    setNewCustomTab({
      title: tab.title,
      description: tab.description,
      category: tab.category || "General",
    });
    setShowForm(true);
  };

  const deleteTab = (id: string) => {
    if (confirm("Are you sure you want to delete this custom tab?")) {
      setCustomTabs((current) => current.filter((tab) => tab.id !== id));
    }
  };

  const cancelForm = () => {
    setNewCustomTab({
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
    setExpandedTab(expandedTab === id ? null : id);
  };

  const filteredTabs = customTabs.filter((tab) =>
    tab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tab.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tab.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const summaryCards = [
    {
      label: "Total Tabs",
      value: customTabs.length,
      icon: Grid3X3,
      color: "blue",
    },
    {
      label: "Categories",
      value: new Set(customTabs.map(t => t.category || "General")).size,
      icon: Layers,
      color: "blue",
    },
    {
      label: "Last Added",
      value: customTabs.length > 0 ? customTabs[0]?.createdAt || "Today" : "N/A",
      icon: Clock,
      color: "blue",
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "General": "blue",
      "Resources": "emerald",
      "FAQ": "purple",
      "Guidelines": "amber",
      "Tutorials": "indigo",
      "Links": "rose",
    };
    return colors[category] || "blue";
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = {
      "General": Grid3X3,
      "Resources": FolderOpen,
      "FAQ": BookOpen,
      "Guidelines": Shield,
      "Tutorials": Award,
      "Links": Sparkles,
    };
    return icons[category] || Grid3X3;
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
                  <Grid3X3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                    Customization
                  </p>
                  <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mt-1">
                    Custom Tabs
                  </h1>
                </div>
              </div>
              <p className="text-slate-500 max-w-2xl ml-13">
                Add custom tabs to provide additional information and resources for participants.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-2xl">
                <Grid3X3 className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  {customTabs.length} Tabs
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingTab(null);
                  setNewCustomTab({ title: "", description: "", category: "General" });
                  setTitleError("");
                  setDescriptionError("");
                  setShowForm(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <Plus size={16} />
                Add Custom Tab
              </button>
            </div>
          </div>

          {/* Success Toast */}
          {showSuccess && (
            <div className="absolute top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl shadow-lg">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">
                  {editingTab ? "Tab updated successfully!" : "Tab added successfully!"}
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

        {/* Main Content */}
        <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100/80">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Custom Tabs
                </h2>
                <p className="text-sm text-slate-500">
                  {customTabs.length} tabs available
                </p>
              </div>
              <div className="p-2 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                <Layers className="w-5 h-5 text-blue-600" />
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
                placeholder="Search custom tabs..."
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

          {/* Custom Tabs List */}
          <div className="p-6 space-y-3">
            {filteredTabs.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex p-4 bg-slate-100 rounded-full mb-4">
                  <Grid3X3 className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 font-medium">
                  {searchTerm ? "No tabs match your search" : "No custom tabs yet"}
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  {searchTerm ? "Try adjusting your search terms" : "Add your first custom tab to provide additional information"}
                </p>
                {!searchTerm && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingTab(null);
                      setNewCustomTab({ title: "", description: "", category: "General" });
                      setTitleError("");
                      setDescriptionError("");
                      setShowForm(true);
                    }}
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <Plus size={16} />
                    Add Custom Tab
                  </button>
                )}
              </div>
            ) : (
              filteredTabs.map((tab) => {
                const isHovered = hoveredTab === tab.id;
                const isExpanded = expandedTab === tab.id;
                const categoryColor = getCategoryColor(tab.category || "General");
                const CategoryIcon = getCategoryIcon(tab.category || "General");

                return (
                  <div
                    key={tab.id}
                    className="group relative rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-md"
                    onMouseEnter={() => setHoveredTab(tab.id)}
                    onMouseLeave={() => setHoveredTab(null)}
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
                          onClick={() => toggleExpand(tab.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="shrink-0 mt-0.5">
                              <div className={`p-2 rounded-xl bg-${categoryColor}-50`}>
                                <CategoryIcon className={`w-4 h-4 text-${categoryColor}-600`} />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h3 className="text-sm font-semibold text-slate-900">
                                  {tab.title}
                                </h3>
                                {tab.category && (
                                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-${categoryColor}-100 text-${categoryColor}-700`}>
                                    {tab.category}
                                  </span>
                                )}
                              </div>
                              {isExpanded && tab.description && (
                                <div 
                                  className="mt-2 text-sm text-slate-600 prose prose-sm max-w-none"
                                  dangerouslySetInnerHTML={{ __html: tab.description }}
                                />
                              )}
                              {!isExpanded && tab.description && (
                                <p className="text-sm text-slate-500 line-clamp-2">
                                  {tab.description.replace(/<[^>]*>/g, '')}
                                </p>
                              )}
                              {tab.createdAt && (
                                <p className="text-xs text-slate-400 mt-2">
                                  Added: {tab.createdAt}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleExpand(tab.id)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            aria-label={isExpanded ? "Collapse" : "Expand"}
                          >
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => editTab(tab)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                            aria-label="Edit tab"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteTab(tab.id)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                            aria-label="Delete tab"
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
          <p>All custom tabs are managed in real-time</p>
        </div>
      </div>

      {/* Add/Edit Custom Tab Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg">
                    <Grid3X3 className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {editingTab ? "Edit Custom Tab" : "Add Custom Tab"}
                  </h3>
                </div>
                <p className="text-sm text-slate-500">
                  {editingTab ? "Update the tab details" : "Create a new custom tab for your bootcamp"}
                </p>
              </div>
              <button
                type="button"
                onClick={cancelForm}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
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
                    const isActive = newCustomTab.category === category;
                    const color = getCategoryColor(category);
                    const Icon = getCategoryIcon(category);
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setNewCustomTab({ ...newCustomTab, category })}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                          isActive
                            ? `border-${color}-500 bg-${color}-50 shadow-md`
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isActive ? `text-${color}-600` : "text-slate-400"}`} />
                        <span className={`text-xs font-medium ${isActive ? `text-${color}-700` : "text-slate-600"}`}>
                          {category}
                        </span>
                        {isActive && <CheckCircle className={`w-3 h-3 text-${color}-600`} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Title */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Tab Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newCustomTab.title}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewCustomTab({ ...newCustomTab, title: value });
                    if (value.length > 30) {
                      setTitleError("Tab title must be 30 characters or less");
                    } else if (value.trim()) {
                      setTitleError("");
                    }
                  }}
                  placeholder="Enter tab title (max 30 characters)"
                  maxLength={30}
                  className={`w-full rounded-xl border ${
                    titleError ? "border-red-500" : "border-slate-200"
                  } px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`}
                />
                {titleError && (
                  <p className="mt-1 text-xs text-red-500">{titleError}</p>
                )}
                <p className="mt-1 text-xs text-slate-400">
                  {newCustomTab.title.length}/30 characters
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Description <span className="text-red-500">*</span>
                </label>
                <div className={`border ${
                  descriptionError ? "border-red-500" : "border-slate-200"
                } rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500`}>
                  <div className="flex flex-wrap items-center gap-0.5 px-3 py-1.5 bg-slate-50 border-b border-slate-200">
                    <button 
                      type="button"
                      className="p-1.5 hover:bg-slate-200 rounded-lg transition text-slate-600 text-xs font-bold"
                      onClick={() => {
                        const textarea = document.querySelector('textarea[name="description"]') as HTMLTextAreaElement;
                        if (textarea) {
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const text = newCustomTab.description;
                          const before = text.substring(0, start);
                          const selected = text.substring(start, end);
                          const after = text.substring(end);
                          setNewCustomTab({
                            ...newCustomTab,
                            description: before + `<b>${selected}</b>` + after
                          });
                        }
                      }}
                    >
                      B
                    </button>
                    <button 
                      type="button"
                      className="p-1.5 hover:bg-slate-200 rounded-lg transition text-slate-600 text-xs italic"
                      onClick={() => {
                        const textarea = document.querySelector('textarea[name="description"]') as HTMLTextAreaElement;
                        if (textarea) {
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const text = newCustomTab.description;
                          const before = text.substring(0, start);
                          const selected = text.substring(start, end);
                          const after = text.substring(end);
                          setNewCustomTab({
                            ...newCustomTab,
                            description: before + `<i>${selected}</i>` + after
                          });
                        }
                      }}
                    >
                      I
                    </button>
                    <span className="text-xs text-slate-400 mx-1">|</span>
                    <button 
                      type="button"
                      className="p-1.5 hover:bg-slate-200 rounded-lg transition text-slate-600 text-xs"
                      onClick={() => {
                        const textarea = document.querySelector('textarea[name="description"]') as HTMLTextAreaElement;
                        if (textarea) {
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const text = newCustomTab.description;
                          const before = text.substring(0, start);
                          const selected = text.substring(start, end);
                          const after = text.substring(end);
                          setNewCustomTab({
                            ...newCustomTab,
                            description: before + `"${selected}"` + after
                          });
                        }
                      }}
                    >
                      "
                    </button>
                    <button 
                      type="button"
                      className="p-1.5 hover:bg-slate-200 rounded-lg transition text-slate-600 text-xs"
                      onClick={() => {
                        const textarea = document.querySelector('textarea[name="description"]') as HTMLTextAreaElement;
                        if (textarea) {
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const text = newCustomTab.description;
                          const before = text.substring(0, start);
                          const selected = text.substring(start, end);
                          const after = text.substring(end);
                          setNewCustomTab({
                            ...newCustomTab,
                            description: before + `©${selected}` + after
                          });
                        }
                      }}
                    >
                      ©
                    </button>
                    <button 
                      type="button"
                      className="p-1.5 hover:bg-slate-200 rounded-lg transition text-slate-600 text-xs"
                      onClick={() => {
                        const textarea = document.querySelector('textarea[name="description"]') as HTMLTextAreaElement;
                        if (textarea) {
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const text = newCustomTab.description;
                          const before = text.substring(0, start);
                          const selected = text.substring(start, end);
                          const after = text.substring(end);
                          setNewCustomTab({
                            ...newCustomTab,
                            description: before + `®${selected}` + after
                          });
                        }
                      }}
                    >
                      ®
                    </button>
                  </div>
                  <textarea
                    name="description"
                    value={newCustomTab.description}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewCustomTab({ ...newCustomTab, description: value });
                      if (value.trim()) {
                        setDescriptionError("");
                      }
                    }}
                    placeholder="Enter the tab content..."
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
                  onClick={addCustomTab}
                  disabled={!newCustomTab.title.trim() || !newCustomTab.description.trim()}
                  className="px-6 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  {editingTab ? "Update Tab" : "Add Tab"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}