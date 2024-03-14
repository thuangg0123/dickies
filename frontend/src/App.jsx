import "./App.css";
import { useDispatch } from "react-redux";

import { Route, Routes } from "react-router-dom";
import { Login, Home, Public, FAQ, DetailProduct, Blog } from "./pages/public";
import path from "./ultils/path";

import "react-multi-carousel/lib/styles.css";
import { getCategories } from "./store/app/asyncActions";

import { useEffect } from "react";
import ContainerProduct from "./components/ContainerProduct/ContainerProduct";

function App() {
  const genders = [
    { gender: "men", path: path.MEN },
    { gender: "women", path: path.WOMEN },
    { gender: "kids", path: path.KIDS },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.LOGIN} element={<Login />}></Route>
          <Route path={path.FAQ} element={<FAQ />}></Route>
          <Route path={path.BLOG} element={<Blog />}></Route>
          {genders.map((gender) => (
            <Route
              key={gender}
              path={`${gender.path}`}
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
