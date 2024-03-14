import React from "react";
import { useParams, Link } from "react-router-dom";

import path from "../../../ultils/path";

function DetailProduct() {
  const { gender, category, slug, productId } = useParams();
  // console.log({ gender, category, slug, productId });

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="px-10 py-5">
      <div className="font-second text-sm font-semibold">
        <Link to="/">Home</Link> /&nbsp;
        {/* <Link>{`${capitalizeFirstLetter(path.MEN)}`}</Link> */}
      </div>
    </div>
  );
}

export default DetailProduct;
