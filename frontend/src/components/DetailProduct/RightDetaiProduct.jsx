import React, { useState, useCallback } from "react";
import icons from "../../ultils/icons";
import Detail from "./Detail";
import withBaseComponent from "../../hocs/withBaseComponent";
import { apiUpdateWishlist } from "../../apis";
import { getCurrent } from "../../store/user/asyncActions";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const RightDetaiProduct = ({
  countProduct,
  setCountProduct,
  handleAddToCart,
  detailProduct,
  currentVariant,
  setVariant,
  setSelectedSize,
  selectedSize,
  dispatch,
}) => {
  const { current } = useSelector((state) => state.user);
  const { StarIcon, StarOutlineIcon, RemoveIcon, AddIcon } = icons;
  const [selectedColor, setSelectedColor] = useState(null);

  const floatRatingStars = detailProduct?.totalRatings
    ? detailProduct?.totalRatings.toFixed(1)
    : null;

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setVariant(null);
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

  const handleWishList = async (product) => {
    const response = await apiUpdateWishlist(product._id);
    if (response.success) {
      dispatch(getCurrent());
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <div className="col-span-1">
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-2xl">{detailProduct?.title}</h2>
          <span className="font-second font-medium">
            Sold: {+detailProduct?.sold || 0}
          </span>
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
            <span className="font-medium">
              $
              {parseFloat(currentVariant.price || detailProduct?.price).toFixed(
                2
              )}
            </span>
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
                      onClick={() => {
                        handleColorClick(color);
                      }}
                      key={index}
                      className="cursor-pointer w-8 h-8 border-2 rounded-full flex items-center justify-center overflow-hidden hover:border-black"
                      style={{
                        backgroundColor: color,
                        border:
                          color === selectedColor
                            ? "2px solid black"
                            : "2px solid #ccc",
                      }}
                    ></li>
                  ))}
                {detailProduct?.variants &&
                  detailProduct?.variants.map((variant, index) => (
                    <li
                      key={index}
                      className="cursor-pointer w-8 h-8 border-2 rounded-full flex items-center justify-center overflow-hidden hover:border-black"
                      style={{
                        backgroundColor: variant?.color,
                        border:
                          variant?.color === selectedColor
                            ? "2px solid black"
                            : "2px solid #ccc",
                      }}
                      onClick={() => {
                        handleColorClick(variant?.color);
                        setVariant(variant?.sku);
                      }}
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
              <button
                onClick={handleAddToCart}
                className="bg-black hover:bg-[rgb(140,140,140)] text-white font-bold py-4 px-4 w-full transition duration-300 ease-in-out"
              >
                Add To Cart
              </button>
            </div>
            <div>
              <button
                onClick={() => handleWishList(detailProduct)}
                className="bg-white hover:bg-black hover:text-white text-black font-bold py-4 px-4 w-full border-2 border-black transition duration-300 ease-in-out"
              >
                {current?.wishList.findIndex(
                  (item) => item._id === detailProduct._id
                ) !== -1
                  ? "Added in Wish List"
                  : "Save For Later"}
              </button>
            </div>
          </div>
        </div>
        <Detail />
      </div>
    </>
  );
};

export default withBaseComponent(RightDetaiProduct);
