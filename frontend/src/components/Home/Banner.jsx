import React, { memo } from "react";
import { Link } from "react-router-dom";
import banner from "../../img/banner-home.jpg";

function Banner() {
  return (
    <>
      <div className="relative">
        <img src={banner} alt="banner" className="w-full" />
        <div className="absolute bottom-10 left-0 px-5 lg:py-10 md:py-5">
          <div className="font-bold text-white px-4 py-1 lg:text-4xl text-sm">
            <p>DENIM, DUCK CANVAS, TWILL</p>
            <h2>
              <span className="lg:text-5xl md:text-3xl">Work Pants</span>
            </h2>
          </div>
          <div className="mt-5 px-4 py-1 flex md:mt-3">
            <button className="bg-white text-black font-semibold px-4 py-2 mr-4">
              <Link to={`/category/pants`}>Shop Now</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Banner);
