"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  Highlighter,
  ChevronDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  ListChecks,
  Link2,
  Image,
  Strikethrough,
  Code,
  Send,
  Mail,
  Info,
  Eye,
  X,
  Unlink,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addEmailHistory } from "../../../../../../../redux/slice/emailHistorySlice";
import { RootState } from "../../../../../../../redux/store";

interface ToolbarButtonProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}
export interface EmailHistory {
  id: string;
  recipientEmail: string;
  timestamp: string;
  subject: string;
  category: string;
  status: "Pending" | "Sent" | "Failed";
  body: string;
}
// ─── Template Tags ────────────────────────────────────────────────────────────

const templateTags = [
  { tag: "{@FullName@}", label: "Full Name" },
  { tag: "{@HackathonName@}", label: "Hackathon Name" },
  { tag: "{@StartTime@}", label: "Start Time" },
  { tag: "{@EndTime@}", label: "End Time" },
  { tag: "{@HackathonDuration@}", label: "Hackathon Duration" },
  { tag: "{@TeamName@}", label: "Team Name" },
  { tag: "{@Email@}", label: "Email" },
  { tag: "{@RegistrationDate@}", label: "Registration Date" },
];

const emailCategories = [
  "Registered Users",
  "All Participants",
  "Shortlisted Candidates",
  "Waitlisted Candidates",
  "Rejected Candidates",
  "Team Leads",
];

// ─── Toolbar Button ───────────────────────────────────────────────────────────

function ToolbarButton({
  icon,
  title,
  onClick,
  active = false,
  disabled = false,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`p-1.5 rounded-md transition-all ${
        disabled
          ? "opacity-30 cursor-not-allowed"
          : active
          ? "bg-slate-200 text-slate-900"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
      }`}
    >
      {icon}
    </button>
  );
}

// ─── Toolbar Separator ────────────────────────────────────────────────────────

function ToolbarSeparator() {
  return <div className="w-px h-5 bg-slate-200 mx-0.5" />;
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-checked={checked}
      role="switch"
      className={`relative inline-flex shrink-0 h-5 w-9 rounded-full transition-colors duration-200 focus:outline-none cursor-pointer ${
        checked ? "bg-blue-500" : "bg-slate-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 mt-0.5 rounded-full bg-white shadow transform transition-transform duration-200 ${
          checked ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

// ─── Alignment Dropdown ───────────────────────────────────────────────────────

function AlignmentDropdown({
  onSelect,
}: {
  onSelect: (align: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const alignments = [
    { icon: <AlignLeft className="h-4 w-4" />, value: "left", label: "Left" },
    {
      icon: <AlignCenter className="h-4 w-4" />,
      value: "center",
      label: "Center",
    },
    {
      icon: <AlignRight className="h-4 w-4" />,
      value: "right",
      label: "Right",
    },
    {
      icon: <AlignJustify className="h-4 w-4" />,
      value: "justify",
      label: "Justify",
    },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-0.5 p-1.5 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all"
        title="Text alignment"
      >
        <AlignLeft className="h-4 w-4" />
        <ChevronDown className="h-3 w-3" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-1 min-w-[120px]">
          {alignments.map((a) => (
            <button
              key={a.value}
              type="button"
              onClick={() => {
                onSelect(a.value);
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 transition"
            >
              {a.icon}
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── List Dropdown ────────────────────────────────────────────────────────────

function ListDropdown({ onSelect }: { onSelect: (type: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const lists = [
    {
      icon: <List className="h-4 w-4" />,
      value: "unordered",
      label: "Bullet List",
    },
    {
      icon: <ListOrdered className="h-4 w-4" />,
      value: "ordered",
      label: "Numbered List",
    },
    {
      icon: <ListChecks className="h-4 w-4" />,
      value: "checklist",
      label: "Checklist",
    },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-0.5 p-1.5 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all"
        title="Lists"
      >
        <List className="h-4 w-4" />
        <ChevronDown className="h-3 w-3" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-1 min-w-[140px]">
          {lists.map((l) => (
            <button
              key={l.value}
              type="button"
              onClick={() => {
                onSelect(l.value);
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 transition"
            >
              {l.icon}
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Highlight Color Dropdown ─────────────────────────────────────────────────

function HighlightDropdown({
  onSelect,
}: {
  onSelect: (color: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const colors = [
    { label: "Yellow", value: "yellow", bg: "bg-yellow-300" },
    { label: "Green", value: "green", bg: "bg-green-300" },
    { label: "Blue", value: "blue", bg: "bg-blue-300" },
    { label: "Pink", value: "pink", bg: "bg-pink-300" },
    { label: "Orange", value: "orange", bg: "bg-orange-300" },
    { label: "None", value: "none", bg: "bg-white border border-slate-300" },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-0.5 p-1.5 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all"
        title="Highlight"
      >
        <Highlighter className="h-4 w-4" />
        <ChevronDown className="h-3 w-3" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-20 p-2 min-w-[120px]">
          <div className="grid grid-cols-3 gap-1.5">
            {colors.map((c) => (
              <button
                key={c.value}
                type="button"
                title={c.label}
                onClick={() => {
                  onSelect(c.value);
                  setOpen(false);
                }}
                className={`w-7 h-7 rounded-md ${c.bg} transition hover:scale-110 hover:shadow-sm`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── View Tags Panel ──────────────────────────────────────────────────────────

function ViewTagsPanel({
  onClose,
  onInsert,
}: {
  onClose: () => void;
  onInsert: (tag: string) => void;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">
          Available Template Tags
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {templateTags.map((t) => (
          <button
            key={t.tag}
            type="button"
            onClick={() => onInsert(t.tag)}
            className="text-left px-3 py-2 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition group"
          >
            <p className="text-xs font-medium text-slate-700 group-hover:text-blue-700 truncate">
              {t.label}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5 font-mono truncate">
              {t.tag}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const defaultBody = "";

export default function ComposeMailPage() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("Registered Users");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [error, setError] = useState("");
  const [subject, setSubject] = useState("");
  const [showTags, setShowTags] = useState(false);
  const [sendCopy, setSendCopy] = useState(true);
  const emails = useSelector((state: RootState) => state.emailHistory.emails);

  const editorRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  // Close category dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(e.target as Node)
      ) {
        setCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Set default content on mount
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML.trim()) {
      // Format the body with proper structure
      const lines = defaultBody.split("\n");
      const formatted = lines
        .map((line) => {
          if (!line.trim()) return "<br>";
          // Bold the "Starts at:" line
          if (line.startsWith("Starts at:")) {
            return `<div><strong>${line}</strong></div>`;
          }
          return `<div>${line}</div>`;
        })
        .join("");
      editorRef.current.innerHTML = formatted;
    }
  }, []);

  // ─── Exec commands ─────────────────────────────────────────────────

  const execCmd = useCallback((command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
  }, []);

  const insertTag = useCallback((tag: string) => {
    editorRef.current?.focus();
    document.execCommand("insertText", false, tag);
  }, []);

  const insertLink = useCallback(() => {
    const url = prompt("Enter URL:");
    if (url) {
      execCmd("createLink", url);
    }
  }, [execCmd]);

  const insertImage = useCallback(() => {
    const url = prompt("Enter image URL:");
    if (url) {
      execCmd("insertImage", url);
    }
  }, [execCmd]);
  const validateEmail = () => {
    const bodyContent = editorRef.current?.textContent?.trim() || "";

    const errors = [];

    if (!category) {
      errors.push("Email Category");
    }

    if (!subject.trim()) {
      errors.push("Email Subject");
    }

    if (!bodyContent) {
      errors.push("Email Body");
    }

    if (errors.length > 0) {
      setError(`${errors.join(", ")} field(s) are required`);
      return false;
    }

    setError("");
    return true;
  };
  return (
    <div className="min-h-screen bg-slate-50/60">
      <Toaster />
      <div className="w-full px-4 sm:px-6 py-8 space-y-5">
        {/* ── Page Header ── */}
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Compose Email
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Send emails to participants based on different categories. Select a
            category to compose and send emails.
          </p>
        </div>

        {/* ── Email Category ── */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            Email Category
          </label>
          <div className="relative" ref={categoryRef}>
            <button
              type="button"
              onClick={() => setCategoryOpen((v) => !v)}
              className="flex items-center justify-between w-full border border-slate-200 rounded-lg px-4 py-2.5 bg-white text-sm text-slate-700 hover:border-slate-300 transition shadow-sm"
            >
              <span>{category}</span>
              <ChevronDown
                className={`h-4 w-4 text-slate-400 transition-transform ${
                  categoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {categoryOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-1">
                {emailCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setCategory(cat);
                      setCategoryOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition hover:bg-slate-50 ${
                      cat === category
                        ? "text-blue-600 font-medium bg-blue-50/50"
                        : "text-slate-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Email Information ── */}
        <div className="bg-white border border-slate-200 rounded-xl px-5 py-4 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Mail className="h-4 w-4 text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-800">
              Email Information
            </h3>
          </div>
          <p className="text-sm text-slate-500">
            Total recipients:{" "}
            <span className="font-medium text-slate-700">
              {emails?.length || 0}
            </span>
          </p>
        </div>

        {/* ── Email Subject ── */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            Email Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter email subject..."
            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition bg-white shadow-sm placeholder:text-slate-400"
          />
        </div>

        {/* ── Email Body ── */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-semibold text-slate-800">
              Email Body
            </label>
            <button
              type="button"
              onClick={() => setShowTags((v) => !v)}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition"
            >
              <Info className="h-3.5 w-3.5" />
              View Tags
            </button>
          </div>

          {/* Tags panel */}
          {showTags && (
            <div className="mb-3">
              <ViewTagsPanel
                onClose={() => setShowTags(false)}
                onInsert={(tag) => {
                  insertTag(tag);
                  setShowTags(false);
                }}
              />
            </div>
          )}

          {/* Editor */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
            {/* Toolbar */}
            <div className="flex items-center flex-wrap gap-0.5 px-3 py-2 border-b border-slate-100 bg-slate-50/80">
              <ToolbarButton
                icon={<Undo2 className="h-4 w-4" />}
                title="Undo"
                onClick={() => execCmd("undo")}
              />
              <ToolbarButton
                icon={<Redo2 className="h-4 w-4" />}
                title="Redo"
                onClick={() => execCmd("redo")}
              />

              <ToolbarSeparator />

              <ToolbarButton
                icon={<Bold className="h-4 w-4" />}
                title="Bold"
                onClick={() => execCmd("bold")}
              />
              <ToolbarButton
                icon={<Italic className="h-4 w-4" />}
                title="Italic"
                onClick={() => execCmd("italic")}
              />

              <HighlightDropdown
                onSelect={(color) => {
                  if (color === "none") {
                    execCmd("removeFormat");
                  } else {
                    execCmd("hiliteColor", color);
                  }
                }}
              />

              <ToolbarSeparator />

              <AlignmentDropdown
                onSelect={(align) => {
                  execCmd(
                    `justify${align.charAt(0).toUpperCase() + align.slice(1)}`
                  );
                }}
              />

              <ListDropdown
                onSelect={(type) => {
                  if (type === "ordered") {
                    execCmd("insertOrderedList");
                  } else {
                    execCmd("insertUnorderedList");
                  }
                }}
              />

              <ToolbarSeparator />

              <ToolbarButton
                icon={<Link2 className="h-4 w-4" />}
                title="Insert Link"
                onClick={insertLink}
              />
              <ToolbarButton
                icon={<Image className="h-4 w-4" />}
                title="Insert Image"
                onClick={insertImage}
              />

              <ToolbarSeparator />

              <ToolbarButton
                icon={<Strikethrough className="h-4 w-4" />}
                title="Strikethrough"
                onClick={() => execCmd("strikeThrough")}
              />
              <ToolbarButton
                icon={<Code className="h-4 w-4" />}
                title="Code"
                onClick={() => {
                  execCmd("formatBlock", "pre");
                }}
              />
            </div>

            {/* Editable area */}
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              className="min-h-[280px] px-5 py-4 text-sm text-slate-700 leading-relaxed outline-none focus:ring-0 prose prose-sm max-w-none"
              style={{ whiteSpace: "pre-wrap" }}
            />
          </div>
        </div>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
            {error}
          </Alert>
        )}
        {/* ── Bottom Actions ── */}
        <div className="flex items-center justify-between pt-2 pb-8">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <Toggle checked={sendCopy} onChange={setSendCopy} />
            <span className="text-sm text-slate-600">
              Send a copy to myself
            </span>
          </label>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (!validateEmail()) return;

                toast.success("Test Emails sent successfully!");
              }}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition shadow-sm"
            >
              <Eye className="h-4 w-4" />
              Send Test Email
            </button>
            <button
              type="button"
              onClick={() => {
                if (!validateEmail()) return;

                dispatch(
                  addEmailHistory({
                    id: crypto.randomUUID(),
                    recipientEmail: "participants@hackathon.com",
                    timestamp: new Date().toISOString(),
                    subject,
                    category,
                    status: "Sent",
                    body: editorRef.current?.innerHTML || "",
                  })
                );

                toast.success("Emails sent successfully!");

                // Reset form
                setCategory("Registered Users");
                setSubject("");
                setSendCopy(true);

                if (editorRef.current) {
                  editorRef.current.innerHTML = "";
                }

                setShowTags(false);
                setError(""); // if you're using MUI Alert
              }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition shadow-sm"
            >
              <Send className="h-4 w-4" />
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
