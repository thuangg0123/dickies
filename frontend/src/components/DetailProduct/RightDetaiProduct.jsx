import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import icons from "../../ultils/icons";
import Detail from "./Detail";

const RightDetaiProduct = () => {
  const { StarIcon, StarOutlineIcon, RemoveIcon, AddIcon } = icons;
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [countProduct, setCountProduct] = useState(1);

  const detailProduct = useSelector((state) => {
    return state.product.detailProduct;
  });

  const floatRatingStars = detailProduct?.totalRatings
    ? detailProduct?.totalRatings.toFixed(1)
    : null;

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleIProduct = useCallback(() => {
    setCountProduct((prevCount) => prevCount + 1);
  }, []);

  const handleDProduct = useCallback(() => {
    if (countProduct > 1) {
      setCountProduct((prevCount) => prevCount - 1);
    }
  }, [countProduct]);

  const renderStarFromNumber = (number) => {
    if (!Number(number)) {
      return;
    }
    const stars = [];
    for (let i = 0; i < +number; i++) {
      stars.push(<StarIcon key={i} style={{ fontSize: 16 }} />);
    }
    for (let i = 5; i > +number; i--) {
      stars.push(<StarOutlineIcon key={i} style={{ fontSize: 16 }} />);
    }
    return stars;
  };

  return (
    <>
      <div className="col-span-1">
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-2xl">{detailProduct?.title}</h2>
          {detailProduct?.totalRatings > 0 && (
            <div className="flex items-center justify-between text-xs cursor-pointer">
              <span>{renderStarFromNumber(detailProduct?.totalRatings)}</span>
              <span>
                {floatRatingStars ? `${floatRatingStars}(20472)` : "0(0)"}
              </span>
              <span className="underline cursor-pointer transition duration-300 ease-in-out hover:text-[#8D8D8D]">
                Write a review
              </span>
            </div>
          )}
          <div>
            <span className="font-medium">${detailProduct?.price}</span>
          </div>
          <div>
            <span className="text-sm">
              <span className="font-medium">Color</span>&nbsp;
              {selectedColor}
            </span>
            <div>
              <ul className="flex mt-2 gap-3">
                {detailProduct?.color &&
                  detailProduct?.color.map((color, index) => (
                    <li
                      key={index}
                      className="cursor-pointer w-8 h-8 border-2 rounded-full flex items-center justify-center overflow-hidden hover:border-black"
                      style={{
                        backgroundColor: color,
                        border:
                          color === selectedColor
                            ? "2px solid black"
                            : "2px solid #ccc",
                      }}
                      onClick={() => handleColorClick(color)}
                    ></li>
                  ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <span className="text-sm">
                <span className="font-medium">Size</span>&nbsp;
                {selectedSize}
              </span>
              <span className="underline cursor-pointer transition duration-300 ease-in-out hover:text-[#8D8D8D] text-xs">
                Size Guide
              </span>
            </div>
            <div>
              <ul className="flex mt-2 gap-3">
                {detailProduct?.sizes &&
                  detailProduct?.sizes.map((size, index) => (
                    <li
                      key={index}
                      className={`cursor-pointer w-9 h-9 border flex items-center justify-center overflow-hidden hover:border-black text-xs ${
                        selectedSize === size
                          ? "border-black"
                          : "border-gray-400"
                      }`}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div>
            <span className="font-medium text-sm">Quantity</span>
            <div className="flex items-center gap-2 border border-gray-400 w-[120px] font-medium p-[10px] text-base mt-3">
              <button
                onClick={handleDProduct}
                className={
                  countProduct === 1
                    ? "opacity-50 cursor-not-allowed pointer-events-none"
                    : ""
                }
              >
                <RemoveIcon style={{ fontSize: 16 }} />
              </button>
              <input
                type="text"
                value={countProduct}
                readOnly
                className=" text-center w-full"
              />
              <button onClick={handleIProduct}>
                <AddIcon style={{ fontSize: 16 }} />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div>
              <button className="bg-black hover:bg-[rgb(140,140,140)] text-white font-bold py-4 px-4 w-full transition duration-300 ease-in-out">
                Add To Cart
              </button>
            </div>
            <div>
              <button className="bg-white hover:bg-black hover:text-white text-black font-bold py-4 px-4 w-full border-2 border-black transition duration-300 ease-in-out">
                Save For Later
              </button>
            </div>
          </div>
        </div>
        <Detail />
      </div>
    </>
  );
};

export default RightDetaiProduct;
