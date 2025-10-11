import React, { useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";

export default function CustomSearch({ data = [], searchFields = [], onSearch }) {
  const [filters, setFilters] = useState({});

  // تغییر مقادیر هر فیلتر
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // اجرای جست‌وجو
  const handleSearch = () => {
    const filteredData = data.filter((item) =>
      Object.entries(filters).every(([key, value]) => {
        if (!value) return true; // اگر فیلتر خالی بود رد کن

        const itemValue = item[key]?.toString().toLowerCase();
        const filterValue = value.toString().toLowerCase();

        // برای فیلتر تاریخ، فقط برابر بودن کافی است
        if (key.toLowerCase().includes("date")) {
          return item[key]?.includes(value);
        }

        return itemValue.includes(filterValue);
      })
    );

    onSearch(filteredData);
  };

  // ریست همه فیلترها
  const handleReset = () => {
    setFilters({});
    onSearch(data);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-4">
      <h2 className="flex items-center gap-2 font-bold text-gray-700 mb-3">
        <FunnelIcon className="h-5 w-5 text-blue-600" />
        جست‌وجوی پیشرفته
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
        {searchFields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm text-gray-600 mb-1">{field.label}</label>

            {field.type === "text" && (
              <input
                type="text"
                value={filters[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
            )}

            {field.type === "select" && (
              <select
                value={filters[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">انتخاب کنید...</option>
                {field.options.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {field.type === "date" && (
              <input
                type="date"
                value={filters[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
        >
          ریست
        </button>
        <button
          onClick={handleSearch}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          جست‌وجو
        </button>
      </div>
    </div>
  );
}
