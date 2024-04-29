import React, { memo } from "react";
import { Outlet, Navigate } from "react-router-dom";
import path from "../../ultils/path";
import { useSelector } from "react-redux";
import MemberSidebar from "../../components/Sidebar/MemberSidebar";

function MemberLayout() {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (!isLoggedIn || !current) {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  }
  return (
    <div className="flex">
      <div className="w-[280px] top-0 bottom-0 flex-none fixed text-whit">
        <MemberSidebar />
      </div>
      <div className="w-[280px]"></div>
      <div className="flex-auto bg-[#F5F5F5] min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default memo(MemberLayout);
