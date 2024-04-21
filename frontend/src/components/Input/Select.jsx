import React, { memo } from "react";
import clsx from "clsx";

function Select({
  label,
  options = [],
  register,
  errors,
  id,
  validate,
  style,
  fullWidth,
  defaultValue,
}) {
  return (
    <>
      <div className={clsx("flex flex-col gap-2", style)}>
        {label && <label htmlFor={id}>{label}</label>}
        <select
          defaultValue={defaultValue}
          id={id}
          {...register(id, validate)}
          className={clsx(
            "form-select text-sm cursor-pointer max-h-[42px]",
            fullWidth && "w-full",
            style
          )}
        >
          <option value="">Choose</option>
          {options &&
            options?.map((element) => (
              <option key={element.code} value={element.code}>
                {element.value}
              </option>
            ))}
        </select>

        {errors && errors[id] && (
          <small className="text-xs text-red-500 whitespace-nowrap">
            {errors[id]?.message}
          </small>
        )}
      </div>
    </>
  );
}

export default memo(Select);
