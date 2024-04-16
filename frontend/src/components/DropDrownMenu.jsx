import React, { memo } from "react";
import { Link } from "react-router-dom";
import {
  mensCategories,
  womenCategories,
  kidCategories,
} from "../ultils/itemCategory";

const categoryToSubcategories = {
  Men: mensCategories,
  Women: womenCategories,
  Kids: kidCategories,
};

function DropDrownMenu({ category }) {
  const categories = categoryToSubcategories[category];

  return (
    <div className="font-second fixed top-[4.2rem] px-10 py-5 left-0 w-full bg-white z-40 overflow-auto max-h-full">
      <div className="p-4 grid grid-cols-6 gap-5">
        {categories.map((item, index) => (
          <div key={index}>
            <h3 className="font-bold mb-3 cursor-pointer transition duration-300 ease-in-out hover:text-[#8D8D8D]">
              <Link to={item.path}>{item.category}</Link>
            </h3>
            <ul>
              {item.subcategories.map((subitem, subindex) => (
                <li
                  key={subindex}
                  className={`py-1 transition duration-300 ease-in-out hover:text-[#8D8D8D] font-medium ${
                    subitem === "Shop All" ? "underline" : ""
                  }`}
                >
                  <Link to={item.path}>{subitem}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(DropDrownMenu);
