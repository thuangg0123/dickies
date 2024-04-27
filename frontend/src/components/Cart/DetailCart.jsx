import React, { useState } from "react";
import { useSelector } from "react-redux";
import icons from "../../ultils/icons";
import { NeedHelps, Footer, BtnScrollTop, Button } from "../../components";
import withBaseComponent from "../../hocs/withBaseComponent";
import path from "../../ultils/path";
import { apiRemoveCart } from "../../apis";
import { getCurrent } from "../../store/user/asyncActions";
import { toast } from "react-toastify";
import OrderItem from "./OrderItem";
import { Paypal } from "../index";

function DetailCart({ navigate, dispatch }) {
  const {
    CloseIcon,
    ShoppingCartOutlinedIcon,
    ComputerIcon,
    Person2OutlinedIcon,
  } = icons;
  const { isLoggedIn, currentCart } = useSelector((state) => state.user);
  const [isShow, setIsShow] = useState();
  const [productItem, setProductItem] = useState(null);

  const subtotalCart = currentCart?.reduce(
    (currentValue, element) =>
      currentValue + +element.price * +element.quantity,
    0
  );

  const handleShowModal = (product) => {
    setIsShow(true);
    setProductItem(product);
  };

  const handleRemoveItem = async (productId, color) => {
    const response = await apiRemoveCart(productId, color);
    if (response.success) {
      dispatch(getCurrent());
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    setIsShow(false);
    setProductItem(null);
  };

  return (
    <>
      <div className="p-10">
        {isLoggedIn && currentCart <= 0 && (
          <div className="flex justify-center items-center flex-col gap-10">
            <div className="text-5xl font-semibold text-center ">
              Your Shopping Cart Is Currently Empty
            </div>
            <ShoppingCartOutlinedIcon fontSize="large" />
            <div className="text-center w-[300px] flex flex-col gap-5">
              <h3 className="text-4xl font-semibold font-second">
                Get Shopping!
              </h3>
              <span className="text-base font-second">
                Go. Go fill it up with all your fashion hopes and dreams.
              </span>
              <Button
                name="Continue Shopping"
                handleOnClick={() => navigate("/")}
              />
            </div>
          </div>
        )}
        {isLoggedIn && currentCart?.length > 0 && (
          <div className="grid grid-cols-10">
            <div className="col-span-7">
              <h1 className="text-5xl font-semibold mb-10">Your Cart</h1>
              {currentCart?.map((element) => (
                <OrderItem
                  defaultQuantity={element?.quantity}
                  element={element}
                  key={element._id}
                  handleShowModal={handleShowModal}
                />
              ))}
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-2">
              <h3 className="text-xl font-semibold mb-10">Order Summary</h3>
              <ul className="flex flex-col font-second gap-5 text-sm">
                <li className="flex justify-between border-b border-gray-400 pb-5">
                  <span className="font-medium">Subtotal</span>
                  <span>${parseFloat(subtotalCart).toFixed(2)}</span>
                </li>
                <li className="flex justify-between border-b border-gray-400 pb-5">
                  <span className="font-medium">Shipping</span>
                  <span>{currentCart?.length > 0 ? "$6.99" : 0}</span>
                </li>
                <li className="flex justify-between border-b border-gray-400 pb-5">
                  <span className="font-medium">Shipping Discount</span>
                  <span>{currentCart?.length > 0 ? "-$6.99" : 0}</span>
                </li>
              </ul>
              <div className="font-second flex justify-between py-5 font-semibold">
                <span>Total</span>
                <span>${parseFloat(subtotalCart).toFixed(2)}</span>
              </div>
              <div>
                <Button
                  name="Secure Checkout"
                  handleOnClick={() => navigate(`/${path.CHECKOUT}`)}
                />
                <div className="py-2 text-center">OR</div>
                <div>
                  <Paypal amount={120} />
                </div>
              </div>
            </div>
          </div>
        )}
        {!isLoggedIn && (
          <div className="flex justify-between items-center gap-10 flex-col">
            <div className="text-5xl font-semibold text-center ">
              Your Shopping Cart Is Currently Empty
            </div>
            <div className="flex justify-between w-full">
              <div className="flex flex-col justify-center items-center gap-5">
                <ShoppingCartOutlinedIcon fontSize="large" />
                <div className="text-center w-[300px] flex flex-col gap-5">
                  <h3 className="text-4xl font-semibold font-second">
                    Get Shopping!
                  </h3>
                  <span className="text-base font-second">
                    Go. Go fill it up with all your fashion hopes and dreams.
                  </span>
                  <Button
                    name="Continue Shopping"
                    handleOnClick={() => navigate("/")}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-5">
                <ComputerIcon fontSize="large" />
                <div className="text-center w-[300px] flex flex-col gap-5">
                  <h3 className="text-4xl font-semibold font-second">
                    Sync & Shop
                  </h3>
                  <span className="text-base font-second">
                    Sync your cart across all devices to see the same thing on
                    the go or at home.
                  </span>
                  <Button
                    name="Sign In"
                    handleOnClick={() => navigate("/login")}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-5">
                <Person2OutlinedIcon fontSize="large" />
                <div className="text-center w-[300px] flex flex-col gap-5">
                  <h3 className="text-4xl font-semibold font-second">
                    Create Account
                  </h3>
                  <span className="text-base font-second">
                    Get access to your registry, order history, express checkout
                    & more!
                  </span>
                  <Button
                    name="Create Account"
                    handleOnClick={() => navigate("/login")}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <NeedHelps />
      <Footer />
      <BtnScrollTop />
      {isShow && (
        <div
          className="fixed top-0 left-0 bottom-0 right-0 bg-overlay flex justify-center items-center z-50"
          onClick={() => setIsShow(false)}
        >
          <div
            className="min-w-[664px] relative flex flex-col gap-8 bg-white p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold">Remove Item?</h2>
              <button
                className="custom-text-hover"
                onClick={() => setIsShow(false)}
              >
                <CloseIcon />
              </button>
            </div>
            <div className="flex flex-col font-second gap-3">
              <span>Are you sure you want to remove this item?</span>
              <span className="font-semibold">{currentCart?.title}</span>
            </div>
            <div className="flex gap-5">
              <Button
                name="Move to Wishlist"
                style="p-4 border-2 border-black text-black bg-white font-main font-semibold w-full transition duration-300 ease-in-out hover:bg-black hover:text-white"
              />
              <Button
                name="Remove"
                handleOnClick={() =>
                  handleRemoveItem(
                    productItem?.product?._id,
                    productItem?.color
                  )
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default withBaseComponent(DetailCart);
