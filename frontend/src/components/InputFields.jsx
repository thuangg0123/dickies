import React from "react";

function InputFields({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInValidFields,
}) {
  const error = invalidFields?.find((el) => el.name === nameKey);

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
        onFocus={() => setInValidFields([])}
      />
      {error && (
        <small className="text-[#ff0000] text-xs italic">{error.message}</small>
      )}
    </div>
  );
}

export default InputFields;
