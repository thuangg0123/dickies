import React, { memo } from "react";
import clsx from "clsx";

const PagiItem = ({ children }) => {
  return (
    <div
      className={clsx(
        `flex justify-center cursor-pointer p-4 w-10 h-10 hover:rounded-full hover:bg-gray-300`,
        !Number(children) && "items-end pb-2",
        Number(children) && "items-center"
      )}
    >
      {children}
    </div>
  );
};

export default memo(PagiItem);
