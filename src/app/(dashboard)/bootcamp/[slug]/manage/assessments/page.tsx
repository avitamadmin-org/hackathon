"use client";


import { BarChart3, Eye } from "lucide-react";
import DataTable from "../../../../../../../components/common/DataTable";

export default function Assessments() {
  const teams = [
  {
    id: "1",
    teamName: "POD 5",
    leaderName: "Rajot Singh",
    leaderEmail: "308236@ust.com",
    membersCount: 4,
    averageScore: 78,
  },
  {
    id: "2",
    teamName: "POD 4",
    leaderName: "Aishwarya Rangapuram",
    leaderEmail: "308244@ust.com",
    membersCount: 6,
    averageScore: 28,

  },
  {
    id: "3",
    teamName: "POD 3",
    leaderName: "Ayush Kumar Dash",
    leaderEmail: "308233@ust.com",
    membersCount: 5,
    averageScore: 65,
  },
  {
    id: "4",
    teamName: "POD 2",
    leaderName: "Bonny David",
    leaderEmail: "bonny.david@ust.com",
    membersCount: 5,
    averageScore: 90,

  },
  {
    id: "5",
    teamName: "POD 1",
    leaderName: "Tanguturi Venkata Lakshmi Ajay",
    leaderEmail: "ajay@ust.com",
    membersCount: 6,
    averageScore: 100,

  },
];

  const columns = [
    {
      key: "teamName",
      label: "Team",
      sortable: true,
    },
    {
      key: "leaderName",
      label: "Leader Name",
      sortable: true,
    },
    {
      key: "leaderEmail",
      label: "Email",
    },
    {
      key: "membersCount",
      label: "Members",
      sortable: true,
    },
    {
      key: "averageScore",
      label: "Avg Score",
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center gap-2">
          <div className="flex-1 max-w-15 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-blue-500 to-emerald-500 rounded-full"
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-xs font-medium text-gray-700">{value}%</span>
        </div>
      ),
    },
  ];

  const actions = [
    {
      label: "View Analytics",
      icon: <BarChart3 size={14} />,
      onClick: () => console.log("View analytics"),
    },
  ];

  return (
    <div className=" min-h-screen bg-gray-50">
      <DataTable
        title="Assessments"
        description="View teams and their leader details."
        data={teams}
        columns={columns}
        actions={actions}
        showStats={true}
        showViewToggle={true}
        showBulkActions={true}
        searchFields={["teamName", "leaderName", "leaderEmail"]}
        onExport={(data) => console.log("Export", data)}
        itemsPerPage={10}
      />
    </div>
  );
}