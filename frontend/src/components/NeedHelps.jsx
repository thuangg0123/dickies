import React, { memo } from "react";

import { Link } from "react-router-dom";

import icons from "../ultils/icons";

const NeedHelps = () => {
  const { ChatBubbleOutlineIcon } = icons;
  return (
    <>
      <section className="bg-[#F5F5F5] p-10 tracking-tighter">
        <h2 className="text-[80px] font-semibold py-4">Need Help?</h2>
        <div className="grid grid-cols-4 gap-4 font-medium">
          <div className="col-span-1">
            Monday to Friday
            <br />
            8am - 6pm CT
          </div>
          <div className="col-span-1">
            <a href="#">1-800-Dickies (342-5437)</a>
            <br />
            <a href="#">us_customer_care@dickies.com</a>
            <br />
            <ChatBubbleOutlineIcon className="mr-2" />
            <a href="#">
              <u>Live chat</u>
            </a>
          </div>
          <div className="col-span-1 hidden"></div>
          <div className="col-span-1 hidden"></div>
          <div className="col-span-4 flex justify-between items-center gap-4 mt-10 text-[30px] ">
            <Link
              to="/contact-us"
              className="inline-block hover:text-[#dadada] duration-300"
            >
              <svg
                width="73"
                height="41"
                viewBox="0 0 73 41"
                stroke="currentColor"
                fill="none"
                strokeWidth="1.5"
                focusable="false"
              >
                <path
                  d="M43.13,6.13h26.25c1.29,0,2.34,1.05,2.34,2.34v26.27c0,1.29-1.05,2.34-2.34,2.34H30.91
        c-1.29,0-2.34-1.05-2.34-2.34v-2.7"
                ></path>
                <path d="M43.66,19.54l6.63,4.86c0.7,0.51,1.66,0.49,2.33-0.07l19.1-15.86"></path>
                <path
                  d="M41.31,31.79H16.77l-6.56,7.96c-0.25,0.31-0.75,0.13-0.75-0.27v-7.69H2.84c-1.29,0-2.34-1.05-2.34-2.34V3.17
        c0-1.29,1.05-2.34,2.34-2.34h38.47c1.29,0,2.34,1.05,2.34,2.34v26.27c0,1.29-1.05,2.34-2.34,2.34V31.79z"
                ></path>
                <path d="M8.66,9.89H35.5"></path>
                <path d="M8.66,16.53H35.5"></path>
                <path d="M8.66,23.18H24.8"></path>
              </svg>
              <br />
              Contact Us
            </Link>
            <Link
              to="/order-trackform"
              className="inline-block hover:text-[#dadada] duration-300"
            >
              <svg
                width="83"
                height="40"
                viewBox="0 0 83 40"
                stroke="currentColor"
                fill="none"
                strokeWidth="1.5"
                focusable="false"
              >
                <path
                  d="M8.65,13.16c1.76,0,3.19-1.43,3.19-3.19c0-1.76-1.43-3.19-3.19-3.19c-1.76,0-3.19,1.43-3.19,3.19
        C5.47,11.73,6.89,13.16,8.65,13.16z"
                ></path>
                <path
                  d="M16.72,8.98c0,4.45-8.06,20.8-8.06,20.8c0-0.01-8.06-16.35-8.06-20.8S4.2,0.92,8.65,0.92
        C13.11,0.92,16.72,4.53,16.72,8.98z"
                ></path>
                <path d="M32.51,33c2.56,0,4.63-2.07,4.63-4.63s-2.07-4.63-4.63-4.63s-4.63,2.07-4.63,4.63S29.95,33,32.51,33z"></path>
                <path
                  d="M52.98,16.05c2.56,0,4.63-2.07,4.63-4.63c0-2.56-2.07-4.63-4.63-4.63c-2.56,0-4.63,2.07-4.63,4.63
        C48.35,13.98,50.42,16.05,52.98,16.05z"
                ></path>
                <path d="M74.04,38.75c4.2,0,7.6-3.4,7.6-7.6s-3.4-7.6-7.6-7.6c-4.2,0-7.6,3.4-7.6,7.6S69.84,38.75,74.04,38.75z"></path>
                <path d="M77.83,29.4l-4.3,4.01c0,0-0.12,0.06-0.18,0.06c-0.06,0-0.18,0-0.22-0.06l-2.21-2.21"></path>
                <path d="M16.95,28.37h-3"></path>
                <path d="M23.68,28.37H20.7"></path>
                <path d="M41.83,21.16l-2.12,2.13"></path>
                <path d="M46.57,16.38l-2.12,2.13"></path>
                <path d="M64.12,21.16l2.12,2.13"></path>
                <path d="M59.37,16.38l2.12,2.13"></path>
              </svg>
              <br />
              Track Order
            </Link>
            <Link
              to="/shipping-and-delivery"
              className="inline-block hover:text-[#dadada] duration-300"
            >
              <svg
                width="64"
                height="44"
                viewBox="0 0 64 44"
                stroke="currentColor"
                fill="none"
                strokeWidth="1.5"
                focusable="false"
              >
                <path d="M46.92,7.35H0.63v35.38h46.29V7.35z"></path>
                <path d="M63.37,36.32l-16.45,6.41V7.35l16.45-6.41V36.32z"></path>
                <path d="M0.63,7.35l16.45-6.41h46.29"></path>
                <path d="M22.15,7.35l16.45-6.41"></path>
                <path d="M14.79,34.92l-3.6-3.46l3.6-3.47"></path>
                <path d="M31.79,31.46H11.9"></path>
                <path d="M32.39,15.1l3.6,3.47l-3.6,3.46"></path>
                <path d="M15.39,18.57h19.89"></path>
              </svg>
              <br />
              Shipping & Returns
            </Link>
            <Link
              to="/faq"
              className="inline-block hover:text-[#dadada] duration-300"
            >
              <svg
                width="73"
                height="47"
                viewBox="0 0 73 47"
                stroke="currentColor"
                fill="none"
                strokeWidth="1.5"
                focusable="false"
              >
                <path
                  d="M61.98,17.64l-10.15,9.47c-0.14,0.13-0.27,0.13-0.41,0.13c-0.14,0-0.41,0-0.54-0.14l-5.21-5.21"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M35.95,23.97c1.04,8.23,7.81,14.78,16.06,15.59c1.48,0.15,2.92,0.11,4.32-0.08l4.92,6.14
        c0.26,0.32,0.77,0.14,0.77-0.27v-7.66c6.43-3.29,10.63-10.32,9.72-18.23c-0.94-8.1-7.43-14.68-15.52-15.72
        c-11.81-1.51-21.75,8.41-20.26,20.22L35.95,23.97z"
                ></path>
                <path
                  d="M38.17,30.55c-0.46,0.35-1.03,0.56-1.66,0.56H19.44l-7.69,9.32c-0.28,0.34-0.82,0.14-0.82-0.3V31.1h-7.7
        c-1.51,0-2.73-1.22-2.73-2.73V3.56c0-1.51,1.22-2.73,2.73-2.73h33.28c1.51,0,2.73,1.22,2.73,2.73v6.95"
                ></path>
                <path
                  d="M15.91,12.29c0-0.77,0.18-1.47,0.53-2.07c0.35-0.61,0.83-1.09,1.44-1.45c0.61-0.35,1.3-0.53,2.07-0.53
        s1.4,0.17,1.99,0.49c0.59,0.33,1.06,0.77,1.4,1.33c0.34,0.57,0.52,1.21,0.52,1.93c0,0.42-0.07,0.81-0.21,1.17
        c-0.14,0.36-0.38,0.71-0.71,1.06c-0.33,0.34-0.76,0.72-1.31,1.11c-0.48,0.34-0.85,0.66-1.11,0.94c-0.26,0.28-0.45,0.57-0.56,0.87
        c-0.11,0.3-0.16,0.65-0.16,1.06v1.05"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M19.87,22.98v0.35"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <br />
              FAQs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(NeedHelps);
