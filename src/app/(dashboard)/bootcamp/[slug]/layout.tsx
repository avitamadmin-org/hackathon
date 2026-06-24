"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

import {
  Archive,
  Award,
  Calendar,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Contact,
  Database,
  Eye,
  FileEdit,
  FileText,
  FileText as FileTextIcon,
  FileUp,
  FolderOpen,
  Globe,
  GraduationCap,
  Grid3X3,
  HelpCircle,
  History,
  Layers,
  LayoutDashboard,
  MailPlus,
  MapPin,
  MessageSquare,
  MessageSquareCode,
  Scale,
  Settings,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Trophy,
  UserPlus,
  Users,
  Users as TeamSizeIcon,
  UsersRound,
} from "lucide-react";

interface SidebarSubChild {
  label: string;
  icon: any;
  path: string;
}

interface SidebarChild {
  label: string;
  icon: any;
  path?: string;
  children?: SidebarSubChild[];
}

interface SidebarItem {
  label: string;
  icon: any;
  path?: string;
  children?: SidebarChild[];
}

const sidebarItems: SidebarItem[] = [
  {
    label: "Manage Bootcamp",
    icon: LayoutDashboard,
    path: "manage/overview",
    children: [
      { label: "Overview", icon: Eye, path: "manage/overview" },
      { label: "Invites", icon: UserPlus, path: "manage/invites" },
      { label: "Participants", icon: Users, path: "manage/participants" },
      { label: "Teams", icon: UsersRound, path: "manage/teams" },
      { label: "Submissions", icon: FileText, path: "manage/submissions" },
      {
        label: "Assessments",
        icon: ClipboardCheck,
        path: "manage/assessments",
      },
      {
        label: "Mentoring",
        icon: GraduationCap,
        children: [
          {
            label: "Evaluation",
            icon: ClipboardCheck,
            path: "manage/mentoring/evaluation",
          },
          { label: "Mentors", icon: Users, path: "manage/mentoring/mentors" },
          {
            label: "Sessions",
            icon: History,
            path: "manage/mentoring/sessions",
          },
          {
            label: "Evaluation Criteria",
            icon: Award,
            path: "manage/mentoring/evaluation-criteria",
          },
          {
            label: "Evaluation Schedule",
            icon: Calendar,
            path: "manage/mentoring/evaluation_schedule",
          },
        ],
      },
      {
        label: "Prizes & Winners",
        icon: Award,
        path: "manage/priceandwinning",
      },
    ],
  },
  {
    label: "Edit Bootcamp",
    icon: FileEdit,
    path: "editbootcamp/timeline",
    children: [
      { label: "Timeline", icon: Calendar, path: "editbootcamp/timeline" },
      { label: "Location", icon: MapPin, path: "editbootcamp/location" },
      { label: "Prizes", icon: Trophy, path: "editbootcamp/prizes" },
      {
        label: "Discussion Forum",
        icon: MessageSquareCode,
        path: "editbootcamp/discussionform",
      },
      { label: "Rules", icon: Scale, path: "editbootcamp/rules" },
      { label: "FAQs", icon: HelpCircle, path: "editbootcamp/faqs" },
      {
        label: "Terms & Conditions",
        icon: ShieldAlert,
        path: "editbootcamp/termsconditions",
      },
      {
        label: "Resource Center",
        icon: FolderOpen,
        path: "editbootcamp/resourcecenter",
      },
      { label: "Custom Tabs", icon: Grid3X3, path: "editbootcamp/customtabs" },
      {
        label: "Tab Settings",
        icon: SlidersHorizontal,
        path: "editbootcamp/tabsettings",
      },
      {
        label: "Basic Info",
        icon: FileTextIcon,
        children: [
          {
            label: "Phases",
            icon: Layers,
            path: "editbootcamp/basicinfo/phases",
          },
          {
            label: "Description",
            icon: FileTextIcon,
            path: "editbootcamp/basicinfo/description",
          },
          {
            label: "Team Size",
            icon: TeamSizeIcon,
            path: "editbootcamp/basicinfo/teamsize",
          },
          {
            label: "Registration",
            icon: Database,
            path: "editbootcamp/basicinfo/registration",
          },
          {
            label: "Subdomain",
            icon: Globe,
            path: "editbootcamp/basicinfo/subdomain",
          },
        ],
      },
    ],
  },
  {
    label: "Settings",
    path: "settings/participantinfo",
    icon: Settings,
    children: [
      { label: "Participant Info", icon: Contact, path: "settings/participantinfo" },
      { label: "Submission", icon: FileUp, path: "settings/submission" },
      { label: "Admins", icon: ShieldCheck, path: "settings/admins" },
    ],
  },
  {
    label: "Communications",
    icon: MessageSquare,
    path: "communications/composemail",
    children: [
      { label: "Compose Mail", icon: MailPlus, path: "communications/composemail" },
      { label: "Email Status", icon: History, path: "communications/emailstatus"},
      { label: "Registration Confirmation", icon: ClipboardCheck, path: "communications/registrationconfirmation" },
    ],
  },
];

export default function BootcampSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const mentoringMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    sidebarItems.forEach((parent) => {
      parent.children?.forEach((child) => {
        if (
          child.children?.some((subChild) => pathname.includes(subChild.path))
        ) {
          setActiveParentMenu(parent.label);
        }
      });
    });
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mentoringMenuRef.current &&
        !mentoringMenuRef.current.contains(event.target as Node)
      ) {
        setActiveSubMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const params = useParams();
  const bootcampSlug = params.slug;
  const [isPublished, setIsPublished] = useState(true);
  const [activeParentMenu, setActiveParentMenu] = useState<string | null>(
    "Manage Bootcamp",
  );
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  const toggleSubMenu = (label: string) => {
    setActiveSubMenu((prev) => (prev === label ? null : label));
  };

  const toggleParentMenu = (label: string) => {
    setActiveSubMenu(null);

    setActiveParentMenu((prev) => (prev === label ? null : label));
  };
  const handleNormalMenuClick = () => {
    setActiveSubMenu(null);
  };
  return (
    <div className="">
      <div className=" p-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-4xl font-semibold text-gray-900">
            Java Costco Training 2026
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-900"
          >
            <Eye size={16} />
            Preview
          </button>

          <button
            type="button"
            onClick={() => setIsPublished(!isPublished)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium shadow-sm transition-all ${
              isPublished
                ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100/80"
                : "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100/80"
            }`}
          >
            {isPublished ? (
              <>
                <Globe size={16} />
                Published
              </>
            ) : (
              <>
                <Archive size={16} />
                Unpublished
              </>
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col min-h-screen bg-slate-50 p-2 gap-4">
        {/* Navigation Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-visible">
          {" "}
          {/* Top Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1 md:p-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const active = activeParentMenu === item.label;

              return (
                <Link
                  key={item.label}
                  href={`/bootcamp/${bootcampSlug}/${item.path}`}
                  onClick={() => {
                    setActiveParentMenu(item.label);
                    setActiveSubMenu(null);
                  }}
                  className={`
    flex items-center gap-2
    px-2 md:px-5 py-2.5
    rounded-xl
    font-medium
    transition-all duration-300 ease-out
    hover:-translate-y-0.5
    hover:shadow-md
    ${
      active
        ? "bg-linear-to-r from-slate-900 to-slate-700 text-white shadow-lg"
        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
    }
  `}
                >
                  <Icon size={16} />
                  <span className="text-xs md:text-sm">{item.label}</span>

                  {item.children &&
                    (active ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    ))}
                </Link>
              );
            })}
          </div>
          {/* Animated Dropdown */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              activeParentMenu ? "opacity-100" : "opacity-0"
            }`}
          >
            {activeParentMenu && (
              <div className="border-t border-slate-200 p-4 bg-slate-50/50">
                <div className="flex flex-wrap gap-2">
                  {sidebarItems
                    .find((x) => x.label === activeParentMenu)
                    ?.children?.map((child) => {
                      const ChildIcon = child.icon;

                      // Nested Menu (Mentoring)
                      if (child.children?.length) {
                        const expanded = activeSubMenu === child.label;

                        const isParentActive =
                          child.children?.some((subChild) =>
                            pathname.includes(subChild.path),
                          ) || false;
                        return (
                          <div
                            key={child.label}
                            className="relative"
                            ref={
                              child.label === "Mentoring"
                                ? mentoringMenuRef
                                : undefined
                            }
                          >
                            <button
                              onClick={() => toggleSubMenu(child.label)}
                              className={`
    flex items-center gap-2
    px-3 py-2.5
    rounded-xl
    text-sm
    transition-all
    ${
      expanded || isParentActive
        ? "bg-black text-white shadow-md"
        : "bg-white border border-slate-200 text-slate-700"
    }
  `}
                            >
                              <ChildIcon size={14} />

                              {child.label}

                              {expanded ? (
                                <ChevronDown size={14} />
                              ) : (
                                <ChevronRight size={14} />
                              )}
                            </button>

                            {expanded && (
                              <div className="absolute top-full left-0 mt-2 z-50 min-w-65 bg-white border border-slate-200 rounded-xl shadow-xl p-2">
                                <div className="flex flex-col gap-1">
                                  {child.children.map((subChild) => {
                                    const SubIcon = subChild.icon;

                                    const href = `/bootcamp/${bootcampSlug}/${subChild.path}`;

                                    const active =
                                      pathname ===
                                      `/bootcamp/${bootcampSlug}/${subChild.path}`;

                                    return (
                                      <Link
                                        key={subChild.label}
                                        href={href}
                                        onClick={() => setActiveSubMenu(null)}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                                          active
                                            ? "bg-black text-white"
                                            : "hover:bg-slate-100 text-slate-700"
                                        }`}
                                      >
                                        <SubIcon size={14} />
                                        {subChild.label}
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      }

                      // Normal Menu Item
                      const href = child.path
                        ? `/bootcamp/${bootcampSlug}/${child.path}`
                        : `/bootcamp`;

                      const active = pathname === href;
                      return (
                        <Link
                          key={child.label}
                          onClick={handleNormalMenuClick}
                          href={href}
                          className={`
          relative flex items-center gap-2
          px-2 md:px-4 py-2 md:py-2.5
          rounded-xl
          text-xs md:text-sm
          transition-all duration-300 ease-out
          hover:-translate-y-0.5
          hover:shadow-md
          ${
            active
              ? "bg-black text-white shadow-md"
              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
          }
        `}
                        >
                          {/* {active && (
                            <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-blue-500" />
                          )} */}

                          <ChildIcon size={14} />
                          {child.label}
                        </Link>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          key={pathname}
          className="
      
   
    "
        >
          {children}
        </div>
      </div>
    </div>
  );
}
