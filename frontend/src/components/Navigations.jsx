import React, { useState } from "react";
import { nav } from "../ultils/constans";
import { NavLink } from "react-router-dom";
import DropDrownMenu from "./DropDrownMenu"; // Import DropDrownMenu component

function Navigations() {
  const [showSubMenu, setShowSubMenu] = useState(false); // State to control submenu visibility

  return (
    <>
      <div className="flex">
        {nav &&
          nav.map((item) => {
            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setShowSubMenu(true)}
                onMouseLeave={() => setShowSubMenu(false)}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "color-[#F4BB3E] font-bold p-5 hover:text-[#ccc] transition-colors duration-300"
                      : "font-bold p-5 hover:text-[#ccc] transition-colors duration-300"
                  }
                >
                  {item.value}
                </NavLink>
                {showSubMenu && <DropDrownMenu />}
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Navigations;
