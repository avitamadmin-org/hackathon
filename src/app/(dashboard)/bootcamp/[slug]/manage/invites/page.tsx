"use client";

import { useState } from "react";
import {
  Mail,
  Users,
  Send,
  Plus,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Download,
  TrendingUp,
  Menu,
} from "lucide-react";
import InviteModal from "../../../../../../../components/modal/InviteModal";

type Invite = {
  id: number;
  email: string;
  status: "Pending" | "Accepted";
  name?: string;
  invitedAt?: string;
};

export default function Invites() {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInvite = (
    newInvites: {
      email: string;
      name?: string;
      status: "Pending";
      invitedAt: string;
    }[]
  ) => {
    setInvites((prev) => {
      const startId =
        prev.length > 0 ? Math.max(...prev.map((i) => i.id)) + 1 : 1;
      const mapped: Invite[] = newInvites.map((inv, idx) => ({
        id: startId + idx,
        email: inv.email,
        name: inv.name,
        status: inv.status,
        invitedAt: inv.invitedAt,
      }));
      return [...prev, ...mapped];
    });
  };

  const pendingCount = invites.filter((inv) => inv.status === "Pending").length;
  const acceptedCount = invites.filter(
    (inv) => inv.status === "Accepted"
  ).length;

  const filteredInvites = invites.filter(
    (inv) =>
      inv.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inv.name && inv.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-2 min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50/80 ">
      <div className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 lg:mb-8">
          <div className="w-full sm:w-auto">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-2.5 bg-linear-to-r from-blue-500 to-indigo-600 rounded-xl sm:rounded-3xl shadow-lg shadow-blue-500/20 shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
                  Invites
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Send and track invitations for your bootcamp
                </p>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-auto flex gap-2 sm:gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 sm:flex-none items-center justify-center flex gap-2 px-4 sm:px-5 py-2.5 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <Plus size={18} />
              <span>Invite Users</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100/80 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                  Total Invites
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                  {invites.length}
                </h3>
              </div>
              <div className="p-2 sm:p-3 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl">
                <Send className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs sm:text-sm">
              <span className="text-emerald-600 font-medium">+0%</span>
              <span className="text-gray-400">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100/80 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                  Pending
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-yellow-600 mt-1">
                  {pendingCount}
                </h3>
              </div>
              <div className="p-2 sm:p-3 bg-linear-to-br from-yellow-50 to-yellow-100 rounded-xl">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full transition-all duration-1000"
                  style={{
                    width:
                      invites.length > 0
                        ? `${(pendingCount / invites.length) * 100}%`
                        : "0%",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100/80 shadow-sm hover:shadow-xl transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                  Accepted
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-emerald-600 mt-1">
                  {acceptedCount}
                </h3>
              </div>
              <div className="p-2 sm:p-3 bg-linear-to-br from-emerald-50 to-emerald-100 rounded-xl">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-1000"
                  style={{
                    width:
                      invites.length > 0
                        ? `${(acceptedCount / invites.length) * 100}%`
                        : "0%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {invites.length > 0 && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search invites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="flex gap-2 sm:gap-3">
              <button className="flex-1 sm:flex-none items-center justify-center flex gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-600 hover:bg-gray-50 transition-all duration-200">
                <Filter size={16} />
                <span className="hidden sm:inline">Filter</span>
              </button>
              <button className="flex-1 sm:flex-none items-center justify-center flex gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-600 hover:bg-gray-50 transition-all duration-200">
                <Download size={16} />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100/80 shadow-sm min-h-75 sm:min-h-100 flex items-center justify-center overflow-hidden">
          {invites.length === 0 ? (
            <div className="text-center max-w-md py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-linear-to-br from-blue-50 to-indigo-50">
                    <Users className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
                    <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                No invites yet
              </h2>

              <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
                No one has been invited so far. Start inviting users to your
                bootcamp and track their progress.
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 sm:mt-6 inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium text-xs sm:text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <Plus size={18} />
                Send First Invite
              </button>
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left min-w-150">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="py-3 sm:py-4 px-3 sm:px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="py-3 sm:py-4 px-3 sm:px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Name
                    </th>
                    <th className="py-3 sm:py-4 px-3 sm:px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-3 sm:py-4 px-3 sm:px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Invited At
                    </th>
                    <th className="py-3 sm:py-4 px-3 sm:px-6 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {filteredInvites.map((invite, index) => (
                    <tr
                      key={invite.id}
                      className="hover:bg-gray-50/50 transition-colors duration-150 group"
                    >
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-linear-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 text-[10px] sm:text-xs font-semibold shrink-0">
                            {invite.email.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-gray-800 truncate max-w-25 sm:max-w-37.5">
                            {invite.email}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm text-gray-600 hidden sm:table-cell">
                        {invite.name || "—"}
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <span
                          className={`inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                            invite.status === "Accepted"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                          }`}
                        >
                          {invite.status === "Accepted" ? (
                            <CheckCircle
                              size={12}
                              className="hidden sm:inline"
                            />
                          ) : (
                            <Clock size={12} className="hidden sm:inline" />
                          )}
                          {invite.status}
                        </span>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm text-gray-500 hidden md:table-cell">
                        {invite.invitedAt || "2 days ago"}
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 text-right">
                        <button className="text-gray-400 hover:text-blue-600 transition-colors duration-200 opacity-100 sm:opacity-0 group-hover:sm:opacity-100">
                          <Mail size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-3 sm:px-6 py-3 sm:py-4 border-t border-gray-100 bg-gray-50/30">
                <p className="text-xs text-gray-500">
                  Showing {filteredInvites.length} of {invites.length} invites
                </p>
                <div className="flex gap-2">
                  <button className="px-2 sm:px-3 py-1 text-xs text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                    Previous
                  </button>
                  <button className="px-2 sm:px-3 py-1 text-xs text-white bg-linear-to-r from-blue-500 to-indigo-600 rounded-lg shadow-sm shadow-blue-500/20">
                    1
                  </button>
                  <button className="px-2 sm:px-3 py-1 text-xs text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {isModalOpen && (
          <InviteModal
            onClose={() => setIsModalOpen(false)}
            onInvite={handleInvite}
          />
        )}
      </div>
    </div>
  );
}
