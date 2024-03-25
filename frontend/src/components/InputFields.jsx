import React from "react";

function InputFields({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInValidFields,
}) {
  return (
    <div className="my-5">
      <label className="text-[13px] absolute" htmlFor={nameKey}>
        {nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1) + "*"}
      </label>
      <input
        type={type || "text"}
        className="px-4 py-4 w-full border border-gray-400 mt-5"
        placeholder={nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1) + "*"}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
      />
    </div>
  );
}

export default InputFields;
