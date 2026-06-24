"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import DataTable from "../../../../../../../components/common/DataTable";
import AddTeamModal from "../../../../../../../components/modal/AddTeamModal";

const defaultTeams = [
  {
    id: "1",
    teamName: "POD 4",
    leaderName: "Aishwarya Rangapuram",
    leaderEmail: "308244@ust.com",
    leaderInitials: "AI",
    members: ["AS", "JA", "YA", "PR", "MA"],
    membersCount: 5,
  },
  {
    id: "2",
    teamName: "POD 3",
    leaderName: "Ayush Kumar Dash",
    leaderEmail: "308233@ust.com",
    leaderInitials: "AY",
    members: ["AS", "ME", "AB", "VI", "AR"],
    membersCount: 5,
  },
  {
    id: "3",
    teamName: "POD 5",
    leaderName: "Rajot Singh",
    leaderEmail: "308236@ust.com",
    leaderInitials: "RA",
    members: ["AA", "FA", "VI"],
    membersCount: 5,
  },
  {
    id: "4",
    teamName: "POD 2",
    leaderName: "Bonny David",
    leaderEmail: "Bonny.David@ust.com",
    leaderInitials: "BO",
    members: ["AN", "JY", "SE", "KE", "BA"],
    membersCount: 5,
  },
  {
    id: "5",
    teamName: "POD 1",
    leaderName: "Tanguturi Venkata Lakshmi Ajay",
    leaderEmail: "Tanguturi.VenkataLakshmiAjay@ust.com",
    leaderInitials: "TA",
    members: ["VA", "AS", "NA", "CH", "EZ"],
    membersCount: 5,
  },
];

const getInitials = (name: string): string => {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export default function Teams() {
  const [teams, setTeams] = useState<any[]>(defaultTeams);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddTeam = (newTeamData: {
    teamName: string;
    leaderName: string;
    leaderEmail: string;
    members: string[];
  }) => {
    const newTeam = {
      id: Date.now().toString(),
      teamName: newTeamData.teamName,
      leaderName: newTeamData.leaderName,
      leaderEmail: newTeamData.leaderEmail,
      leaderInitials: getInitials(newTeamData.leaderName),
      members: newTeamData.members.map((m) => getInitials(m)),
      membersCount: newTeamData.members.length,
    };

    setTeams([...teams, newTeam]);
  };

  const columns = [
    {
      key: "teamName",
      label: "Team Name",
      sortable: true,
    },
    {
      key: "leaderName",
      label: "Team Leader",
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-100 to-pink-100 flex items-center justify-center text-xs font-medium text-purple-700">
            {row.leaderInitials}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{value}</div>
            <div className="text-xs text-gray-500">{row.leaderEmail}</div>
          </div>
        </div>
      ),
    },
    {
      key: "members",
      label: "Team Members",
      render: (value: string[]) => {
        if (!value || value.length === 0) {
          return <span className="text-xs text-gray-400">No members</span>;
        }
        return (
          <div className="flex -space-x-1">
            {value.slice(0, 5).map((member, idx) => (
              <div
                key={idx}
                className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-medium text-gray-600"
              >
                {member}
              </div>
            ))}
            {value.length > 5 && (
              <div className="w-7 h-7 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-[10px] font-medium text-gray-600">
                +{value.length - 5}
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const actions = [
    {
      label: "Add Team",
      icon: <Users size={14} />,
      onClick: () => setIsAddModalOpen(true),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DataTable
        title="Teams"
        description="View and manage teams registered for your bootcamp."
        data={teams}
        columns={columns}
        actions={actions}
        showStats={true}
        showViewToggle={true}
        showBulkActions={true}
        searchFields={["teamName", "leaderName", "leaderEmail"]}
        onImport={(data) => console.log("Import", data)}
        onExport={(data) => console.log("Export", data)}
        itemsPerPage={10}
        totalCount={teams.length}
      />

      {isAddModalOpen && (
        <AddTeamModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddTeam}
        />
      )}
    </div>
  );
}

