import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import path from "../../ultils/path";
import { useSelector } from "react-redux";

function AdminLayout() {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (!isLoggedIn || !current || +current.role != 0) {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  }
  return (
    <div>
      <div>AdminLayout</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
