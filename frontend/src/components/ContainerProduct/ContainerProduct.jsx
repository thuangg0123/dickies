import React, { useEffect, useState, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import { getProductParams } from "../../store/products/asyncActions";
import ProductCard from "../ProductCard/ProductCard";
import {
  NeedHelps,
  Footer,
  BtnScrollTop,
  InputSelect,
  Pagination,
} from "../../components";
import icons from "../../ultils/icons";
import FilterProduct from "./FilterProduct";
import { sortPrice } from "../../ultils/constans";

function ContainerProduct({ gender, path, category }) {
  const navigate = useNavigate();

  const [isShow, setIsShow] = useState(true);
  const [activeClick, setActiveClick] = useState(null);
  const [params] = useSearchParams();
  const [sort, setSort] = useState("");

  const { TuneIcon } = icons;

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.listProducts);
  const counts = useSelector((state) => state.product.counts);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const queryParams = {};

    for (const [key, value] of params.entries()) {
      queryParams[key] = value;
    }

    dispatch(getProductParams(queryParams));

    window.scrollTo(0, 0);
  }, [dispatch, params]);

  useEffect(() => {
    if (sort) {
      let param = [];
      for (let i of params.entries()) {
        param.push(i);
      }
      const queries = {};
      for (let i of param) {
        queries[i[0]] = i[1];
      }
      queries.sort = sort;
      queries.page = 1;
      navigate({
        pathname: `/products`,
        search: createSearchParams(queries).toString(),
      });
    }
  }, [sort]);

  const handleOpenFilter = () => {
    setIsShow(!isShow);
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

  return (
    <>
      <div className="px-4 py-2 md:px-10 md:py-5">
        <div className="font-second text-xs md:text-sm font-semibold">
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
          /&nbsp;
          <Link to="/products" className="hover:text-blue-500">
            Products /
          </Link>
          <Link
            to={gender !== "all" ? `/products/${gender}s-clothing` : ""}
            className="hover:text-blue-500"
          >
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 md:mt-8">
          {Array.isArray(products) &&
            products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                isHoverEnabled={path !== "/"}
              />
            ))}
        </div>
        {products?.length > 0 && (
          <div className="w-full m-auto my-4 flex justify-center">
            <Pagination totalCount={counts} />
          </div>
        )}
      </div>
      <NeedHelps />
      <Footer />
      <BtnScrollTop />
    </>
  );
}

export default memo(ContainerProduct);
