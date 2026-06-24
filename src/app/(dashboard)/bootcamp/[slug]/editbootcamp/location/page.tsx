"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  Clock3,
  MapPin,
  Navigation,
  Save,
  Sparkles,
  Ticket,
  X,
  CheckCircle,
  Globe,
  Home,
  Wifi,
  Car,
  Coffee,
  AlertCircle,
  Search,
  Plus,
  Edit,
  Trash2,
  Zap,
  ArrowUpRight,
  BarChart3,
  Users,
  Calendar,
  Clock,
  Gift,
  Trophy,
} from "lucide-react";

type LocationForm = {
  venueName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  notes: string;
  venueType: string;
  accessInfo: string;
};

const initialLocation: LocationForm = {
  venueName: "Java Costco Training Center",
  address: "45 Innovation Avenue",
  city: "Bengaluru",
  state: "Karnataka",
  zipCode: "560001",
  country: "India",
  notes: "Arrive 15 minutes early for registration and seating.",
  venueType: "Physical Venue",
  accessInfo: "Main entrance gate, floor 3, room 12B",
};

export default function LocationPage() {
  const [form, setForm] = useState<LocationForm>(initialLocation);
  const [saved, setSaved] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("bootcamp-location");
      if (stored) {
        const parsed = JSON.parse(stored) as LocationForm;
        setForm(parsed);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("bootcamp-location", JSON.stringify(form));
    } catch {
      // ignore storage errors
    }
  }, [form]);

  const handleChange = (field: keyof LocationForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setSaved(false);
    setShowSuccess(false);
  };

  const handleSave = () => {
    setSaved(true);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const venueTypes = [
    { label: "Physical Venue", icon: Building2, color: "blue" },
    { label: "Online", icon: Globe, color: "purple" },
    { label: "Hybrid", icon: Wifi, color: "emerald" },
  ];

  const quickActions = [
    { icon: Car, label: "Parking Info", action: () => {} },
    { icon: Coffee, label: "Nearby Cafes", action: () => {} },
    { icon: Globe, label: "Google Maps", action: () => {} },
  ];

  const summaryCards = [
    {
      label: "Venue Type",
      value: form.venueType,
      icon: Building2,
      color: "blue",
    },
    {
      label: "Location",
      value: `${form.city}, ${form.state}`,
      icon: MapPin,
      color: "blue",
    },
    {
      label: "Status",
      value: "Published",
      icon: CheckCircle,
      color: "emerald",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50/80">
      <div
        className={`w-full transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
   
        <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-100/80 shadow-sm p-6 mb-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-blue-50/30 to-blue-50/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-blue-50/20 to-blue-50/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                    Location
                  </p>
                  <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mt-1">
                    Venue Setup
                  </h1>
                </div>
              </div>
              <p className="text-slate-500 max-w-2xl ml-13">
                Share where your bootcamp will happen and how attendees can reach it.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-medium text-emerald-700">
                  {form.venueType}
                </span>
              </div>
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <Sparkles size={16} />
                {saved ? "Saved ✓" : "Save Changes"}
              </button>
            </div>
          </div>

     
          {showSuccess && (
            <div className="absolute top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl shadow-lg">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">
                  Location saved successfully!
                </span>
                <button onClick={() => setShowSuccess(false)} className="ml-2">
                  <X className="w-3 h-3 text-emerald-600 hover:text-emerald-800" />
                </button>
              </div>
            </div>
          )}
        </div>

    
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
                <div className="flex items-center justify-between cursor-pointer">
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


        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">

          <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100/80">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Venue Details
                  </h2>
                  <p className="text-sm text-slate-500">
                    Update the main location information for your bootcamp.
                  </p>
                </div>
                <div className="p-2 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5">
         
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Venue Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {venueTypes.map((type) => {
                    const Icon = type.icon;
                    const isActive = form.venueType === type.label;
                    return (
                      <button
                        key={type.label}
                        onClick={() => handleChange("venueType", type.label)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                          isActive
                            ? `border-${type.color}-500 bg-${type.color}-50 shadow-md`
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? `text-${type.color}-600` : "text-slate-400"}`} />
                        <span className={`text-sm font-medium ${isActive ? `text-${type.color}-700` : "text-slate-600"}`}>
                          {type.label}
                        </span>
                        {isActive && <CheckCircle className="w-3 h-3 ml-auto text-blue-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

            
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Venue Name <span className="text-red-500">*</span>
                </label>
                <input
                  value={form.venueName}
                  onChange={(e) => handleChange("venueName", e.target.value)}
                  placeholder="Enter venue name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400 cursor-pointer"
                />
              </div>

  
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Street address"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
                />
              </div>

         
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    placeholder="City"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={form.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    placeholder="State"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    ZIP / Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={form.zipCode}
                    onChange={(e) => handleChange("zipCode", e.target.value)}
                    placeholder="ZIP Code"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={form.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    placeholder="Country"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
                  />
                </div>
              </div>

 
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Access Details
                </label>
                <textarea
                  rows={2}
                  value={form.accessInfo}
                  onChange={(e) => handleChange("accessInfo", e.target.value)}
                  placeholder="Enter access details (e.g., entrance, floor, room number)"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400 resize-none"
                />
              </div>

    
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Notes for Attendees
                </label>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Add any additional notes for attendees"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400 resize-none"
                />
              </div>

    
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
                  Quick Actions
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={index}
                        onClick={action.action}
                        className="inline-flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {action.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden sticky top-6">
              <div className="p-6 border-b border-slate-100/80">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Location Preview
                    </h2>
                    <p className="text-sm text-slate-500">
                      How attendees will see your venue
                    </p>
                  </div>
                  <div className="p-2 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                    <Navigation className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="rounded-2xl bg-linear-to-br from-blue-50/30 to-blue-50/20 border border-slate-100 p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
                      <Building2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {form.venueName}
                      </h3>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] font-medium">
                        <Globe className="w-3 h-3" />
                        {form.venueType}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span className="text-slate-600">
                        {form.address}, {form.city}, {form.state}, {form.zipCode}, {form.country}
                      </span>
                    </div>

                    {form.accessInfo && (
                      <div className="flex items-start gap-2 text-sm">
                        <Ticket className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        <span className="text-slate-600">{form.accessInfo}</span>
                      </div>
                    )}

                    {form.notes && (
                      <div className="flex items-start gap-2 text-sm">
                        <Clock3 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        <span className="text-slate-600">{form.notes}</span>
                      </div>
                    )}
                  </div>

        
                  <div className="mt-4 rounded-xl bg-linear-to-br from-slate-100 to-slate-50 p-6 text-center border border-slate-200">
                    <div className="flex flex-col items-center">
                      <div className="p-3 bg-white rounded-full shadow-sm mb-2">
                        <MapPin className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-xs text-slate-500">
                        Interactive map will appear here
                      </p>
                      <button className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
                        Open in Google Maps →
                      </button>
                    </div>
                  </div>
                </div>

         
                <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>All location details are ready for publication</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-400">
          <p>All location details are managed in real-time</p>
        </div>
      </div>
    </div>
  );
}