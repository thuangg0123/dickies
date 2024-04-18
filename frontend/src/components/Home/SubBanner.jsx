import React, { memo } from "react";

function SubBanner({ subBanner, title, subtitle }) {
  return (
    <>
      <div className="relative">
        <img src={subBanner} alt="banner" className="w-full" />
        <div className="absolute bottom-10 left-0 px-5 lg:py-10 md:py-5">
          <div className="font-bold text-white px-4 py-1 ">
            <p>{subtitle}</p>
            <h2>
              <span className="lg:text-6xl md:text-3xl">{title}</span>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(SubBanner);
