import clsx from "clsx";
import React, { memo } from "react";

function Textarea({
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  placeholder,
  fullWidth,
  defaultValue,
  style,
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx("form-textarea text-sm", fullWidth && "w-full", style)}
        defaultValue={defaultValue}
      />
      {errors && errors[id] && (
        <small className="text-xs text-red-500 whitespace-nowrap">
          {errors[id]?.message}
        </small>
      )}
    </div>
  );
}

export default memo(Textarea);
