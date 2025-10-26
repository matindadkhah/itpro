import React, { useState } from "react";
import {
  ChevronDownIcon, ChevronUpIcon, Bars3Icon, ArchiveBoxIcon,
  BellAlertIcon,
  ChartBarIcon,
  WrenchIcon,
  BookOpenIcon,
  GlobeAltIcon,
  BellIcon,
  XMarkIcon,
  UserIcon,
  WrenchScrewdriverIcon,
  ArrowRightStartOnRectangleIcon
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { icon } from "leaflet";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState(false);


  const notifications = [
    "اعلان اول",
    "اعلان دوم",
    "اعلان سوم",
  ];

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


  const profileOptions = [
    { title: "پروفایل من", path: "/profile", icon: <UserIcon className="size-5 text-red-600" /> },
    { title: "تنظیمات", path: "/settings", icon:  <WrenchScrewdriverIcon className="size-5 text-red-600" /> },
    { title: "خروج", path: "/logout", icon: <ArrowRightStartOnRectangleIcon className="size-5 text-red-600" /> },
  ];
  const toggleSubmenu = (title) => { setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] })); };

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between bg-gradient-to-r from-[#FF4B4B] via-[#FF6F61] to-[#FF914D] text-white px-10 pl-10 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="md:hidden p-1 rounded hover:bg-white/20 transition"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-semibold">سامانه جامع آماری IT</h2>
        </div>
        <div className="flex items-center gap-4 relative">
          {/* Profile Dropdown */}
          <div className="relative inline-flex">
            <button
              type="button"
              onClick={() => {
                setProfileOpen((p) => !p);
                setNotificationsOpen(false);
              }}
              className="py-1 ps-1 pe-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 transition"
              aria-haspopup="menu"
              aria-expanded={profileOpen ? "true" : "false"}
            >
              <img
                className="w-8 h-auto rounded-full"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                alt="Avatar"
              />
              <span className="text-gray-600 font-medium truncate max-w-30">
                متین دادخواه تهرانی
              </span>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""
                  }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {profileOpen && (
              <div className="absolute top-full right-0 mt-2 min-w-48 bg-white shadow-md rounded-lg border border-gray-200 z-20 overflow-hidden transition-opacity">
                {profileOptions.map((opt, i) => (
                  <Link
                    key={i}
                    to={opt.path}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-x-3.5 py-2 px-3  text-sm text-gray-800 hover:bg-red-50 transition"
                  >
                    {opt.icon}
                    {opt.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen((p) => !p);
                setProfileOpen(false);
              }}
              className="relative rounded-full p-1 hover:bg-white/20 transition"
            >
              <BellIcon className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 text-xs bg-blue-300 text-white rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>

            {notificationsOpen && (
              <div className="absolute top-full -right-28 mt-2 w-44 max-h-72 bg-white rounded-lg shadow-lg border border-gray-200 z-20 overflow-y-auto transition-opacity">
                {notifications.map((n, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 cursor-pointer transition"
                  >
                    <BellIcon className="w-4 h-4 text-gray-400" />
                    {n}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          ></div>
          <aside className="fixed top-0 right-0 z-50 h-full bg-white border-l border-gray-200 w-64 transition-transform duration-300">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 gap-2">
              <h1 className="text-sm font-bold text-red-600">سازمان آتش نشانی و خدمات ایمنی شهرداری اصفهان</h1>
              <button onClick={() => setMobileOpen(false)}>
                <XMarkIcon className="w-6 h-6 text-red-600" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
              {menuItems.map((item) => (
                <div key={item.title}>
                  <div
                    onClick={() => toggleSubmenu(item.title)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-red-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 text-gray-700">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    {openMenus[item.title] ? (
                      <ChevronUpIcon className="w-4 h-4" />
                    ) : (
                      <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </div>
                  {openMenus[item.title] && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.submenus.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          onClick={() => setMobileOpen(false)}
                          className="block text-sm text-gray-600 px-3 py-1 hover:text-red-600"
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </aside>
        </>
      )}
    </>
  );
};

export default Header;
