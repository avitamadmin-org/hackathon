"use client";

import React, { useState } from "react";
import {
  Settings,
  Plus,
  ChevronDown,
  Trash2,
  GripVertical,
  X,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SubmissionField {
  id: string;
  label: string;
  description: string;
  visible: boolean;
  mandatory: boolean;
  custom?: boolean;
}

// ─── Toggle Switch ─────────────────────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors duration-200 focus:outline-none
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
        ${checked ? "bg-blue-500" : "bg-slate-300"}
      `}
    >
      <span
        className={`inline-block h-4 w-4 mt-0.5 rounded-full bg-white shadow transform transition-transform duration-200
          ${checked ? "translate-x-4" : "translate-x-0.5"}
        `}
      />
    </button>
  );
}

// ─── Field Row ─────────────────────────────────────────────────────────────────

function FieldRow({
  field,
  onChange,
  onDelete,
}: {
  field: SubmissionField;
  onChange: (updated: SubmissionField) => void;
  onDelete?: () => void;
}) {
  return (
    <div className="flex items-start gap-4 py-5 border-b border-slate-100 last:border-0 group">
      {/* Drag handle (visual only) */}
      <div className="mt-0.5 text-slate-300 opacity-0 group-hover:opacity-100 transition cursor-grab">
        <GripVertical className="h-4 w-4" />
      </div>

      {/* Label + description */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800">{field.label}</p>
        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
          {field.description}
        </p>
      </div>

      {/* Visible toggle */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs text-slate-500 select-none w-10 text-right">
          Visible
        </span>
        <Toggle
          checked={field.visible}
          onChange={(v) =>
            onChange({
              ...field,
              visible: v,
              mandatory: v ? field.mandatory : false,
            })
          }
        />
      </div>

      {/* Mandatory toggle */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs text-slate-500 select-none w-16 text-right">
          Mandatory
        </span>
        <Toggle
          checked={field.mandatory}
          disabled={!field.visible}
          onChange={(v) => onChange({ ...field, mandatory: v })}
        />
      </div>

      {/* Delete button (custom fields only) */}
      {field.custom ? (
        <button
          type="button"
          onClick={onDelete}
          className="mt-0.5 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded transition shrink-0"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      ) : (
        <div className="w-7 shrink-0" />
      )}
    </div>
  );
}

// ─── Add Custom Field Modal ────────────────────────────────────────────────────

const FIELD_TYPES = [
  { value: "input", label: "Input" },
  { value: "textarea", label: "Textarea" },
  { value: "file", label: "File Upload" },
  { value: "url", label: "URL" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
];

function AddFieldModal({
  onAdd,
  onClose,
}: {
  onAdd: (field: Omit<SubmissionField, "id">) => void;
  onClose: () => void;
}) {
  const [fieldType, setFieldType] = useState("input");
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [mandatory, setMandatory] = useState(false);

  const submit = () => {
    if (!label.trim()) return;
    onAdd({
      label: label.trim(),
      description: description.trim() || `Custom ${fieldType} field`,
      visible: true,
      mandatory,
      custom: true,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-base font-semibold text-slate-800">
            Add Custom Field
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 bg-slate-50/40">
          {/* Field Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Field Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={fieldType}
                onChange={(e) => setFieldType(e.target.value)}
                className="w-full appearance-none text-sm border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition bg-white text-slate-700 pr-8"
              >
                {FIELD_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            </div>
          </div>

          {/* Field Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Field Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Enter field title"
              autoFocus
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition bg-white placeholder:text-slate-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter field description"
              rows={3}
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition bg-white placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* Placeholder */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Placeholder
            </label>
            <input
              type="text"
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
              placeholder="Enter placeholder text"
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition bg-white placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-slate-100">
          {/* Mark Mandatory toggle */}
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <span className="text-xs font-semibold text-slate-700">
              Mark Mandatory
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={mandatory}
              onClick={() => setMandatory((m) => !m)}
              className={`relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors duration-200 focus:outline-none cursor-pointer
                ${mandatory ? "bg-blue-500" : "bg-slate-300"}
              `}
            >
              <span
                className={`inline-block h-4 w-4 mt-0.5 rounded-full bg-white shadow transform transition-transform duration-200
                  ${mandatory ? "translate-x-4" : "translate-x-0.5"}
                `}
              />
            </button>
          </label>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 bg-white hover:bg-slate-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={submit}
              disabled={!label.trim()}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm cursor-pointer"
            >
              Add Field
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const defaultFields: SubmissionField[] = [
  {
    id: "team-id",
    label: "Team ID/Table No.",
    description:
      "Allow the participants to enter the Team ID/Table No. assigned to them.",
    visible: true,
    mandatory: false,
  },
  {
    id: "snapshots",
    label: "Snapshots",
    description:
      "These images will be participants project snapshots. It will be in JPG, JPEG or PNG file upto 3MB. Recommended size is 630x320px or 16:9 ratio.",
    visible: false,
    mandatory: false,
  },
  {
    id: "video-url",
    label: "Video URL",
    description: "Participants can share their product video link.",
    visible: false,
    mandatory: false,
  },
  {
    id: "presentation",
    label: "Presentation",
    description:
      "Allow the participant to upload the presentation (odt, pptx, pdf, etc.).",
    visible: true,
    mandatory: false,
  },
  {
    id: "demo-link",
    label: "Demo Link",
    description: "Participants can share the link of their working project.",
    visible: false,
    mandatory: false,
  },
  {
    id: "repo-url",
    label: "Repository URL",
    description:
      "Allows the participants to share the repository url if they hosted their code on GitHub, Bitbucket and it's only visible to admin(s).",
    visible: true,
    mandatory: true,
  },
  {
    id: "source-code",
    label: "Source Code",
    description:
      "This will allow the participants to upload the project in zip, apk etc format.",
    visible: true,
    mandatory: false,
  },
  {
    id: "instructions",
    label: "Instructions to Run",
    description:
      "Participants can write the instruction to set up the environment for running their project.",
    visible: true,
    mandatory: true,
  },
  {
    id: "custom-attachment",
    label: "Custom Attachment",
    description:
      "Allow participants to attach any additional files relevant to their submission.",
    visible: false,
    mandatory: false,
  },
];

const PHASES = [
  "Phase: Node Angular Full -",
  "Phase: React Frontend",
  "Phase: Backend API",
  "Phase: Final Submission",
];

const FILTERS = ["Show All", "Standard Fields", "Custom Fields"];

export default function SubmissionPage() {
  const [fields, setFields] = useState<SubmissionField[]>(defaultFields);
  const [selectedPhase, setSelectedPhase] = useState(PHASES[0]);
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [phaseOpen, setPhaseOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const updateField = (id: string, updated: SubmissionField) => {
    setFields((prev) => prev.map((f) => (f.id === id ? updated : f)));
    setSaved(false);
  };

  const deleteField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const addField = (data: Omit<SubmissionField, "id">) => {
    setFields((prev) => [...prev, { ...data, id: `custom-${Date.now()}` }]);
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // Apply filter
  const visibleFields = fields.filter((f) => {
    if (selectedFilter === "Visible Only") return f.visible;
    if (selectedFilter === "Mandatory Only") return f.mandatory;
    if (selectedFilter === "Disabled") return !f.visible;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50/60">
      {showModal && (
        <AddFieldModal onAdd={addField} onClose={() => setShowModal(false)} />
      )}

      <div className="w-full py-4 space-y-6">
        {/* ── Page Header ── */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Submission
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Configure submission fields and required information for your
              bootcamp.
            </p>
          </div>
          {/* <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all duration-200
                ${saved ? "bg-emerald-500 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}
              `}
            >
              {saved ? "Saved!" : "Save Changes"}
            </button>
            <button
              type="button"
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div> */}
        </div>

        {/* ── Fields Card ── */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          {/* Card toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-800">Fields</h2>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Phase dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setPhaseOpen((o) => !o);
                    setFilterOpen(false);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-600 hover:bg-slate-50 transition shadow-sm cursor-pointer"
                >
                  {selectedPhase}
                  <ChevronDown className="h-3 w-3 text-slate-400" />
                </button>
                {phaseOpen && (
                  <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-slate-200 rounded-xl shadow-lg py-1 min-w-55 cursor-pointer">
                    {PHASES.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => {
                          setSelectedPhase(p);
                          setPhaseOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs hover:bg-slate-50 transition cursor-pointer
                          ${
                            selectedPhase === p
                              ? "text-blue-600 font-semibold"
                              : "text-slate-600"
                          }
                        `}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setFilterOpen((o) => !o);
                    setPhaseOpen(false);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-600 hover:bg-slate-50 transition shadow-sm cursor-pointer"
                >
                  {selectedFilter}
                  <ChevronDown className="h-3 w-3 text-slate-400" />
                </button>
                {filterOpen && (
                  <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-slate-200 rounded-xl shadow-lg py-1 min-w-40 cursor-pointer">
                    {FILTERS.map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => {
                          setSelectedFilter(f);
                          setFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs hover:bg-slate-50 transition cursor-pointer
                          ${
                            selectedFilter === f
                              ? "text-blue-600 font-semibold"
                              : "text-slate-600"
                          }
                        `}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Add custom field */}
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 text-xs font-medium text-blue-600 hover:bg-blue-100 transition shadow-sm cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Custom Field
              </button>
            </div>
          </div>

          {/* Column headings (right side labels) */}
          <div className="flex items-center justify-end gap-2 px-6 pt-3 pb-0">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider w-23 text-center">
              Visible
            </span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider w-27 text-center">
              Mandatory
            </span>
            <div className="w-7" />
          </div>

          {/* Field rows */}
          <div className="px-6">
            {visibleFields.length === 0 ? (
              <p className="text-sm text-slate-400 italic text-center py-12">
                No fields match the selected filter.
              </p>
            ) : (
              visibleFields.map((field) => (
                <FieldRow
                  key={field.id}
                  field={field}
                  onChange={(u) => updateField(field.id, u)}
                  onDelete={
                    field.custom ? () => deleteField(field.id) : undefined
                  }
                />
              ))
            )}
          </div>
        </div>

        {/* ── Bottom save ── */}
        <div className="flex justify-end gap-3 pb-10">
          {/* <button
            type="button"
            className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 bg-white hover:bg-slate-50 transition shadow-sm"
          >
            Reset to Defaults
          </button> */}
          <button
            type="button"
            onClick={handleSave}
            className={`px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition-all duration-200 cursor-pointer
              ${
                saved
                  ? "bg-emerald-500 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }
            `}
          >
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
