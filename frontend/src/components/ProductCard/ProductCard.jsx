import React from "react";
import { Link } from "react-router-dom";
import icons from "../../ultils/icons";

function ProductCard({ product, index }) {
  const { StarIcon, StarOutlineIcon, BookmarkBorderOutlinedIcon } = icons;

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

  return (
    <>
      <Link
        to={`/products/${product.gender[0]}s-clothing/${product.category}/${product.slug}/${product?._id}`}
      >
        <div className="px-2 cursor-pointer relative">
          <img src={product.thumb} alt={product.title} />
          <div className="flex flex-col justify-between gap-2">
            <div>
              <ul className="flex mt-4 gap-3">
                <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                  <div className="w-6 h-6 rounded-full bg-[#506070]"></div>
                </li>
                <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                  <div className="w-6 h-6 rounded-full bg-black"></div>
                </li>
                <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                  <div className="w-6 h-6 rounded-full bg-[#626262]"></div>
                </li>
              </ul>
            </div>
            <h3 className="font-medium text-base overflow-hidden whitespace-nowrap overflow-ellipsis">
              <Link
                to={`/${product.gender[0]}-clothing/${product.category}/${product.slug}`}
              >
                {product.title}
              </Link>
            </h3>
            <div>
              <span>{product.price}$</span>
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
