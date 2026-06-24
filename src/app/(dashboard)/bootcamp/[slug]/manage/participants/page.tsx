"use client";

import { Eye, Edit, Trash2, UserPlus } from "lucide-react";
import DataTable from "../../../../../../../components/common/DataTable";

export default function Participants() {
  const participants = [
    {
      id: "1",
      fullName: "Baranikumar B",
      email: "308244@ust.com",
      timestamp: "May 30, 2026 03:32 PM IST",
      initials: "BA",
      status: "Active",
    },
    {
      id: "2",
      fullName: "Visagan Rajkumar",
      email: "308226@ust.com",
      timestamp: "May 30, 2026 02:58 PM IST (Asia/Kolkata)",
      initials: "VI",
      status: "Active",
    },
    {
      id: "3",
      fullName: "Fathimath Selma Padiyath Shiyas",
      email: "308255@ust.com",
      timestamp: "May 30, 2026 02:58 PM IST (Asia/Kolkata)",
      initials: "FA",
      status: "Active",
    },
    {
      id: "4",
      fullName: "Manda Kuswanth Sri Sai Syamla Rao",
      email: "308324@ust.com",
      timestamp: "May 30, 2026 02:58 PM IST (Asia/Kolkata)",
      initials: "MA",
      status: "Active",
    },
    {
      id: "5",
      fullName: "Arjun Ashok",
      email: "Arjun.Ashok@ust.com",
      timestamp: "May 30, 2026 02:58 PM IST (Asia/Kolkata)",
      initials: "AR",
      status: "Active",
    },
    {
      id: "6",
      fullName: "Ayush Kumar Dash",
      email: "308233@ust.com",
      timestamp: "May 30, 2026 02:58 PM IST (Asia/Kolkata)",
      initials: "AY",
      status: "Active",
    },
  ];

  const columns = [
    {
      key: "fullName",
      label: "Full Name",
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-linear-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center text-xs font-medium text-blue-700">
            {row.initials}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{value}</div>
            <div className="text-xs text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "timestamp",
      label: "Registration Timestamp",
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
            value === "Active"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-gray-50 text-gray-700 border border-gray-200"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  const rowActions = [
    {
      label: "View",
      icon: <Eye size={14} />,
      onClick: (row: any) => console.log("View", row),
      variant: "primary" as const,
    },
    {
      label: "Edit",
      icon: <Edit size={14} />,
      onClick: (row: any) => console.log("Edit", row),
    },
    {
      label: "Delete",
      icon: <Trash2 size={14} />,
      onClick: (row: any) => console.log("Delete", row),
      variant: "danger" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DataTable
        title="Participants"
        description="View registered participants, their status, and related details."
        data={participants}
        columns={columns}
        rowActions={rowActions}
        searchFields={["fullName", "email"]}
        statusColors={{
          Active: {
            bg: "bg-emerald-50",
            text: "text-emerald-700",
            border: "border-emerald-200",
          },
          Inactive: {
            bg: "bg-gray-50",
            text: "text-gray-700",
            border: "border-gray-200",
          },
        }}
        showStats={true}
        showViewToggle={true}
        showBulkActions={true}
        totalCount={participants.length}
        onImport={(data) => console.log("Import", data)}
        onExport={(data) => console.log("Export", data)}
        onRefresh={() => console.log("Refresh")}
        itemsPerPage={10}
      />
    </div>
  );
}
