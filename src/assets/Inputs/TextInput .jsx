// TextInput.jsx
import React, { useState, useEffect } from 'react';

const TextInput = ({ label, value = '', onChange, placeholder }) => {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleChange = (e) => {
    setText(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div>
      <label>{label}</label>
      <input type="text" value={text} onChange={handleChange} placeholder={placeholder} />
    </div>
  );
};

export default TextInput;
