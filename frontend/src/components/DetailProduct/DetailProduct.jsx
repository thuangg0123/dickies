import React, { memo, useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  createSearchParams,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Breadcrum } from "../../components/index";
import { LeftDetaiProduct, RightDetaiProduct, VoteOptions } from "../index";
import { apiGetDetailProduct, apiUpdateCart } from "../../apis";
import { submitRating } from "../../store/products/asyncActions";
import { showModal } from "../../store/app/appSlice";
import {
  NeedHelps,
  Footer,
  BtnScrollTop,
  VoteBar,
  Button,
  Comment,
} from "../../components/index";
import icons from "../../ultils/icons";
import Swal from "sweetalert2";
import path from "../../ultils/path";
import withBaseComponent from "../../hocs/withBaseComponent";
import { getCurrent } from "../../store/user/asyncActions";
import { toast } from "react-toastify";

function DetailProduct({ ratings, dispatch, navigate }) {
  const [countProduct, setCountProduct] = useState(1);
  const [variant, setVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentVariant, setCurrentVariant] = useState({
    title: "",
    thumb: "",
    images: [],
    price: "",
  });
  const { StarIcon, StarOutlineIcon } = icons;
  const { current } = useSelector((state) => state.user);
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
    await dispatch(
      submitRating({
        star: score,
        comment: comment,
        productId,
        updatedAt: Date.now(),
      })
    );
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

  useEffect(() => {
    if (variant) {
      setCurrentVariant({
        price: detailProduct?.variants?.find(
          (element) => element.sku === variant
        )?.price,
        images: detailProduct?.variants?.find(
          (element) => element.sku === variant
        )?.images,
        thumb: detailProduct?.variants?.find(
          (element) => element.sku === variant
        )?.thumb,
        color: detailProduct?.variants?.find(
          (element) => element.sku === variant
        )?.color,
        quantity: countProduct,
        size: selectedSize,
      });
    } else {
      setCurrentVariant({
        thumb: detailProduct.thumb,
        images: detailProduct.images,
        price: detailProduct.price,
        quantity: countProduct,
        color: detailProduct.color[0],
      });
    }
  }, [variant, detailProduct]);

  const handleAddToCart = async () => {
    if (!current) {
      return Swal.fire({
        title: "Almost ...",
        text: "Please login logged in to perform this action",
        icons: "info",
        showCancelButton: true,
        confirmButtonText: "Go to login page",
      }).then(async (results) => {
        if (results.isConfirmed) {
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
        }
      });
    }
    const response = await apiUpdateCart({
      productId: detailProduct?._id,
      thumb: currentVariant?.thumb || detailProduct?.thumb,
      color: currentVariant?.color || detailProduct?.color[0],
      quantity: countProduct,
      size: selectedSize || detailProduct?.sizes[0],
      price: currentVariant?.price || detailProduct?.price,
    });
    if (response.success) {
      toast.success(response.message);
      dispatch(getCurrent());
    } else {
      toast.error(response.message);
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
              currentVariant={currentVariant}
            />
          </div>
          <div className="grid lg:grid-cols-3 gap-10 my-5 md:grid-cols-2">
            <LeftDetaiProduct
              currentVariant={currentVariant}
              setVariant={setVariant}
              detailProduct={detailProduct}
            />
            <RightDetaiProduct
              setSelectedSize={setSelectedSize}
              selectedSize={selectedSize}
              countProduct={countProduct}
              setCountProduct={setCountProduct}
              handleAddToCart={handleAddToCart}
              currentVariant={currentVariant}
              setVariant={setVariant}
              detailProduct={detailProduct}
            />
          </div>
          <div className="my-10">
            <div className="border-b-2 border-black">
              <h2 className="text-[56px] font-second font-semibold">Reviews</h2>
            </div>
            <div className="grid lg:grid-cols-3 py-5 items-center font-second md:grid-cols-1 md:gap-[10px]">
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
              <div className="flex lg:justify-center md:justify-normal">
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
          <div className="flex flex-col gap-4">
            {product?.ratings?.map((element) => (
              <Comment
                key={element._id}
                star={element.star}
                updatedAt={element.updatedAt}
                comment={element.comment}
                name={
                  element.postedBy
                    ? `${element.postedBy.lastName} ${element.postedBy.firstName}`
                    : "Anonymous"
                }
              />
            ))}
          </div>
        </div>
        <NeedHelps />
        <Footer />
        <BtnScrollTop />
      </div>
    </>
  );
}

export default withBaseComponent(memo(DetailProduct));
