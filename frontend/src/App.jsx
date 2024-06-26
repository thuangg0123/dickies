import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-multi-carousel/lib/styles.css";
import path from "./ultils/path";
import { getCategories } from "./store/app/asyncActions";
import {
  Dashboard,
  AdminLayout,
  ManageOrder,
  ManageProducts,
  ManageUser,
  CreateProducts,
} from "./pages/admin";
import { MemberLayout, Personal, HistoryOrder, Checkout } from "./pages/member";
import {
  Login,
  Home,
  Public,
  FAQ,
  Blog,
  FinalRegister,
  ResetPassword,
} from "./pages/public/index";
import {
  DetailProduct,
  ContainerProduct,
  Modal,
  NotFound,
  Cart,
  DetailCart,
  WishList,
} from "./components/index";
import { showCart } from "./store/app/appSlice";

function App() {
  const detailProduct = useSelector((state) => state.product.detailProduct);
  const { isShowModal, modalChildren, isShowCart } = useSelector(
    (state) => state.app
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="relative font-main">
      {isShowCart && (
        <div
          className="absolute inset-0 bg-overlay z-[51] flex justify-end"
          onClick={() => dispatch(showCart({ signal: false }))}
        >
          <Cart />
        </div>
      )}
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
        <Route path={path.CHECKOUT} element={<Checkout />}></Route>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}></Route>
          {/* <Route path={path.FAQ} element={<FAQ />}></Route>
          <Route path={path.BLOG} element={<Blog />}></Route> */}
          <Route path={path.WISH_LIST} element={<WishList />} />
          <Route path={path.DETAIL_CART} element={<DetailCart />}></Route>
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />}></Route>
          <Route
            path={path.PRODUCTS}
            element={<ContainerProduct gender="all" path="products" />}
          ></Route>
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
          <Route path={path.LOGIN} element={<Login />}></Route>
          <Route path={path.FINAL_REGISTER} element={<FinalRegister />}></Route>
          <Route path={path.ALL} element={<Home />}></Route>
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProducts />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.CREATE_PRODUCTS} element={<CreateProducts />} />
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.HISOTRY_ORDER} element={<HistoryOrder />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
