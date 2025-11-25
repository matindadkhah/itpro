import { useState } from "react";

export const ToggleInput = ({ label, name, options, onValueChange }) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const toggleValue = (value) => {
    const finalValue = name === "typeId" ? Number(value) : value;
    const updated = selectedValues.includes(finalValue)
      ? selectedValues.filter((v) => v !== finalValue)
      : [...selectedValues, finalValue];

    setSelectedValues(updated);
    onValueChange && onValueChange(name, updated);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">{label}</span>
      <div className="inline-flex rounded-lg shadow-2xs">
        {options.map((opt, index) => {
          const isSelected = selectedValues.includes(
            name === "typeId" ? Number(opt.value) : opt.value
          );

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleValue(opt.value)}
              className={`
                py-3 px-4 inline-flex items-center gap-x-2 -ms-px
                first:rounded-s-lg first:ms-0 last:rounded-e-lg
                text-sm font-medium border
                ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-800 border-gray-200"
                }
                shadow-2xs hover:bg-gray-50 focus:outline-none
                disabled:opacity-50 disabled:pointer-events-none
              `}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
