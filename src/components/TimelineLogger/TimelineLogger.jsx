import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { motion, AnimatePresence } from "framer-motion";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

// --- Hook لاگ‌گیری تغییرات ---
function useChangeLogger(obj) {
  const [logs, setLogs] = useState([]);
  const prevObjRef = useRef(obj);

  useEffect(() => {
    const prevObj = prevObjRef.current;

    const added = obj.filter((item) => !prevObj.some((p) => p.id === item.id));
    const removed = prevObj.filter((item) => !obj.some((p) => p.id === item.id));
    const updated = obj.filter((item) => {
      const prevItem = prevObj.find((p) => p.id === item.id);
      return (
        prevItem &&
        (prevItem.name !== item.name ||
          prevItem.status !== item.status ||
          prevItem.owner !== item.owner)
      );
    });

    if (added.length || removed.length || updated.length) {
      const now = new Date();
      const time = now.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
      const date = new Intl.DateTimeFormat("fa-IR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(now);

      const newLogs = [
        ...added.map((item) => ({ type: "Added", item, time, date, createdAt: now })),
        ...removed.map((item) => ({ type: "Removed", item, time, date, createdAt: now })),
        ...updated.map((item) => ({ type: "Updated", item, time, date, createdAt: now })),
      ];

      setLogs((prev) => [...newLogs, ...prev].slice(0, 200));
    }

    prevObjRef.current = [...obj];
  }, [obj]);

  return logs;
}

// --- کامپوننت TimelineLogger ---
export function TimelineLogger({ data }) {
  const logs = useChangeLogger(data);
  const [showAll, setShowAll] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({ owner: "", status: "", selectedDate: null });
  const [threeLogsHeight, setThreeLogsHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const listRef = useRef(null);
  const contentRef = useRef(null);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // --- اعمال فیلتر ---
  const filteredLogs = logs.filter((log) => {
    const matchesOwner = filters.owner ? log.item.owner.includes(filters.owner) : true;
    const matchesStatus = filters.status ? log.item.status === filters.status : true;

    if (!filters.selectedDate) return matchesOwner && matchesStatus;

    const selectedDate = filters.selectedDate.toDate();
    selectedDate.setHours(0, 0, 0, 0);

    const logDate = new Date(log.createdAt);
    logDate.setHours(0, 0, 0, 0);

    return matchesOwner && matchesStatus && logDate.getTime() === selectedDate.getTime();
  });

  // --- محاسبه ارتفاع سه لاگ و کل محتوا ---
  useEffect(() => {
    if (contentRef.current) {
      const children = Array.from(contentRef.current.children);
      const firstThree = children.slice(0, 3);

      const threeHeight = firstThree.reduce((acc, el) => {
        const style = getComputedStyle(el);
        const marginBottom = parseFloat(style.marginBottom);
        return acc + el.offsetHeight + marginBottom;
      }, 0);

      const fullHeight = children.reduce((acc, el) => {
        const style = getComputedStyle(el);
        const marginBottom = parseFloat(style.marginBottom);
        return acc + el.offsetHeight + marginBottom;
      }, 0);

      setThreeLogsHeight(threeHeight);
      setContentHeight(fullHeight);
    }
  }, [filteredLogs, showAll]);

  // انیمیشن Motion
  const logVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📌 تایم‌لاین تغییرات</h2>
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded"
          onClick={() => setFilterModalOpen(true)}
        >
          فیلتر
        </button>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out ${showAll ? "overflow-y-auto" : "overflow-hidden"}`}
        style={{ maxHeight: showAll ? `${contentHeight}px` : `${threeLogsHeight}px` }}
        ref={contentRef}
      >
        <div ref={listRef} className="pt-7 pb-20">
          {filteredLogs.length === 0 && (
            <p className="text-center text-gray-500 py-6">موردی وجود ندارد</p>
          )}

          <AnimatePresence>
            {filteredLogs.map((log) => (
              <motion.div
                key={`${log.type}-${log.item.id}`}
                variants={logVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex gap-x-3 relative group mb-4 log-item"
              >
                <div className="min-w-32 text-end">
                  <span className="block text-xs text-gray-500">{log.date}</span>
                  <span className="block text-xs text-gray-400">{log.time}</span>
                </div>

                <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200">
                  <div className="relative z-10 size-7 flex justify-center items-center">
                    <div
                      className={`size-2 rounded-full ${
                        log.type === "Added"
                          ? "bg-green-500"
                          : log.type === "Removed"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                  </div>
                </div>

                <div className="grow pt-0.5 pb-8 relative">
                  <h3 className="flex gap-x-1.5 font-semibold text-gray-800">
                    {log.type === "Added" && "➕ اضافه شد"}
                    {log.type === "Removed" && "❌ حذف شد"}
                    {log.type === "Updated" && "✏️ به‌روزرسانی"} – {log.item.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    <span className="font-medium">مالک:</span> {log.item.owner} |{" "}
                    <span className="font-medium">وضعیت:</span> {log.item.status}
                  </p>

                  {/* Tooltip icon */}
                  <div className="absolute bottom-0 left-0 cursor-pointer group">
                    <InformationCircleIcon className="w-5 h-5 text-gray-400 hover:text-gray-700" />
                    <div className="absolute bottom-full left-1/2 translate-x-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white text-xs p-2 rounded shadow-lg whitespace-nowrap z-50">
                      <div>شناسه: {log.item.id}</div>
                      <div>نوع: {log.item.type}</div>
                      <div>دپارتمان: {log.item.department}</div>
                      <div>تاریخ خرید: {log.item.purchaseDate}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

    

      {/* --- Modal فیلتر --- */}
      {filterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
            <h2 className="text-lg font-bold mb-4">فیلتر لاگ‌ها</h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="owner"
                placeholder="مالک"
                value={filters.owner}
                onChange={handleFilterChange}
                className="border p-2 rounded"
              />
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="border p-2 rounded"
              >
                <option value="">همه وضعیت‌ها</option>
                <option value="فعال">فعال</option>
                <option value="درحال تعمیر">درحال تعمیر</option>
                <option value="از رده خارج">از رده خارج</option>
              </select>

              <DatePicker
                value={filters.selectedDate}
                onChange={(date) => setFilters((f) => ({ ...f, selectedDate: date }))}
                calendar={persian}
                locale={persian_fa}
                placeholder="روز موردنظر"
                inputClass="border p-2 rounded"
                format="YYYY/MM/DD"
              />
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setFilterModalOpen(false)}
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
