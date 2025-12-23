// TextInput.jsx

import { useState } from "react";

// Text Input
export const TextAreaInput = ({ label, name, placeholder, onValueChange }) => {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        const val = e.target.value;
        setValue(val);
        onValueChange && onValueChange(name, val);
    };

    return (
        <div className="flex flex-col gap-1">
            <div className="relative w-full">
                <label htmlFor="textarea-label" className="absolute -top-3 right-3 bg-white px-2 text-[12px] font-medium text-gray-600">{label}</label>
                <textarea id="textarea-label" placeholder={placeholder} onChange={handleChange} className="w-full h-60 border border-gray-300 rounded-xl px-2 py-2 focus:outline-none focus:border-gray-400"></textarea>
            </div>
        </div>
    );
};


