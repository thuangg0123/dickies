import React, { memo, useCallback, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Breadcrum } from "../../../components/index";

import { LeftDetaiProduct, RightDetaiProduct, VoteOptions } from "../index";
import { apiGetDetailProduct } from "../../../apis";
import {
  getDetailProduct,
  submitRating,
} from "../../../store/products/asyncActions";
import { showModal } from "../../../store/app/appSlice";

import {
  NeedHelps,
  Footer,
  BtnScrollTop,
  VoteBar,
  Ratings,
  Button,
} from "../../../components/index";

import icons from "../../../ultils/icons";
import Swal from "sweetalert2";
import path from "../../../ultils/path";

function DetailProduct({ ratings }) {
  const navigate = useNavigate();
  const { StarIcon, StarOutlineIcon } = icons;
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector((state) => state.product.detailProduct);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const detailProduct = useSelector((state) => state.product.detailProduct);

  const fetchProductData = async () => {
    await apiGetDetailProduct(productId);
  };

  useEffect(() => {
    if (productId) {
      fetchProductData();
    }
    window.scrollTo(0, 0);
  }, [productId]);

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

  const handleSubmitVoteOptions = async ({ comment, score }) => {
    if (!comment || !score || !productId) {
      alert("Please vote when click submit");
      return;
    }
    await dispatch(submitRating({ star: score, comment: comment, productId }));
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
  };

  const handleVoteNow = () => {
    if (!isLoggedIn) {
      Swal.fire({
        text: "Login to vote !",
        cancelButtonText: "Cancel",
        confirmButtonText: "Go login",
        showCancelButton: true,
        title: "Oops !",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/${path.LOGIN}`);
        }
      });
    } else {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <VoteOptions handleSubmitVoteOptions={handleSubmitVoteOptions} />
          ),
        })
      );
    }
  };

  return (
    <>
      <div>
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
            <div className="grid grid-cols-3 py-5 items-center font-second">
              <div>
                <div className="flex flex-col gap-1">
                  {Array.from(Array(5).keys())
                    .reverse()
                    .map((element) => (
                      <VoteBar
                        number={element + 1}
                        key={element + 1}
                        ratingTotal={ratings?.length}
                        ratingCount={
                          ratings?.filter((elemt) => elemt.star === element + 1)
                            ?.length
                        }
                      />
                    ))}
                </div>
              </div>
              <div className="flex justify-center">
                <div>
                  <h3 className="font-bold pb-3">OVERALL RATING</h3>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">
                      {detailProduct?.totalRatings}/5
                    </div>
                    <div className="text-sm">
                      <div className="flex">
                        {renderStarFromNumber(detailProduct?.totalRatings)?.map(
                          (element, index) => (
                            <span key={index}>{element}</span>
                          )
                        )}
                      </div>
                      <div>
                        <span className="hover:underline cursor-pointer">
                          {ratings?.length} Reviews
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="py-3">
                    7369 out of 8169 (90%) reviewers recommend this product
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5 justify-between items-center">
                <span className="font-bold uppercase">
                  Do you review this product ?
                </span>
                <Button
                  name="Review Now"
                  handleOnClick={() => handleVoteNow()}
                />
              </div>
            </div>
          </div>
        </div>
        <NeedHelps />
        <Footer />
        <BtnScrollTop />
      </div>
    </>
  );
}

export default memo(DetailProduct);
