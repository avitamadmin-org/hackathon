"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
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
  Info,
  X,
  Save,
} from "lucide-react";
import { Alert } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
// ─── Template Tags ────────────────────────────────────────────────────────────

const templateTags = [
  { tag: "{@FullName@}", label: "Full Name" },
  { tag: "{@HackathonName@}", label: "Hackathon Name" },
  { tag: "{@Location@}", label: "Location" },
  { tag: "{@MaxTeamSize@}", label: "Max Team Size" },
  { tag: "{@SubmissionStartTime@}", label: "Submission Start Time" },
  { tag: "{@SubmissionEndTime@}", label: "Submission End Time" },
  { tag: "{@StartTime@}", label: "Start Time" },
  { tag: "{@EndTime@}", label: "End Time" },
  { tag: "{@Email@}", label: "Email" },
  { tag: "{@TeamName@}", label: "Team Name" },
];

// ─── Toolbar Button ───────────────────────────────────────────────────────────

function ToolbarButton({
  icon,
  title,
  onClick,
  active = false,
}: {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`p-1.5 rounded-md transition-all ${
        active
          ? "bg-slate-200 text-slate-900"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
      }`}
    >
      {icon}
    </button>
  );
}

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
      className={`relative inline-flex shrink-0 h-6 w-11 rounded-full transition-colors duration-200 focus:outline-none cursor-pointer ${
        checked ? "bg-blue-500" : "bg-slate-300"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 mt-0.5 rounded-full bg-white shadow transform transition-transform duration-200 ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

// ─── Dropdown Helpers ─────────────────────────────────────────────────────────

function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return { open, setOpen, ref };
}

function AlignmentDropdown({
  onSelect,
}: {
  onSelect: (align: string) => void;
}) {
  const { open, setOpen, ref } = useDropdown();
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

function ListDropdown({ onSelect }: { onSelect: (type: string) => void }) {
  const { open, setOpen, ref } = useDropdown();
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

function HighlightDropdown({
  onSelect,
}: {
  onSelect: (color: string) => void;
}) {
  const { open, setOpen, ref } = useDropdown();
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

export default function RegistrationConfirmationPage() {
  const [enabled, setEnabled] = useState(true);
  const [fromEmail, setFromEmail] = useState("");
  const [error, setError] = useState("");
  const [subject, setSubject] = useState("");
  const [showTags, setShowTags] = useState(false);
  const [saved, setSaved] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);

  // Set default content on mount
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML.trim()) {
      editorRef.current.innerHTML = defaultBody
        .split("\n")
        .map((line) => {
          if (!line.trim()) return "<br>";
          return `<div>${line}</div>`;
        })
        .join("");
    }
  }, []);

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
    if (url) execCmd("createLink", url);
  }, [execCmd]);

  const insertImage = useCallback(() => {
    const url = prompt("Enter image URL:");
    if (url) execCmd("insertImage", url);
  }, [execCmd]);

  const handleSave = () => {
    if (!validateForm()) return;

    const payload = {
      fromEmail,
      subject,
      body: editorRef.current?.innerHTML,
    };

    console.log(payload);

    setSaved(true);
    toast.success("Changes saved successfully!");
    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };
  const validateForm = () => {
    const bodyContent = editorRef.current?.innerHTML || "";

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = bodyContent;

    const plainText = tempDiv.textContent?.trim() || "";

    if (!fromEmail.trim()) {
      setError("From Email is required");
      return false;
    }

    if (!subject.trim()) {
      setError("Email Subject is required");
      return false;
    }

    if (!plainText) {
      setError("Email Body is required");
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
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Registration Confirmation Email
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Customize the email that participants receive when they register
              for your bootcamp.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="text-sm text-slate-600 font-medium">
              {enabled ? "On" : "Off"}
            </span>
            <Toggle checked={enabled} onChange={setEnabled} />
          </div>
        </div>

        {/* ── Disabled overlay wrapper ── */}
        <div
          className={`space-y-5 transition-all duration-300 ${
            !enabled ? "opacity-40 pointer-events-none" : ""
          }`}
        >
          {/* ── From Field ── */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5 ">
              From<span className="text-red-400 font-normal">*</span>
            </label>{" "}
            <input
              type="text"
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition bg-white shadow-sm placeholder:text-slate-400"
            />
            <p className="text-xs text-slate-400 mt-1.5">
              Company name can be changed from the Company Information in
              Settings.
            </p>
          </div>

          {/* ── Email Subject ── */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Email Subject <span className="text-red-400 font-normal">*</span>
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
                Email Body <span className="text-red-400 font-normal">*</span>
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
                    if (color === "none") execCmd("removeFormat");
                    else execCmd("hiliteColor", color);
                  }}
                />

                <ToolbarSeparator />

                <AlignmentDropdown
                  onSelect={(align) =>
                    execCmd(
                      `justify${align.charAt(0).toUpperCase() + align.slice(1)}`
                    )
                  }
                />

                <ListDropdown
                  onSelect={(type) => {
                    if (type === "ordered") execCmd("insertOrderedList");
                    else execCmd("insertUnorderedList");
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
                  onClick={() => execCmd("formatBlock", "pre")}
                />
              </div>

              {/* Editable area */}
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                className="min-h-[300px] px-5 py-4 text-sm text-slate-700 leading-relaxed outline-none focus:ring-0 prose prose-sm max-w-none [&_a]:text-blue-600 [&_a]:underline"
                style={{ whiteSpace: "pre-wrap" }}
              />
            </div>
          </div>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
              {error}
            </Alert>
          )}
          {/* ── Save Button ── */}
          <div className="flex items-center justify-end gap-3 pt-2 pb-8">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 transition shadow-sm"
            >
              Reset to Default
            </button>
            <button
              type="button"
              onClick={() => {
                if (!validateForm()) return;

                handleSave();

                const payload = {
                  fromEmail,
                  subject,
                  body: editorRef.current?.innerHTML,
                };

                console.log(payload);
              }}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition-all duration-200 ${
                saved
                  ? "bg-emerald-500 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              <Save className="h-4 w-4" />
              {saved ? "Saved!" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
