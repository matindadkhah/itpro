import React from "react";
import { useSelector } from "react-redux";
import useSearchFilters from "../../Hooks/useSearchFilters";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  FunnelIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  ChevronDownIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function CustomSearch({ data = [], searchFields = [], onSearch }) {
  const { filters, dropdownOpen } = useSelector((state) => state.search);
  const { handleChange, handleSearch, handleReset, toggleDropdown } = useSearchFilters();

  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200 mb-6">
      <h2 className="flex items-center gap-2 font-bold text-gray-800 mb-5 text-lg">
        <FunnelIcon className="w-5 h-5 text-red-500" />
        جست‌وجوی پیشرفته
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {searchFields.map((field) => (
          <div key={field.key} className="flex flex-col">
            <label className="block text-sm font-medium text-gray-600 mb-2">{field.label}</label>

            {/* Text */}
            {field.type === "text" && (
              <div className="relative">
                <input
                  type="text"
                  value={filters[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={`جستجو در ${field.label}`}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm pr-9 focus:ring-2 focus:ring-red-400 focus:outline-none"
                />
                <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            )}

            {/* Select */}
            {field.type === "select" && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown(field.key)}
                  className="w-full flex justify-between items-center rounded-lg border border-gray-300 
                  bg-white py-2 px-3 text-sm text-gray-700 shadow-sm 
                  hover:border-gray-400 focus:border-red-400 focus:ring-2 
                  focus:ring-red-300 transition-all"
                >
                  {filters[field.key] === "" || !filters[field.key] ? "همه" : filters[field.key]}
                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      dropdownOpen?.[field.key] ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen?.[field.key] && (
                  <div className="absolute mt-2 w-full rounded-lg bg-white border border-gray-200 shadow-lg z-10 overflow-hidden">
                    <button
                      onClick={() => handleChange(field.key, "")}
                      className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500"
                    >
                      همه
                    </button>
                    {field.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleChange(field.key, opt)}
                        className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Date */}
            {field.type === "date" && (
              <div className="relative">
                <DatePicker
                  inputMode="block"
                  value={filters[field.key]?.persian || ""}
                  onChange={(date) => {
                    if (!date) {
                      handleChange(field.key, null);
                      return;
                    }
                    const persianDate = date.format("YYYY/MM/DD");
                    const gregorianDate = date.toDate().toISOString().split("T")[0];
                    handleChange(field.key, {
                      persian: persianDate,
                      gregorian: gregorianDate,
                    });
                  }}
                  calendar={persian}
                  locale={persian_fa}
                  format="YYYY/MM/DD"
                  calendarPosition="bottom-right"
                  portal
                  inputClass="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm pr-9 focus:ring-2 focus:ring-red-400 focus:outline-none block"
                />
                <CalendarIcon className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <button
          onClick={() => handleReset(data, onSearch)}
          className="flex items-center justify-center gap-2 px-4 py-2 font-bold text-sm rounded-lg border border-red-500 text-red-500 hover:bg-red-50 hover:shadow transition"
        >
          <ArrowPathIcon className="w-4 h-4" />
          پاک کردن فیلترها
        </button>
        <button
          onClick={() => handleSearch(data, onSearch)}
          className="flex items-center justify-center gap-2 px-4 py-2 font-bold text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 hover:shadow transition"
        >
          <MagnifyingGlassIcon className="w-4 h-4" />
          اعمال فیلتر
        </button>
      </div>
    </div>
  );
}
