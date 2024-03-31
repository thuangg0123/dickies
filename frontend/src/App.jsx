import "./App.css";
import { useDispatch, useSelector } from "react-redux";

import { Route, Routes } from "react-router-dom";
import {
  Login,
  Home,
  Public,
  FAQ,
  DetailProduct,
  Blog,
  FinalRegister,
  ResetPassword,
} from "./pages/public";
import path from "./ultils/path";

import "react-multi-carousel/lib/styles.css";
import { getCategories } from "./store/app/asyncActions";

import React, { useEffect } from "react";
import ContainerProduct from "./components/ContainerProduct/ContainerProduct";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createSlug } from "./ultils/helper";

function App() {
  const genders = [
    { gender: "men", path: path.MEN },
    { gender: "women", path: path.WOMEN },
    { gender: "kids", path: path.KIDS },
    // { gender: "all", path: path.ALL },
  ];

  const categories = useSelector((state) => state.app.categories);
  const category = categories.map((element) => createSlug(element.title));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="min-h-screen font-main">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.LOGIN} element={<Login />}></Route>
          <Route path={path.FAQ} element={<FAQ />}></Route>
          <Route path={path.BLOG} element={<Blog />}></Route>
          <Route path={path.FINAL_REGISTER} element={<FinalRegister />}></Route>
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />}></Route>
          <Route
            path={path.PRODUCTS}
            element={<ContainerProduct gender="all" path="products" />}
          ></Route>
          {category.map((categoryItem, index) => {
            return (
              <React.Fragment key={index}>
                <Route
                  key={`category-${index}`}
                  path={`/products/mens-clothing/${categoryItem}`}
                  element={
                    <ContainerProduct gender="men" category={categoryItem} />
                  }
                />
                <Route
                  key={`category-${index}`}
                  path={`/products/womens-clothing/${categoryItem}`}
                  element={
                    <ContainerProduct gender="women" category={categoryItem} />
                  }
                />
                <Route
                  key={`category-${index}`}
                  path={`/products/kidss-clothing/${categoryItem}`}
                  element={
                    <ContainerProduct gender="kids" category={categoryItem} />
                  }
                />
                {/* <Route
                  key={`category-${index}`}
                  path={`/products/alls-clothing/${categoryItem}`}
                  element={
                    <ContainerProduct gender="all" category={categoryItem} />
                  }
                /> */}
              </React.Fragment>
            );
          })}
          {genders.map((gender) => (
            <Route
              key={gender}
              path={`products/${gender.path}`}
              element={
                <ContainerProduct gender={gender.gender} path={gender.path} />
              }
            />
          ))}
          <Route
            path={`${path.PRODUCTS}/:${path.MEN}/:category/:slug/:productId`}
            element={<DetailProduct gender="men" />}
          />
          <Route
            path={`${path.PRODUCTS}/:${path.WOMEN}/:category/:slug/:productId`}
            element={<DetailProduct gender="women" />}
          />
          <Route
            path={`${path.PRODUCTS}/:${path.KIDS}/:category/:slug/:productId`}
            element={<DetailProduct gender="kids" />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
