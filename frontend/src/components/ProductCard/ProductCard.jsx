import React, { useState } from "react";
import { Link } from "react-router-dom";
import icons from "../../ultils/icons";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { getDetailProduct } from "../../store/products/asyncActions";

function ProductCard({ product, isHoverEnabled }) {
  const dispatch = useDispatch();
  const { StarIcon, StarOutlineIcon, BookmarkBorderOutlinedIcon } = icons;
  const [hoveredImage, setHoveredImage] = useState(product.thumb);

  useEffect(() => {
    setHoveredImage(product.thumb);
  }, [product]);

  const renderStarFromNumber = (number) => {
    if (!Number(number)) {
      return;
    }
    const stars = [];
    for (let i = 0; i < +number; i++) {
      stars.push(<StarIcon key={i} fontSize="small" />);
    }
    for (let i = 5; i > +number; i--) {
      stars.push(<StarOutlineIcon key={i} fontSize="small" />);
    }
    return stars;
  };

  const handleClick = (productId) => {
    dispatch(getDetailProduct({ productId }));
  };

  return (
    <>
      <Link
        to={`/products/${product.gender[0]}s-clothing/${product.category}/${product.slug}/${product?._id}`}
        onClick={() => handleClick(product._id)}
      >
        <div
          className="px-2 cursor-pointer relative"
          onMouseEnter={() =>
            isHoverEnabled && setHoveredImage(product.images[0])
          }
          onMouseLeave={() => isHoverEnabled && setHoveredImage(product.thumb)}
        >
          <img src={hoveredImage} alt={product.title} />
          <div className="flex flex-col justify-between gap-2">
            <div>
              <ul className="flex mt-4 gap-3">
                {product.color.map((color, index) => (
                  <li
                    key={index}
                    className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black"
                    style={{ backgroundColor: color }}
                  ></li>
                ))}
              </ul>
            </div>
            <h3 className="font-medium text-[15px] overflow-hidden whitespace-nowrap overflow-ellipsis">
              <Link
                to={`/${product.gender[0]}-clothing/${product.category}/${product.slug}`}
              >
                {product.title}
              </Link>
            </h3>
            <div>
              <span className="text-sm">${product.price}</span>
            </div>
            <span>{renderStarFromNumber(product.totalRatings)}</span>
          </div>
          <span className="absolute top-0 p-3 cursor-pointer transition duration-300 ease-in-out hover:text-[#8D8D8D]">
            <BookmarkBorderOutlinedIcon />
          </span>
        </div>
      </Link>
    </>
  );
}

export default ProductCard;
