import React, { memo } from "react";
import { Link } from "react-router-dom";

function BoxSubBanner({ img, title, path }) {
  return (
    <>
      <div className="relative">
        <img src={img} alt="" />
        <div className="absolute bottom-0 p-10 font-semibold">
          <div className="mb-5">
            <h3>
              <span className="text-white text-4xl ">{title}</span>
            </h3>
          </div>
          <div>
            <button className="text-black bg-white p-4 hover:text-white hover:bg-black duration-300">
              <Link to={`/products/${path}`}>Shop Now</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(BoxSubBanner);
