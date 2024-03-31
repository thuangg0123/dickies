import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import path from "../../../ultils/path";

import { Breadcrum } from "../../../components/index";

import { LeftDetaiProduct, RightDetaiProduct } from "../index";
import { apiGetDetailProduct } from "../../../apis";
import { getDetailProduct } from "../../../store/products/asyncActions";

import { NeedHelps, Footer, BtnScrollTop } from "../../../components/index";

function DetailProduct() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector((state) => state.product.detailProduct);
  const listProducts = useSelector((state) => state.product.listProducts);

  const fetchProductData = async () => {
    await apiGetDetailProduct(productId);
  };

  useEffect(() => {
    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  const getRandomProducts = () => {
    const randomProducts = [...listProducts];
    return randomProducts?.sort(() => Math.random() - 0.5).slice(0, 4);
  };

  const randomProducts = getRandomProducts();

  const handleClick = (productId) => {
    dispatch(getDetailProduct({ productId }));
  };

  return (
    <>
      <div className="px-10 py-5">
        <div className="font-second text-sm font-semibold">
          <Breadcrum
            title={product?.title}
            category={product?.category}
            gender={product?.gender?.[0]}
            product="Products"
          />
        </div>
        <div className="grid grid-cols-3 gap-10 my-5">
          <LeftDetaiProduct />
          <RightDetaiProduct />
        </div>
        <div className="my-10">
          <div className="border-b-2 border-black">
            <h2 className="text-[56px] font-second font-semibold">Reviews</h2>
          </div>
          <div className="grid grid-cols-3 py-5 items-center">
            <div>left</div>
            <div>center</div>
            <div>right</div>
          </div>
        </div>
        <div className="my-10">
          <h2 className="py-5 text-3xl font-second font-bold uppercase">
            Another Item Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {randomProducts.map((product, index) => (
              <Link
                to={`/products/${product.gender[0]}s-clothing/${product.category}/${product.slug}/${product?._id}`}
                onClick={() => handleClick(product._id)}
              >
                <div className="px-2 cursor-pointer relative">
                  <img src={product.thumb} alt={product.title} />
                  <div className="flex flex-col justify-between gap-2">
                    <h3 className="font-medium text-[15px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                      <Link to={`/products/${product.id}`}>
                        {product.title}
                      </Link>
                    </h3>
                    <div>
                      <span className="text-sm">${product.price}</span>
                    </div>
                  </div>
                  <span className="absolute top-0 p-3 cursor-pointer transition duration-300 ease-in-out hover:text-[#8D8D8D]">
                    <svg
                      className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      data-testid="BookmarkBorderOutlinedIcon"
                    >
                      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2m0 15-5-2.18L7 18V5h10z"></path>
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <NeedHelps />
      <Footer />
      <BtnScrollTop />
    </>
  );
}

export default DetailProduct;
