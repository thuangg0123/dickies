import React, { memo } from "react";

const Button = ({ name, handleOnClick, style, iconsBefore, iconsAfter }) => {
  return (
    <button
      type="button"
      className={
        style
          ? style
          : "p-4 text-white bg-black font-main font-semibold w-full transition duration-300 ease-in-out hover:bg-[#8D8D8D]"
      }
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
    >
      {iconsBefore} <span>{name}</span>
      {iconsAfter}
    </button>
  );
};

export default memo(Button);
