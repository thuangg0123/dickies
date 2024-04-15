import React, { useRef, useEffect, memo } from "react";

const VoteBar = ({ number, ratingCount, ratingTotal }) => {
  const percentRef = useRef();

  useEffect(() => {
    const percent = Math.round((ratingCount * 100) / ratingTotal) || 0;
    percentRef.current.style.cssText = `right: ${100 - percent}%`;
  }, [ratingCount, ratingTotal]);

  return (
    <div className="flex items-center gap-2">
      <div className="flex w-[10%] items-center gap-1 text-sm">
        {number > 1 ? (
          <>
            <span>{number} </span>
            <span>stars</span>
          </>
        ) : (
          <>
            <span>{number} </span>
            <span>star</span>
          </>
        )}
      </div>
      <div className="w-[85%]">
        <div className="relative w-full h-[15px] bg-[#E4E4E4] rounded-l-full rounded-r-full">
          <div
            ref={percentRef}
            className="absolute inset-0 bg-black rounded-l-full rounded"
          ></div>
        </div>
      </div>
      <div className="w-[15%]">{`${ratingCount || 0}`}</div>
    </div>
  );
};

export default memo(VoteBar);
