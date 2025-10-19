import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TagIcon, ArrowPathIcon, XMarkIcon, EyeIcon } from "@heroicons/react/24/outline";
import DatePicker, { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import jalaali from "jalaali-js";

// -------------------- Hook ثبت تغییرات --------------------
function useChangeLogger(data) {
  const prevDataRef = useRef([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const prevData = prevDataRef.current;
    const newLogs = [];

    // اضافه شدن یا تغییرات
    data.forEach((item) => {
      const oldItem = prevData.find((p) => p.id === item.id);
      if (!oldItem) {
        newLogs.push({
          id: Date.now() + Math.random(),
          type: "اضافه شد",
          item,
          timestamp: new Date(),
        });
      } else {
        const diffs = [];
        Object.keys(item).forEach((key) => {
          if (item[key] !== oldItem[key]) {
            diffs.push(`${key}: "${oldItem[key]}" → "${item[key]}"`);
          }
        });
        if (diffs.length > 0) {
          newLogs.push({
            id: Date.now() + Math.random(),
            type: "ویرایش شد",
            item,
            changes: diffs,
            timestamp: new Date(),
          });
        }
      }
    });

    // حذف شدن
    prevData.forEach((oldItem) => {
      if (!data.find((item) => item.id === oldItem.id)) {
        newLogs.push({
          id: Date.now() + Math.random(),
          type: "حذف شد",
          item: oldItem,
          timestamp: new Date(),
        });
      }
    });

    if (newLogs.length > 0) {
      setLogs((prev) => [...newLogs, ...prev]);
    }

    prevDataRef.current = data;
  }, [data]);

  return logs;
}

// -------------------- Helper تاریخ شمسی --------------------
function formatJalaali(date) {
  const j = jalaali.toJalaali(date);
  const pad = (n) => n.toString().padStart(2, "0");
  return `${j.jy}/${pad(j.jm)}/${pad(j.jd)}`;
}

function formatRelativeDate(date) {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "امروز";
  if (date.toDateString() === yesterday.toDateString()) return "دیروز";

  const weekdays = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];
  const months = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
  const j = jalaali.toJalaali(date);
  const weekday = weekdays[date.getDay()];
  const month = months[j.jm - 1];
  return `${j.jd} ${weekday} ${month}`;
}

// -------------------- Timeline Item --------------------
function TimelineItem({ log }) {
  const getColor = (type) => {
    if (type === "اضافه شد") return "bg-green-500";
    if (type === "حذف شد") return "bg-red-500";
    return "bg-yellow-500";
  };

  return (
    <div class="flex flex-row  flex-wrap gap-x-3 gap-y-4 relative group w-full">
      {/* Left Content */}
      <div className="min-w-10 text-end">
        <span className="text-xs text-gray-500 dark:text-neutral-400">
          {new Date(log.timestamp).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })}
        </span>
        <br />
        <span className="text-xs text-gray-400">
          {formatRelativeDate(new Date(log.timestamp))}
        </span>
      </div>

      {/* Icon */}
      <div className=" relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
        <div className="relative z-10 size-7 flex justify-center items-center">
          <div className={`size-2 rounded-full ${getColor(log.type)}`}></div>
        </div>
      </div>

      {/* Right Content */}
      <div className="grow pt-0.5 pb-8">
        <h3 className="flex gap-x-1.5 font-medium text-gray-700 dark:text-white">
          {log.type === "اضافه شد" ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6 text-green-800 bg-green-100 p-1  rounded-full">
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
            : log.type === "حذف شد" ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6 text-red-800 bg-red-100 p-1  rounded-full">
              <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
            </svg>
              : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6 text-blue-800 bg-blue-100 p-1 rounded-full">
                <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
              </svg>
          }
          {log.item.name}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
          {log.item.type} | {log.item.status}
        </p>
        <button type="button" className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
          <img className="shrink-0 size-4 rounded-full" src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?auto=format&fit=facearea&facepad=3&w=320&h=320&q=80" alt={log.item.owner} />
          {log.item.owner}
        </button>
      </div>
    </div>
  );
}

// -------------------- TimelineLogger --------------------
export function TimelineLogger({ data = [] }) {
  const logs = useChangeLogger(data);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({ owner: "", type: "", date: null });
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const filteredLogs = logs.filter((log) => {
    const matchOwner = filters.owner
      ? log.item.owner.includes(filters.owner)
      : true;
    const matchType = filters.type ? log.type === filters.type : true;
    const matchDate = filters.date
      ? new Date(log.timestamp).toDateString() === filters.date.toDate().toDateString()
      : true;
    return matchOwner && matchType && matchDate;
  });

  const limitedLogs = filteredLogs.slice(0, 5);

  const logVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="p-1 sm:p-4 max-w-3xl mx-auto bg-white border border-gray-200 shadow-sm rounded-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
        <h2 class="flex items-center gap-2 font-bold text-gray-800 mb-5 text-lg">
          <TagIcon className="w-5 h-5 text-red-500" />


          تایم‌لاین تغییرات اموال</h2>

      </div>

      {/* ۵ لاگ آخر */}
      <div >
        {limitedLogs.length === 0 && (
          <p className="text-center text-gray-500 pb-5">موردی وجود ندارد</p>
        )}
        <AnimatePresence>
          {limitedLogs.map((log) => (
            <motion.div
              key={log.id}
              variants={logVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <TimelineItem log={log} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button
        className="flex items-center justify-center gap-2 px-4 py-2 font-bold text-sm rounded-lg bg-red-500 text-white 
          hover:bg-red-600 hover:shadow transition w-full"        onClick={() => setFilterModalOpen(true)}
      >
        <EyeIcon className="w-4 h-4"  />
        فیلتر / مشاهده همه
      </button>

      {/* Modal */}
      {filterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-2xl w-full max-w-5xl shadow-xl relative max-h-[90vh] overflow-hidden flex flex-col">

            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">📜 همه لاگ‌ها</h2>
              <button
                onClick={() => setFilterModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Filters */}
            <div className="p-4 flex flex-col sm:flex-row gap-3 bg-gray-50 border-b border-gray-200 rounded-b-2xl">
              {/* Owner */}
              <div className="flex flex-col w-full sm:w-1/3">
                <label className="mb-1 text-sm  text-gray-700">مالک</label>
                <input
                  type="text"
                  placeholder="مالک"
                  value={filters.owner}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, owner: e.target.value }))
                  }
                  className="border p-2 h-10 rounded-lg w-full focus:ring-2  focus:ring-red-400 focus:outline-none
"
                />
              </div>

              {/* Type */}
              <div className="flex flex-col w-full sm:w-1/3">
                <label className="mb-1 text-sm text-gray-700">نوع تغییر</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="w-full flex justify-between items-center rounded-lg border border-gray-300 
                 bg-white py-2 px-3 text-sm text-gray-700 shadow-sm 
                   focus:ring-red-400 focus:outline-none focus:ring-2 
                 focus:ring-blue-500/20 transition-all"
                  >
                    {filters.type === ""
                      ? "همه نوع‌ها"
                      : filters.type === "اضافه شد"
                        ? "ایجاد"
                        : filters.type === "ویرایش شد"
                          ? "بروزرسانی"
                          : "حذف"}
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""
                        }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute mt-2 w-full rounded-lg bg-white border border-gray-200 shadow-lg z-10 overflow-hidden">
                      <button
                        onClick={() => {
                          setFilters((prev) => ({ ...prev, type: "" }));
                          setDropdownOpen(false);
                        }}
                        class="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500">
                        همه نوع‌ها
                      </button>
                      <button
                        onClick={() => {
                          setFilters((prev) => ({ ...prev, type: "اضافه شد" }));
                          setDropdownOpen(false);
                        }}
                        class="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500">
                        ایجاد
                      </button>
                      <button
                        onClick={() => {
                          setFilters((prev) => ({ ...prev, type: "ویرایش شد" }));
                          setDropdownOpen(false);
                        }}
                        class="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500">
                        بروزرسانی
                      </button>
                      <button
                        onClick={() => {
                          setFilters((prev) => ({ ...prev, type: "حذف شد" }));
                          setDropdownOpen(false);
                        }}
                        class="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500">
                        حذف
                      </button>
                    </div>
                  )}
                </div>
              </div>



              {/* Date */}
              <div className="flex flex-col w-full sm:w-1/3">
                <label className="mb-1 text-sm  text-gray-700">تاریخ</label>
                <DatePicker
                  value={filters.date}
                  onChange={(date) =>
                    setFilters((prev) => ({ ...prev, date }))
                  }
                  calendar={persian}
                  locale={persian_fa}
                  format="YYYY/MM/DD"
                  calendarPosition="bottom-right"
                  portal
                  inputClass="border p-2 h-10 rounded-lg w-full focus:ring-2  focus:ring-red-400 focus:outline-none"
                  className="w-full"
                />
              </div>
            </div>

            {/* Logs List */}
            <div className="p-4 flex-1 overflow-y-auto">
              {filteredLogs.length === 0 ? (
                <p className="text-center text-gray-500 py-6">موردی یافت نشد</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {filteredLogs.map((log, index) => (
                    <div
                      key={log.id}
                      className={`relative p-4 rounded-xl shadow-md  hover:shadow-lg transition-shadow ${log.type === "اضافه شد"
                        ? "bg-green-50"
                        : log.type === "حذف شد"
                          ? "bg-red-50"
                          : "bg-blue-50"
                        }`}
                    >
                      {/* Mobile timeline line */}
                      <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-300 sm:hidden"></div>
                      <TimelineItem log={log} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 p-4 bg-gray-50">
              <button
                onClick={() =>
                  setFilters({ owner: "", type: "", date: null })
                }
                className="flex items-center justify-center gap-2 px-4 py-2 font-bold text-sm rounded-lg border border-red-500 text-red-500 
          hover:bg-red-50 hover:shadow transition"
              >
                <ArrowPathIcon className="w-4 h-4" />
                پاک کردن فیلترها
              </button>
              <button
                onClick={() => setFilterModalOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2 font-bold text-sm rounded-lg bg-red-500 text-white 
          hover:bg-red-600 hover:shadow transition"
              >
                <XMarkIcon className="w-4 h-4" />
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}



