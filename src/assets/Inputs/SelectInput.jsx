// SelectInput.jsx
import React, { useState, useEffect } from 'react';

const SelectInput = ({ label, value = '', onChange, options = [] }) => {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleChange = (e) => {
    setSelected(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div>
      <label>{label}</label>
      <select value={selected} onChange={handleChange}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
