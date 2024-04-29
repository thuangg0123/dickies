import clsx from "clsx";
import React, { memo } from "react";
import Select from "react-select";

function CustomSelect({
  label,
  placeholder,
  onChange,
  options = [],
  value = "",
  className,
  width,
}) {
  return (
    <div className={width}>
      {label && <h3 className="font-medium">{label}</h3>}
      <Select
        placeholder={placeholder}
        isClearable
        options={options}
        value={value}
        isSearchable
        onChange={(value) => onChange(value)}
        formatOptionLabel={(option) => (
          <div className="flex text-black items-center gap-2 z-50">
            <span>{option.label}</span>
          </div>
        )}
        className={{ control: () => clsx("border-2 py-[2px]", className) }}
      />
    </div>
  );
}

export default memo(CustomSelect);
