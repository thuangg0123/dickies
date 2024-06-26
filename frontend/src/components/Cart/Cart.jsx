import React from "react";
import icons from "../../ultils/icons";
import "../../index.css";
import { showCart } from "../../store/app/appSlice";
import withBaseComponent from "../../hocs/withBaseComponent";
import { useSelector } from "react-redux";
import { Button } from "../index";
import { getCurrent } from "../../store/user/asyncActions";
import { toast } from "react-toastify";
import { apiRemoveCart } from "../../apis";
import path from "../../ultils/path";
import Swal from "sweetalert2";
import { createSearchParams } from "react-router-dom";

function Cart({ dispatch, navigate }) {
  const { CloseIcon } = icons;
  const { currentCart, current, isLoggedIn } = useSelector(
    (state) => state.user
  );
  const subtotalCart = currentCart?.reduce(
    (currentValue, element) =>
      currentValue + +element?.price * +element?.quantity,
    0
  );
  const handleRemoveItem = async (productId, color) => {
    const response = await apiRemoveCart(productId, color);
    if (response.success) {
      dispatch(getCurrent());
    } else {
      toast.error(response.message);
    }
  };

  const handleSubmit = () => {
    if (!isLoggedIn) {
      return Swal.fire({
        icon: "info",
        title: "Almost!",
        text: "Please login your account before checkout",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Go login!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
          dispatch(showCart());
        }
      });
    } else if (!current?.address) {
      return Swal.fire({
        icon: "info",
        title: "Almost!",
        text: "Please update your address before checkout",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Go update!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate({
            pathname: `/${path.MEMBER}/${path.PERSONAL}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
          dispatch(showCart());
        }
      });
    } else {
      // Nếu có địa chỉ, thực hiện mở tab checkout
      dispatch(showCart());
      window.open(`/${path.CHECKOUT}`, "_blank");
    }
  };

  return (
    <div
      className="w-[500px] h-full bg-white grid grid-rows-10 text-black py-10 top-0 right-0 fixed"
      onClick={(e) => e.stopPropagation()}
    >
      <header className="font-second font-semibold flex justify-between row-span-1 h-full items-center px-8">
        <span>Added to Cart</span>
        <button
          className="custom-text-hover"
          onClick={() => dispatch(showCart({ signal: false }))}
        >
          <CloseIcon style={{ fontSize: "32px" }} />
        </button>
      </header>
      <section
        className={
          currentCart?.length > 0
            ? "row-span-6 h-full max-h-full overflow-y-auto flex flex-col gap-2 px-8"
            : "row-span-6 h-full max-h-full overflow-y-auto flex justify-center items-center px-8"
        }
      >
        {currentCart?.length === 0 && (
          <span className="text-5xl font-semibold text-center font-second">
            Your Shopping Cart is Empty
          </span>
        )}
        {currentCart &&
          currentCart?.map((element) => (
            <div
              className="flex gap-2 mb-2 pb-6 border-b border-black"
              key={element?._id}
            >
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
                  <span>Quantity: {element?.quantity}</span>
                  <span className="font-medium">
                    Subtotal: $
                    {(parseFloat(element?.price) * element?.quantity).toFixed(
                      2
                    )}
                  </span>
                </div>
                <button
                  className="text-sm custom-text-hover underline"
                  onClick={() =>
                    handleRemoveItem(element.product?._id, element?.color)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
      </section>
      {currentCart.length > 0 && (
        <div className="row-span-3 h-full py-3 px-10">
          <div className="flex justify-between font-medium mb-5">
            <span>Subtotal</span>
            <span>${parseFloat(subtotalCart).toFixed(2)}</span>
          </div>
          <div className="flex flex-col gap-4">
            <Button name="Checkout" handleOnClick={handleSubmit} />
            <Button
              handleOnClick={() => {
                dispatch(showCart());
                navigate(`/${path.DETAIL_CART}`);
              }}
              name={`View Cart (${currentCart?.length || 0})`}
              style="p-4 text-black border-2 border-black bg-white font-main font-semibold w-full transition duration-300 ease-in-out hover:bg-black hover:text-white"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default withBaseComponent(Cart);
