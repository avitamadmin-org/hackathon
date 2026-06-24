"use client";

import { useState } from "react";
import {
  Search,
  Eye,
  Pencil,
  Plus,
  Filter,
  Calendar,
  Users,
  Award,
} from "lucide-react";
import CreateBootcampModal from "../../../../components/modal/CreateBootcampModal";
import { Autocomplete, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

interface Bootcamp {
  id: number;
  title: string;
  identifier: string;
  trainer: string;
  createdBy: string;
  status: "Draft" | "Live" | "Completed";
  startDate: string;
  endDate: string;
  shortDescription?: string;
  registrationCount: number;
  teamsCount: number;
  submissions: number;
  duration: string;
}

export default function BootcampPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Recently Created");
  const statusOptions = ["All", "Draft", "Live", "Completed"];
  const [selectedBootcamp, setSelectedBootcamp] = useState<Bootcamp | null>(
    null
  );
  const [viewBootCamp, setViewBootCamp] = useState<Bootcamp | null>(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([
    {
      id: 1,
      title: "Internal Evaluation Angular Apr'26",
      identifier: "Internal_Evaluation_Angular_Apr'26",
      shortDescription: "Angular internal evaluation for sprint participants.",
      trainer: "Arsha GS",
      createdBy: "Gokul P",
      status: "Live",
      startDate: "2026-06-11",
      endDate: "2026-06-14",

      registrationCount: 45,
      teamsCount: 12,
      submissions: 29,
      duration: "3 Days 4 Hours",
    },
    {
      id: 2,
      title: "Sprint 3 Internal Evaluation",
      identifier: "Sprint_3_Internal_Evaluation",
      shortDescription:
        "Sprint evaluation covering React, API integration and deployment.",
      trainer: "Raja R",
      createdBy: "Anjitha MS",
      status: "Draft",
      startDate: "2026-06-09",
      endDate: "2026-06-09",

      registrationCount: 18,
      teamsCount: 5,
      submissions: 6,
      duration: "1 Day 2 Hours",
    },
  ]);
  const users = [
    "Anyone",
    "Arsha GS",
    "Anjitha MS",
    "Gokul P",
    "Raja R",
    "Santhosh G",
    "Praveen K",
  ];

  const sortOptions = ["Recently Created", "Oldest Created"];

  const handleCreateBootcamp = (data: any) => {
    setBootcamps((prev) => [
      {
        id: Date.now(),
        title: data.title,
        identifier: data.identifier,
        trainer: data.trainer,
        createdBy: data.createdBy || "John Doe",
        status: data.status,
        startDate: data.startDate,
        endDate: data.endDate,
        registrationCount: data.registrationCount || 0,
        teamsCount: data.teamsCount || 0,
        submissions: data.submissions || 0,
        duration: data.duration || "",
      },
      ...prev,
    ]);
    setOpen(false);
  };

  const filteredBootcamps = [...bootcamps]
    .filter((bootcamp) => {
      const matchesSearch =
        bootcamp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bootcamp.trainer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesUser =
        selectedUsers?.length === 0
          ? true
          : selectedUsers?.includes(bootcamp.createdBy);

      const matchesStatus =
        statusFilter === "All" ? true : bootcamp.status === statusFilter;

      return matchesSearch && matchesUser && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "Recently Created") {
        return b.id - a.id;
      }
      return a.id - b.id;
    });

  const handleEditBootcamp = (bootcamp: Bootcamp) => {
    setSelectedBootcamp(bootcamp);
    setOpen(true);
  };

  const handleViewBootcamp = (bootcamp: Bootcamp) => {
    setSelectedBootcamp(null);
    setViewBootCamp(bootcamp);
    setOpen(true);
  };

  const handleSubmitBootcamp = (data: any) => {
    if (selectedBootcamp) {
      setBootcamps((prev) =>
        prev.map((item) =>
          item.id === selectedBootcamp.id ? { ...item, ...data } : item
        )
      );
    } else {
      setBootcamps((prev) => [
        {
          id: Date.now(),
          createdBy: "John Doe",
          submissions: 0,
          ...data,
        },
        ...prev,
      ]);
    }
    setSelectedBootcamp(null);
    setOpen(false);
  };

  const stats = {
    total: bootcamps.length,
    live: bootcamps.filter((b) => b.status === "Live").length,
    draft: bootcamps.filter((b) => b.status === "Draft").length,
    completed: bootcamps.filter((b) => b.status === "Completed").length,
    totalSubmissions: bootcamps.reduce((sum, b) => sum + b.submissions, 0),
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-auto p-4 md:p-6 lg:p-2">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Bootcamps
              </h1>
              <p className="text-slate-500 mt-2 text-sm md:text-base">
                Launch, manage, and track your training programs
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedBootcamp(null);
                setOpen(true);
              }}
              className="group w-full lg:w-auto bg-linear-to-r from-slate-900 to-slate-800 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Plus
                size={18}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
              Create Bootcamp
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Total
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {stats.total}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Award size={20} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Live
                </p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {stats.live}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Draft
                </p>
                <p className="text-2xl font-bold text-amber-600 mt-1">
                  {stats.draft}
                </p>
              </div>
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                <FileText size={20} className="text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Completed
                </p>
                <p className="text-2xl font-bold text-slate-600 mt-1">
                  {stats.completed}
                </p>
              </div>
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
                <Award size={20} className="text-slate-600" />
              </div>
            </div>
          </div>

          <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 shadow-sm hover:shadow-md transition-shadow col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
                  Total Submissions
                </p>
                <p className="text-2xl font-bold text-blue-700 mt-1">
                  {stats.totalSubmissions}
                </p>
              </div>
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Users size={20} className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-50">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Search
              </label>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search bootcamps..."
                  className="pl-10 pr-4 h-11 w-full rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none text-sm"
                />
              </div>
            </div>

            <div className="w-64">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Created By
              </label>
              <Autocomplete
                multiple
                size="small"
                options={users.filter((user) => user !== "Anyone")}
                value={selectedUsers}
                onChange={(_, value) => setSelectedUsers(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select users"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "0.75rem",
                        backgroundColor: "#f9fafb",
                      },
                    }}
                  />
                )}
              />
            </div>

            <div className="w-48">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Sort By
              </label>
              <Autocomplete
                size="small"
                options={sortOptions}
                value={sortBy}
                onChange={(_, value) => setSortBy(value || "Recently Created")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "0.75rem",
                        backgroundColor: "#f9fafb",
                      },
                    }}
                  />
                )}
              />
            </div>

            <div className="w-40">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Status
              </label>
              <Autocomplete
                size="small"
                options={statusOptions}
                value={statusFilter}
                onChange={(_, value) => setStatusFilter(value || "All")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "0.75rem",
                        backgroundColor: "#f9fafb",
                      },
                    }}
                  />
                )}
              />
            </div>

            {(searchTerm ||
              selectedUsers.length > 0 ||
              statusFilter !== "All") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedUsers([]);
                  setStatusFilter("All");
                }}
                className="h-11 px-4 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {filteredBootcamps.length === 0 && (
            <div className="col-span-full">
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No bootcamps found
                </h3>
                <p className="text-gray-400 text-sm">
                  Try adjusting your search or filters
                </p>
              </div>
            </div>
          )}

          {filteredBootcamps.map((bootcamp) => (
            <div
              onClick={() => {
                router.push(`/bootcamp/${bootcamp.identifier}/manage/overview`);
              }}
              key={bootcamp.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2 flex-wrap">
                    <span
                      className={`text-xs px-3 py-1.5 rounded-full font-semibold tracking-wide
                        ${
                          bootcamp.status === "Live"
                            ? "bg-linear-to-r from-green-50 to-green-100 text-green-700 border border-green-200"
                            : bootcamp.status === "Draft"
                            ? "bg-linear-to-r from-amber-50 to-amber-100 text-amber-700 border border-amber-200"
                            : "bg-linear-to-r from-slate-50 to-slate-100 text-slate-700 border border-slate-200"
                        }`}
                    >
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle"
                        style={{
                          backgroundColor:
                            bootcamp.status === "Live"
                              ? "#22c55e"
                              : bootcamp.status === "Draft"
                              ? "#f59e0b"
                              : "#64748b",
                        }}
                      />
                      {bootcamp.status}
                    </span>{" "}
                    <span className="text-xs px-3 py-1.5 rounded-full font-medium bg-blue-50 text-blue-600 border border-blue-100">
                      📢 Published
                    </span>
                  </div>

                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => handleViewBootcamp(bootcamp)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye
                        size={18}
                        className="text-gray-600 hover:text-green-600"
                      />
                    </button>
                    <button
                      onClick={() => handleEditBootcamp(bootcamp)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Pencil
                        size={18}
                        className="text-gray-600 hover:text-blue-600"
                      />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-bold text-xl text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                    {bootcamp.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-6 h-6 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                      {bootcamp.trainer.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-sm text-gray-600 font-medium">
                      by {bootcamp.trainer}
                    </p>
                  </div>
                </div>

                <div className="bg-linear-to-r from-gray-50 to-gray-50/50 rounded-xl p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar size={14} className="text-gray-400" />
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Starts
                        </p>
                      </div>
                      <p className="font-semibold text-gray-700 text-sm">
                        {bootcamp.startDate}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar size={14} className="text-gray-400" />
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Ends
                        </p>
                      </div>
                      <p className="font-semibold text-gray-700 text-sm">
                        {bootcamp.endDate}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Submissions
                    </span>
                    <span className="text-sm font-bold text-blue-600">
                      {bootcamp.submissions || 0}
                    </span>
                  </div>
                  {/* <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-linear-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          (bootcamp.submissions / 100) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div> */}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 pb-4 px-6 border-t border-gray-100 md:hidden">
                <button
                  onClick={() => handleViewBootcamp(bootcamp)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  View
                </button>
                <button
                  onClick={() => handleEditBootcamp(bootcamp)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Pencil size={16} />
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateBootcampModal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedBootcamp(null);
          setViewBootCamp(null);
        }}
        onSubmit={handleSubmitBootcamp}
        initialData={selectedBootcamp}
        viewBootCamp={viewBootCamp}
      />
    </div>
  );
}

function FileText({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
