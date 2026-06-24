"use client";

import { Eye, Download, CheckCircle, Clock } from "lucide-react";
import DataTable from "../../../../../../../components/common/DataTable";

export default function Submissions() {
  const submissions = Array.from({ length: 84 }, (_, index) => ({
    id: `${index + 1}`,
    title: "Sprint-3 React Native",
    phase: "Node Angular Full Stack | Sprint 3",
    evaluationState: "Unevaluated",
    completionStatus: "Complete",
    submissionStatus: "Published",
  }));

  const columns = [
    {
      key: "title",
      label: "Submission Title",
      sortable: true,
    },
    {
      key: "phase",
      label: "Phase",
      sortable: true,
    },
    {
      key: "evaluationState",
      label: "Evaluation State",
      render: (value: string) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
          <Clock size={12} />
          {value}
        </span>
      ),
    },
    {
      key: "completionStatus",
      label: "Completion Status",
      render: (value: string) => (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
            value === "Complete"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-gray-50 text-gray-700 border border-gray-200"
          }`}
        >
          <CheckCircle size={12} />
          {value}
        </span>
      ),
    },
    {
      key: "submissionStatus",
      label: "Submission Status",
      render: (value: string) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
          <CheckCircle size={12} />
          {value}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DataTable
        title="Submissions"
        description="Review and manage submissions from participants."
        data={submissions}
        columns={columns}
        showStats={true}
        showViewToggle={true}
        showBulkActions={true}
        searchFields={["title", "phase"]}
        enableImport={false}
        onExport={(data) => console.log("Export", data)}
        itemsPerPage={10}
      />
    </div>
  );
}
