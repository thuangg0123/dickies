import React from "react";

const LeftDetaiProduct = ({ detailProduct, currentVariant, setVariant }) => {
  return (
    <>
      <div className="lg:col-span-2 md:col-span-1">
        <div className="grid col-span-1 gap-5">
          <div>
            <img
              className="w-full"
              src={currentVariant?.thumb || detailProduct?.thumb}
              alt={detailProduct?.title}
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-5 md:grid-cols-1">
            {currentVariant?.images.length === 0 &&
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
            {currentVariant?.images.length > 0 &&
              currentVariant?.images.map((image, index) => {
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
