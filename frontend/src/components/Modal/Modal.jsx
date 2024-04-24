import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../store/app/appSlice";

function Modal({ children }) {
  const dispatch = useDispatch();
  return (
    <div
      className="absolute inset-0 bg-overlay z-[51] flex items-center justify-center h-full"
      onClick={() =>
        dispatch(showModal({ isShowModal: false, modalChildren: null }))
      }
    >
      {children}
    </div>
  );
}

export default memo(Modal);
