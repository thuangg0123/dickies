import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import path from "../../../ultils/path";

import { LeftDetaiProduct, RightDetaiProduct } from "../index";

function DetailProduct() {
  const detailProduct = useSelector((state) => {
    return state.product.detailProduct;
  });

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatCategory = (category) => {
    return category
      ? category
          .split("-")
          .map((word) => capitalizeFirstLetter(word))
          .join(" ")
      : "";
  };

  return (
    <div className="px-10 py-5">
      <div className="font-second text-sm font-semibold">
        <Link
          to="/"
          className="cursor-pointer transition duration-300 ease-in-out hover:text-[#8D8D8D]"
        >
          Home
        </Link>{" "}
        /&nbsp;
        <Link
          to={`/${path.MEN}`}
          className="cursor-pointer transition duration-300 ease-in-out hover:text-[#8D8D8D]"
        >
          {`${capitalizeFirstLetter(
            detailProduct?.gender && detailProduct.gender.length > 0
              ? detailProduct.gender[0]
              : ""
          )} 's Clothing`}
        </Link>
        /&nbsp;
        <Link className="cursor-pointer transition duration-300 ease-in-out hover:text-[#8D8D8D]">
          {formatCategory(detailProduct.category)}
        </Link>
        /&nbsp;
        <Link className="cursor-pointer transition duration-300 ease-in-out hover:text-[#8D8D8D]">
          {detailProduct.title}
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-10 my-5">
        <LeftDetaiProduct />
        <RightDetaiProduct />
      </div>
    </div>
  );
}

export default DetailProduct;
