import React, { memo } from "react";
import icons from "../../ultils/icons";
import { menuItems } from "../../ultils/itemFooter";

function Footer() {
  const {
    ArrowForwardIcon,
    FacebookIcon,
    InstagramIcon,
    XIcon,
    PinterestIcon,
    YouTubeIcon,
  } = icons;

  return (
    <>
      <div className="bg-[#1A1A1A] px-10 py-20 text-white">
        <div className="grid lg:grid-cols-2 gap-10 md:grid-cols-1">
          <div className="w-full">
            <svg
              width="130"
              height="72"
              viewBox="0 0 75 42"
              aria-label="Dickies"
              focusable="false"
            >
              <use href="#brand-logo"></use>
            </svg>
          </div>
          <div className="w-full flex justify-start">
            <h2 className="lg:text-6xl md:text-3xl font-bold">
              Quality Workwear Since 1922
            </h2>
          </div>
          <div className="w-full flex flex-col gap-5">
            <h2 className="text-2xl font-bold">Stay Connected</h2>
            <div className="relative w-[70%]">
              <input
                className="outline-none bg-[#303030] px-8 py-4 w-full"
                placeholder="Email Address"
              />
              <div className="absolute top-[27%] right-[18px] cursor-pointer text-white hover:text-[#989FAB]">
                <ArrowForwardIcon />
              </div>
            </div>
            <div>
              <ul className="flex text-2xl gap-4">
                <li className="transition duration-300 ease-in-out hover:text-[#8D8D8D] cursor-pointer">
                  <FacebookIcon />
                </li>
                <li className="transition duration-300 ease-in-out hover:text-[#8D8D8D] cursor-pointer">
                  <InstagramIcon />
                </li>
                <li className="transition duration-300 ease-in-out hover:text-[#8D8D8D] cursor-pointer">
                  <PinterestIcon />
                </li>
                <li className="transition duration-300 ease-in-out hover:text-[#8D8D8D] cursor-pointer">
                  <XIcon />
                </li>
                <li className="transition duration-300 ease-in-out hover:text-[#8D8D8D] cursor-pointer">
                  <YouTubeIcon />
                </li>
              </ul>
            </div>
          </div>
          <div className="font-second w-full text-base grid grid-cols-3">
            {menuItems &&
              menuItems.length > 0 &&
              menuItems.map((item, index) => {
                return (
                  <div key={index}>
                    <h3 className="font-bold mb-3">{item.title}</h3>
                    <ul>
                      {item.items.map((menuItem, idx) => (
                        <li
                          key={idx}
                          className="py-1 transition duration-300 ease-in-out hover:text-[#8D8D8D]"
                        >
                          <a href={menuItem.href}>{menuItem.text}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Footer);
