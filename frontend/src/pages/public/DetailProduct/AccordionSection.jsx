import React from "react";

import icons from "../../../ultils/icons";

const AccordionSection = ({
  title,
  icon: Icon,
  isOpen,
  toggleAccordion,
  children,
}) => {
  const { AddIcon } = icons;

  return (
    <div className="py-6 border-t-2 border-[#ccc]">
      <div
        className="flex justify-between font-bold cursor-pointer transition duration-300 ease-in-out hover:text-[#8D8D8D]"
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        <div>
          {isOpen ? (
            <Icon style={{ fontSize: "28px" }} />
          ) : (
            <AddIcon style={{ fontSize: "28px" }} />
          )}
        </div>
      </div>
      {isOpen && <div className="font-second">{children}</div>}
    </div>
  );
};

export default AccordionSection;
