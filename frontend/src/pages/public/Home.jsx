import React from "react";

import { Banner } from "../../components";
import Carousels from "../../components/Carousels.jsx";
import SubBanner from "../../components/SubBanner.jsx";

import subbanner1 from "../../img/banner-sub1.jpg";
import subbanner2 from "../../img/banner-sub2.jpg";
import subbanner3 from "../../img/banner-sub3.jpg";
import CarouselProduct from "../../components/CarouselProduct.jsx";

function Home() {
  return (
    <>
      <div className="w-main pt-[80px]">
        <Banner />
        <div className="px-10 py-2 mb-10">
          <h2 className="mb-10 font-bold text-[54px] tracking-tighter">
            Best Sellers
          </h2>
          <Carousels />
        </div>
        <div>
          <SubBanner
            subBanner={subbanner1}
            title={"Work Jeans"}
            subtitle={"RESPECT THE CLASSICS"}
          />
          <div className="px-10 py-2 my-10">
            <CarouselProduct />
          </div>
        </div>
        <div>
          <SubBanner
            subBanner={subbanner2}
            title={"Duck Canvas Pants"}
            subtitle={"RESPECT THE CLASSICS"}
          />
          <div className="px-10 py-2 my-10">
            <CarouselProduct />
          </div>
        </div>
        <div>
          <SubBanner
            subBanner={subbanner3}
            title={"Twill Work Pants"}
            subtitle={"RESPECT THE CLASSICS"}
          />
          <div className="px-10 py-2 my-10">
            <CarouselProduct />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
