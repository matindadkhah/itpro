import React, { useState, useEffect, useRef } from "react";

// --- Hook لاگ‌گیری تغییرات ---
function useChangeLogger(obj) {
  const [logs, setLogs] = useState([]);
  const prevObjRef = useRef(obj);

  useEffect(() => {
    const interval = setInterval(() => {
      const prevObj = prevObjRef.current;
      const newObj = obj;

      const added = newObj.filter(
        (item) => !prevObj.some((prev) => prev.id === item.id)
      );
      const removed = prevObj.filter(
        (item) => !newObj.some((curr) => curr.id === item.id)
      );
      const updated = newObj.filter((item) => {
        const prevItem = prevObj.find((p) => p.id === item.id);
        return prevItem && JSON.stringify(prevItem) !== JSON.stringify(item);
      });

      const now = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const newLogs = [
        ...added.map((item) => ({ type: "Added", item, time: now })),
        ...removed.map((item) => ({ type: "Removed", item, time: now })),
        ...updated.map((item) => ({ type: "Updated", item, time: now })),
      ];

      if (newLogs.length > 0) {
        setLogs((prevLogs) => [...newLogs, ...prevLogs]);
      }

      prevObjRef.current = [...newObj];
    }, 5000);

    return () => clearInterval(interval);
  }, [obj]);

  return logs;
}

// --- کامپوننت تایم‌لاین ---
export function TimelineLogger({ data }) {
  const logs = useChangeLogger(data);
  const [showAll, setShowAll] = useState(false);

  // فقط ۳ تا لاگ آخر
  const visibleLogs = showAll ? logs : logs.slice(0, 3);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">📌 Timeline Logs</h2>

      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showAll ? "max-h-[1000px] opacity-100" : "max-h-[400px] opacity-90"
        }`}>
        {visibleLogs.map((log, index) => (
          <div className="flex gap-x-3" key={index}>
            {/* Left Content */}
            <div className="min-w-14 text-end">
              <span className="text-xs text-gray-500">{log.time}</span>
            </div>

            {/* Icon */}
            <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200">
              <div className="relative z-10 size-7 flex justify-center items-center">
                <div
                  className={`size-2 rounded-full ${log.type === "Added"
                    ? "bg-green-500"
                    : log.type === "Removed"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                    }`}
                ></div>
              </div>
            </div>

            {/* Right Content */}
            <div className="grow pt-0.5 pb-8">
              <h3 className="flex gap-x-1.5 font-semibold text-gray-800">
                {log.type === "Added" && "➕ Added"}
                {log.type === "Removed" && "❌ Removed"}
                {log.type === "Updated" && "✏️ Updated"} – {log.item.name}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                <span className="font-medium">Owner:</span> {log.item.owner} |{" "}
                <span className="font-medium">Status:</span> {log.item.status}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* دکمه نمایش همه / بستن */}
      {logs.length > 3 && (
        <div className="text-center mt-2">
          <button
            className="px-3 py-1 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "مخفی کردن لاگ‌ها" : `نمایش همه (${logs.length})`}
          </button>
        </div>
      )}
    </div>
  );
}
