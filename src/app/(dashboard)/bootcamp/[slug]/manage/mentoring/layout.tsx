"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import {
  ClipboardCheck,
  UserRound,
  CalendarDays,
  Trophy,
  History,
} from "lucide-react";

const tabs = [
  {
    key: "evaluation",
    label: "Evaluation",
    icon: ClipboardCheck,
    path: "evaluation",
  },
  { key: "mentors", label: "Mentors", icon: UserRound, path: "mentors" },
  { key: "sessions", label: "Sessions", icon: CalendarDays, path: "sessions" },
  {
    key: "criteria",
    label: "Evaluation Criteria",
    icon: Trophy,
    path: "evaluation-criteria",
  },
  {
    key: "schedule",
    label: "Evaluation Schedule",
    icon: History,
    path: "evaluation_schedule",
  },
];

export default function MentoringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const params = useParams();
  const slug = params.slug as string | undefined;
  const basePath = slug
    ? `/bootcamp/${slug}/manage/mentoring`
    : "/bootcamp/manage/mentoring";

  return (
    <div className="min-h-screen overflow-y-auto bg-[#fafafa]">
      {/* <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-semibold text-gray-900">Java Costco Training 2026</h1>
          <PencilLine size={18} className="text-gray-400" />
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Eye size={16} />
            Preview
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100/80">
            <Globe size={16} />
            Published
          </button>
        </div>
      </div> */}

      <div className="mb-6 flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const href = `${basePath}/${tab.path}`;
          const active = pathname === href;

          return (
            <Link
              key={tab.key}
              href={href}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                active
                  ? "border-gray-300 bg-white text-gray-900 text-xs shadow-sm"
                  : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={15} />
              {tab.label}
            </Link>
          );
        })}
      </div>

      <div className=" overflow-y-auto rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
        {children}
      </div>
    </div>
  );
}
