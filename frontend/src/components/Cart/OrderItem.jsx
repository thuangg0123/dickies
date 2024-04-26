import React, { Fragment } from "react";
import icons from "../../ultils/icons";

function OrderItem({
  element,
  handleDProduct,
  handleIProduct,
  countProduct,
  handleShowModal,
}) {
  const { RemoveIcon, AddIcon } = icons;
  console.log(countProduct);
  return (
    <div>
      <Fragment>
        <div className="flex flex-col mb-2 py-6 border-b border-black">
          <div className="flex justify-between gap-2 ">
            <div className="flex gap-4">
              <img
                src={element?.thumb}
                alt=""
                className="w-[200px] h-[200px] object-cover"
              />
              <div className="flex flex-col gap-4 font-second">
                <div className="flex flex-col gap-2 text-sm">
                  <span className="text-base font-semibold font-main">
                    {element?.product?.title}
                  </span>
                  <span className="font-medium">
                    Price: ${parseFloat(element?.price).toFixed(2)}
                  </span>
                  <span>Color: {element?.color}</span>
                  <span>Size: {element?.size}</span>
                  <span className="font-medium">
                    Subtotal: ${parseFloat(element?.product?.price).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2 font-medium text-base relative">
              <button
                onClick={handleDProduct}
                className={`absolute left-[15px] top-[10px] ${
                  element?.quantity === 1
                    ? "opacity-50 cursor-not-allowed pointer-events-none"
                    : ""
                }`}
              >
                <RemoveIcon style={{ fontSize: 16 }} />
              </button>
              <input
                type="text"
                value={element?.quantity}
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
              <button className="underline custom-text-hover">Edit</button>
            </div>
            <div className="flex gap-3">
              <button className="custom-text-hover">Save For Latter</button>
              <button
                className="custom-text-hover"
                onClick={() => handleShowModal(element)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
}

export default OrderItem;
