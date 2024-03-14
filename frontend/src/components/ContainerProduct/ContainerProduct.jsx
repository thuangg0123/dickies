import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { getProductByGender } from "../../store/products/asyncActions";
import ProductCard from "../ProductCard/ProductCard";
import {
  NeedHelps,
  Footer,
  BtnScrollTop,
  CountProduct,
} from "../../components";
import icons from "../../ultils/icons";

function ContainerProduct({ gender, path }) {
  const [isShow, setIsShow] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [loading, setLoading] = useState(false);
  const { TuneIcon } = icons;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.listProducts);
  const counts = useSelector((state) => state.product.counts);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    dispatch(getProductByGender({ gender }));
    setVisibleProducts(8);
    window.scrollTo(0, 0);
  }, [dispatch, gender]);

  const handleOpenFilter = () => {
    setIsShow(!isShow);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleProducts(visibleProducts + 8);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className="px-10 py-5">
        <div className="font-second text-sm font-semibold">
          <Link to="/">Home</Link> /&nbsp;
          <Link to={`/${path}`}>
            All {capitalizeFirstLetter(gender)}'s Clothing
          </Link>
        </div>
        <section className="text-[56px] font-semibold py-4">
          <h2 className="tracking-[-2px]">
            All Product For {capitalizeFirstLetter(gender)}
          </h2>
        </section>
        <div className="font-second flex justify-between text-sm">
          <span>{counts} Results</span>
          <button
            className="transition duration-300 ease-in-out hover:text-[#8D8D8D] font-semibold"
            onClick={handleOpenFilter}
          >
            Filter & Sort
            <span className="ml-2 ">
              <TuneIcon />
            </span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {products.slice(0, visibleProducts).map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              isHoverEnabled={path !== "/"}
            />
          ))}
        </div>
        {loading ? (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <ClipLoader color={"#fff"} loading={loading} size={50} />
          </div>
        ) : (
          <CountProduct
            visibleProducts={visibleProducts}
            handleLoadMore={handleLoadMore}
          />
        )}
      </div>
      <NeedHelps />
      <Footer />
      <BtnScrollTop />
    </>
  );
}

export default ContainerProduct;
