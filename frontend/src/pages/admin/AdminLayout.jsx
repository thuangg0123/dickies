import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import path from "../../ultils/path";
import { useSelector } from "react-redux";
import { AdminSidebar } from "../../components";

function AdminLayout() {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (!isLoggedIn || !current || +current.role != 0) {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  }
  return (
    <div className="flex w-full bg-[#F5F5F5] min-h-screen relative text-black font-second">
      <div className="w-[280px] top-0 bottom-0 flex-none fixed text-white z-[99]">
        <AdminSidebar />
      </div>
      <div className="w-[280px]"></div>
      <div className="flex-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
