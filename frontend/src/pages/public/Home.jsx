import React, { useEffect } from "react";
import { Banner } from "../../components";

import { apiGetCategories } from "../../apis/app.js";

function Home() {
  const fetchCategories = async () => {
    const response = await apiGetCategories();
    console.log(response);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <div className="w-main pt-[80px]">
        Home
        <Banner />
      </div>
    </>
  );
}

export default Home;
