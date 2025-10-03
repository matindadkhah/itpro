import React, { useState, useEffect } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

// نمونه داده اولیه 28 ایستگاه
const initialStations = Array.from({ length: 28 }, (_, i) => ({
  id: i + 1,
  name: `ایستگاه ${i + 1}`,
  status: Math.random() > 0.2 ? "stable" : "down",
  lastPing: new Date().toLocaleTimeString("fa-IR"),
}));

export default function OverviewPage() {
  const [stations, setStations] = useState(initialStations);
  const [filter, setFilter] = useState("all"); // all, stable, down

  // شبیه سازی Ping مجدد
  const refreshPing = (id) => {
    setStations((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: Math.random() > 0.2 ? "stable" : "down", lastPing: new Date().toLocaleTimeString("fa-IR") }
          : s
      )
    );
  };

  // ایستگاه‌های فیلتر شده
  const filteredStations = stations.filter((s) => {
    if (filter === "all") return true;
    return s.status === filter;
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header و فیلتر */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        <h2 className="text-lg font-bold text-gray-700">پایش زمان ایستگاه‌ها</h2>
        <div className="flex items-center gap-2">
          <span className="text-gray-700 mr-4">
            پایدار: {stations.filter((s) => s.status === "stable").length} | قطع: {stations.filter((s) => s.status === "down").length}
          </span>
          {/* فیلتر */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-2 py-1 border rounded text-gray-700"
          >
            <option value="all">همه</option>
            <option value="stable">پایدار</option>
            <option value="down">قطع</option>
          </select>
        </div>
      </div>

      {/* Grid کارت‌ها */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredStations.map((station) => (
          <div
            key={station.id}
            className={`p-4 rounded-lg shadow-md flex flex-col  justify-between border ${
              station.status === "stable"
                ? "border-green-400 bg-green-100"
                : "border-red-500 animate-pulse bg-red-100"
            } transition-all duration-300`}
          >
            {/* نام ایستگاه */}
            <h3 className="text-right font-semibold text-gray-700 mb-2">{station.name}</h3>

            {/* وضعیت */}
            <div className="flex items-center gap-2 mb-2 justify-end">
              {station.status === "stable" ? (
                <span className="flex items-center gap-1  text-green-600">
                  <CheckCircleIcon className="w-5 h-5" />
                  پایدار
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-600">
                  <XCircleIcon className="w-5 h-5" />
                  قطع
                </span>
              )}
            </div>

            {/* آخرین پینگ */}
            <p className="text-gray-600 text-sm text-right mb-2">آخرین پینگ: {station.lastPing}</p>

            {/* دکمه Ping مجدد */}
            <button
              onClick={() => refreshPing(station.id)}
              className="mt-auto px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 self-start"
            >
              Ping مجدد
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
