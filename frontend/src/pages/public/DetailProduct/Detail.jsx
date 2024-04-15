import React, { useState } from "react";
import { useSelector } from "react-redux";
import icons from "../../../ultils/icons";

import BigAndTall from "../../../img/big-and-tall.svg";
import ResistWrinkles from "../../../img/resist-wrinkles.svg";
import StainRelease from "../../../img/stain-release.svg";

import AccordionSection from "./AccordionSection";

const Detail = () => {
  const { RemoveIcon, AddIcon } = icons;
  const detailProduct = useSelector((state) => state.product.detailProduct);

  const [accordionState, setAccordionState] = useState({
    description: true,
    productDetail: true,
    fitInformation: true,
    materialAndCare: true,
  });

  const toggleAccordion = (section) => {
    setAccordionState({
      ...accordionState,
      [section]: !accordionState[section],
    });
  };

  return (
    <div className="my-6">
      <AccordionSection
        title="Description"
        icon={RemoveIcon}
        isOpen={accordionState.description}
        toggleAccordion={() => toggleAccordion("description")}
      >
        <p className="py-6">{detailProduct?.description}</p>
        <p className="font-semibold">Item ID: {detailProduct?._id}</p>
      </AccordionSection>
      <AccordionSection
        title="Product Detail"
        icon={RemoveIcon}
        isOpen={accordionState.productDetail}
        toggleAccordion={() => toggleAccordion("productDetail")}
      >
        <ul className="py-6 list-disc list-inside">
          <li>Sturdy workwear waistband</li>
          <li>Hook-and-eye waist closure with zipper</li>
          <li>Reinforced seams</li>
          <li>Welt back pockets with secure button closure</li>
          <li>Signature wide-tunnel belt loops</li>
        </ul>
      </AccordionSection>
      <AccordionSection
        title="Fit Information"
        icon={RemoveIcon}
        isOpen={accordionState.fitInformation}
        toggleAccordion={() => toggleAccordion("fitInformation")}
      >
        <ul className="py-6 list-disc list-inside">
          <li>High rise sits at waist</li>
          <li>Relaxed fit</li>
          <li>Tapered leg</li>
        </ul>
      </AccordionSection>
      <AccordionSection
        title="Material & Care"
        icon={RemoveIcon}
        isOpen={accordionState.materialAndCare}
        toggleAccordion={() => toggleAccordion("materialAndCare")}
      >
        <ul className="py-6 list-disc list-inside">
          <li>8.5 oz. 65% Polyester/35% Cotton Twill</li>
          <li>Imported</li>
        </ul>
      </AccordionSection>
      <div className="py-6 border-t-2 border-[#ccc]">
        <div className="font-second flex justify-between text-center">
          <div className="flex flex-col items-center">
            <img src={BigAndTall} alt="Wrinkle Resistant" />
            <span>Wrinkle Resistant</span>
          </div>
          <div className="flex flex-col items-center">
            <img src={ResistWrinkles} alt="Stain Release" />
            <span>Stain Release</span>
          </div>
          <div className="flex flex-col items-center">
            <img src={StainRelease} alt="Big & Tall" />
            <span>Big & Tall</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
