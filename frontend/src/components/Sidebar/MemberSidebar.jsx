import React, { memo, Fragment, useState } from "react";
import { memberSidebar } from "../../ultils/constans";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { logout } from "../../store/user/userSlice";
import { useSelector } from "react-redux";
import avatarDefault from "../../img/anonymous.png";
import withBaseComponent from "../../hocs/withBaseComponent";

const activedStyle =
  "px-4 py-2 flex items-center gap-2 font-semibold font-second bg-[#B22714]";
const notActiveStyle =
  "px-4 py-2 flex items-center gap-2 font-semibold font-second hover:bg-[#B22714]";

function MemberSidebar(props) {
  const { current } = useSelector((state) => state.user);

  return (
    <div className="bg-black py-4 h-full text-white">
      <div className="flex justify-center gap-2 items-center flex-col py-4">
        <div className="w-full flex items-center justify-center py-4">
          <img
            src={current?.avatar || avatarDefault}
            alt=""
            className="w-16 h-16 object-cover rounded-full"
          />
        </div>
        <small className="text-base">{`${current?.firstName} ${current?.lastName}`}</small>
      </div>
      <div>
        {memberSidebar.map((element) => {
          return (
            <Fragment key={element.id}>
              {element.type === "SINGLE" && element.text === "Logout" ? (
                <button
                  onClick={() => props.dispatch(logout())}
                  to={element.path}
                  className="px-4 py-2 w-full flex items-center gap-2 font-semibold font-second hover:bg-[#B22714]"
                >
                  <span>{element.icon}</span>
                  <span>{element.text}</span>
                </button>
              ) : (
                <NavLink
                  to={element.path}
                  className={({ isActive }) =>
                    clsx(isActive && activedStyle, !isActive && notActiveStyle)
                  }
                >
                  <span>{element.icon}</span>
                  <span>{element.text}</span>
                </NavLink>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default withBaseComponent(memo(MemberSidebar));
