import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import jalaali from "jalaali-js";

// -------------------- Hook ثبت تغییرات لحظه‌ای --------------------
function useChangeLogger(data) {
  const [logs, setLogs] = useState([]);
  const prevDataRef = useRef(data || []);

  useEffect(() => {
    const prevData = prevDataRef.current;

    const added = data.filter(d => !prevData.some(p => p.id === d.id));
    const removed = prevData.filter(p => !data.some(d => d.id === p.id));
    const updated = data.filter(d => {
      const prevItem = prevData.find(p => p.id === d.id);
      return prevItem && (
        prevItem.name !== d.name ||
        prevItem.status !== d.status ||
        prevItem.owner !== d.owner
      );
    });

    if (added.length || removed.length || updated.length) {
      const now = new Date();
      const newLogs = [
        ...added.map(item => ({ type: "Added", item, createdAt: now })),
        ...removed.map(item => ({ type: "Removed", item, createdAt: now })),
        ...updated.map(item => ({ type: "Updated", item, createdAt: now }))
      ];
      setLogs(prev => [...prev, ...newLogs].slice(-200)); 
    }

    prevDataRef.current = [...data];
  }, [data]);

  return logs;
}

// -------------------- Helper: تبدیل تاریخ شمسی --------------------
function formatJalaali(date) {
  const j = jalaali.toJalaali(date);
  const pad = (n) => n.toString().padStart(2, "0");
  return `${j.jy}/${pad(j.jm)}/${pad(j.jd)}`;
}

// -------------------- Timeline Item --------------------
function TimelineItem({ log }) {
  const getColor = (type) => {
    if (type === "Added") return "bg-green-500";
    if (type === "Removed") return "bg-red-500";
    return "bg-yellow-500";
  };

  return (
    <div className="flex gap-x-3 relative group">
      {/* Left Content */}
      <div className="min-w-14 text-end">
        <span className="text-xs text-gray-500 dark:text-neutral-400">
          {new Date(log.createdAt).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })}
        </span>
        <br />
        <span className="text-xs text-gray-400">
          {formatJalaali(new Date(log.createdAt))}
        </span>
      </div>

      {/* Icon */}
      <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
        <div className="relative z-10 size-7 flex justify-center items-center">
          <div className={`size-2 rounded-full ${getColor(log.type)}`}></div>
        </div>
      </div>

      {/* Right Content */}
      <div className="grow pt-0.5 pb-8 relative">
        <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
          {log.type === "Added" && "Created"}
          {log.type === "Updated" && "Updated"}
          {log.type === "Removed" && "Removed"} "{log.item.name}"
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
          وضعیت: {log.item.status}
        </p>

        {/* Tooltip */}
        <div className="absolute top-0 left-full ml-2 hidden group-hover:block bg-gray-700 text-white text-xs p-2 rounded shadow-lg z-50 w-52">
          <div>شناسه: {log.item.id}</div>
          <div>نوع: {log.type}</div>
          <div>دپارتمان: {log.item.department}</div>
          <div>تاریخ خرید: {log.item.purchaseDate}</div>
        </div>

        <button
          type="button"
          className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
        >
          <img
            className="shrink-0 size-4 rounded-full"
            src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
            alt={log.item.owner}
          />
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
  const [filters, setFilters] = useState({ owner: "", type: "", date: "" });

  // فیلتر لاگ‌ها
  const filteredLogs = logs.filter(log => {
    const matchOwner = filters.owner ? log.item.owner.includes(filters.owner) : true;
    const matchType = filters.type ? log.type === filters.type : true;
    const matchDate = filters.date ? 
      new Date(log.createdAt).toDateString() === new Date(filters.date).toDateString()
      : true;
    return matchOwner && matchType && matchDate;
  });

  const limitedLogs = filteredLogs.slice(-5);

  const logVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white border border-gray-200 shadow-sm rounded-xl">
      {/* هدر */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📌 تایم‌لاین تغییرات</h2>
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded"
          onClick={() => setFilterModalOpen(true)}
        >
          فیلتر / مشاهده همه
        </button>
      </div>

      {/* نمایش ۵ لاگ آخر */}
      <div className="pt-7 pb-5">
        {limitedLogs.length === 0 && (
          <p className="text-center text-gray-500 py-6">موردی وجود ندارد</p>
        )}
        <AnimatePresence>
          {limitedLogs.map((log, idx) => (
            <motion.div
              key={`${log.type}-${log.item.id}-${idx}`}
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

      {/* دکمه مشاهده بیشتر */}
      {filteredLogs.length > 5 && (
        <div className="flex justify-center mt-3">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setFilterModalOpen(true)}
          >
            مشاهده بیشتر
          </button>
        </div>
      )}

      {/* Modal */}
      {filterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg relative max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">📜 همه لاگ‌ها (با فیلتر)</h2>

            {/* فیلترها */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="text"
                placeholder="مالک"
                value={filters.owner}
                onChange={(e) => setFilters(prev => ({ ...prev, owner: e.target.value }))}
                className="border p-2 rounded flex-1"
              />
              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="border p-2 rounded flex-1"
              >
                <option value="">همه نوع‌ها</option>
                <option value="Added">ایجاد</option>
                <option value="Updated">بروزرسانی</option>
                <option value="Removed">حذف</option>
              </select>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
                className="border p-2 rounded flex-1"
              />
            </div>

            {/* لیست لاگ‌ها */}
            {filteredLogs.length === 0 && (
              <p className="text-center text-gray-500 py-6">لاگی یافت نشد</p>
            )}
            {filteredLogs.map((log, idx) => (
              <div key={`${log.type}-${log.item.id}-modal-${idx}`} className="mb-4">
                <TimelineItem log={log} />
              </div>
            ))}

            {/* بستن */}
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setFilterModalOpen(false)}
              >
                بستن
              </button>
            </div>

            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setFilterModalOpen(false)}
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
