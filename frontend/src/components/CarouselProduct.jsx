import React from "react";
import Carousel from "react-multi-carousel";

function CarouselProduct() {
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
        autoPlaySpeed={1000}
        centerMode={false}
        className=""
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
      >
        <div className="px-2">
          <img
            src="https://www.dickies.com/dw/image/v2/AAYI_PRD/on/demandware.static/-/Sites-master-catalog-dickies/default/dw3cd06354/images/main/874_KH_FR.jpg?sw=440&sh=440&q=65"
            alt=""
          />
          <div className="flex flex-col gap-2">
            <ul className="flex mt-4 gap-3">
              <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                <div className="w-6 h-6 rounded-full bg-[#506070]"></div>
              </li>
              <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                <div className="w-6 h-6 rounded-full bg-black"></div>
              </li>
              <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                <div className="w-6 h-6 rounded-full bg-[#626262]"></div>
              </li>
            </ul>
            <h3 className="font-medium text-base">
              <a href="">Original 874® Work Pants</a>
            </h3>
            <div>
              <span>$30.00</span>
            </div>
          </div>
        </div>
        <div className="px-2">
          <img
            src="https://www.dickies.com/dw/image/v2/AAYI_PRD/on/demandware.static/-/Sites-master-catalog-dickies/default/dw3cd06354/images/main/874_KH_FR.jpg?sw=440&sh=440&q=65"
            alt=""
          />
          <div className="flex flex-col gap-2">
            <ul className="flex mt-4 gap-3">
              <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                <div className="w-6 h-6 rounded-full bg-[#506070]"></div>
              </li>
              <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                <div className="w-6 h-6 rounded-full bg-black"></div>
              </li>
              <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                <div className="w-6 h-6 rounded-full bg-[#626262]"></div>
              </li>
            </ul>
            <h3 className="font-medium text-base">
              <a href="">Original 874® Work Pants</a>
            </h3>
            <div>
              <span>$30.00</span>
            </div>
          </div>
        </div>
        <div className="px-2">
          <img
            src="https://www.dickies.com/dw/image/v2/AAYI_PRD/on/demandware.static/-/Sites-master-catalog-dickies/default/dw3cd06354/images/main/874_KH_FR.jpg?sw=440&sh=440&q=65"
            alt=""
          />
          <div className="flex flex-col gap-2">
            <ul className="flex mt-4 gap-3">
              <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                <div className="w-6 h-6 rounded-full bg-[#506070]"></div>
              </li>
              <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                <div className="w-6 h-6 rounded-full bg-black"></div>
              </li>
              <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                <div className="w-6 h-6 rounded-full bg-[#626262]"></div>
              </li>
            </ul>
            <h3 className="font-medium text-base">
              <a href="">Original 874® Work Pants</a>
            </h3>
            <div>
              <span>$30.00</span>
            </div>
          </div>
        </div>
        <div className="px-2">
          <img
            src="https://www.dickies.com/dw/image/v2/AAYI_PRD/on/demandware.static/-/Sites-master-catalog-dickies/default/dw3cd06354/images/main/874_KH_FR.jpg?sw=440&sh=440&q=65"
            alt=""
          />
          <div className="flex flex-col gap-2">
            <ul className="flex mt-4 gap-3">
              <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                <div className="w-6 h-6 rounded-full bg-[#506070]"></div>
              </li>
              <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                <div className="w-6 h-6 rounded-full bg-black"></div>
              </li>
              <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                <div className="w-6 h-6 rounded-full bg-[#626262]"></div>
              </li>
            </ul>
            <h3 className="font-medium text-base">
              <a href="">Original 874® Work Pants</a>
            </h3>
            <div>
              <span>$30.00</span>
            </div>
          </div>
        </div>
        <div className="px-2">
          <img
            src="https://www.dickies.com/dw/image/v2/AAYI_PRD/on/demandware.static/-/Sites-master-catalog-dickies/default/dw3cd06354/images/main/874_KH_FR.jpg?sw=440&sh=440&q=65"
            alt=""
          />
          <div className="flex flex-col gap-2">
            <ul className="flex mt-4 gap-3">
              <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                <div className="w-6 h-6 rounded-full bg-[#506070]"></div>
              </li>
              <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                <div className="w-6 h-6 rounded-full bg-black"></div>
              </li>
              <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                <div className="w-6 h-6 rounded-full bg-[#626262]"></div>
              </li>
            </ul>
            <h3 className="font-medium text-base">
              <a href="">Original 874® Work Pants</a>
            </h3>
            <div>
              <span>$30.00</span>
            </div>
          </div>
        </div>
        <div className="px-2">
          <img
            src="https://www.dickies.com/dw/image/v2/AAYI_PRD/on/demandware.static/-/Sites-master-catalog-dickies/default/dw3cd06354/images/main/874_KH_FR.jpg?sw=440&sh=440&q=65"
            alt=""
          />
          <div className="flex flex-col gap-2">
            <ul className="flex mt-4 gap-3">
              <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                <div className="w-6 h-6 rounded-full bg-[#506070]"></div>
              </li>
              <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                <div className="w-6 h-6 rounded-full bg-black"></div>
              </li>
              <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                <div className="w-6 h-6 rounded-full bg-[#626262]"></div>
              </li>
            </ul>
            <h3 className="font-medium text-base">
              <a href="">Original 874® Work Pants</a>
            </h3>
            <div>
              <span>$30.00</span>
            </div>
          </div>
        </div>
        <div className="px-2">
          <img
            src="https://www.dickies.com/dw/image/v2/AAYI_PRD/on/demandware.static/-/Sites-master-catalog-dickies/default/dw3cd06354/images/main/874_KH_FR.jpg?sw=440&sh=440&q=65"
            alt=""
          />
          <div className="flex flex-col gap-2">
            <ul className="flex mt-4 gap-3">
              <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                <div className="w-6 h-6 rounded-full bg-[#506070]"></div>
              </li>
              <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                <div className="w-6 h-6 rounded-full bg-black"></div>
              </li>
              <li className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black">
                <div className="w-6 h-6 rounded-full bg-[#626262]"></div>
              </li>
            </ul>
            <h3 className="font-medium text-base">
              <a href="">Original 874® Work Pants</a>
            </h3>
            <div>
              <span>$30.00</span>
            </div>
          </div>
        </div>
      </Carousel>
    </>
  );
}

export default CarouselProduct;
