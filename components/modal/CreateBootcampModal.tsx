"use client";

import { useEffect, useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { IoClose } from "react-icons/io5";
import { FiSave, FiX } from "react-icons/fi";

export interface BootcampData {
  id?: number;
  title: string;
  shortDescription?: string;
  trainer: string;
  startDate: string;
  endDate: string;
  status: string;
  registrationCount: number;
  teamsCount: number;
  submissions: number;
  duration: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  initialData?: BootcampData | null;
  onSubmit: (data: BootcampData) => void;
  viewBootCamp?: BootcampData | null;
}

const statusOptions = ["Draft", "Live", "Completed"];

export default function CreateBootcampModal({
  open,
  onClose,
  onSubmit,
  initialData,
  viewBootCamp,
}: Props) {
  const isViewMode = !!viewBootCamp;
  const [formData, setFormData] = useState<BootcampData>({
    title: "",
    shortDescription: "",
    trainer: "",
    startDate: "",
    endDate: "",
    status: "Draft",
    registrationCount: 0,
    teamsCount: 0,
    submissions: 0,
    duration: "",
  });

  useEffect(() => {
    const data = viewBootCamp || initialData;

    if (data) {
      setFormData({
        title: data.title || "",
        shortDescription: data.shortDescription || "",
        trainer: data.trainer || "",
        startDate: data.startDate || "",
        endDate: data.endDate || "",
        status: data.status || "Draft",
        registrationCount: data.registrationCount || 0,
        teamsCount: data.teamsCount || 0,
        submissions: data.submissions || 0,
        duration: data.duration || "",
      });
    } else {
      setFormData({
        title: "",
        shortDescription: "",
        trainer: "",
        startDate: "",
        endDate: "",
        status: "Draft",
        registrationCount: 0,
        teamsCount: 0,
        submissions: 0,
        duration: "",
      });
    }
  }, [initialData, viewBootCamp, open]);

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-100 text-green-700 border-green-200";
      case "Completed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: {
              xs: "100%",
              sm: 520,
            },
            borderRadius: { sm: "12px 0 0 12px" },
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          },
        },
      }}
    >
      <div className="h-full flex flex-col bg-gray-50">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 bg-white border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold text-xl text-gray-800">
              {isViewMode
                ? "View Bootcamp"
                : initialData
                ? "Edit Bootcamp"
                : "Create Bootcamp"}
            </h2>
            {isViewMode && formData.status && (
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                  formData.status
                )}`}
              >
                {formData.status}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <IoClose size={22} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col gap-6">
              {/* Basic Information Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 gap-5">
                  <TextField
                    variant="standard"
                    disabled={isViewMode}
                    label="Bootcamp Name"
                    size="medium"
                    fullWidth
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                      })
                    }
                    slotProps={{
                      input: {
                        className: isViewMode ? "text-gray-700" : "",
                      },
                    }}
                    sx={{
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "#E5E7EB",
                      },
                      "& .MuiInput-underline:hover:before": {
                        borderBottomColor: "#9CA3AF",
                      },
                    }}
                  />

                  <TextField
                    variant="standard"
                    disabled={isViewMode}
                    label="Overview"
                    multiline
                    rows={2}
                    size="medium"
                    fullWidth
                    value={formData.shortDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shortDescription: e.target.value,
                      })
                    }
                    sx={{
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "#E5E7EB",
                      },
                      "& .MuiInput-underline:hover:before": {
                        borderBottomColor: "#9CA3AF",
                      },
                    }}
                  />
                </div>
              </div>

              {/* Trainer & Schedule Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Trainer & Schedule
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <TextField
                    variant="standard"
                    disabled={isViewMode}
                    label="Trainer Name"
                    size="medium"
                    fullWidth
                    value={formData.trainer}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        trainer: e.target.value,
                      })
                    }
                    sx={{
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "#E5E7EB",
                      },
                      "& .MuiInput-underline:hover:before": {
                        borderBottomColor: "#9CA3AF",
                      },
                    }}
                  />

                  <TextField
                    variant="standard"
                    disabled={isViewMode}
                    label="Duration"
                    placeholder="e.g. 2 Days 3 Hours"
                    size="medium"
                    fullWidth
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration: e.target.value,
                      })
                    }
                    sx={{
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "#E5E7EB",
                      },
                      "& .MuiInput-underline:hover:before": {
                        borderBottomColor: "#9CA3AF",
                      },
                    }}
                  />

                  <TextField
                    variant="standard"
                    disabled={isViewMode}
                    label="Start Date"
                    type="date"
                    size="medium"
                    fullWidth
                    value={formData.startDate}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        startDate: e.target.value,
                      })
                    }
                    sx={{
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "#E5E7EB",
                      },
                      "& .MuiInput-underline:hover:before": {
                        borderBottomColor: "#9CA3AF",
                      },
                    }}
                  />

                  <TextField
                    variant="standard"
                    disabled={isViewMode}
                    label="End Date"
                    type="date"
                    size="medium"
                    fullWidth
                    value={formData.endDate}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        endDate: e.target.value,
                      })
                    }
                    sx={{
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "#E5E7EB",
                      },
                      "& .MuiInput-underline:hover:before": {
                        borderBottomColor: "#9CA3AF",
                      },
                    }}
                  />
                </div>
              </div>

              {/* Statistics Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <TextField
                    variant="standard"
                    disabled={isViewMode}
                    label="Registration Count"
                    type="number"
                    size="medium"
                    fullWidth
                    value={formData.registrationCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registrationCount: Number(e.target.value),
                      })
                    }
                    sx={{
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "#E5E7EB",
                      },
                      "& .MuiInput-underline:hover:before": {
                        borderBottomColor: "#9CA3AF",
                      },
                    }}
                  />

                  <TextField
                    variant="standard"
                    disabled={isViewMode}
                    label="Teams Count"
                    type="number"
                    size="medium"
                    fullWidth
                    value={formData.teamsCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        teamsCount: Number(e.target.value),
                      })
                    }
                    sx={{
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "#E5E7EB",
                      },
                      "& .MuiInput-underline:hover:before": {
                        borderBottomColor: "#9CA3AF",
                      },
                    }}
                  />

                  <TextField
                    variant="standard"
                    disabled={isViewMode}
                    label="Submissions"
                    type="number"
                    size="medium"
                    fullWidth
                    value={formData.submissions}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        submissions: Number(e.target.value),
                      })
                    }
                    sx={{
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "#E5E7EB",
                      },
                      "& .MuiInput-underline:hover:before": {
                        borderBottomColor: "#9CA3AF",
                      },
                    }}
                  />
                </div>
              </div>

              {/* Status Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Status
                </h3>
                <Autocomplete
                  options={statusOptions}
                  disabled={isViewMode}
                  value={formData.status}
                  onChange={(_, value) =>
                    setFormData({
                      ...formData,
                      status: value || "Draft",
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Status"
                      variant="standard"
                      size="medium"
                      fullWidth
                      sx={{
                        "& .MuiInput-underline:before": {
                          borderBottomColor: "#E5E7EB",
                        },
                        "& .MuiInput-underline:hover:before": {
                          borderBottomColor: "#9CA3AF",
                        },
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg cursor-pointer border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center gap-2"
          >
            <FiX size={16} />
            {isViewMode ? "Close" : "Cancel"}
          </button>

          {!isViewMode && (
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-lg cursor-pointer bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              <FiSave size={16} />
              {initialData ? "Update Bootcamp" : "Create Bootcamp"}
            </button>
          )}
        </div>
      </div>
    </Drawer>
  );
}
