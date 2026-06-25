"use client";

import {
  TrendingUp,
  TrendingDown,
  Users,
  Users2,
  FileCheck,
  Clock,
  ArrowUpRight,
  Calendar,
  BarChart3,
} from "lucide-react";
import { useState, useEffect } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  action: string;
  showTrend?: boolean;
  trendValue?: string;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
}

function StatCard({
  title,
  value,
  action,
  showTrend = true,
  trendValue = "+12%",
  icon,
  color,
  subtitle,
}: StatCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative bg-white rounded-2xl p-6 min-h-45 flex flex-col justify-between transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-1 border border-gray-100/80 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-all duration-300"
        style={{
          background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          opacity: isHovered ? 1 : 0.7,
        }}
      />

      <div
        className="absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-5 transition-all duration-500"
        style={{
          background: color,
          transform: isHovered ? "scale(1.2)" : "scale(1)",
        }}
      />

      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl transition-all duration-300"
              style={{
                background: `${color}15`,
                color: color,
                transform: isHovered ? "scale(1.05) rotate(-3deg)" : "scale(1)",
              }}
            >
              {icon}
            </div>
            <h4 className="text-gray-500 text-sm font-medium tracking-wide">
              {title}
            </h4>
          </div>

          {showTrend && (
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                trendValue.startsWith("+")
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-rose-50 text-rose-600"
              }`}
            >
              {trendValue.startsWith("+") ? (
                <TrendingUp
                  size={14}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <TrendingDown
                  size={14}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              )}
              {trendValue}
            </div>
          )}
        </div>

        <h2 className="text-4xl font-bold tracking-tight text-gray-900 mt-1">
          {value}
          {subtitle && (
            <span className="text-sm font-normal text-gray-400 ml-2">
              {subtitle}
            </span>
          )}
        </h2>

        {title === "Registrations" && (
          <div className="mt-3 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: "78%",
                background: `linear-gradient(90deg, ${color}, ${color}dd)`,
              }}
            />
          </div>
        )}
      </div>

      <button
        className="flex items-center gap-2 text-gray-400 hover:text-gray-700 text-sm font-medium transition-all duration-300 group-hover:gap-3 w-fit"
        style={{ color: isHovered ? color : undefined }}
      >
        {action}
        <ArrowUpRight
          size={16}
          className={`transition-all duration-300 ${
            isHovered ? "translate-x-0.5 -translate-y-0.5" : ""
          }`}
        />
      </button>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50/80 rounded-xl border border-gray-100/60 hover:bg-gray-100/60 transition-all duration-300 hover:shadow-md">
      <div className="p-2 bg-white rounded-lg shadow-sm">{icon}</div>
      <div>
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        <p className="text-sm font-semibold text-gray-700">{value}</p>
      </div>
    </div>
  );
}

export default function BootcampOverviewPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="p-2 sm:p-4 min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50/80">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-2">
              <div className="p-2.5 bg-linear-to-r from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl flex-shrink-0">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                Bootcamp Overview
              </h1>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm ml-12 sm:ml-15">
              Manage your bootcamp overview, including title, description,
              dates, and other key details.
            </p>
          </div>

          <div
            className={`flex flex-wrap items-center gap-2 sm:gap-3 transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <MetricCard
              label="Active"
              value="3 months"
              icon={<Calendar className="w-4 h-4 text-indigo-500" />}
            />
            <MetricCard
              label="Status"
              value="Live"
              icon={<Users className="w-4 h-4 text-emerald-500" />}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-10">
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <StatCard
              title="Registrations"
              value={33}
              subtitle="students"
              action="View report"
              trendValue="+12%"
              icon={<Users className="w-5 h-5" />}
              color="#6366F1"
            />
          </div>

          <div
            className={`transition-all duration-700 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <StatCard
              title="Teams"
              value={6}
              subtitle="active"
              action="View report"
              trendValue="+8%"
              icon={<Users2 className="w-5 h-5" />}
              color="#8B5CF6"
            />
          </div>

          <div
            className={`transition-all duration-700 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <StatCard
              title="Submissions"
              value={66}
              subtitle="total"
              action="View report"
              trendValue="-3%"
              icon={<FileCheck className="w-5 h-5" />}
              color="#EC4899"
            />
          </div>

          <div
            className={`transition-all duration-700 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <StatCard
              title="Duration"
              value="83 days"
              subtitle="9 hrs"
              action="Edit schedule"
              showTrend={false}
              icon={<Clock className="w-5 h-5" />}
              color="#14B8A6"
            />
          </div>
        </div>
       

        <div className="mt-6 text-center text-xs text-gray-400">
          <p>All metrics are updated in real-time</p>
        </div>
      </div>
    </div>
  );
}