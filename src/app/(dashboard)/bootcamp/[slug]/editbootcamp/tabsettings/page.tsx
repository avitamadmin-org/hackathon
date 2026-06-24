"use client";

import { useState, useEffect } from "react";
import { 
  Check, 
  ChevronRight, 
  Settings2, 
  Sparkles, 
  ToggleLeft, 
  ToggleRight,
  Eye,
  EyeOff,
  Grid3X3,
  Layers,
  Zap,
  Shield,
  Users,
  BookOpen,
  Award,
  DollarSign,
  FileText,
  UserCheck,
  FolderOpen,
  Clock,
  Globe,
  Lock,
  Unlock,
  Search,
  Filter,
  X,
  CheckCircle,
} from "lucide-react";

type TabItem = {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
  icon?: any;
  category?: string;
};

const initialTabs: TabItem[] = [
  {
    id: "overview",
    name: "Overview",
    enabled: true,
    description: "Show the bootcamp overview section on the public page.",
    icon: Globe,
    category: "Main",
  },
  {
    id: "participants",
    name: "Participants",
    enabled: true,
    description: "Display the participants list and team structure.",
    icon: Users,
    category: "Community",
  },
  {
    id: "price",
    name: "Price",
    enabled: true,
    description: "Display the pricing information and enrollment options.",
    icon: DollarSign,
    category: "Main",
  },
  {
    id: "rules",
    name: "Rules",
    enabled: true,
    description: "Display the bootcamp rules and guidelines.",
    icon: Shield,
    category: "Main",
  },
  {
    id: "judges",
    name: "Judges",
    enabled: true,
    description: "Display the bootcamp judges and their credentials.",
    icon: Award,
    category: "Community",
  },
  {
    id: "submissions",
    name: "Submissions",
    enabled: true,
    description: "Display the bootcamp submissions and evaluation criteria.",
    icon: FileText,
    category: "Main",
  },
  {
    id: "mentors",
    name: "Mentors",
    enabled: false,
    description: "Expose the mentor directory and mentoring highlights.",
    icon: UserCheck,
    category: "Community",
  },
  {
    id: "resources",
    name: "Resources",
    enabled: true,
    description: "Allow learners to access shared materials and documents.",
    icon: FolderOpen,
    category: "Resources",
  },
];

export default function TabSettingsPage() {
  const [tabs, setTabs] = useState(initialTabs);
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleTab = (id: string) => {
    setTabs((current) =>
      current.map((tab) => (tab.id === id ? { ...tab, enabled: !tab.enabled } : tab))
    );
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const categories = ["All", ...new Set(tabs.map(tab => tab.category || "Main"))];

  const filteredTabs = tabs.filter((tab) => {
    const matchesSearch = tab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tab.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tab.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activeTabs = tabs.filter((tab) => tab.enabled);
  const hiddenTabs = tabs.filter((tab) => !tab.enabled);

  const summaryCards = [
    {
      label: "Total Tabs",
      value: tabs.length,
      icon: Grid3X3,
      color: "blue",
    },
    {
      label: "Active Tabs",
      value: activeTabs.length,
      icon: Eye,
      color: "blue",
    },
    {
      label: "Hidden Tabs",
      value: hiddenTabs.length,
      icon: EyeOff,
      color: "blue",
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Main": "blue",
      "Community": "purple",
      "Resources": "blue",
    };
    return colors[category] || "blue";
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = {
      "Main": Shield,
      "Community": Users,
      "Resources": FolderOpen,
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
                  <Settings2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                    Configuration
                  </p>
                  <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mt-1">
                    Tab Settings
                  </h1>
                </div>
              </div>
              <p className="text-slate-500 max-w-2xl ml-13">
                Control which sections appear for your bootcamp visitors. Enable or hide public tabs to match the experience you want applicants and participants to see.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-2xl">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  {activeTabs.length} Active Tabs
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl">
                <Lock className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">
                  {hiddenTabs.length} Hidden
                </span>
              </div>
            </div>
          </div>

          {/* Success Toast */}
          {showSuccess && (
            <div className="absolute top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-xl shadow-lg">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  Tab settings updated successfully!
                </span>
                <button onClick={() => setShowSuccess(false)} className="ml-2">
                  <X className="w-3 h-3 text-blue-600 hover:text-blue-800" />
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
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Tabs List */}
          <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100/80">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Tab Configuration
                  </h2>
                  <p className="text-sm text-slate-500">
                    Manage visibility of each tab
                  </p>
                </div>
                <div className="p-2 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                  <Layers className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="p-6 border-b border-slate-100/80">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search tabs..."
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
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                        selectedCategory === category
                          ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs List */}
            <div className="p-6 space-y-3">
              {filteredTabs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex p-4 bg-slate-100 rounded-full mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500 font-medium">No tabs found</p>
                  <p className="text-sm text-slate-400 mt-1">
                    Try adjusting your search or filter
                  </p>
                </div>
              ) : (
                filteredTabs.map((tab) => {
                  const isHovered = hoveredTab === tab.id;
                  const Icon = tab.icon || Grid3X3;
                  const categoryColor = getCategoryColor(tab.category || "Main");

                  return (
                    <div
                      key={tab.id}
                      className="group relative rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:shadow-md"
                      onMouseEnter={() => setHoveredTab(tab.id)}
                      onMouseLeave={() => setHoveredTab(null)}
                    >
                      <div
                        className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300 rounded-t-2xl ${
                          tab.enabled ? "bg-blue-400" : "bg-slate-300"
                        } ${isHovered ? "h-1.5" : "h-1"}`}
                      />

                      <div className="flex items-start justify-between gap-4 relative">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`p-2 rounded-xl bg-${categoryColor}-50 shrink-0`}>
                            <Icon className={`w-4 h-4 text-${categoryColor}-600`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 ">
                              <h3 className="text-sm font-semibold text-slate-900">
                                {tab.name}
                              </h3>
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-${categoryColor}-100 text-${categoryColor}-700`}>
                                {tab.category}
                              </span>
                              {tab.enabled ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-700">
                                  <Check className="w-2.5 h-2.5" />
                                  Visible
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">
                                  <EyeOff className="w-2.5 h-2.5" />
                                  Hidden
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-xs text-slate-500">
                              {tab.description}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleTab(tab.id)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-300 cursor-pointer ${
                            tab.enabled
                              ? "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {tab.enabled ? (
                            <Unlock className="h-3.5 w-3.5" />
                          ) : (
                            <Lock className="h-3.5 w-3.5" />
                          )}
                          {tab.enabled ? "Enabled" : "Disabled"}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden sticky top-6">
              <div className="p-6 border-b border-slate-100/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-blue-600" />
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">
                        Visibility Preview
                      </h2>
                      <p className="text-sm text-slate-500">
                        Tabs visible to participants
                      </p>
                    </div>
                  </div>
                  <div className="p-2 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                    <Check className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                {activeTabs.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="inline-flex p-3 bg-slate-100 rounded-full mb-3">
                      <EyeOff className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-sm text-slate-500">No tabs are currently visible</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Enable tabs to see them here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {activeTabs.map((tab) => {
                      const Icon = tab.icon || Grid3X3;
                      const categoryColor = getCategoryColor(tab.category || "Main");
                      
                      return (
                        <div
                          key={tab.id}
                          className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 hover:bg-slate-100 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <div className={`p-1 rounded-lg bg-${categoryColor}-50`}>
                              <Icon className={`w-3.5 h-3.5 text-${categoryColor}-600`} />
                            </div>
                            <span className="text-sm font-medium text-slate-700">
                              {tab.name}
                            </span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-400" />
                        </div>
                      );
                    })}
                  </div>
                )}

                {hiddenTabs.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-400 mb-2">
                      Hidden tabs ({hiddenTabs.length})
                    </p>
                    <div className="space-y-1.5">
                      {hiddenTabs.map((tab) => {
                        const Icon = tab.icon || Grid3X3;
                        return (
                          <div
                            key={tab.id}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50/50 text-slate-400"
                          >
                            <Icon className="w-3.5 h-3.5" />
                            <span className="text-xs line-through">{tab.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Visible tabs</span>
                  <span className="font-semibold text-blue-600">{activeTabs.length}</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-slate-500">Hidden tabs</span>
                  <span className="font-semibold text-slate-400">{hiddenTabs.length}</span>
                </div>
                <div className="mt-2 w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-linear-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${(activeTabs.length / tabs.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Tip */}
            <div className="bg-linear-to-br from-blue-50 to-blue-50/30 rounded-2xl border border-blue-100/50 p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Quick Tip</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hide tabs that are not relevant to your current bootcamp phase to keep the navigation clean and focused for participants.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-400">
          <p>All tab settings are managed in real-time</p>
        </div>
      </div>
    </div>
  );
}