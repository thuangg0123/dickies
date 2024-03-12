import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import DropDrownMenu from "./DropDrownMenu";

import { nav } from "../ultils/constans";

function Navigations() {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const handleMouseEnter = (category) => {
    setCurrentCategory(category);
    setShowSubMenu(true);
  };

  const handleMouseLeave = () => {
    setShowSubMenu(false);
  };

  return (
    <>
      <div className="flex">
        {nav &&
          nav.map((item) => {
            let hoveredCategory = null;

            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => {
                  hoveredCategory = item.value;
                  handleMouseEnter(item.value);
                }}
                onMouseLeave={() => {
                  hoveredCategory = null;
                  handleMouseLeave();
                }}
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
                {showSubMenu &&
                  currentCategory === item.value &&
                  item.value !== "Blog" &&
                  item.value !== "FAQ" && (
                    <DropDrownMenu category={currentCategory} />
                  )}
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Navigations;
