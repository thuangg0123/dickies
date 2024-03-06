import React, { useEffect, useState } from "react";
import { Banner } from "../../components";

import { apiGetCategories } from "../../apis/app.js";
import Carousels from "../../components/Carousels.jsx";
import SubBanner from "../../components/SubBanner.jsx";

function Home() {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    const response = await apiGetCategories();
    console.log(response);
    setCategories(response.data);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <div className="w-main pt-[80px]">
        <Banner />
        <div className="px-10 py-2">
          <h2 className="mb-10 font-bold text-[54px] tracking-tighter">
            Best Sellers
          </h2>
          <Carousels categories={categories} />
        </div>
        <SubBanner />
        <div className="px-10 py-2">
          <h2 className="mb-10 font-bold text-[54px] tracking-tighter">
            Best Sellers
          </h2>
          <Carousels categories={categories} />
        </div>
      </div>
    </>
  );
}

export default Home;
