"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  HelpCircle,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Link,
  Image,
  Video,
  Undo2,
  Redo2,
  Maximize2,
  Minimize2,
  Save,
  ChevronDown,
  Eye,
  FileEdit,
  X,
  Sparkles,
  CheckCircle,
  AlertCircle,
  FileText,
  Zap,
  Crown,
  Shield,
  Users,
  Clock,
  Award,
  BookOpen,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function RulesPage() {
  const [content, setContent] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize and load from localStorage
  useEffect(() => {
    setIsVisible(true);
    setIsMounted(true);
    try {
      const stored = window.localStorage.getItem("bootcamp-rules");
      const initialText = stored || "";

      setContent(initialText);
      setHistory([initialText]);
      setHistoryIndex(0);
      updateCounts(initialText);
    } catch {
      // Ignore localStorage issues
    }
  }, []);

  // Handle outside click to close Paragraph dropdown
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
    // Truncate history forward if we made edits after an undo
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newText);

    // Limit history size to 50
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

    // Refocus and place cursor/selection
    setTimeout(() => {
      textarea.focus();
      const selectionStart = start + prefix.length;
      const selectionEnd = selectionStart + (selectedText || "").length;
      textarea.setSelectionRange(selectionStart, selectionEnd);
    }, 0);
  };

  const handleSave = () => {
    try {
      window.localStorage.setItem("bootcamp-rules", content);
      setShowSuccess(true);
      toast.success("Rules saved successfully!", {
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
      toast.error("Failed to save rules.");
    }
  };

  const handleSelectHeader = (format: string) => {
    insertFormatting(format);
    setIsDropdownOpen(false);
  };

  // Convert markdown to simple HTML for preview mode
  const renderPreview = () => {
    if (!content.trim()) {
      return { __html: `<p class="text-slate-400 italic">No content to display. Start writing in the Edit tab.</p>` };
    }

    // Simple markdown parses
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

    // Blockquote
    html = html.replace(/^\&gt;\s?(.*$)/gim, '<blockquote class="border-l-4 border-blue-300 pl-4 py-1 my-2 italic text-slate-600">$1</blockquote>');

    // Lists (simplified)
    html = html.replace(/^\-\s?(.*$)/gim, '<li class="ml-4 list-disc text-slate-700 my-1">$1</li>');
    html = html.replace(/^\d\.\s?(.*$)/gim, '<li class="ml-4 list-decimal text-slate-700 my-1">$1</li>');

    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p class="my-3 text-slate-700 leading-relaxed">');
    html = '<p class="my-3 text-slate-700 leading-relaxed">' + html + '</p>';

    // Clean up empty tags
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
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                    Guidelines
                  </p>
                  <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mt-1">
                    Rules & Guidelines
                  </h1>
                </div>
              </div>
              <p className="text-slate-500 max-w-2xl ml-13">
                Edit the rules and guidelines for your bootcamp. Participants will see this content on the bootcamp page.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-2xl">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  {wordCount} words
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowHelp(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-medium text-sm transition-all duration-300"
              >
                <HelpCircle size={16} />
                Help
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
                  Rules saved successfully!
                </span>
                <button onClick={() => setShowSuccess(false)} className="ml-2">
                  <X className="w-3 h-3 text-emerald-600 hover:text-emerald-800" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help Modal */}
        {showHelp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg">
                    <HelpCircle className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-base font-semibold text-slate-900">Rules & Guidelines Help</h4>
                </div>
                <button
                  type="button"
                  onClick={() => setShowHelp(false)}
                  className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <p>When drafting your bootcamp rules, consider including the following sections to guide your participants:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Crown className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <strong>Eligibility:</strong>
                      <span className="text-slate-500"> Who is allowed to participate (e.g., students, professionals, geographic constraints).</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <strong>Team Size constraints:</strong>
                      <span className="text-slate-500"> Specify minimum and maximum size parameters.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <strong>Submission Guidelines:</strong>
                      <span className="text-slate-500"> File formats, slide decks, video pitch requirements, and deadlines.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <strong>Judging Criteria:</strong>
                      <span className="text-slate-500"> How projects will be evaluated (e.g., originality, implementation, presentation).</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <strong>Code of Conduct:</strong>
                      <span className="text-slate-500"> Rules on teamwork, behavior, plagiarism, and respect.</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowHelp(false)}
                  className="rounded-xl bg-linear-to-r from-blue-500 to-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-105"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Editor & Preview Area */}
        <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden flex flex-col min-h-125">
          {/* Editor Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50/80 border-b border-slate-200 flex-wrap gap-2">
            {/* Left: Styling Tools */}
            <div className="flex items-center gap-1 flex-wrap">
              {/* Format Dropdown */}
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

              {/* Standard buttons */}
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

              <button
                type="button"
                onClick={() => insertFormatting("![image](", ")")}
                disabled={isPreviewMode}
                className={`p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all ${
                  isPreviewMode ? "opacity-50 cursor-not-allowed" : ""
                }`}
                title="Insert Image"
              >
                <Image className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => insertFormatting("![video](", ")")}
                disabled={isPreviewMode}
                className={`p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all ${
                  isPreviewMode ? "opacity-50 cursor-not-allowed" : ""
                }`}
                title="Insert Video"
              >
                <Video className="h-4 w-4" />
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
                className="p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all cursor-pointer"
                title={isFullscreen ? "Minimize" : "Maximize"}
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Text Area or Preview Window */}
          <div className="flex-1 flex flex-col min-h-87.5 relative">
            {!isPreviewMode ? (
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => updateContent(e.target.value)}
                placeholder="Start typing your bootcamp rules and guidelines here..."
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
                <Save className="w-4 h-4 text-emerald-600" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900">Auto-Save</h4>
            </div>
            <p className="text-xs text-slate-500">Your content is automatically saved to your browser's local storage.</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm p-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-purple-50 rounded-lg">
                <Eye className="w-4 h-4 text-purple-600" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900">Preview Mode</h4>
            </div>
            <p className="text-xs text-slate-500">Toggle preview to see how your rules will look to participants.</p>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-400">
          <p>All rules are managed in real-time</p>
        </div>
      </div>
    </div>
  );
}