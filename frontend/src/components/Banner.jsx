import React from "react";

import { Link } from "react-router-dom";

import banner from "../img/banner-home.jpg";
import path from "../ultils/path";

function Banner() {
  return (
    <>
      <div className="relative">
        <img src={banner} alt="banner" className="w-full" />
        <div className="absolute bottom-10 left-0 text-center px-5 py-10">
          <div className="text-6xl h font-bold">
            <h2>
              <span className="px-4 py-1">30% Off Best Sellers</span>
            </h2>
          </div>
          <div className="mt-5 px-4 py-1 flex">
            <button className="bg-black text-white font-semibold px-4 py-2 mr-4">
              <Link to={`/${path.MEN}`}>Men's</Link>
            </button>
            <button className="bg-black text-white font-semibold px-4 py-2">
              <Link to={`/${path.WOMEN}`}>Women's</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
