import React, { useState, useEffect } from "react";

const initialStations = [
  { id: 1, name: "ایستگاه 1", status: "online" },
  { id: 2, name: "ایستگاه 2", status: "offline" },
  { id: 3, name: "ایستگاه 3", status: "online" },
  // تا ۲۸ تا تکرار کن...
];

const DailyMonitoringPage = () => {
  const [stations, setStations] = useState(initialStations);
  const [logs, setLogs] = useState([]);

  // تابع تغییر وضعیت دستی (فعلاً برای تست، بعداً با API جایگزین میشه)
  const toggleStatus = (id) => {
    setStations((prev) =>
      prev.map((st) => {
        if (st.id === id) {
          const newStatus = st.status === "online" ? "offline" : "online";

          // اضافه کردن Log جدید
          setLogs((prevLogs) => [
            { station: st.name, status: newStatus, time: new Date().toLocaleTimeString() },
            ...prevLogs,
          ]);

          return { ...st, status: newStatus };
        }
        return st;
      })
    );
  };

  return (
    <div className="p-4">
      {/* Grid نمایش وضعیت ایستگاه‌ها */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stations.map((station) => (
          <div
            key={station.id}
            className={`relative p-4 rounded shadow bg-white border-r-4 cursor-pointer transition 
              ${station.status === "online" ? "border-green-500" : "border-red-500"}`}
            onClick={() => toggleStatus(station.id)}
          >
            <h3 className="text-lg font-semibold">{station.name}</h3>
            <p className="mt-2 flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full animate-pulse ${
                  station.status === "online" ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              {station.status === "online" ? "پایدار" : "قطع"}
            </p>
          </div>
        ))}
      </div>

      {/* لیست Log تغییر وضعیت‌ها */}
      <div className="mt-6 bg-gray-50 p-4 rounded shadow">
        <h3 className="text-md font-bold mb-2">تاریخچه تغییر وضعیت‌ها</h3>
        <ul className="space-y-1 max-h-40 overflow-y-auto">
          {logs.length === 0 && <li className="text-gray-400">هنوز تغییری ثبت نشده است</li>}
          {logs.map((log, idx) => (
            <li key={idx} className="text-sm">
              <span className="font-bold">{log.station}</span> →{" "}
              <span
                className={log.status === "online" ? "text-green-600" : "text-red-600"}
              >
                {log.status === "online" ? "پایدار" : "قطع"}
              </span>{" "}
              در ساعت {log.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DailyMonitoringPage;




