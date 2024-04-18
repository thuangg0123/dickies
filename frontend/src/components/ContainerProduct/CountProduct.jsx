import React, { memo } from "react";
import { useSelector } from "react-redux";

function CountProduct({ visibleProducts, handleLoadMore }) {
  const counts = useSelector((state) => state.product.counts);

  return (
    <>
      <div className="text-center mt-10 font-second">
        <span>
          You've viewed {visibleProducts} of {counts} products
        </span>
        <div className="flex justify-center items-center m-5">
          <div className="w-[50%] bg-gray-200 h-1 rounded-full">
            <div
              className="bg-black h-full rounded-full"
              style={{
                width: `${(visibleProducts / counts) * 100}%`,
              }}
            ></div>
          </div>
        </div>
        <button
          className="bg-black text-white my-3 px-10 py-4 hover:bg-[#8D8D8D] transition duration-300 ease-in-out font-bold"
          onClick={handleLoadMore}
        >
          Load 8 More
        </button>
      </div>
    </>
  );
}

export default memo(CountProduct);
