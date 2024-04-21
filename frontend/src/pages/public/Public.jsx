import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/index";

function Public() {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center overflow-hidden">
        <Header />
        <div className="md:w-full lg:w-full pt-[80px]">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Public;
