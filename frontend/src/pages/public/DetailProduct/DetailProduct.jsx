import React from "react";
import { useParams } from "react-router-dom";

function DetailProduct() {
  const { gender, category, slug, productId } = useParams();
  return (
    <div>
      <h1>
        {gender} - {category} - {slug} - {productId}
      </h1>
    </div>
  );
}

export default DetailProduct;
