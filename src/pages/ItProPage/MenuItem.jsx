// Sidebar.jsx
import React, { useState } from "react";
import {
  ArchiveBoxIcon,
  BellAlertIcon,
  ChartBarIcon,
  WrenchIcon,
  BookOpenIcon,
  GlobeAltIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const menuItems = [
  {
    title: "آمار اموال",
    icon: <ArchiveBoxIcon className="w-5 h-5" />,
    path: "/property",
    submenus: [
      { title: "لیست اموال", path: "/property/list" },
      { title: "گزارش‌گیری", path: "/property/report" },
    ],
  },
  {
    title: "هشدارها و ایمیل",
    icon: <BellAlertIcon className="w-5 h-5" />,
    path: "/alerts",
    submenus: [
      { title: "تعریف هشدار جدید", path: "/alerts/new" },
      { title: "لیست هشدارهای ارسال‌شده", path: "/alerts/list" },
    ],
  },
  {
    title: "پایش لحظه‌ای",
    icon: <ChartBarIcon className="w-5 h-5" />,
    path: "/monitoring",
    submenus: [
      { title: "وضعیت کلی", path: "/monitoring/overview" },
      { title: "گزارش روزانه", path: "/monitoring/daily" },
      { title: "نمودار زمانی", path: "/monitoring/chart" },
    ],
  },
  {
    title: "تعمیرات",
    icon: <WrenchIcon className="w-5 h-5" />,
    path: "/repairs",
    submenus: [
      { title: "دستگاه‌های تحویل شده", path: "/repairs/delivered" },
      { title: "در حال تعمیر", path: "/repairs/repairing" },
      { title: "تحویل گرفته شده", path: "/repairs/repairinglist" },
    ],
  },
  {
    title: "آموزش",
    icon: <BookOpenIcon className="w-5 h-5" />,
    path: "/training",
    submenus: [
      { title: "لیست فایل‌ها", path: "/training/list" },
      { title: "بارگذاری فایل جدید", path: "/training/upload" },
    ],
  },
  {
    title: "وضعیت شبکه",
    icon: <GlobeAltIcon className="w-5 h-5" />,
    path: "/network-status",
    submenus: [
      { title: "پینگ سرورها", path: "/network-status/servers" },
      { title: "پینگ گیت‌وی‌ها", path: "/network-status/gateways" },
      { title: "تنظیمات چک زمان‌بندی", path: "/network-status/settings" },
    ],
  },
];

export default function MenuItems() {
  const [openMenus, setOpenMenus] = useState({});
  const [collapsed, setCollapsed] = useState(false);

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
    // زیرمنوها رو ببند وقتی جمع شد
    if (!collapsed) setOpenMenus({});
  };

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } h-screen bg-white border-r border-gray-200 flex flex-col transition-width duration-300`}
    >
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200">
        {!collapsed && <img src="\FireStationLogo.jpg" className="text-lg max-w-14 max-h-14 font-bold"/>}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded hover:bg-gray-100 focus:outline-none"
        >
          {collapsed ? (
            <ChevronDoubleRightIcon className="w-5 h-5" />
          ) : (
            <ChevronDoubleLeftIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.title}>
              <button
                onClick={() => toggleMenu(item.title)}
                className="flex items-center w-full justify-between py-2 px-2.5 text-gray-800 rounded-lg hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {!collapsed && <span>{item.title}</span>}
                </div>
                {!collapsed &&
                  item.submenus &&
                  item.submenus.length > 0 &&
                  (openMenus[item.title] ? (
                    <ChevronUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                  ))}
              </button>

              {!collapsed && item.submenus && openMenus[item.title] && (
                <ul className="pl-10 mt-1 space-y-1">
                  {item.submenus.map((sub) => (
                    <li key={sub.title}>
                      <Link
                        to={sub.path}
                        className="block py-1 px-2 text-gray-700 rounded hover:bg-gray-200"
                      >
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
