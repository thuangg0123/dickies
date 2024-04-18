import React, { memo } from "react";

function SubBanner({ subBanner, title, subtitle }) {
  return (
    <>
      <div className="relative">
        <img src={subBanner} alt="banner" className="w-full" />
        <div className="absolute bottom-10 left-0 px-5 py-10 ">
          <div className=" font-bold text-white px-4 py-1 ">
            <p>{subtitle}</p>
            <h2>
              <span className="text-6xl">{title}</span>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(SubBanner);
