import React, { memo } from "react";
import clsx from "clsx";

function InputFields({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInValidFields,
  style,
  fullWidth,
  placeholder,
  isHideLabel,
  styleLogin,
}) {
  const error = invalidFields?.find((el) => el.name === nameKey);

  return (
    <div className={clsx("my-5", fullWidth && "w-full my-0")}>
      <label className="text-[13px] absolute" htmlFor={nameKey}>
        {!isHideLabel &&
          nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1) + "*"}
      </label>
      <input
        type={type || "text"}
        className={clsx(
          !style && "px-4 py-4",
          style && "px-2 py-2 w-full",
          styleLogin
        )}
        placeholder={
          placeholder ||
          nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1) + "*"
        }
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        onFocus={() => setInValidFields && setInValidFields([])}
      />
      {error && (
        <small className="text-[#ff0000] text-xs italic">{error.message}</small>
      )}
    </div>
  );
}

export default memo(InputFields);
