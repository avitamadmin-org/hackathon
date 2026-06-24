import {
  Users,
  UserPlus,
  Trophy,
  ClipboardCheck,
  Calendar,
  Activity,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Participants",
      value: "1,248",
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Teams",
      value: "148",
      icon: UserPlus,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Submissions",
      value: "324",
      icon: ClipboardCheck,
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Winners",
      value: "12",
      icon: Trophy,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Bootcamp Dashboard
        </h1>

        <p className="text-slate-500 mt-1">
          Monitor participants, submissions and bootcamp progress.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{item.title}</p>

                  <h2 className="text-3xl font-bold mt-2 text-slate-900">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`h-12 w-12 rounded-xl flex items-center justify-center ${item.color}`}
                >
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Activity */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Activity size={18} />
              Recent Activity
            </h3>
          </div>

          <div className="p-5 space-y-4">
            {[
              "John submitted Project Alpha",
              "New participant registered",
              "Team Delta completed evaluation",
              "Mentor assigned to Team Sigma",
              "Submission approved",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 pb-3 border-b border-slate-100 last:border-none"
              >
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />

                <div>
                  <p className="text-sm text-slate-700">{item}</p>
                  <p className="text-xs text-slate-400">{index + 1} hour ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Calendar size={18} />
              Upcoming Events
            </h3>
          </div>

          <div className="p-5 space-y-4">
            {[
              {
                title: "Mentoring Session",
                date: "20 Jun 2026",
              },
              {
                title: "Project Submission",
                date: "25 Jun 2026",
              },
              {
                title: "Final Evaluation",
                date: "30 Jun 2026",
              },
            ].map((event, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-3">
                <h4 className="font-medium text-slate-800">{event.title}</h4>

                <p className="text-sm text-slate-500 mt-1">{event.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
        <div className="flex justify-between mb-3">
          <h3 className="font-semibold text-lg">Bootcamp Progress</h3>
          <span className="font-bold text-emerald-600">72%</span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-4">
          <div className="bg-emerald-500 h-4 rounded-full w-[72%]" />
        </div>

        <p className="text-sm text-slate-500 mt-3">
          72% of the bootcamp milestones have been completed.
        </p>
      </div>
    </div>
  );
}
