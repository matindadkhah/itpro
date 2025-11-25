// TextInput.jsx

import { useState } from "react";

// Text Input
export const TextInput = ({ label, name, placeholder, onValueChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    onValueChange && onValueChange(name, val);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="relative w-full">
        <label className="absolute -top-3 right-3 bg-white px-2 text-sm text-gray-600">
          {label}
        </label>

        <input
          type="text"
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-xl px-3 py-3 focus:outline-none focus:border-red-500"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
