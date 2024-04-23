import React, { memo, Fragment, useState } from "react";
import { memberSidebar } from "../../ultils/constans";
import { NavLink } from "react-router-dom";
import icons from "../../ultils/icons";
import clsx from "clsx";
import { useSelector } from "react-redux";
import avatarDefault from "../../img/anonymous.png";

const activedStyle =
  "px-4 py-2 flex items-center gap-2 font-semibold font-second bg-[#B22714]";
const notActiveStyle =
  "px-4 py-2 flex items-center gap-2 font-semibold font-second hover:bg-[#B22714]";

function MemberSidebar() {
  const { KeyboardArrowDownIcon, RemoveIcon } = icons;
  const { current } = useSelector((state) => state.user);

  const [actived, setActived] = useState([]);

  const handleShowTabs = (tabID) => {
    if (actived.some((element) => element === tabID)) {
      setActived((prev) => prev.filter((element) => element !== tabID));
    } else {
      setActived((prev) => [...prev, tabID]);
    }
  };
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
              {element.type === "SINGLE" && (
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
              {element.type === "PARENT" && (
                <div
                  className="flex flex-col font-semibold font-second"
                  onClick={() => handleShowTabs(+element.id)}
                >
                  <div className="flex items-center justify-between gap-2 px-4 py-2 hover:bg-[#B22714] cursor-pointer">
                    <div className="gap-2 flex">
                      <span>{element.icon}</span>
                      <span>{element.text}</span>
                    </div>
                    {actived.some((id) => id === element.id) ? (
                      <RemoveIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </div>
                  {actived.some((id) => +id === +element.id) && (
                    <div className="flex flex-col">
                      {element.submenu.map((item) => (
                        <NavLink
                          key={element.text}
                          to={item.path}
                          onClick={(e) => e.stopPropagation()}
                          className={({ isActive }) =>
                            clsx(
                              isActive && activedStyle,
                              !isActive && notActiveStyle,
                              "pl-12"
                            )
                          }
                        >
                          {item.text}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default memo(MemberSidebar);
