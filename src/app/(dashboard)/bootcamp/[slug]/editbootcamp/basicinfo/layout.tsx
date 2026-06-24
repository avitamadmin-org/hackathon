"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import {
  Layers,
  FileText,
  Users,
  Settings,
  Globe,
} from "lucide-react";

const tabs = [
  { key: "phases", label: "Phases", icon: Layers, path: "phases" },
  {
    key: "description",
    label: "Description",
    icon: FileText,
    path: "description",
  },
  { key: "teamsize", label: "Team Size", icon: Users, path: "teamsize" },
  {
    key: "registration",
    label: "Registration",
    icon: Settings,
    path: "registration",
  },
  { key: "subdomain", label: "Subdomain", icon: Globe, path: "subdomain" },
];

export default function BasicInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const params = useParams();
  const slug = params.slug as string | undefined;
  const basePath = slug
    ? `/bootcamp/${slug}/editbootcamp/basicinfo`
    : "/bootcamp/editbootcamp/basicinfo";

  return (
    <div className="min-h-screen bg-slate-50/50 p-2 space-y-6">


      {/* Tabs Navigation Bar */}
      <div className="max-w-2xl mx-auto justify-center items-center flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-slate-100/80 p-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const href = `${basePath}/${tab.path}`;
          const active = pathname === href;

          return (
            <Link
              key={tab.key}
              href={href}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                active
                  ? "border-slate-200 bg-white text-slate-900 shadow-sm"
                  : "border-transparent text-slate-500 hover:bg-slate-200/50 hover:text-slate-900"
              }`}
            >
              <Icon size={14} className={active ? "text-slate-900" : "text-slate-400"} />
              <span>{tab.label}</span>
              {tab.key === "phases" && (
                <span className="text-slate-400 font-normal">5</span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Tab Child Content */}
      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}

