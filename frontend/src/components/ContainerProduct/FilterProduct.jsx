import React, { useEffect, useState } from "react";
import icons from "../../ultils/icons";
import { gender, category } from "../../ultils/constans";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

function FilterProduct({
  name,
  activeClick,
  handleChangeActiveFilter,
  type = "checkbox",
}) {
  const navigate = useNavigate();
  const { KeyboardArrowDownIcon } = icons;
  const [params] = useSearchParams();
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const handleSelect = (e, filterType) => {
    const value = e.target.value;
    if (filterType === "gender") {
      setSelectedGender((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else if (filterType === "category") {
      // Thay thế các dấu cách bằng dấu '-'
      const formattedValue = value.replace(/\s+/g, "-");
      setSelectedCategory((prev) =>
        prev.includes(formattedValue)
          ? prev.filter((item) => item !== formattedValue)
          : [...prev, formattedValue]
      );
    }
    handleChangeActiveFilter(name);
  };

  useEffect(() => {
    let param = [];
    for (let i of params.entries()) {
      param.push(i);
    }
    const queries = {};
    for (let i of param) {
      queries[i[0]] = i[1];
    }
    if (selectedGender.length > 0) {
      queries.gender = selectedGender.join(",");
    } else {
      delete queries.gender;
    }
    if (selectedCategory.length > 0) {
      queries.category = selectedCategory.join(",");
    } else {
      delete queries.category;
    }
    queries.page = 1;
    navigate({
      pathname: `/products`,
      search: createSearchParams(queries).toString(),
    });
  }, [selectedCategory, selectedGender]);

  return (
    <div
      className="cursor-pointer flex items-center gap-4 p-2 text-xs relative border border-black"
      onClick={() => handleChangeActiveFilter(name)}
    >
      <span className="capitalize">{name}</span>
      <KeyboardArrowDownIcon />
      {activeClick === name && (
        <div className="absolute top-[calc(100%+1px)] w-fit p-4 border bg-white min-w-[150px] z-50">
          {type === "checkbox" && (
            <div>
              {name === "gender" && (
                <div>
                  <div className="p-4 items-center flex justify-between gap-8 border-b">
                    <span className="whitespace-nowrap">{`${selectedGender.length} selected`}</span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGender([]);
                      }}
                      className="underline transition duration-300 ease-in-out hover:text-[#8D8D8D] cursor-pointer"
                    >
                      Reset
                    </span>
                  </div>
                  <div
                    className="flex flex-col gap-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {gender?.map((element, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 transition duration-300 ease-in-out hover:text-[#8D8D8D] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={element}
                          className="w-4 h-4 outline-none form-checkbox"
                          onChange={(e) => handleSelect(e, "gender")}
                          id={element}
                          checked={selectedGender.some(
                            (selectedItem) => selectedItem === element
                          )}
                        />
                        <label
                          htmlFor={element}
                          className="capitalize font-semibold text-sm "
                        >
                          {element}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {name === "category" && (
                <div>
                  <div className="p-4 items-center flex justify-between gap-8 border-t">
                    <span className="whitespace-nowrap">{`${selectedCategory.length} selected`}</span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory([]);
                      }}
                      className="underline transition duration-300 ease-in-out hover:text-[#8D8D8D] cursor-pointer"
                    >
                      Reset
                    </span>
                  </div>
                  <div
                    className="flex flex-col gap-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {category?.map((element, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 transition duration-300 ease-in-out hover:text-[#8D8D8D] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={element}
                          className="w-4 h-4 outline-none form-checkbox"
                          onChange={(e) => handleSelect(e, "category")}
                          id={element}
                          checked={selectedCategory.some(
                            (selectedItem) => selectedItem === element
                          )}
                        />
                        <label
                          htmlFor={element}
                          className="capitalize font-semibold text-sm "
                        >
                          {element}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FilterProduct;
