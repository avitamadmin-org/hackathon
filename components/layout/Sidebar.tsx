"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Drawer from "@mui/material/Drawer";

import {
  MdDashboard,
  MdGroups,
  MdSchool,
  MdAssessment,
  MdMenu,
  MdOutlineSupportAgent,
} from "react-icons/md";

import { FaUsers, FaUserCircle } from "react-icons/fa";

import { RiRocketLine } from "react-icons/ri";

import { HiOutlineDocumentReport } from "react-icons/hi";

import {
  TbLayoutSidebarRightCollapseFilled,
  TbLayoutSidebarLeftCollapseFilled,
} from "react-icons/tb";

import { IoChevronUp, IoChevronDown } from "react-icons/io5";

const menuItems = [
  {
    title: "Dashboard",
    icon: <MdDashboard size={22} />,
    href: "/dashboard",
  },
  {
    title: "Bootcamps",
    icon: <MdSchool size={22} />,
    href: "/bootcamp",
  },
  {
    title: "Teams",
    icon: <MdGroups size={22} />,
    href: "/teams",
  },
  {
    title: "Students",
    icon: <FaUsers size={20} />,
    href: "/students",
  },
  {
    title: "Sprints",
    icon: <RiRocketLine size={20} />,
    href: "/sprints",
  },
  {
    title: "Evaluations",
    icon: <MdAssessment size={22} />,
    href: "/evaluations",
  },
  {
    title: "Reports",
    icon: <HiOutlineDocumentReport size={22} />,
    href: "/reports",
  },
  {
    title: "Support",
    icon: <MdOutlineSupportAgent size={22} />,
    href: "/support",
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800">
        {!collapsed && (
          <h1 className="text-xl font-bold tracking-wide">HackSprint</h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:block"
        >
          {collapsed ? (
            <TbLayoutSidebarRightCollapseFilled size={22} />
          ) : (
            <TbLayoutSidebarLeftCollapseFilled size={22} />
          )}
        </button>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto py-3">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.title}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`mx-2 mb-1 flex items-center gap-4 rounded-lg px-4 py-3 transition-all
                ${
                  isActive
                    ? "bg-white text-black font-medium"
                    : "hover:bg-zinc-900"
                }
              `}
            >
              {item.icon}

              {!collapsed && <span className="text-sm">{item.title}</span>}
            </Link>
          );
        })}
      </div>

      {/* User Section */}
      <div className="border-t bottom-0 border-slate-800">
        <button
          onClick={() => setShowUserInfo(!showUserInfo)}
          className="w-full flex items-center justify-between p-4 hover:bg-zinc-900 transition"
        >
          <div className="flex items-center gap-3">
            <FaUserCircle size={30} />

            {!collapsed && (
              <div className="text-left">
                <p className="text-sm font-medium">John Doe</p>

                <p className="text-xs text-gray-400">john@example.com</p>
              </div>
            )}
          </div>

          {!collapsed && (showUserInfo ? <IoChevronUp /> : <IoChevronDown />)}
        </button>

        {!collapsed && showUserInfo && (
          <div className="px-4 pb-4">
            <div className="space-y-3 text-sm">
              <p className="text-gray-400">Role: Admin</p>

              <Link href="/profile" className="block hover:text-blue-400">
                My Profile
              </Link>

              <Link href="/settings" className="block hover:text-blue-400">
                Settings
              </Link>

              <button
                onClick={() => router.push("/login")}
                className="text-white text-sm font-semibold w-full bg-red-400 p-1.5 rounded-md hover:bg-red-500  transition-all duration-200
    cursor-pointer ease-in-out"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-black text-white flex items-center px-4 z-50 shadow-md">
        <button onClick={() => setMobileOpen(true)}>
          <MdMenu size={24} />
        </button>

        <h1 className="ml-4 font-bold text-lg">HackSprint</h1>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex h-screen bg-[#0B1220] text-white flex-col transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}
        `}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 280,
              backgroundColor: "#000",
              color: "#fff",
            },
          },
        }}
      >
        <div className="h-full flex flex-col">
          <SidebarContent />
        </div>
      </Drawer>
    </>
  );
}
