import React, { useState } from "react";
import {
  ChevronDownIcon, ChevronUpIcon, Bars3Icon, ArchiveBoxIcon,
  BellAlertIcon,
  ChartBarIcon,
  WrenchIcon,
  BookOpenIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState({});
  const location = useLocation();

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


  const toggleSubmenu = (title) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside
      className={`hidden md:flex flex-col bg-white transition-all duration-300 ${isOpen ? "w-64" : "w-20"
        }`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        {isOpen && <h1 className="text-sm font-bold text-red-600">سازمان آتش نشانی و خدمات ایمنی شهرداری اصفهان</h1>}
        <button
          onClick={() => setIsOpen((p) => !p)}
          className="p-1 rounded hover:bg-red-100 transition"
        >
          <Bars3Icon className="w-6 h-6 text-red-600" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <div key={item.title}>
              <div
                onClick={() => toggleSubmenu(item.title)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-red-50 ${isActive ? "bg-red-100 text-red-700" : "text-gray-700"
                  }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {isOpen && <span>{item.title}</span>}
                </div>
                {isOpen &&
                  (openMenus[item.title] ? (
                    <ChevronUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                  ))}
              </div>
              {openMenus[item.title] && isOpen && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.submenus.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      className={`block text-sm px-3 py-1 rounded-md hover:bg-red-50 ${location.pathname === sub.path
                        ? "text-red-600 font-semibold"
                        : "text-gray-600"
                        }`}
                    >
                      {sub.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
