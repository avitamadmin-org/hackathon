"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  HelpCircle,
  AlertTriangle,
  Pencil,
  Trash2,
  Copy,
  Check,
  Globe,
  Users,
  User,
  Ban,
  Infinity as InfinityIcon,
  ChevronDown,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Link,
  Image as ImageIcon,
  Video,
  Undo2,
  Redo2,
  Maximize2,
  Minimize2,
  Save,
  FileText,
  Sliders,
  Send,
  Plus,
  X,
  Eye,
  FileEdit,
  Calendar,
  Award,
  Sparkles,
  CheckCircle,
  FolderOpen,
  BookOpen,
  Zap,
  Crown,
  Shield,
  Clock,
  Settings2,
  Grid3X3,
  Layers,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export function MentoringContent({ section }: { section: string }) {
  const [isMounted, setIsMounted] = useState(false);

  // --- Subdomain States ---
  const [subdomain, setSubdomain] = useState("nodeangularfullstackapr26");
  const [isEditingSubdomain, setIsEditingSubdomain] = useState(false);
  const [tempSubdomain, setTempSubdomain] = useState(subdomain);
  const [showSuccess, setShowSuccess] = useState(false);

  // --- Registration States ---
  const [regType, setRegType] = useState<"unlimited" | "limited" | "closed">("limited");
  const [regLimit, setRegLimit] = useState(29);

  // --- Team Size States ---
  const [teamType, setTeamType] = useState<"single" | "1-3" | "2-5" | "custom">("custom");
  const [customMin, setCustomMin] = useState(1);
  const [customMax, setCustomMax] = useState(6);

  // --- Description States ---
  const [descContent, setDescContent] = useState("");
  const [descIsPreview, setDescIsPreview] = useState(false);
  const [descIsFullscreen, setIsDescFullscreen] = useState(false);
  const [descDropdownOpen, setDescDropdownOpen] = useState(false);
  const editorTextareaRef = useRef<HTMLTextAreaElement>(null);
  const editorDropdownRef = useRef<HTMLDivElement>(null);

  // --- Phases States ---
  const [phasesList, setPhasesList] = useState([
    {
      id: "1",
      dates: "Apr 27, 2026 09:00 AM - Jun 07, 2026 06:00 PM",
      timezone: "Asia/Kolkata",
      title: "Node Angular Full Stack | Sprint 1",
      assessment: "UST Campus and Grad Training - Capstone Draft - 3",
    },
    {
      id: "2",
      dates: "Jun 09, 2026 09:00 AM - Jun 11, 2026 09:00 AM",
      timezone: "Asia/Kolkata",
      title: "Node Angular Full Stack | Sprint 2",
      assessment: "UST Campus and Grad Training - Capstone Draft - 3",
    },
    {
      id: "3",
      dates: "Jun 12, 2026 09:00 AM - Jun 14, 2026 06:00 PM",
      timezone: "Asia/Kolkata",
      title: "Node Angular Full Stack | Sprint 3",
      assessment: "UST Campus and Grad Training - Capstone Draft - 3",
    },
  ]);

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedSubdomain = window.localStorage.getItem("bootcamp-subdomain");
      if (storedSubdomain) {
        setSubdomain(storedSubdomain);
        setTempSubdomain(storedSubdomain);
      }

      const storedRegType = window.localStorage.getItem("bootcamp-reg-type");
      if (storedRegType) setRegType(storedRegType as any);

      const storedRegLimit = window.localStorage.getItem("bootcamp-reg-limit");
      if (storedRegLimit) setRegLimit(Number(storedRegLimit));

      const storedTeamType = window.localStorage.getItem("bootcamp-team-type");
      if (storedTeamType) setTeamType(storedTeamType as any);

      const storedCustomMin = window.localStorage.getItem("bootcamp-team-min");
      if (storedCustomMin) setCustomMin(Number(storedCustomMin));

      const storedCustomMax = window.localStorage.getItem("bootcamp-team-max");
      if (storedCustomMax) setCustomMax(Number(storedCustomMax));

      const storedDesc = window.localStorage.getItem("bootcamp-description");
      if (storedDesc) {
        setDescContent(storedDesc);
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (editorDropdownRef.current && !editorDropdownRef.current.contains(event.target as Node)) {
        setDescDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopySubdomain = () => {
    const link = `https://${subdomain}.hackerearth.com`;
    navigator.clipboard.writeText(link);
    setShowSuccess(true);
    toast.success("Subdomain link copied to clipboard!", {
      duration: 3000,
      position: "top-right",
      style: {
        borderRadius: "12px",
        background: "#0f172a",
        color: "#fff",
        fontSize: "14px",
      },
    });
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSaveSubdomain = () => {
    if (!tempSubdomain.trim()) {
      toast.error("Subdomain cannot be empty");
      return;
    }
    const cleanSubdomain = tempSubdomain.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    setSubdomain(cleanSubdomain);
    setTempSubdomain(cleanSubdomain);
    setIsEditingSubdomain(false);
    try {
      window.localStorage.setItem("bootcamp-subdomain", cleanSubdomain);
      setShowSuccess(true);
      toast.success("Subdomain updated successfully!");
      setTimeout(() => setShowSuccess(false), 3000);
    } catch {
      // Ignore
    }
  };

  const handleSaveRegSettings = () => {
    try {
      window.localStorage.setItem("bootcamp-reg-type", regType);
      window.localStorage.setItem("bootcamp-reg-limit", String(regLimit));
      setShowSuccess(true);
      toast.success("Registration settings saved successfully!");
      setTimeout(() => setShowSuccess(false), 3000);
    } catch {
      // Ignore
    }
  };

  const handleSaveTeamSettings = () => {
    try {
      window.localStorage.setItem("bootcamp-team-type", teamType);
      window.localStorage.setItem("bootcamp-team-min", String(customMin));
      window.localStorage.setItem("bootcamp-team-max", String(customMax));
      setShowSuccess(true);
      toast.success("Team size settings saved successfully!");
      setTimeout(() => setShowSuccess(false), 3000);
    } catch {
      // Ignore
    }
  };

  const handleSaveDescription = () => {
    try {
      window.localStorage.setItem("bootcamp-description", descContent);
      setShowSuccess(true);
      toast.success("Description saved successfully!");
      setTimeout(() => setShowSuccess(false), 3000);
    } catch {
      // Ignore
    }
  };

  const insertEditorFormatting = (prefix: string, suffix: string = "") => {
    const textarea = editorTextareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    const before = text.substring(0, start);
    const after = text.substring(end);

    const newText = before + prefix + (selectedText || "") + suffix + after;
    setDescContent(newText);

    setTimeout(() => {
      textarea.focus();
      const selectionStart = start + prefix.length;
      const selectionEnd = selectionStart + (selectedText || "").length;
      textarea.setSelectionRange(selectionStart, selectionEnd);
    }, 0);
  };

  const renderDescriptionPreview = () => {
    if (!descContent.trim()) {
      return { __html: `<p class="text-slate-400 italic">No content to display.</p>` };
    }

    let html = descContent
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    html = html.replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-slate-900 mt-4 mb-2 border-b border-slate-100 pb-1">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold text-slate-900 mt-5 mb-2">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-xl font-bold text-slate-900 mt-6 mb-3">$1</h1>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900 bg-slate-50 px-1 rounded border border-slate-100">$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    html = html.replace(/^\-\s?(.*$)/gim, '<li class="ml-4 list-disc text-slate-700 my-1">$1</li>');
    html = html.replace(/\n\n/g, '</p><p class="my-3 text-slate-700 leading-relaxed">');
    html = '<p class="my-3 text-slate-700 leading-relaxed">' + html + '</p>';
    html = html.replace(/<p><\/p>/g, "");

    return { __html: html };
  };

  if (!isMounted) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-32 bg-slate-200 rounded-2xl"></div>
      </div>
    );
  }

  // --- TAB 1: PHASES ---
  if (section === "phases") {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50/80 p-4">
        <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100/80">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Phases</h3>
                <p className="text-sm text-slate-500">Add and manage phases for your bootcamp.</p>
              </div>
              <div className="p-2 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                <Layers className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/50 p-4 text-blue-800">
              <AlertTriangle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h5 className="text-sm font-semibold">Phases cannot be modified</h5>
                <p className="text-xs text-blue-700 leading-relaxed">
                  Once published, phases cannot be changed. You can only view the existing phases.
                </p>
              </div>
            </div>

            <div className="space-y-4 relative pl-5 border-l-2 border-blue-200 ml-3">
              {phasesList.map((phase, idx) => (
                <div key={phase.id} className="relative group space-y-2.5 pb-2">
                  <div className="absolute left-[-27px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-blue-200 bg-white group-hover:border-blue-600 transition duration-200 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400 group-hover:bg-blue-600" />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-2xs text-slate-500 font-semibold uppercase tracking-wider">
                    <span className="bg-blue-50/80 px-2 py-0.5 rounded border border-blue-200 text-blue-700">
                      {phase.dates}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-400">{phase.timezone}</span>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition duration-200">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{phase.title}</h4>
                        <div className="mt-2 space-y-1">
                          <p className="text-2xs font-semibold text-slate-400 uppercase tracking-wider">Linked Assessments</p>
                          <p className="text-xs text-slate-700">{phase.assessment}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition">
                        <button
                          type="button"
                          disabled
                          className="inline-flex items-center gap-1 text-2xs font-semibold text-slate-400 bg-slate-50 border border-slate-100 hover:bg-slate-100 rounded-lg px-2.5 py-1.5 cursor-not-allowed"
                        >
                          <Pencil className="h-3 w-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          disabled
                          className="inline-flex items-center gap-1 text-2xs font-semibold text-slate-400 bg-slate-50 border border-slate-100 hover:bg-red-50 hover:text-red-600 rounded-lg px-2.5 py-1.5 cursor-not-allowed"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- TAB 2: DESCRIPTION ---
  if (section === "description") {
    return (
      <div className={`min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50/80 p-4 ${descIsFullscreen ? "fixed inset-0 z-50 bg-slate-50 p-6 overflow-y-auto" : "relative"}`}>
        <Toaster />
        <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100/80">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Description</h3>
                <p className="text-sm text-slate-500">Edit the description shown to participants on your program page.</p>
              </div>
              <div className="p-2 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col min-h-[400px]">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50/80 border-b border-slate-200 flex-wrap gap-2">
                <div className="flex items-center gap-1 flex-wrap">
                  <div className="relative" ref={editorDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setDescDropdownOpen(!descDropdownOpen)}
                      disabled={descIsPreview}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-all hover:shadow-sm ${
                        descIsPreview ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <span>Paragraph</span>
                      <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                    </button>

                    {descDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 z-30 w-40 rounded-xl border border-slate-200 bg-white shadow-lg p-1.5 space-y-0.5">
                        <button
                          type="button"
                          onClick={() => { insertEditorFormatting("\n# "); setDescDropdownOpen(false); }}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-bold transition-colors"
                        >
                          Heading 1
                        </button>
                        <button
                          type="button"
                          onClick={() => { insertEditorFormatting("\n## "); setDescDropdownOpen(false); }}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-semibold transition-colors"
                        >
                          Heading 2
                        </button>
                        <button
                          type="button"
                          onClick={() => { insertEditorFormatting("\n### "); setDescDropdownOpen(false); }}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors"
                        >
                          Heading 3
                        </button>
                        <button
                          type="button"
                          onClick={() => { setDescDropdownOpen(false); }}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                          Paragraph
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="h-6 w-[1px] bg-slate-200 mx-1" />

                  <button
                    type="button"
                    onClick={() => insertEditorFormatting("**", "**")}
                    disabled={descIsPreview}
                    className="p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all disabled:opacity-40"
                  >
                    <Bold className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertEditorFormatting("*", "*")}
                    disabled={descIsPreview}
                    className="p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all disabled:opacity-40"
                  >
                    <Italic className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertEditorFormatting("\n- ")}
                    disabled={descIsPreview}
                    className="p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all disabled:opacity-40"
                  >
                    <List className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertEditorFormatting("\n1. ")}
                    disabled={descIsPreview}
                    className="p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all disabled:opacity-40"
                  >
                    <ListOrdered className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertEditorFormatting("\n> ")}
                    disabled={descIsPreview}
                    className="p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all disabled:opacity-40"
                  >
                    <Quote className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertEditorFormatting("[", "](https://)")}
                    disabled={descIsPreview}
                    className="p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all disabled:opacity-40"
                  >
                    <Link className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertEditorFormatting("![image](", ")")}
                    disabled={descIsPreview}
                    className="p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all disabled:opacity-40"
                  >
                    <ImageIcon className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertEditorFormatting("![video](", ")")}
                    disabled={descIsPreview}
                    className="p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all disabled:opacity-40"
                  >
                    <Video className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setDescIsPreview(!descIsPreview)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                      descIsPreview
                        ? "bg-linear-to-r from-blue-500 to-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/25"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {descIsPreview ? (
                      <>
                        <FileEdit className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </>
                    ) : (
                      <>
                        <Eye className="h-3.5 w-3.5" />
                        <span>Preview</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDescFullscreen(!descIsFullscreen)}
                    className="p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all"
                  >
                    {descIsFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex-1 flex flex-col min-h-[400px]">
                <div className="flex-1 w-full p-5 overflow-auto bg-slate-50/30 font-sans">
                  <div className="flex flex-wrap items-center justify-center gap-3 mb-6 select-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-[10px] font-bold text-blue-700 shadow-sm">
                      <Calendar className="h-3 w-3" />
                      Duration: 10 Weeks (5 Sprints)
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700 shadow-sm">
                      <Sliders className="h-3 w-3" />
                      Assessment: Every 2 Weeks
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-[10px] font-bold text-blue-700 shadow-sm">
                      <Award className="h-3 w-3" />
                      Outcome: Job-ready Full Stack Developer
                    </span>
                  </div>

                  <div className="relative flex items-stretch gap-6 min-w-[1000px] select-none pb-6">
                    <div className="absolute top-[40px] left-0 right-0 h-[2px] border-t-2 border-dotted border-slate-200 z-0" />

                    {[
                      {
                        sprint: "SPRINT 1",
                        theme: "Node.js and express",
                        weeks: [
                          { num: "Week 1", title: "Node.js & Express", topics: ["Node.js Basics & Runtime", "Express.js Setup & Routing", "Middleware Concepts", "REST API Development", "Request & Response Handling"] },
                          { num: "Week 2", title: "Advanced Backend", topics: ["Database Integration (MongoDB/SQL)", "Authentication (JWT, Sessions)", "Error Handling & Validation", "Performance & Caching", "Testing (Unit & API Testing)"] },
                        ],
                        assessment: "ASSESSMENT #1",
                        assessmentDesc: "Quiz + Coding",
                        borderColor: "border-blue-200",
                        bgColor: "bg-blue-50",
                        textColor: "text-blue-800",
                      },
                      {
                        sprint: "SPRINT 2",
                        theme: "Angular",
                        weeks: [
                          { num: "Week 3", title: "Angular Fundamentals", topics: ["Angular Basics & Project Setup", "Components, Templates & Styling", "Data Binding & Directives", "Routing & Navigation", "Forms (Template-driven & Reactive)"] },
                          { num: "Week 4", title: "Advanced Angular", topics: ["Services & Dependency Injection", "State Management (RxJS, NgRx Basics)", "API Integration & HTTP Client", "Performance Optimization", "Testing (Unit & E2E)"] },
                        ],
                        assessment: "ASSESSMENT #2",
                        assessmentDesc: "Quiz + coding",
                        borderColor: "border-blue-200",
                        bgColor: "bg-blue-50",
                        textColor: "text-blue-800",
                      },
                      {
                        sprint: "SPRINT 3",
                        theme: "React Native",
                        weeks: [
                          { num: "Week 5", title: "React Native Fundamentals", topics: ["React Native Fundamentals", "Components & Styling", "Navigation (Stack, Tab, Drawer)", "State Management (Context, Redux)", "Forms & User Input Handling"] },
                          { num: "Week 6", title: "Advanced React Native", topics: ["API Integration & Networking", "Device Features (Camera, Location, Storage)", "Performance Optimization", "Testing (Unit & E2E)", "Animations & Gestures"] },
                        ],
                        assessment: "ASSESSMENT #3",
                        assessmentDesc: "Quiz + Project",
                        borderColor: "border-blue-200",
                        bgColor: "bg-blue-50",
                        textColor: "text-blue-800",
                      },
                      {
                        sprint: "SPRINT 4",
                        theme: "CI/CD, AWS & MongoDB",
                        weeks: [
                          { num: "Week 7", title: "DB & Cloud Fundamentals", topics: ["MongoDB Basics & Data Modeling", "CRUD Operations & Indexing", "AWS Fundamentals (EC2, S3, IAM)", "Cloud Deployment Basics", "Environment Configuration & Secrets"] },
                          { num: "Week 8", title: "CI/CD & Cloud Deployment", topics: ["CI/CD Concepts & Pipelines", "GitHub Actions / Jenkins Basics", "Docker & Containerization", "Deployment on AWS (EC2 / ECS)", "Monitoring & Logging (CloudWatch)"] },
                        ],
                        assessment: "ASSESSMENT #4",
                        assessmentDesc: "Quiz + Project",
                        borderColor: "border-blue-200",
                        bgColor: "bg-blue-50",
                        textColor: "text-blue-800",
                      },
                      {
                        sprint: "SPRINT 5",
                        theme: "Project implementing and integration",
                        weeks: [
                          { num: "Week 9", title: "Project Implementation", topics: ["Project Setup & Architecture", "Module Development (Core Features)", "API Integration", "Database Design & Integration", "Code Reviews & Best Practices"] },
                          { num: "Week 10", title: "Integration & Delivery", topics: ["Service Integration & Workflow", "Third-Party Integrations (APIs)", "End-to-End Testing", "CI/CD Integration", "Final Deployment & Demo"] },
                        ],
                        assessment: null,
                        assessmentDesc: null,
                        borderColor: "border-blue-200",
                        bgColor: "bg-blue-50",
                        textColor: "text-blue-800",
                      },
                    ].map((sprintObj) => (
                      <div key={sprintObj.sprint} className="flex-1 flex flex-col items-center z-10">
                        <div className="text-center mb-3">
                          <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">{sprintObj.sprint}</span>
                          <span className="block text-[10px] font-bold text-slate-600">{sprintObj.theme}</span>
                        </div>

                        <div className="flex gap-2">
                          {sprintObj.weeks.map((week) => (
                            <div key={week.num} className="w-[125px] bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col transition hover:border-blue-300 hover:shadow-md">
                              <div className="bg-blue-600 text-white text-[9px] font-semibold py-0.5 px-2 text-center uppercase tracking-wide">
                                {week.num}
                              </div>
                              <div className="flex-1 p-2 space-y-1.5">
                                <span className="bg-blue-50 text-blue-700 text-[8px] font-bold block text-center rounded border border-blue-200 py-0.5 leading-none">
                                  {week.title}
                                </span>
                                <ul className="space-y-1 text-[8px] text-slate-500 leading-normal list-disc pl-2.5">
                                  {week.topics.map((topic, tIdx) => (
                                    <li key={tIdx} className="marker:text-blue-300">{topic}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>

                        {sprintObj.assessment ? (
                          <div className="flex flex-col items-center w-full mt-3">
                            <div className="h-4 w-[2px] border-l-2 border-dotted border-slate-300" />
                            <div className={`${sprintObj.bgColor} rounded-md border ${sprintObj.borderColor} py-1 px-2.5 text-center w-28 shadow-sm`}>
                              <span className="block text-[7px] font-bold text-slate-400 tracking-wide uppercase leading-none">{sprintObj.assessment}</span>
                              <span className={`block text-[8px] font-bold ${sprintObj.textColor} mt-0.5 leading-none`}>{sprintObj.assessmentDesc}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full mt-3 min-h-[40px]" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center mt-4">
                    <div className="bg-linear-to-r from-blue-500 to-blue-600 text-white text-[9px] font-bold py-1.5 px-5 rounded-full uppercase tracking-wider shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all cursor-pointer select-none hover:scale-105">
                      FINAL APPLICATION & ASSESSMENT
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end mt-4">
              <button
                type="button"
                onClick={handleSaveDescription}
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-105"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- TAB 3: TEAM SIZE ---
  if (section === "teamsize") {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50/80 p-4">
        <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100/80">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Team Size</h3>
                <p className="text-sm text-slate-500">Configure team size. Choose whether participants compete individually or in teams.</p>
              </div>
              <div className="p-2 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div
                onClick={() => setTeamType("single")}
                className={`cursor-pointer rounded-2xl border p-5 shadow-sm hover:shadow-md transition duration-200 flex items-center justify-between ${
                  teamType === "single"
                    ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500/5"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${teamType === "single" ? "bg-blue-100 border-blue-300 text-blue-700" : "bg-slate-50 border-slate-100 text-slate-400"}`}>
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Single Member</h4>
                    <p className="text-2xs text-slate-500 mt-0.5">Participants register and work individually.</p>
                  </div>
                </div>
                {teamType === "single" && <Check className="h-4 w-4 text-blue-600 shrink-0" />}
              </div>

              <div
                onClick={() => setTeamType("1-3")}
                className={`cursor-pointer rounded-2xl border p-5 shadow-sm hover:shadow-md transition duration-200 flex items-center justify-between ${
                  teamType === "1-3"
                    ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500/5"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${teamType === "1-3" ? "bg-blue-100 border-blue-300 text-blue-700" : "bg-slate-50 border-slate-100 text-slate-400"}`}>
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">1 - 3 Members</h4>
                    <p className="text-2xs text-slate-500 mt-0.5">Teams consist of 1 to 3 participants.</p>
                  </div>
                </div>
                {teamType === "1-3" && <Check className="h-4 w-4 text-blue-600 shrink-0" />}
              </div>

              <div
                onClick={() => setTeamType("2-5")}
                className={`cursor-pointer rounded-2xl border p-5 shadow-sm hover:shadow-md transition duration-200 flex items-center justify-between ${
                  teamType === "2-5"
                    ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500/5"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${teamType === "2-5" ? "bg-blue-100 border-blue-300 text-blue-700" : "bg-slate-50 border-slate-100 text-slate-400"}`}>
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">2 - 5 Members</h4>
                    <p className="text-2xs text-slate-500 mt-0.5">Teams consist of 2 to 5 participants.</p>
                  </div>
                </div>
                {teamType === "2-5" && <Check className="h-4 w-4 text-blue-600 shrink-0" />}
              </div>

              <div
                onClick={() => setTeamType("custom")}
                className={`cursor-pointer rounded-2xl border p-5 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between gap-3 ${
                  teamType === "custom"
                    ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500/5"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-start justify-between gap-3 w-full">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border ${teamType === "custom" ? "bg-blue-100 border-blue-300 text-blue-700" : "bg-slate-50 border-slate-100 text-slate-400"}`}>
                      <Sliders className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Custom Size</h4>
                      <p className="text-2xs text-slate-500 mt-0.5">Configure your own minimum and maximum boundaries.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 border border-blue-200 rounded-lg px-2.5 py-1">
                      {customMin} - {customMax}
                    </span>
                    {teamType === "custom" && <Check className="h-4 w-4 text-blue-600" />}
                  </div>
                </div>

                {teamType === "custom" && (
                  <div className="mt-2 border-t border-blue-100 pt-3.5 grid grid-cols-2 gap-3 animate-slideDown">
                    <div className="space-y-1">
                      <label className="text-3xs font-semibold text-blue-600 uppercase tracking-wider block">Min Members</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min={1}
                          max={10}
                          value={customMin}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setCustomMin(val);
                            if (customMax < val) setCustomMax(val);
                          }}
                          className="w-full h-1.5 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">{customMin}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-3xs font-semibold text-blue-600 uppercase tracking-wider block">Max Members</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min={1}
                          max={20}
                          value={customMax}
                          onChange={(e) => setCustomMax(Math.max(customMin, Number(e.target.value)))}
                          className="w-full h-1.5 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">{customMax}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end border-t border-slate-100 pt-4 mt-4">
              <button
                type="button"
                onClick={handleSaveTeamSettings}
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-105"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- TAB 4: REGISTRATION ---
  if (section === "registration") {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50/80 p-4">
        <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100/80">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Registrations</h3>
                <p className="text-sm text-slate-500">Manage participant access by setting registration limits. Choose between unlimited entry, a fixed cap, or closing registrations.</p>
              </div>
              <div className="p-2 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                <Settings2 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div
                onClick={() => setRegType("unlimited")}
                className={`cursor-pointer rounded-2xl border p-5 shadow-sm hover:shadow-md transition duration-200 flex flex-col gap-2 ${
                  regType === "unlimited"
                    ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500/5"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl border ${regType === "unlimited" ? "bg-blue-100 border-blue-300 text-blue-700" : "bg-slate-50 border-slate-100 text-slate-400"}`}>
                    <InfinityIcon className="h-5 w-5" />
                  </div>
                  {regType === "unlimited" && <Check className="h-4 w-4 text-blue-600" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Unlimited</h4>
                  <p className="text-2xs text-slate-500 mt-0.5">No cap on registrations. Open to everyone.</p>
                </div>
              </div>

              <div
                onClick={() => setRegType("limited")}
                className={`cursor-pointer rounded-2xl border p-5 shadow-sm hover:shadow-md transition duration-200 flex flex-col gap-2 ${
                  regType === "limited"
                    ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500/5"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl border ${regType === "limited" ? "bg-blue-100 border-blue-300 text-blue-700" : "bg-slate-50 border-slate-100 text-slate-400"}`}>
                    <Sliders className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 border border-blue-200 rounded-lg px-2 py-0.5">
                      {regLimit}
                    </span>
                    {regType === "limited" && <Check className="h-4 w-4 text-blue-600" />}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Limited</h4>
                  <p className="text-2xs text-slate-500 mt-0.5">Set a cap on the number of registrants.</p>
                </div>

                {regType === "limited" && (
                  <div className="mt-2 border-t border-blue-100 pt-3 flex items-center justify-between gap-3 animate-slideDown" onClick={(e) => e.stopPropagation()}>
                    <label className="text-3xs font-semibold text-blue-600 uppercase tracking-wider">Registration Cap</label>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setRegLimit(Math.max(1, regLimit - 1))}
                        className="h-7 w-7 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition font-bold text-xs"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={regLimit}
                        onChange={(e) => setRegLimit(Math.max(1, Number(e.target.value)))}
                        className="w-12 h-7 rounded border border-blue-200 text-center text-xs font-semibold text-slate-800 outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setRegLimit(regLimit + 1)}
                        className="h-7 w-7 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div
                onClick={() => setRegType("closed")}
                className={`cursor-pointer rounded-2xl border p-5 shadow-sm hover:shadow-md transition duration-200 flex flex-col gap-2 ${
                  regType === "closed"
                    ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500/5"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl border ${regType === "closed" ? "bg-blue-100 border-blue-300 text-blue-700" : "bg-slate-50 border-slate-100 text-slate-400"}`}>
                    <Ban className="h-5 w-5" />
                  </div>
                  {regType === "closed" && <Check className="h-4 w-4 text-blue-600" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Closed</h4>
                  <p className="text-2xs text-slate-500 mt-0.5">Registrations are closed. No new entries allowed.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end border-t border-slate-100 pt-4 mt-4">
              <button
                type="button"
                onClick={handleSaveRegSettings}
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-105"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- TAB 5: SUBDOMAIN ---
  if (section === "subdomain") {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50/80 p-4">
        <Toaster />
        <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100/80">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Subdomain</h3>
                <p className="text-sm text-slate-500">Create a unique web address for your program where participants can register and submit their ideas.</p>
              </div>
              <div className="p-2 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition duration-200">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100/50 text-blue-600 shrink-0">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Custom Subdomain</p>
                    {isEditingSubdomain ? (
                      <div className="flex items-center gap-1.5 mt-1" onClick={(e) => e.stopPropagation()}>
                        <span className="text-sm font-semibold text-slate-400">https://</span>
                        <input
                          type="text"
                          value={tempSubdomain}
                          onChange={(e) => setTempSubdomain(e.target.value)}
                          className="border border-blue-300 rounded-lg px-2.5 py-1 text-sm font-medium text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                        <span className="text-sm font-semibold text-slate-400">.hackerearth.com</span>
                      </div>
                    ) : (
                      <p className="text-sm font-semibold text-blue-700 leading-none">
                        https://{subdomain}.hackerearth.com
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 sm:self-center self-end">
                  {isEditingSubdomain ? (
                    <>
                      <button
                        type="button"
                        onClick={handleSaveSubdomain}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition"
                        title="Confirm Changes"
                      >
                        <Check className="h-4.5 w-4.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => { setTempSubdomain(subdomain); setIsEditingSubdomain(false); }}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                        title="Cancel"
                      >
                        <X className="h-4.5 w-4.5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={handleCopySubdomain}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Copy Link"
                      >
                        <Copy className="h-4.5 w-4.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingSubdomain(true)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit Subdomain"
                      >
                        <Pencil className="h-4.5 w-4.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm("Reset subdomain to default?")) {
                            setSubdomain("nodeangularfullstackapr26");
                            setTempSubdomain("nodeangularfullstackapr26");
                            toast.success("Subdomain reset to default.");
                          }
                        }}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                        title="Reset Subdomain"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {showSuccess && (
              <div className="mt-4 flex items-center gap-2 px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-xl shadow-sm">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Subdomain updated successfully!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}