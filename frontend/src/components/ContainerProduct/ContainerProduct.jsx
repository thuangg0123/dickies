import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
  getProductByGender,
  getProductByGenderAndCategory,
  getProductParams,
} from "../../store/products/asyncActions";
import ProductCard from "../ProductCard/ProductCard";
import {
  NeedHelps,
  Footer,
  BtnScrollTop,
  CountProduct,
  InputSelect,
} from "../../components";
import icons from "../../ultils/icons";
import FilterProduct from "./FilterProduct";
import { sortPrice } from "../../ultils/constans";

function ContainerProduct({ gender, path, category }) {
  const navigate = useNavigate();

  const [isShow, setIsShow] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [loading, setLoading] = useState(false);
  const [activeClick, setActiveClick] = useState(null);
  const [params] = useSearchParams();
  const [sort, setSort] = useState("");

  const { TuneIcon } = icons;

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.listProducts);
  const counts = useSelector((state) => state.product.counts);
  const categories = useSelector((state) => state.product.categories);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const queryParams = {};

    for (const [key, value] of params.entries()) {
      queryParams[key] = value;
    }

    dispatch(getProductParams(queryParams));
  }, [dispatch, params]);

  useEffect(() => {
    if (gender) {
      if (category) {
        dispatch(getProductByGenderAndCategory({ category, gender }));
      } else {
        dispatch(getProductByGender({ gender }));
        setVisibleProducts(8);
        window.scrollTo(0, 0);
      }
    }
  }, [dispatch, gender, category]);

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

  const handleChangeActiveFilter = useCallback(
    (name) => {
      if (activeClick === name) {
        setActiveClick(null);
      } else {
        setActiveClick(name);
      }
    },
    [activeClick]
  );

  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );

  useEffect(() => {
    navigate({
      pathname: `/products`,
      search: createSearchParams({ sort }).toString(),
    });
  }, [sort]);

  return (
    <>
      <div className="px-10 py-5">
        <div className="font-second text-sm font-semibold">
          <Link to="/">Home</Link> /&nbsp;
          <Link to="/products">Products / </Link>
          <Link to={gender !== "all" ? `/products/${gender}s-clothing` : ""}>
            All
            {gender !== "all"
              ? ` ${capitalizeFirstLetter(gender)}'s Clothing`
              : ""}
          </Link>
          <Link to={`/products/${gender}s-clothing/${category}`}>
            {category ? ` / ${capitalizeFirstLetter(category)}` : ""}
          </Link>
        </div>
        <section className="text-[56px] font-semibold py-4">
          <h2 className="tracking-[-2px]">
            All {category ? capitalizeFirstLetter(category) : ""} Products
            {gender !== "all" ? ` For ${capitalizeFirstLetter(gender)}` : ""}
          </h2>
        </section>
        <div className="font-second flex justify-between text-sm">
          <span>{counts} Results</span>
          <div className="flex gap-10">
            <div className="flex flex-auto items-center gap-4">
              <InputSelect
                changeValue={changeValue}
                value={sort}
                options={sortPrice}
              />
              <FilterProduct
                name="gender"
                activeClick={activeClick}
                handleChangeActiveFilter={handleChangeActiveFilter}
              />
              <FilterProduct
                name="category"
                activeClick={activeClick}
                handleChangeActiveFilter={handleChangeActiveFilter}
              />
            </div>
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {Array.isArray(products) &&
            products
              .slice(0, visibleProducts)
              .map((product, index) => (
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
