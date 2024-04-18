import React from "react";
import { useSelector } from "react-redux";

const LeftDetaiProduct = () => {
  const detailProduct = useSelector((state) => {
    return state.product.detailProduct;
  });

  return (
    <>
      <div className="lg:col-span-2 md:col-span-1">
        <div className="grid col-span-1 gap-5">
          <div>
            <img
              className="w-full"
              src={detailProduct?.thumb}
              alt={detailProduct?.title}
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-5 md:grid-cols-1">
            {detailProduct &&
              detailProduct?.images &&
              detailProduct?.images.map((image, index) => {
                return (
                  <div key={index}>
                    <picture>
                      <img src={image} alt="" />
                    </picture>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftDetaiProduct;
