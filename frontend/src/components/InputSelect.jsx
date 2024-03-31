import React from "react";

function InputSelect({ value, changeValue, options }) {
  return (
    <select
      className="form-select text-sm cursor-pointer"
      value={value}
      onChange={(e) => changeValue(e.target.value)}
    >
      <option value="">Options</option>
      {options?.map((element) => (
        <option key={element.id} value={element.value}>
          {element.text}
        </option>
      ))}
    </select>
  );
}

export default InputSelect;
