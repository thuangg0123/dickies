import React from "react";

import { nav } from "../ultils/constans";

import { NavLink } from "react-router-dom";

function Navigations() {
  return (
    <>
      <div className="">
        {nav &&
          nav.map((item) => {
            return (
              <NavLink
                to={item.path}
                key={item.id}
                className={({ isActive }) =>
                  isActive
                    ? "color-[#F4BB3E] font-bold p-5 hover:text-[#ccc] transition-colors duration-300"
                    : "font-bold p-5 hover:text-[#ccc] transition-colors duration-300"
                }
              >
                {item.value}
              </NavLink>
            );
          })}
      </div>
    </>
  );
}

export default Navigations;
