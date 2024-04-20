import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import path from "../../../ultils/path.js";

import {
  Banner,
  CarouselProduct,
  Carousels,
  SubBanner,
  BoxSubBanner,
  NeedHelps,
  Footer,
  BtnScrollTop,
} from "../../../components/index.js";

import subbanner1 from "../../../img/banner-sub1.jpg";
import subbanner2 from "../../../img/banner-sub2.jpg";
import subbanner3 from "../../../img/banner-sub3.jpg";
import boxbanner1 from "../../../img/box-banner1.jpg";
import boxbanner2 from "../../../img/box-banner2.jpg";

import { getProductByCategory } from "../../../store/app/asyncActions.js";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const categories = ["jean-pants", "carpenter-pants", "pants"];
    categories.forEach((category) => {
      dispatch(getProductByCategory(category));
    });
  }, []);

  return (
    <>
      <div>
        <Banner />
        <div className="px-10 py-2 mb-10">
          <h2 className="mb-10 font-bold text-[54px] tracking-tighter md:text-4xl md:my-5">
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
            <CarouselProduct category="jean-pants" />
          </div>
        </div>
        <div>
          <SubBanner
            subBanner={subbanner2}
            title={"Duck Canvas Pants"}
            subtitle={"RESPECT THE CLASSICS"}
          />
          <div className="px-10 py-2 my-10">
            <CarouselProduct category="carpenter-pants" />
          </div>
        </div>
        <div>
          <SubBanner
            subBanner={subbanner3}
            title={"Twill Work Pants"}
            subtitle={"RESPECT THE CLASSICS"}
          />
          <div className="px-10 py-2 my-10">
            <CarouselProduct category="pants" />
          </div>
        </div>
        <div className="flex px-10 py-2 mb-10 justify-between gap-10">
          <BoxSubBanner img={boxbanner1} title="Premium Collection" />
          <BoxSubBanner
            img={boxbanner2}
            title="Coveralls & Overalls"
            path={"?category=overalls"}
          />
        </div>
        <NeedHelps />
      </div>
      <Footer />
      <BtnScrollTop />
    </>
  );
}

export default Home;
