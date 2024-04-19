import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-multi-carousel/lib/styles.css";
import path from "./ultils/path";
import { getCategories } from "./store/app/asyncActions";
import { createSlug } from "./ultils/helper";

import {
  Login,
  Home,
  Public,
  FAQ,
  Blog,
  FinalRegister,
  ResetPassword,
} from "./pages/public/index";
import { DetailProduct, ContainerProduct, Modal } from "./components/index";

function App() {
  const categories = useSelector((state) => state.app.categories);
  const category = categories.map((element) => createSlug(element.title));
  const detailProduct = useSelector((state) => state.product.detailProduct);

  const { isShowModal, modalChildren } = useSelector((state) => state.app);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="relative font-main">
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
      {isShowModal && <Modal>{modalChildren}</Modal>}
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
              </React.Fragment>
            );
          })}
          <Route
            path={`${path.PRODUCTS}/:${path.MEN}/:category/:slug/:productId`}
            element={
              <DetailProduct ratings={detailProduct?.ratings} gender="men" />
            }
          />
          <Route
            path={`${path.PRODUCTS}/:${path.WOMEN}/:category/:slug/:productId`}
            element={
              <DetailProduct ratings={detailProduct?.ratings} gender="women" />
            }
          />
          <Route
            path={`${path.PRODUCTS}/:${path.KIDS}/:category/:slug/:productId`}
            element={
              <DetailProduct ratings={detailProduct?.ratings} gender="kids" />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
