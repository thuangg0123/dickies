import React, { useEffect, useState } from "react";
import icons from "../../ultils/icons";
import { gender, sortPrice } from "../../ultils/constans";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";

function FilterProduct({
  name,
  activeClick,
  handleChangeActiveFilter,
  type = "checkbox",
}) {
  const navigate = useNavigate();
  const { KeyboardArrowDownIcon } = icons;
  const [selected, setSelected] = useState([]);
  const handleSelect = (e) => {
    const alreadyElement = selected.find(
      (element) => element === e.target.value
    );
    if (alreadyElement) {
      setSelected((prev) =>
        prev.filter((element) => element !== e.target.value)
      );
    } else {
      setSelected((prev) => [...prev, e.target.value]);
    }
    handleChangeActiveFilter(null);
  };

  useEffect(() => {
    if (selected.length > 0) {
      navigate({
        pathname: `/products`,
        search: createSearchParams({
          gender: selected.join(","),
        }).toString(),
      });
    } else {
      navigate(`/products`);
    }
  }, [selected]);
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
              <div className="p-4 items-center flex justify-between gap-8 border-b">
                <span className="whitespace-nowrap">{`${selected.length} selected`}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected([]);
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
                      onChange={handleSelect}
                      id={element}
                      checked={selected.some(
                        (selecedItem) => selecedItem === element
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
      {activeClick === name && (
        <div className="absolute top-[calc(100%+1px)] w-fit p-4 border bg-white min-w-[150px] z-50">
          {type === "checkbox" && (
            <div>
              <div className="p-4 items-center flex justify-between gap-8 border-b">
                <span className="whitespace-nowrap">{`${selected.length} selected`}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected([]);
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
                      onChange={handleSelect}
                      id={element}
                      checked={selected.some(
                        (selecedItem) => selecedItem === element
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
  );
}

export default FilterProduct;
