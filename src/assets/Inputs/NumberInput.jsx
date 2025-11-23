// NumberInput.jsx
import React, { useState, useEffect } from 'react';

const NumberInput = ({ label, value = 0, onChange, min, max }) => {
  const [num, setNum] = useState(value);

  useEffect(() => {
    setNum(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setNum(newValue);
    onChange?.(newValue);
  };

  return (
    <div>
      <label>{label}</label>
      <input type="number" value={num} onChange={handleChange} min={min} max={max} />
    </div>
  );
};

export default NumberInput;
