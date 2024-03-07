import React from "react";
import Carousel from "react-multi-carousel";
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import { createSlug } from "../ultils/helper.js";

function Carousels() {
  const categories = useSelector((state) => {
    return state.app.categories;
  });
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <>
      <Carousel
        responsive={responsive}
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        dotListClass=""
        draggable
        focusOnSelect={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {categories &&
          categories.length > 0 &&
          categories.map(
            (category, index) =>
              category.img && (
                <NavLink
                  key={index}
                  to={`/category/${createSlug(category.title)}`}
                >
                  <div className="px-2 cursor-pointer">
                    <img src={category.img} alt={`Slide ${index + 1}`} />
                    {category.title && (
                      <h2 className="font-semibold text-xl px-3">
                        {category.title}
                      </h2>
                    )}
                  </div>
                </NavLink>
              )
          )}
      </Carousel>
    </>
  );
}

export default Carousels;
