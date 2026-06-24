"use client";

import { useEffect, useState } from "react";
import {
  X,
  Mail,
  Upload,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  Users,
  FileText,
  Send,
  Sparkles,
} from "lucide-react";

type Step = 1 | 2;
type Method = "manual" | "csv";

type ParsedInvite = {
  email: string;
  name?: string;
  status: "Pending";
  invitedAt: string;
};

type Props = {
  onClose: () => void;
  onInvite?: (invites: ParsedInvite[]) => void;
};

export default function InviteModal({ onClose, onInvite }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [method, setMethod] = useState<Method>("manual");
  const [emails, setEmails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleCSVUpload = (file: File) => {
    const reader = new FileReader();
    setFileName(file.name);

    reader.onload = (event) => {
      const text = event.target?.result as string;
      const rows = text.split("\n");
      const parsedEmails = rows
        .map((row) => row.trim())
        .filter((row) => row.length > 0);
      setEmails(parsedEmails.join("\n"));
    };

    reader.readAsText(file);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      // Parse emails and build invite objects
      const lines = emails.split("\n").filter((line) => line.trim().length > 0);
      const now = new Date();
      const timestamp = now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      const parsed: ParsedInvite[] = lines.map((line) => {
        const parts = line.split("|").map((p) => p.trim());
        return {
          email: parts[0],
          name: parts[1] || undefined,
          status: "Pending" as const,
          invitedAt: timestamp,
        };
      });

      if (onInvite && parsed.length > 0) {
        onInvite(parsed);
      }

      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const emailCount = emails.split("\n").filter((e) => e.trim()).length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:w-[90%] lg:w-210 max-h-screen sm:max-h-[90vh] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-200"
      >
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-5 border-b border-gray-100">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20 shrink-0">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                Invite Users
              </h2>
              <p className="text-[10px] sm:text-xs text-gray-500">
                Step {step} of 2
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200 text-gray-400 hover:text-gray-600 cursor-pointer "
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row overflow-y-auto max-h-[calc(100vh-80px)] sm:max-h-[calc(90vh-80px)]">
          <div className="sm:w-48 lg:w-55 bg-linear-to-b from-gray-50/50 to-white px-4 sm:px-6 py-4 sm:py-6 border-b sm:border-b-0 sm:border-r border-gray-100">
            <div className="flex sm:flex-col gap-4 sm:gap-8">
              <div className="flex-1 sm:flex-none flex items-center sm:items-start gap-3 sm:gap-4">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shrink-0 ${
                    step === 1
                      ? "bg-linear-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                      : step > 1
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {step > 1 ? (
                    <CheckCircle size={14} className="sm:w-4 sm:h-4" />
                  ) : (
                    "1"
                  )}
                </div>
                <div className="hidden sm:block">
                  <p
                    className={`text-sm font-medium ${
                      step === 1 ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    Enter Emails
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Add participants
                  </p>
                </div>
                <span className="sm:hidden text-xs font-medium text-gray-700">
                  {step === 1 ? "Enter Emails" : "Configure Email"}
                </span>
              </div>

              <div className="flex-1 sm:flex-none flex items-center sm:items-start gap-3 sm:gap-4">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shrink-0 ${
                    step === 2
                      ? "bg-linear-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  2
                </div>
                <div className="hidden sm:block">
                  <p
                    className={`text-sm font-medium ${
                      step === 2 ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    Configure Email
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Customize invitation
                  </p>
                </div>
              </div>

              <div className="hidden sm:block pt-4">
                <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: step === 1 ? "50%" : "100%" }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  {step === 1 ? "50% Complete" : "Almost there!"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 overflow-y-auto">
            {step === 1 && (
              <div className="animate-in slide-in-from-right-4 duration-300">
                <div className="mb-4 sm:mb-6">
                  <label className="text-[10px] sm:text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Choose Method
                  </label>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 mt-2">
                    <button
                      onClick={() => setMethod("manual")}
                      className={`flex items-center justify-center gap-2 border-2 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                        method === "manual"
                          ? "border-blue-500 bg-blue-50 text-blue-600 shadow-sm "
                          : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <Mail size={16} className="sm:w-4.5 sm:h-4.5" />
                      <span>Enter Manually</span>
                    </button>

                    <button
                      onClick={() => setMethod("csv")}
                      className={`flex items-center justify-center gap-2 border-2 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                        method === "csv"
                          ? "border-blue-500 bg-blue-50 text-blue-600 shadow-sm"
                          : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <Upload size={16} className="sm:w-4.5 sm:h-4.5" />
                      <span>Upload CSV</span>
                    </button>
                  </div>
                </div>

                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <AlertCircle
                      size={16}
                      className="sm:w-4.5 sm:h-4.5 text-blue-500 shrink-0 mt-0.5"
                    />
                    <div className="text-[10px] sm:text-xs text-gray-600 space-y-0.5 sm:space-y-1">
                      <p className="font-medium text-blue-700 text-[10px] sm:text-xs">
                        Important Notes
                      </p>
                      <p>
                        • Enter emails in format:{" "}
                        <span className="text-gray-700 font-medium text-[10px] sm:text-xs">
                          abc@email.com | Firstname Lastname
                        </span>
                      </p>
                      <p className="hidden xs:block">
                        • Separate multiple emails with a new line
                      </p>
                      <p className="hidden xs:block">
                        • An account will be created if the user doesn't exist
                      </p>
                      <p>
                        • Maximum{" "}
                        <span className="font-medium text-blue-600">
                          150 emails
                        </span>{" "}
                        allowed
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <label className="text-[10px] sm:text-xs font-medium text-gray-700 uppercase tracking-wider">
                      User Emails
                    </label>
                    {emailCount > 0 && (
                      <span className="text-[10px] sm:text-xs text-blue-600 font-medium">
                        {emailCount} emails
                      </span>
                    )}
                  </div>

                  {method === "manual" ? (
                    <textarea
                      value={emails}
                      onChange={(e) => setEmails(e.target.value)}
                      placeholder="john@example.com | John Doe&#10;jane@example.com | Jane Smith"
                      className="w-full h-24 sm:h-28 lg:h-32 border-2 border-gray-200 rounded-xl p-2 sm:p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                    />
                  ) : (
                    <div>
                      {emails ? (
                        <div className="relative">
                          <textarea
                            value={emails}
                            onChange={(e) => setEmails(e.target.value)}
                            className="w-full h-24 sm:h-28 lg:h-32 border-2 border-gray-200 rounded-xl p-2 sm:p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                          />
                          <button
                            onClick={() => {
                              setEmails("");
                              setFileName("");
                            }}
                            className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X size={14} className="sm:w-4 sm:h-4" />
                          </button>
                          <div className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 flex flex-wrap items-center gap-1 sm:gap-2">
                            <span className="text-[8px] sm:text-[10px] bg-green-100 text-green-700 px-1.5 sm:px-2 py-0.5 rounded-full">
                              {emailCount} loaded
                            </span>
                            <span className="text-[8px] sm:text-[10px] text-gray-400 truncate max-w-20 sm:max-w-30">
                              from {fileName}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-200 group block">
                          <input
                            type="file"
                            accept=".csv"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleCSVUpload(file);
                            }}
                          />
                          <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                            <div className="p-2 sm:p-3 bg-gray-100 rounded-xl group-hover:bg-blue-100 transition-all">
                              <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-blue-500" />
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600">
                              Click to upload CSV file
                            </p>
                            <p className="text-[10px] sm:text-xs text-gray-400">
                              Supports .csv files
                            </p>
                          </div>
                        </label>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="p-1.5 sm:p-2 bg-linear-to-br from-emerald-50 to-emerald-100 rounded-xl">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                      Configure Email
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-500">
                      Personalize your invitation
                    </p>
                  </div>
                </div>

                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 sm:mb-3">
                    <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email Preview
                    </p>
                    <span className="text-[10px] sm:text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {emailCount} recipients
                    </span>
                  </div>
                  <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-100 shadow-sm">
                    <p className="text-xs sm:text-sm font-medium text-gray-800">
                      Subject: Welcome to the Bootcamp!
                    </p>
                    <div className="mt-2 text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-2">
                      <p>Hello,</p>
                      <p className="hidden xs:block">
                        You've been invited to join our bootcamp. Click the link
                        below to get started:
                      </p>
                      <div className="bg-blue-50 p-1.5 sm:p-2 rounded-lg text-blue-600 font-medium text-[10px] sm:text-xs">
                        [Invitation Link]
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="p-2 sm:p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-[10px] sm:text-xs text-gray-500">
                      Total Invites
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-gray-900">
                      {emailCount}
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-[10px] sm:text-xs text-gray-500">
                      Will be sent
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-emerald-600">
                      Now
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 sm:gap-4 mt-4 sm:mt-6 lg:mt-8 pt-3 sm:pt-4 border-t border-gray-100">
              <button
                onClick={() => (step === 1 ? onClose() : setStep(1))}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors w-full sm:w-auto justify-center cursor-pointer"
              >
                {step === 1 ? (
                  "Cancel"
                ) : (
                  <>
                    <ChevronLeft size={14} className="sm:w-4 sm:h-4" />
                    Back
                  </>
                )}
              </button>

              <div className="w-full sm:w-auto">
                {step === 2 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || emailCount === 0}
                    className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition-all duration-300 cursor-pointer ${
                      isSubmitting || emailCount === 0
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} className="sm:w-4 sm:h-4" />
                        <span>Send Invites</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => setStep(2)}
                    disabled={emailCount === 0}
                    className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition-all duration-300 cursor-pointer ${
                      emailCount === 0
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
                    }`}
                  >
                    <span>Next</span>
                    <ChevronRight size={14} className="sm:w-4 sm:h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
