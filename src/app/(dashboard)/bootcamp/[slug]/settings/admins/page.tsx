"use client";

import React, { useState, useEffect } from "react";
import { 
  ChevronDown, 
  Plus, 
  Trash2, 
  X, 
  Sparkles, 
  CheckCircle,
  Users,
  Shield,
  Mail,
  Phone,
  Settings2,
  Grid3X3,
  Layers,
  Save,
  Zap,
  Crown,
  UserCheck,
  UserPlus,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  isPointOfContact: boolean;
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="shrink-0 w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20">
      <span className="text-sm font-semibold text-white">
        {getInitials(name)}
      </span>
    </div>
  );
}

// ─── Admin Card ───────────────────────────────────────────────────────────────

function AdminCard({
  admin,
  onRemove,
}: {
  admin: Admin;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="group flex items-center gap-4 border border-slate-200 rounded-2xl px-5 py-4 bg-white transition-all hover:shadow-md hover:border-blue-200">
      <Avatar name={admin.name} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold text-slate-900">{admin.name}</p>
          {admin.isPointOfContact && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
              <Crown className="h-3 w-3" />
              Point of Contact
            </span>
          )}
        </div>
        <p className="text-sm text-slate-500 truncate mt-0.5 flex items-center gap-1.5">
          <Mail className="h-3 w-3 text-slate-400" />
          {admin.email}
        </p>
        <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
          <Shield className="h-3 w-3" />
          {admin.role}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onRemove(admin.id)}
        className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
        title="Remove admin"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

// ─── Add Admin Modal ──────────────────────────────────────────────────────────

function AddAdminModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (name: string, email: string) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      onAdd(name.trim(), email.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-linear-to-r from-slate-50/50 to-white">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-50 rounded-lg">
              <UserPlus className="h-4 w-4 text-blue-600" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Add New Admin
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter admin's full name"
              className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-slate-50 placeholder:text-slate-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin's email address"
              className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-slate-50 placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 transition shadow-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim() || !email.trim()}
              className="px-4 py-2 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 text-white text-sm font-medium hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/25 cursor-pointer"
            >
              Add Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const defaultAdmins: Admin[] = [
  {
    id: "1",
    name: "Arsha GS",
    email: "arsha.gopakumarannairshaija@ust.com",
    role: "Administrator",
    isPointOfContact: true,
  },
  {
    id: "2",
    name: "Arun",
    email: "arunmohan.mohanakumarlatha@ust.com",
    role: "Administrator",
    isPointOfContact: false,
  },
  {
    id: "3",
    name: "Raja Vignesh",
    email: "raja.vignesh@ust.com",
    role: "Administrator",
    isPointOfContact: false,
  },
];

export default function AdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>(defaultAdmins);
  const [showAddModal, setShowAddModal] = useState(false);
  const [pocDropdownOpen, setPocDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const currentPoc = admins.find((a) => a.isPointOfContact);

  const handleRemoveAdmin = (id: string) => {
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAddAdmin = (name: string, email: string) => {
    setAdmins((prev) => [
      ...prev,
      {
        id: `admin-${Date.now()}`,
        name,
        email,
        role: "Administrator",
        isPointOfContact: false,
      },
    ]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSetPoc = (id: string) => {
    setAdmins((prev) =>
      prev.map((a) => ({
        ...a,
        isPointOfContact: a.id === id,
      }))
    );
    setPocDropdownOpen(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSave = () => {
    setSaved(true);
    setShowSuccess(true);
    setTimeout(() => {
      setSaved(false);
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50/80">
      <div
        className={`w-full py-4 space-y-6 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* ── Page Header ── */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-100/80 shadow-sm p-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-blue-50/30 to-blue-50/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-blue-50/20 to-blue-50/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                    Team
                  </p>
                  <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mt-1">
                    Admins
                  </h1>
                </div>
              </div>
              <p className="text-slate-500 max-w-2xl ml-13">
                Manage admins who have access to edit and manage this bootcamp.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-2xl">
                <UserCheck className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  {admins.length} Admins
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <Plus size={16} />
                Add Admin
              </button>
            </div>
          </div>

          {showSuccess && (
            <div className="absolute top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl shadow-lg">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">
                  {saved ? "Settings saved successfully!" : "Admin added successfully!"}
                </span>
                <button onClick={() => setShowSuccess(false)} className="ml-2">
                  <X className="w-3 h-3 text-emerald-600 hover:text-emerald-800" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Summary Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { label: "Total Admins", value: admins.length, icon: Users },
            { label: "Point of Contact", value: currentPoc?.name || "None", icon: Crown },
            { label: "Roles", value: "Administrator", icon: Shield },
          ].map((card, index) => {
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
                    <h3 className="text-lg font-semibold text-slate-900 mt-1">
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

        {/* ── Admin List ── */}
        <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100/80">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Admin Team
                </h2>
                <p className="text-sm text-slate-500">
                  {admins.length} admins with access to this bootcamp
                </p>
              </div>
              <div className="p-2 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                <Settings2 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="p-6 space-y-3">
            {admins.map((admin) => (
              <AdminCard
                key={admin.id}
                admin={admin}
                onRemove={handleRemoveAdmin}
              />
            ))}

            {admins.length === 0 && (
              <div className="text-center py-12">
                <div className="inline-flex p-4 bg-slate-100 rounded-full mb-4">
                  <Users className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-sm text-slate-500 font-medium">No admins added yet</p>
                <p className="text-xs text-slate-400 mt-1">
                  Click "Add Admin" to get started
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Point of Contact Section ── */}
        <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100/80">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Point of Contact
                </h2>
                <p className="text-sm text-slate-500">
                  Any email sent/received to/from a candidate will be through this team member's email id.
                </p>
              </div>
              <div className="p-2 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="relative w-full max-w-xs">
              <button
                type="button"
                onClick={() => setPocDropdownOpen((v) => !v)}
                className="flex items-center justify-between w-full border-2 border-slate-200 rounded-xl px-4 py-2.5 bg-white text-sm text-slate-700 hover:border-blue-400 transition shadow-sm"
              >
                <span className="font-medium">
                  {currentPoc?.name ?? "Select point of contact"}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${
                    pocDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {pocDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1">
                  {admins.map((admin) => (
                    <button
                      key={admin.id}
                      type="button"
                      onClick={() => handleSetPoc(admin.id)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition hover:bg-blue-50 flex items-center justify-between ${
                        admin.isPointOfContact
                          ? "text-blue-600 font-semibold bg-blue-50/50"
                          : "text-slate-700"
                      }`}
                    >
                      {admin.name}
                      {admin.isPointOfContact && (
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {currentPoc && (
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <Mail className="h-3.5 w-3.5 text-blue-500" />
                <span>Emails will be sent from: </span>
                <span className="font-medium text-blue-700">{currentPoc.email}</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Bottom Save ── */}
        <div className="flex items-center justify-end gap-3 pt-2 pb-8">
          {/* <button
            type="button"
            className="px-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-600 bg-white hover:bg-slate-50 transition shadow-sm hover:shadow-md"
          >
            Reset to Defaults
          </button> */}
          <button
            type="button"
            onClick={handleSave}
            className={`px-5 py-2 rounded-xl text-sm font-medium shadow-lg transition-all duration-300 hover:scale-105 ${
              saved
                ? "bg-emerald-500 text-white shadow-emerald-500/25"
                : "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30"
            }`}
          >
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* ── Add Admin Modal ── */}
      {showAddModal && (
        <AddAdminModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddAdmin}
        />
      )}
    </div>
  );
}