"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  Columns3,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Mail,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../redux/store";
// ─── Types ────────────────────────────────────────────────────────────────────

interface EmailRecord {
  id: string;
  recipientEmail: string;
  timestamp: string;
  subject: string;
  category: string;
  status: string;
  body: string;
}

interface ColumnConfig {
  key: keyof EmailRecord;
  label: string;
  visible: boolean;
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: EmailRecord["status"] }) {
  const styles: Record<string, string> = {
    Sent: "bg-blue-50 text-blue-700 border-blue-200",
    Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Opened: "bg-violet-50 text-violet-700 border-violet-200",
    Failed: "bg-red-50 text-red-700 border-red-200",
    Bounced: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        styles[status] ?? "bg-slate-50 text-slate-600 border-slate-200"
      }`}
    >
      {status}
    </span>
  );
}

// ─── Filter Panel ─────────────────────────────────────────────────────────────

function FilterPanel({
  onClose,
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
}: {
  onClose: () => void;
  statusFilter: string;
  onStatusChange: (v: string) => void;
  categoryFilter: string;
  onCategoryChange: (v: string) => void;
}) {
  const statuses = ["All", "Sent", "Delivered", "Opened", "Failed", "Bounced"];
  const categories = [
    "All",
    "Registered Users",
    "All Participants",
    "Shortlisted Candidates",
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">Filters</h3>
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Status filter */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white text-slate-700 transition"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Category filter */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            Category
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white text-slate-700 transition"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const defaultColumns: ColumnConfig[] = [
  { key: "recipientEmail", label: "Recipient Email", visible: true },
  { key: "timestamp", label: "Timestamp", visible: true },
  { key: "subject", label: "Subject", visible: true },
  { key: "category", label: "Category", visible: true },
  { key: "status", label: "Status", visible: true },
];

// Sample data – starts empty to match the screenshot
const sampleEmails: EmailRecord[] = [];

export default function EmailStatusPage() {
  const [search, setSearch] = useState("");
  const [columns, setColumns] = useState<ColumnConfig[]>(defaultColumns);
  const [columnsDropdownOpen, setColumnsDropdownOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  // const [emails] = useState<EmailRecord[]>(sampleEmails);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const emails = useSelector((state: RootState) => state.emailHistory.emails);
  const columnsRef = useRef<HTMLDivElement>(null);
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };
  // Close columns dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        columnsRef.current &&
        !columnsRef.current.contains(e.target as Node)
      ) {
        setColumnsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ─── Filtering ─────────────────────────────────────────────────────

  const filteredEmails = emails.filter((email) => {
    const matchesSearch =
      !search ||
      email.recipientEmail.toLowerCase().includes(search.toLowerCase()) ||
      email.subject.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || email.status === statusFilter;

    const matchesCategory =
      categoryFilter === "All" || email.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalPages = Math.max(1, Math.ceil(filteredEmails.length / perPage));
  const pagedEmails = filteredEmails.slice(
    (page - 1) * perPage,
    page * perPage
  );
  const visibleColumns = columns.filter((c) => c.visible);

  const toggleColumn = (key: keyof EmailRecord) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/60">
      <div className="w-full px-4 sm:px-6 py-8 space-y-5">
        {/* ── Page Header ── */}
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Email Status
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            View and track the status of all emails sent to participants.
          </p>
        </div>

        {/* ── Search & Actions Bar ── */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search emails..."
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white transition shadow-sm placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Filters Button */}
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg border text-sm font-medium transition shadow-sm ${
                showFilters
                  ? "border-blue-300 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>

            {/* Columns Button */}
            <div className="relative" ref={columnsRef}>
              <button
                type="button"
                onClick={() => setColumnsDropdownOpen((v) => !v)}
                className={`inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg border text-sm font-medium transition shadow-sm ${
                  columnsDropdownOpen
                    ? "border-blue-300 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Columns3 className="h-4 w-4" />
                Columns
              </button>

              {columnsDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-1">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-700">
                      Toggle Columns
                    </p>
                  </div>
                  {columns.map((col) => (
                    <button
                      key={col.key}
                      type="button"
                      onClick={() => toggleColumn(col.key)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                    >
                      <span
                        className={`flex items-center justify-center w-4 h-4 rounded border transition ${
                          col.visible
                            ? "bg-blue-500 border-blue-500"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {col.visible && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </span>
                      {col.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Filter Panel ── */}
        {showFilters && (
          <FilterPanel
            onClose={() => setShowFilters(false)}
            statusFilter={statusFilter}
            onStatusChange={(v) => {
              setStatusFilter(v);
              setPage(1);
            }}
            categoryFilter={categoryFilter}
            onCategoryChange={(v) => {
              setCategoryFilter(v);
              setPage(1);
            }}
          />
        )}

        {/* ── Email Count ── */}
        <p className="text-sm text-slate-500">
          {filteredEmails.length} email(s)
        </p>

        {/* ── Table ── */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  {visibleColumns.map((col) => (
                    <th
                      key={col.key}
                      className="text-left px-5 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap"
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pagedEmails.length > 0 ? (
                  pagedEmails.map((email) => (
                    <tr
                      key={email.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition"
                    >
                      {visibleColumns.map((col) => (
                        <td
                          key={col.key}
                          className="px-5 py-3 text-slate-700 whitespace-nowrap"
                        >
                          {col.key === "status" ? (
                            <StatusBadge status={email.status} />
                          ) : (
                            <span className="truncate max-w-[240px] inline-block">
                              {email[col.key]}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={visibleColumns.length}
                      className="px-5 py-16 text-center"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Mail className="h-8 w-8 text-slate-300" />
                        <p className="text-sm text-slate-400">
                          Nothing to show
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredEmails.length > perPage && (
            <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50/50">
              <p className="text-xs text-slate-500">
                Showing {(page - 1) * perPage + 1}–
                {Math.min(page * perPage, filteredEmails.length)} of{" "}
                {filteredEmails.length}
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-xs text-slate-600 px-2">
                  {page} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
