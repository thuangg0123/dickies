import React, { memo } from "react";
import { Link } from "react-router-dom";

function BoxSubBanner({ img, title, path }) {
  return (
    <>
      <div className="relative">
        <img src={img} alt={title} />
        <div className="absolute bottom-0 lg:p-10 md:p-5 font-semibold">
          <div className="mb-5">
            <h3>
              <span className="text-white lg:text-4xl md:text-xl">{title}</span>
            </h3>
          </div>
          <div>
            <button className="text-black bg-white lg:p-4 md:p-3 hover:text-white hover:bg-black duration-300">
              <Link to={path ? `/products/${path}` : "/products"}>
                Shop Now
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(BoxSubBanner);
