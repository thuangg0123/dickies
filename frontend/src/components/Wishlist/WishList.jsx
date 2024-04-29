import React from "react";
import withBaseComponent from "../../hocs/withBaseComponent";
import { useSelector } from "react-redux";
import {
  ProductCard,
  NeedHelps,
  Footer,
  BtnScrollTop,
  Button,
} from "../../components";

function WishList({ dispatch, navigate }) {
  const { current } = useSelector((state) => state.user);
  console.log(current);
  return (
    <>
      <div className="w-full relative font-second font-medium">
        <header className="text-4xl font-semibold py-4 px-8">Wish List</header>
        {current?.wishList.length <= 0 ? (
          <div className="flex justify-center items-center m-10">
            <div className="flex flex-col">
              <div className="text-5xl mb-5">You currently have no items</div>
              <div className="flex justify-center">
                <Button
                  name="Shopping Now"
                  handleOnClick={() => navigate("/")}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 w-full grid grid-cols-3 gap-4">
            {current?.wishList?.map((product) => (
              <div key={product._id} className="w-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <NeedHelps />
      <Footer />
      <BtnScrollTop />
    </>
  );
}

export default withBaseComponent(WishList);
