import React, { useState, useCallback, Fragment } from "react";
import { useSelector } from "react-redux";
import icons from "../../ultils/icons";

function DetailCart() {
  const { RemoveIcon, AddIcon } = icons;
  const { current } = useSelector((state) => state.user);
  const [countProduct, setCountProduct] = useState(1);

  const handleIProduct = useCallback(() => {
    setCountProduct((prevCount) => prevCount + 1);
  }, []);

  const handleDProduct = useCallback(() => {
    if (countProduct > 1) {
      setCountProduct((prevCount) => prevCount - 1);
    }
  }, [countProduct]);
  return (
    <div className="p-10">
      <div>
        <h1 className="text-5xl font-semibold mb-10">Your Cart</h1>
        <div className="grid grid-cols-10 gap-5">
          <div className="col-span-7">
            {current?.cart &&
              current?.cart?.map((element) => (
                <Fragment key={element._id}>
                  <div className="flex flex-col mb-2 pb-6 border-b border-black">
                    <div className="flex justify-between gap-2 ">
                      <div className="flex">
                        <img
                          src={element.product.thumb}
                          alt=""
                          className="w-[200px] h-[200px] object-cover"
                        />
                        <div className="flex flex-col gap-4 font-second">
                          <div className="flex flex-col gap-2 text-sm">
                            <span className="text-base font-semibold font-main">
                              {element?.product?.title}
                            </span>
                            <span className="font-medium">
                              Price: $
                              {parseFloat(element?.product?.price).toFixed(2)}
                            </span>
                            <span>Color: {element?.product?.color[0]}</span>
                            <span>Size: {element?.product?.sizes[0]}</span>
                            <span className="font-medium">
                              Subtotal: $
                              {parseFloat(element?.product?.price).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 font-medium text-base relative">
                        <button
                          onClick={handleDProduct}
                          className={`absolute left-[15px] top-[10px] ${
                            countProduct === 1
                              ? "opacity-50 cursor-not-allowed pointer-events-none"
                              : ""
                          }`}
                        >
                          <RemoveIcon style={{ fontSize: 16 }} />
                        </button>
                        <input
                          type="text"
                          value={countProduct}
                          readOnly
                          className="border border-gray-400 text-center w-[120px] py-3 focus:outline-none"
                        />
                        <button
                          onClick={handleIProduct}
                          className="absolute right-[15px] top-[10px]"
                        >
                          <AddIcon style={{ fontSize: 16 }} />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-start font-second text-xs underline">
                      <div></div>
                      <div>
                        <button className="underline custom-text-hover">
                          Edit
                        </button>
                      </div>
                      <div className="flex gap-3">
                        <button className="custom-text-hover">
                          Save For Latter
                        </button>
                        <button className="custom-text-hover">Remove</button>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))}
          </div>
          <div className="col-span-3">dsadasdas</div>
        </div>
      </div>
    </div>
  );
}

export default DetailCart;
