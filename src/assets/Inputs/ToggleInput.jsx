// ToggleInput.jsx
import React, { useState, useEffect } from 'react';

const ToggleInput = ({ label, value = false, onChange }) => {
  const [active, setActive] = useState(value);

  useEffect(() => {
    setActive(value);
  }, [value]);

  const handleToggle = () => {
    setActive(!active);
    onChange?.(!active);
  };

  return (
    <div>
      <label>{label}</label>
      <button onClick={handleToggle}>{active ? 'Active' : 'Inactive'}</button>
    </div>
  );
};

export default ToggleInput;
