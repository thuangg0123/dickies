import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components";

function Public() {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center overflow-hidden">
        <Header />
        <div className="w-main">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Public;
