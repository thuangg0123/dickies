import clsx from "clsx";
import React, { memo } from "react";

function InputForm({
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  type = "text",
  placeholder,
  fullWidth,
  defaultValue,
  style,
  readOnly,
}) {
  return (
    <div className={clsx(`flex flex-col h-[78px] gap-2`, style)}>
      {label && (
        <label htmlFor={id} className="font-second font-semibold">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx(
          "form-input text-sm my-auto",
          fullWidth && "w-full",
          style
        )}
        defaultValue={defaultValue}
        readOnly={readOnly}
      />
      {errors && errors[id] && (
        <small className="text-xs text-red-500 whitespace-nowrap">
          {errors[id]?.message}
        </small>
      )}
    </div>
  );
}

export default memo(InputForm);
