import React, { useState, useEffect, memo } from "react";
import icons from "../../ultils/icons";

const BtnScrollTop = () => {
  const { ArrowUpwardIcon } = icons;
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-[30%] hover:text-white hover:bg-black right-10 p-2 border-2 border-black bg-white text-black transition-opacity duration-300 ease-in-out cursor-pointer ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={scrollToTop}
    >
      <ArrowUpwardIcon className="h-6 w-6" />
    </div>
  );
};

export default memo(BtnScrollTop);
