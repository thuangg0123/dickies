import React, { memo } from "react";
import Carousel from "react-multi-carousel";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";

function CarouselProduct({ category }) {
  const products = useSelector((state) => state.app.productByCategory);
  const categoryProducts = products.filter(
    (product) => product.category === category
  );

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
    <Carousel
      responsive={responsive}
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={1000}
      centerMode={false}
      className=""
      containerClass="container"
      dotListClass=""
      draggable
      focusOnSelect
      infinite={false}
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
    >
      {categoryProducts &&
        categoryProducts.length > 0 &&
        categoryProducts.map((product, index) => (
          <ProductCard key={index} product={product} index={index} />
        ))}
    </Carousel>
  );
}

export default memo(CarouselProduct);
