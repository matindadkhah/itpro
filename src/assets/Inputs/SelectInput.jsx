import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export const SelectInput = ({
  label,
  name,
  options,
  onValueChange,
  required,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (value) => {
    const finalValue = name === "typeId" ? Number(value) : value; // اگر typeId است، تبدیل به عدد
    setSelected(finalValue);
    onValueChange && onValueChange(name, finalValue);
    setIsOpen(false);
  };

  // 🟢 بستن dropdown وقتی کلیک خارج شد
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-1 relative w-full" ref={dropdownRef}>
      <div className="relative w-full">
        <label className="absolute -top-3 right-3 bg-white px-2 text-sm text-gray-600">
          {label}
        </label>

        <button
          type="button"
          onClick={toggleDropdown}
          className={`w-full flex justify-between items-center rounded-xl  border border-gray-300 bg-white py-4 px-3 text-sm  focus:outline-none focus:border-red-500 text-gray-700 transition-all`}
        >
          {selected !== "" && selected !== null
            ? options[selected]
            : `انتخاب ${label}`}
          <ChevronDownIcon
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute mt-1 w-full rounded-lg bg-white border border-gray-200 shadow-lg z-50 top-14 overflow-hidden">
            {Object.keys(options).map((key) => (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500"
              >
                {options[key]}
              </button>
            ))}
          </div>
        )}

        {required && !selected && (
          <p className="text-red-600 text-sm mt-1">این فیلد الزامی است</p>
        )}
      </div>
    </div>
  );
};
