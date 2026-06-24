"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Bold,
  Italic,
  Link,
  List,
  ChevronDown,
  Save,
  Eye,
  FileEdit,
  Sparkles,
  CheckCircle,
  X,
  Shield,
  FileText,
  AlertCircle,
  BookOpen,
  Zap,
  Crown,
  Users,
  Clock,
  Award,
  HelpCircle,
  Maximize2,
  Minimize2,
  Undo2,
  Redo2,
  ListOrdered,
  Quote,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function TermsConditionsPage() {
  const [content, setContent] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    setIsVisible(true);
    setIsMounted(true);
    try {
      const storedContent = window.localStorage.getItem("bootcamp-termsconditions");
      const initialText = storedContent || "";
      setContent(initialText);
      setHistory([initialText]);
      setHistoryIndex(0);
      updateCounts(initialText);

      const storedHidden = window.localStorage.getItem("bootcamp-termsconditions-hidden");
      if (storedHidden !== null) {
        setIsHidden(storedHidden === "true");
      }
    } catch {
      // Ignore localStorage issues
    }
  }, []);

  // Sync with localStorage
  useEffect(() => {
    if (!isMounted) return;
    try {
      window.localStorage.setItem("bootcamp-termsconditions", content);
      window.localStorage.setItem("bootcamp-termsconditions-hidden", String(isHidden));
    } catch {
      // Ignore localStorage issues
    }
  }, [content, isHidden, isMounted]);

  // Handle click outside dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateCounts = (text: string) => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    setWordCount(words);
    setCharCount(text.length);
  };

  const updateContent = (newText: string) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newText);

    if (newHistory.length > 50) {
      newHistory.shift();
    }

    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setContent(newText);
    updateCounts(newText);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      setContent(history[nextIndex]);
      updateCounts(history[nextIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setContent(history[nextIndex]);
      updateCounts(history[nextIndex]);
    }
  };

  const insertFormatting = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    const before = text.substring(0, start);
    const after = text.substring(end);

    const newText = before + prefix + (selectedText || "") + suffix + after;
    updateContent(newText);

    setTimeout(() => {
      textarea.focus();
      const selectionStart = start + prefix.length;
      const selectionEnd = selectionStart + (selectedText || "").length;
      textarea.setSelectionRange(selectionStart, selectionEnd);
    }, 0);
  };

  const handleSelectHeader = (format: string) => {
    insertFormatting(format);
    setIsDropdownOpen(false);
  };

  const handleSave = () => {
    try {
      window.localStorage.setItem("bootcamp-termsconditions", content);
      window.localStorage.setItem("bootcamp-termsconditions-hidden", String(isHidden));
      setShowSuccess(true);
      toast.success("Terms & Conditions saved successfully!", {
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
    } catch {
      toast.error("Failed to save Terms & Conditions.");
    }
  };

  // Convert simple markdown formatting to html for preview
  const renderPreview = () => {
    if (!content.trim()) {
      return { __html: `<p class="text-slate-400 italic">No content to display. Start writing in the Edit tab.</p>` };
    }

    let html = content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Headings
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-slate-900 mt-4 mb-2">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold text-slate-900 mt-5 mb-2">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-xl font-bold text-slate-900 mt-6 mb-3">$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

    // Bullet Lists
    html = html.replace(/^\-\s?(.*$)/gim, '<li class="ml-4 list-disc text-slate-700 my-1">$1</li>');
    html = html.replace(/^\d\.\s?(.*$)/gim, '<li class="ml-4 list-decimal text-slate-700 my-1">$1</li>');

    // Blockquote
    html = html.replace(/^\&gt;\s?(.*$)/gim, '<blockquote class="border-l-4 border-blue-300 pl-4 py-1 my-2 italic text-slate-600">$1</blockquote>');

    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p class="my-3 text-slate-700 leading-relaxed">');
    html = '<p class="my-3 text-slate-700 leading-relaxed">' + html + '</p>';

    html = html.replace(/<p><\/p>/g, "");

    return { __html: html };
  };

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
    <div className={`min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50/80 ${isFullscreen ? "fixed inset-0 z-50 bg-slate-50 p-6 overflow-y-auto" : "relative"}`}>
      <Toaster />
      
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
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                    Legal
                  </p>
                  <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mt-1">
                    Terms & Conditions
                  </h1>
                </div>
              </div>
              <p className="text-slate-500 max-w-2xl ml-13">
                The developer have to accept these terms and conditions for registering or participating. They should be your legal and official rules, terms and conditions and privacy policy.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border ${
                !isHidden ? "bg-emerald-50 border-emerald-200" : "bg-slate-50 border-slate-200"
              }`}>
                <div className={`w-2 h-2 rounded-full ${!isHidden ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
                <span className={`text-sm font-medium ${!isHidden ? "text-emerald-700" : "text-slate-500"}`}>
                  {!isHidden ? "Visible" : "Hidden"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsHidden(!isHidden)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-medium text-sm transition-all duration-300 cursor-pointer"
              >
                {isHidden ? "Show" : "Hide"} Terms
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>

          {/* Success Toast */}
          {showSuccess && (
            <div className="absolute top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl shadow-lg">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">
                  Terms saved successfully!
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
          <div className="group bg-white rounded-2xl p-6 border border-slate-100/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Status</p>
                <h3 className={`text-lg font-semibold mt-1 ${!isHidden ? "text-emerald-600" : "text-slate-400"}`}>
                  {!isHidden ? "Active" : "Hidden"}
                </h3>
              </div>
              <div className="p-3 rounded-2xl bg-blue-50 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="group bg-white rounded-2xl p-6 border border-slate-100/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Word Count</p>
                <h3 className="text-lg font-semibold text-slate-900 mt-1">{wordCount}</h3>
              </div>
              <div className="p-3 rounded-2xl bg-blue-50 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="group bg-white rounded-2xl p-6 border border-slate-100/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Characters</p>
                <h3 className="text-lg font-semibold text-slate-900 mt-1">{charCount}</h3>
              </div>
              <div className="p-3 rounded-2xl bg-blue-50 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Editor & Preview Workspace */}
        <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden flex flex-col min-h-112.5">
          {/* Editor Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50/80 border-b border-slate-200 flex-wrap gap-2">
            {/* Left formatting tools */}
            <div className="flex items-center gap-1 flex-wrap">
              {/* Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  disabled={isPreviewMode}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-all hover:shadow-sm cursor-pointer ${
                    isPreviewMode ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <span>Paragraph</span>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 z-30 w-40 rounded-xl border border-slate-200 bg-white shadow-lg p-1.5 space-y-0.5 font-sans">
                    <button
                      type="button"
                      onClick={() => handleSelectHeader("\n# ")}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-bold transition-colors"
                    >
                      Heading 1
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectHeader("\n## ")}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-semibold transition-colors"
                    >
                      Heading 2
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectHeader("\n### ")}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors"
                    >
                      Heading 3
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      Paragraph
                    </button>
                  </div>
                )}
              </div>

              <div className="h-6 w-px bg-slate-200 mx-1" />

              <button
                type="button"
                onClick={() => insertFormatting("**", "**")}
                disabled={isPreviewMode}
                className={`p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all ${
                  isPreviewMode ? "opacity-50 cursor-not-allowed" : ""
                }`}
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => insertFormatting("*", "*")}
                disabled={isPreviewMode}
                className={`p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all ${
                  isPreviewMode ? "opacity-50 cursor-not-allowed" : ""
                }`}
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </button>

              <div className="h-6 w-px bg-slate-200 mx-1" />

              <button
                type="button"
                onClick={() => insertFormatting("\n- ")}
                disabled={isPreviewMode}
                className={`p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all ${
                  isPreviewMode ? "opacity-50 cursor-not-allowed" : ""
                }`}
                title="Bullet List"
              >
                <List className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => insertFormatting("\n1. ")}
                disabled={isPreviewMode}
                className={`p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all ${
                  isPreviewMode ? "opacity-50 cursor-not-allowed" : ""
                }`}
                title="Numbered List"
              >
                <ListOrdered className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => insertFormatting("\n> ")}
                disabled={isPreviewMode}
                className={`p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all ${
                  isPreviewMode ? "opacity-50 cursor-not-allowed" : ""
                }`}
                title="Blockquote"
              >
                <Quote className="h-4 w-4" />
              </button>

              <div className="h-6 w-px bg-slate-200 mx-1" />

              <button
                type="button"
                onClick={() => insertFormatting("[", "](https://)")}
                disabled={isPreviewMode}
                className={`p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all ${
                  isPreviewMode ? "opacity-50 cursor-not-allowed" : ""
                }`}
                title="Link"
              >
                <Link className="h-4 w-4" />
              </button>

              <div className="h-6 w-px bg-slate-200 mx-1" />

              <button
                type="button"
                onClick={handleUndo}
                disabled={isPreviewMode || historyIndex <= 0}
                className={`p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all disabled:opacity-40 disabled:hover:bg-transparent ${
                  isPreviewMode ? "opacity-50 cursor-not-allowed" : ""
                }`}
                title="Undo"
              >
                <Undo2 className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={handleRedo}
                disabled={isPreviewMode || historyIndex >= history.length - 1}
                className={`p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all disabled:opacity-40 disabled:hover:bg-transparent ${
                  isPreviewMode ? "opacity-50 cursor-not-allowed" : ""
                }`}
                title="Redo"
              >
                <Redo2 className="h-4 w-4" />
              </button>
            </div>

            {/* Right: Preview Mode & Fullscreen */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                  isPreviewMode
                    ? "bg-linear-to-r from-blue-500 to-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {isPreviewMode ? (
                  <>
                    <FileEdit className="h-3.5 w-3.5 cursor-pointer" />
                    <span>Edit</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-3.5 w-3.5 cursor-pointer" />
                    <span>Preview</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all"
                title={isFullscreen ? "Minimize" : "Maximize"}
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Text Area */}
          <div className="flex-1 flex flex-col min-h-75 relative">
            {!isPreviewMode ? (
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => updateContent(e.target.value)}
                placeholder="Enter legal terms, conditions, privacy policy..."
                className="flex-1 w-full p-6 text-sm text-slate-800 outline-none resize-none placeholder:text-slate-400 font-sans leading-relaxed focus:ring-0 focus:border-transparent bg-white"
              />
            ) : (
              <div
                className="flex-1 w-full p-6 text-sm overflow-y-auto bg-slate-50/50 prose prose-slate max-w-none font-sans"
                dangerouslySetInnerHTML={renderPreview()}
              />
            )}
            
            {/* Word/Char Counter */}
            <div className="absolute bottom-3 right-4 flex items-center gap-3 text-xs text-slate-400 bg-white/90 px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
              <span>{wordCount} words</span>
              <span className="w-px h-4 bg-slate-200" />
              <span>{charCount} characters</span>
            </div>
          </div>
        </div>

        {/* Quick Tips Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm p-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-blue-50 rounded-lg">
                <Zap className="w-4 h-4 text-blue-600" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900">Quick Tip</h4>
            </div>
            <p className="text-xs text-slate-500">Use # for headings, **bold** for emphasis, and - for bullet points.</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm p-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-emerald-50 rounded-lg">
                <Shield className="w-4 h-4 text-emerald-600" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900">Legal Compliance</h4>
            </div>
            <p className="text-xs text-slate-500">Ensure your terms cover liability, data protection, and participant obligations.</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm p-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-purple-50 rounded-lg">
                <Eye className="w-4 h-4 text-purple-600" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900">Preview Mode</h4>
            </div>
            <p className="text-xs text-slate-500">Toggle preview to see how your terms will look to participants.</p>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-400">
          <p>All terms and conditions are managed in real-time</p>
        </div>
      </div>
    </div>
  );
}