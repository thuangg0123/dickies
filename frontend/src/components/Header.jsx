import React, { useEffect, useState } from "react";
import Navigations from "./Navigations";

import icons from "../ultils/icons";

import { Link } from "react-router-dom";
import path from "../ultils/path";
import { getCurrent } from "../store/user/asyncActions";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../store/user/userSlice";

function Header() {
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.user);
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCurrent());
    }
  }, [dispatch]);
  const {
    Input,
    SearchIcon,
    Person2OutlinedIcon,
    BookmarkBorderOutlinedIcon,
    ShoppingCartOutlinedIcon,
  } = icons;

  return (
    <>
      <div className="flex justify-between items-center border h-[80px] w-main px-10 py-2 fixed top-0 left-0 z-50 bg-white">
        <div className="flex items-center">
          <Link to={`/${path.HOME}`}>
            <div>
              <svg
                width="75"
                height="42"
                viewBox="0 0 75 42"
                aria-label="Dickies"
                focusable="false"
                id="brand-logo"
              >
                <path
                  d="M74.7939 15.3314C74.5161 14.8508 74.0016 14.5504 73.4458 14.5504H64.6775C60.9223 6.29271 50.1599 0.314453 37.5012 0.314453C24.8424 0.314453 14.0801 6.29271 10.3249 14.5504H8.00794C7.08417 14.5504 6.22423 15.046 5.76234 15.8459L0.208413 25.4441C-0.0694709 25.9248 -0.0694709 26.5219 0.208413 27.0025C0.486297 27.4832 1.00452 27.7836 1.55653 27.7836H10.4789C14.3692 35.8648 25.0114 41.6853 37.5012 41.6853C49.9909 41.6853 60.6594 35.8535 64.5348 27.7498H67.0132C67.937 27.7498 68.7969 27.2504 69.2588 26.4543L74.7902 16.8936C75.0681 16.4129 75.0718 15.8158 74.7902 15.3352L74.7939 15.3314Z"
                  fill="#FFF7EB"
                ></path>
                <path
                  d="M11.4989 14.5507C15.2428 6.89016 25.4682 1.39258 37.496 1.39258C49.5239 1.39258 59.7493 6.89016 63.4932 14.5507H11.4951H11.4989ZM11.6641 27.7765C15.5357 35.2643 25.6409 40.608 37.4998 40.608C49.3587 40.608 59.4864 35.2531 63.3467 27.7502L11.6641 27.7765Z"
                  fill="#B22714"
                ></path>
                <path
                  d="M73.4425 15.6284H8.00838C7.46763 15.6284 6.96444 15.9176 6.69407 16.387L1.14014 25.9852C0.952383 26.3081 1.18521 26.7062 1.55697 26.7062L67.0136 26.6724C67.5544 26.6724 68.0576 26.3833 68.3279 25.9139L73.8593 16.3494C74.0471 16.0302 73.8143 15.6284 73.4425 15.6284Z"
                  fill="#204387"
                ></path>
                <path
                  d="M54.7722 19.1542C52.9885 19.1542 51.1597 20.247 50.4049 21.5989C49.3234 23.5403 50.4049 25.1437 52.5416 25.1437C53.6344 25.1437 54.652 24.7344 55.0576 24.5467C55.174 24.4941 55.2716 24.4077 55.3355 24.2951L55.8349 23.4314C55.9138 23.2962 55.8161 23.1235 55.6584 23.1235H54.8811C54.7534 23.1235 54.6295 23.176 54.5431 23.2699C54.1901 23.6417 53.6081 23.912 53.1537 23.912C52.4703 23.912 52.121 23.4614 52.3726 22.6315C52.4365 22.4475 52.5717 22.3874 52.7557 22.3874H56.3569C56.5071 22.3874 56.6498 22.3123 56.7361 22.1922C57.1567 21.5801 57.2731 20.7877 56.9877 20.2132C56.6836 19.5973 55.8274 19.1542 54.7797 19.1542H54.7722ZM54.9975 21.2046C54.9224 21.3548 54.7684 21.4449 54.5995 21.4449H53.1875C53.1199 21.4449 53.0786 21.3623 53.1237 21.3097C53.5517 20.799 54.1 20.3859 54.6295 20.3859C54.9975 20.3859 55.0989 20.5887 55.0951 20.8591C55.0951 20.968 55.0576 21.0881 54.9975 21.2046ZM42.3425 19.5373L39.9505 21.0544C39.7965 21.152 39.62 20.9792 39.7101 20.8215L41.4638 17.7836C41.5314 17.6672 41.445 17.5245 41.3136 17.5245H38.3583C38.2569 17.5245 38.1668 17.5771 38.1179 17.6634L37.8551 18.1178C37.795 18.2192 37.8551 18.3469 37.9677 18.3732L38.4935 18.4858C38.6099 18.5121 38.6662 18.6398 38.6061 18.7412L35.8122 23.5816C35.7371 23.713 35.602 23.8069 35.4517 23.8332L34.5392 23.9872C34.4867 23.9947 34.4454 24.0285 34.4191 24.0735L34.145 24.5467C34.0774 24.6631 34.16 24.8058 34.2952 24.8058H37.1904C37.3293 24.8058 37.457 24.7307 37.5246 24.6143L38.6286 22.6954C38.6962 22.579 38.8615 22.579 38.9291 22.6954L40.0556 24.6143C40.1232 24.7307 40.2509 24.8058 40.3898 24.8058H42.5453C42.6429 24.8058 42.7368 24.7532 42.7856 24.6668L43.0447 24.2162C43.1048 24.1148 43.0447 23.9796 42.9246 23.9609L42.1322 23.8069C42.0834 23.7994 42.0383 23.7694 42.0121 23.7243L41.1033 22.1696C41.0583 22.0908 41.0808 21.9856 41.1596 21.9368L43.2776 20.5737C43.2963 20.5587 43.3189 20.5512 43.3452 20.5474L44.4004 20.3071C44.4529 20.2996 44.498 20.2695 44.5205 20.2245L44.7909 19.7551C44.8585 19.6386 44.7721 19.496 44.6407 19.496H42.5002C42.4439 19.496 42.3913 19.5147 42.3425 19.541V19.5373ZM34.4379 19.6011L34.2801 19.7813C34.2163 19.8565 34.1036 19.8527 34.0436 19.7776C33.7431 19.3946 33.2099 19.1542 32.4814 19.1542C30.6489 19.1542 29.0379 20.247 28.2831 21.5989C27.2016 23.5403 28.3394 25.1437 30.4761 25.1437C31.7566 25.1437 32.6616 24.7194 32.9846 24.5392C33.0672 24.4941 33.1386 24.4228 33.1874 24.3401L33.7544 23.36C33.8145 23.2549 33.7394 23.1235 33.6192 23.1235H32.6579C32.5865 23.1235 32.519 23.1535 32.4739 23.2098C32.1322 23.6154 31.5313 23.912 31.1108 23.912C30.3034 23.912 29.9842 23.345 30.3297 22.3799C30.6414 21.5125 31.5651 20.3822 32.6354 20.3822C33.2399 20.3822 33.5253 20.7502 33.5967 21.2909C33.608 21.3773 33.6831 21.4411 33.7694 21.4411H34.7533C34.8209 21.4411 34.881 21.4036 34.9185 21.3473L35.8611 19.7288C35.9249 19.6199 35.846 19.4884 35.7221 19.4884H34.6744C34.5843 19.4884 34.4942 19.526 34.4379 19.5973V19.6011ZM27.641 19.4922H24.6781C24.5655 19.4922 24.4641 19.5523 24.4077 19.6499L24.1449 20.1043C24.0923 20.1982 24.1449 20.3146 24.25 20.3371L24.7795 20.4498C24.9034 20.4761 24.9635 20.6112 24.8997 20.7239L23.2324 23.6116C23.1648 23.728 23.0484 23.8069 22.9169 23.8294L22.0007 23.9834C21.9331 23.9947 21.873 24.036 21.8392 24.0961L21.5688 24.5692C21.5087 24.6744 21.5839 24.8058 21.704 24.8058H25.831C25.9812 24.8058 26.1201 24.7269 26.1952 24.5955L26.3905 24.2538C26.4618 24.1298 26.3905 23.9759 26.2515 23.9496L25.6845 23.8407C25.5606 23.8182 25.4968 23.6792 25.5606 23.5666L27.7761 19.7288C27.8362 19.6236 27.7611 19.4922 27.641 19.4922ZM26.6571 18.9214C27.3856 19.0866 28.3056 18.8388 28.7074 18.3732C29.1092 17.9075 28.8464 17.3968 28.1179 17.2353C27.3894 17.0701 26.4693 17.3179 26.0675 17.7836C25.6657 18.2492 25.9286 18.7599 26.6571 18.9252V18.9214ZM49.8379 19.4922H46.875C46.7624 19.4922 46.661 19.5523 46.6047 19.6499L46.3418 20.1043C46.2892 20.1982 46.3418 20.3146 46.4469 20.3371L46.9764 20.4498C47.1003 20.4761 47.1604 20.6112 47.0966 20.7239L45.4293 23.6116C45.3617 23.728 45.2453 23.8069 45.1138 23.8294L44.1976 23.9834C44.13 23.9947 44.0699 24.036 44.0361 24.0961L43.7657 24.5692C43.7057 24.6744 43.7808 24.8058 43.9009 24.8058H48.0279C48.1781 24.8058 48.317 24.7269 48.3921 24.5955L48.5874 24.2538C48.6587 24.1298 48.5874 23.9759 48.4485 23.9496L47.8814 23.8407C47.7575 23.8182 47.6937 23.6792 47.7575 23.5666L49.9731 19.7288C50.0331 19.6236 49.958 19.4922 49.8379 19.4922ZM48.854 18.9214C49.5825 19.0866 50.5025 18.8388 50.9043 18.3732C51.3061 17.9075 51.0433 17.3968 50.3148 17.2353C49.5863 17.0701 48.6662 17.3179 48.2644 17.7836C47.8626 18.2492 48.1255 18.7599 48.854 18.9252V18.9214ZM18.6811 17.5245H13.2173C13.1197 17.5245 13.0333 17.5771 12.9845 17.6597L12.7141 18.1328C12.6503 18.2455 12.7141 18.3844 12.8418 18.407L13.8331 18.5234C13.9533 18.5459 14.0134 18.6811 13.9533 18.7825L11.1932 23.5703C11.1257 23.6905 11.0055 23.7731 10.8665 23.7919L9.48088 23.9496C9.40202 23.9609 9.33068 24.0059 9.28937 24.0773L9.02651 24.5241C8.95516 24.6481 9.04153 24.802 9.18423 24.802H16.3153C20.232 24.802 22.5564 22.4137 22.5564 20.4047C22.5564 18.3957 20.4986 17.5245 18.6773 17.5245H18.6811ZM19.6574 20.5812C19.5223 22.057 17.7723 23.6492 15.752 23.6492H14.2199C14.096 23.6492 14.0209 23.5178 14.081 23.4089L16.6646 18.9289C16.7547 18.7712 16.9199 18.6773 17.1039 18.6773H17.8399C19.0491 18.6773 19.7513 19.5335 19.6574 20.5774V20.5812ZM63.9536 21.1032L64.7347 19.7663C64.806 19.6462 64.7197 19.4922 64.577 19.4922H63.5931C63.5067 19.4922 63.4241 19.5373 63.3791 19.6161L63.304 19.74C63.2401 19.8527 63.0899 19.8752 62.9923 19.7889C62.6205 19.4546 62.061 19.1505 61.2612 19.1505C60.3036 19.1505 59.2559 19.4772 58.7264 20.4085C58.2195 21.2984 58.5086 22.2635 59.9093 22.8268C59.9093 22.8268 60.1196 22.9094 60.2135 22.9395C60.7279 23.1347 60.9983 23.315 60.9269 23.5666C60.8744 23.7506 60.7054 23.8858 60.266 23.8858C59.7591 23.8858 59.2822 23.6454 59.008 23.1685C58.963 23.0897 58.8766 23.0446 58.7902 23.0446H57.6411C57.5548 23.0446 57.4759 23.0897 57.4309 23.1648L56.631 24.5279C56.5597 24.6481 56.646 24.802 56.7887 24.802H57.7613C57.859 24.802 57.9491 24.7495 57.9979 24.6668L58.1368 24.4303C58.1894 24.3401 58.3096 24.3289 58.3809 24.404C58.7639 24.8058 59.346 25.1437 60.2285 25.1437C61.9108 25.1437 62.6431 24.3326 62.8796 23.6492C63.1725 22.8005 62.8947 21.9781 62.0122 21.5989C61.862 21.5313 61.723 21.4712 61.5916 21.4224C61.0133 21.2046 60.5552 20.968 60.5552 20.7652C60.5552 20.6075 60.6866 20.3972 61.1785 20.3972C61.6217 20.3972 62.2525 20.6713 62.429 21.1257C62.459 21.2008 62.5266 21.2496 62.6055 21.2496H63.7058C63.8109 21.2496 63.9048 21.1971 63.9574 21.1069L63.9536 21.1032Z"
                  fill="#FFF7EB"
                ></path>
                <path
                  d="M65.7674 28.8237C65.8988 28.8237 66.0189 28.85 66.1354 28.8988C66.248 28.9477 66.3494 29.0152 66.4358 29.1016C66.5222 29.188 66.5897 29.2856 66.6386 29.402C66.6874 29.5184 66.7137 29.6386 66.7137 29.77C66.7137 29.9015 66.6874 30.0216 66.6386 30.138C66.5897 30.2507 66.5222 30.3521 66.4358 30.4385C66.3494 30.5248 66.2518 30.5924 66.1354 30.6412C66.0227 30.6901 65.8988 30.7163 65.7674 30.7163C65.6359 30.7163 65.5158 30.6901 65.3993 30.6412C65.2829 30.5924 65.1853 30.5248 65.0989 30.4385C65.0126 30.3521 64.945 30.2545 64.8962 30.138C64.8473 30.0254 64.821 29.9015 64.821 29.77C64.821 29.6386 64.8473 29.5184 64.8962 29.402C64.945 29.2894 65.0126 29.188 65.0989 29.1016C65.1853 29.0152 65.2829 28.9477 65.3993 28.8988C65.512 28.85 65.6359 28.8237 65.7674 28.8237ZM65.7674 29.0115C65.6622 29.0115 65.5646 29.0303 65.4745 29.0716C65.3843 29.1129 65.3017 29.1655 65.2379 29.233C65.1703 29.3006 65.1177 29.3795 65.0764 29.4696C65.0351 29.5597 65.0163 29.6574 65.0163 29.7625C65.0163 29.8677 65.0351 29.9653 65.0764 30.0554C65.1177 30.1456 65.1703 30.2244 65.2379 30.292C65.3055 30.3596 65.3843 30.4122 65.4745 30.4535C65.5646 30.4948 65.6622 30.5136 65.7674 30.5136C65.8725 30.5136 65.9701 30.4948 66.0603 30.4535C66.1504 30.4122 66.2292 30.3596 66.2968 30.292C66.3644 30.2244 66.417 30.1456 66.4583 30.0554C66.4996 29.9653 66.5184 29.8639 66.5184 29.7625C66.5184 29.6611 66.4996 29.5597 66.4583 29.4696C66.417 29.3795 66.3644 29.2969 66.2968 29.233C66.2292 29.1655 66.1504 29.1129 66.0603 29.0716C65.9701 29.0303 65.8687 29.0115 65.7674 29.0115ZM65.6359 30.2056C65.6359 30.2582 65.6096 30.2845 65.5533 30.2845H65.4407C65.3843 30.2845 65.358 30.2582 65.358 30.2056V29.3269C65.358 29.2744 65.3843 29.2481 65.4407 29.2481H65.8875C65.9363 29.2481 65.9814 29.2556 66.0227 29.2744C66.064 29.2931 66.1016 29.3194 66.1354 29.3495C66.1692 29.3795 66.1917 29.417 66.2105 29.4621C66.2292 29.5072 66.2368 29.5485 66.2368 29.6011C66.2368 29.6611 66.2255 29.7137 66.1992 29.7625C66.1729 29.8113 66.1391 29.8526 66.0941 29.8864C66.049 29.9202 66.0415 29.9578 66.064 29.9991L66.1954 30.2207C66.2217 30.2657 66.2105 30.2882 66.1541 30.2882H65.9964C65.9438 30.2882 65.9025 30.2657 65.8763 30.2207L65.7448 29.9953C65.7298 29.9691 65.7073 29.954 65.6772 29.954C65.6472 29.954 65.6322 29.9691 65.6322 29.9991V30.2056H65.6359ZM65.6359 29.6348C65.6359 29.6912 65.6622 29.7175 65.7148 29.7175H65.8349C65.8687 29.7175 65.895 29.7062 65.9176 29.6837C65.9401 29.6611 65.9514 29.6311 65.9514 29.6011C65.9514 29.571 65.9401 29.541 65.9176 29.5184C65.895 29.4959 65.8687 29.4846 65.8349 29.4846H65.7148C65.6622 29.4846 65.6359 29.5109 65.6359 29.5635V29.6386V29.6348Z"
                  fill="#FFF7EB"
                ></path>
                <path
                  d="M26.4719 27.7688H29.799L29.8102 29.515C29.8102 29.6802 29.66 29.8041 29.4985 29.7703C28.6574 29.6013 27.2267 29.3047 26.6784 29.1883C26.5582 29.162 26.4719 29.0568 26.4719 28.9141V27.7688ZM25.9799 12.2149L24.8834 8.43714C26.5733 8.2644 28.6198 7.93395 30.918 7.32561C33.7081 6.58959 37.069 5.78223 41.4513 5.78223C48.6538 5.78223 55.1277 9.36842 58.1506 14.5468H50.8505C48.6237 12.4289 44.632 10.6752 37.5084 10.6752C34.7032 10.6752 32.4952 10.9268 29.814 11.43C28.77 11.6253 26.3104 12.1473 25.9799 12.2111V12.2149ZM50.843 10.1608C50.843 10.1608 50.843 10.172 50.8468 10.1908C50.8468 10.2096 50.8543 10.2359 50.8618 10.2697C50.8768 10.3373 50.9106 10.4274 50.9707 10.54C51.0871 10.7616 51.3087 11.0432 51.7293 11.3211C52.1498 11.6028 52.4916 11.7004 52.7394 11.7267C52.8633 11.7379 52.9609 11.7342 53.0285 11.7267C53.0623 11.7229 53.0886 11.7154 53.1074 11.7117C53.1262 11.7079 53.1337 11.7041 53.1374 11.7041C53.329 11.6591 53.4566 11.5727 53.4904 11.4676C53.5242 11.3624 53.4566 11.231 53.3139 11.1108C53.3139 11.1108 53.175 11.0245 52.976 10.908C52.7807 10.7879 52.5253 10.6339 52.3 10.48C52.0747 10.3298 51.8344 10.1533 51.6504 10.0143C51.4664 9.87537 51.335 9.77774 51.335 9.77774C51.1697 9.69137 51.0233 9.67635 50.9369 9.7477C50.8505 9.81529 50.8205 9.96925 50.8468 10.1645L50.843 10.1608ZM46.9189 8.51975C46.9189 8.51975 46.9226 8.53102 46.9301 8.54979C46.9376 8.56857 46.9489 8.5911 46.9639 8.62114C46.994 8.68123 47.0465 8.76384 47.1291 8.85772C47.2118 8.94784 47.3207 9.05674 47.4709 9.15813C47.546 9.2107 47.6323 9.25952 47.7262 9.30458C47.8201 9.3534 47.929 9.40222 48.0492 9.44728C48.5261 9.62378 48.8828 9.6388 49.1307 9.605C49.2546 9.58622 49.3485 9.55994 49.4123 9.53365C49.4461 9.51863 49.4686 9.50737 49.4874 9.49986C49.5024 9.49234 49.5137 9.48484 49.5137 9.48484C49.6864 9.39471 49.7916 9.2783 49.7991 9.1694C49.8066 9.0605 49.709 8.94785 49.54 8.86899C49.54 8.86899 49.3823 8.82392 49.1645 8.74882C48.9429 8.68498 48.6613 8.58359 48.4059 8.49722C48.2782 8.45216 48.1468 8.39583 48.0229 8.34326C47.8952 8.29069 47.775 8.24187 47.6699 8.19681C47.4596 8.10668 47.3094 8.03909 47.3094 8.03909C47.1292 7.99027 46.9827 8.0128 46.9151 8.09917C46.8475 8.18554 46.8513 8.34326 46.9226 8.52726L46.9189 8.51975ZM42.7281 7.78749C42.7281 7.78749 42.7356 7.79876 42.7431 7.81378C42.7544 7.8288 42.7694 7.85133 42.7919 7.87762C42.837 7.93019 42.9046 8.00154 43.006 8.07288C43.1073 8.14423 43.2388 8.21934 43.404 8.29069C43.573 8.35828 43.7795 8.41085 44.0311 8.4484C44.1588 8.46718 44.2752 8.47469 44.3804 8.47469C44.4855 8.47469 44.5869 8.47469 44.677 8.46343C44.8573 8.44465 45.0037 8.40334 45.1201 8.36204C45.2365 8.32073 45.3191 8.26815 45.3792 8.2306C45.4093 8.21183 45.4281 8.19305 45.4431 8.18179C45.4581 8.16677 45.4656 8.16301 45.4656 8.16301C45.6158 8.03533 45.6909 7.89639 45.6721 7.78749C45.6534 7.67859 45.5369 7.59222 45.3529 7.55091C45.3529 7.55091 45.3116 7.54716 45.244 7.5434C45.1765 7.53589 45.0788 7.52838 44.9624 7.52087C44.7333 7.5021 44.4367 7.47581 44.1701 7.44202C43.9034 7.40071 43.6105 7.35565 43.3852 7.30683C43.1599 7.26552 42.9984 7.23173 42.9984 7.23173C42.8107 7.22422 42.6755 7.27303 42.6267 7.37442C42.5779 7.47581 42.6154 7.62226 42.7243 7.79125L42.7281 7.78749ZM38.4734 7.87762C38.4734 7.87762 38.481 7.88513 38.4922 7.90015C38.5072 7.91517 38.5223 7.93394 38.5485 7.95647C38.6011 8.00154 38.68 8.05787 38.7926 8.11795C39.0142 8.23061 39.3634 8.33199 39.8779 8.30946C40.3923 8.28318 40.7303 8.14799 40.9406 8.01656C41.0457 7.94897 41.1208 7.88513 41.1659 7.83255C41.1884 7.80627 41.2072 7.78749 41.2185 7.77247C41.2298 7.75745 41.2373 7.74994 41.2373 7.74619C41.3574 7.58847 41.4025 7.44202 41.3612 7.33687C41.3199 7.23548 41.1884 7.1754 41.0044 7.17164C41.0044 7.17164 40.3661 7.26176 39.8328 7.29181C39.2958 7.31434 38.6537 7.2843 38.6537 7.2843C38.4697 7.30683 38.3458 7.37818 38.3157 7.48332C38.2857 7.58847 38.3458 7.73117 38.4772 7.87762H38.4734ZM21.0268 12.534C21.0606 12.6467 21.1583 12.7218 21.2747 12.7218C21.7403 12.7218 23.0171 12.6955 24.966 12.3876L23.847 8.52726C22.9533 8.5911 22.1872 8.61363 21.5751 8.61363C20.963 8.61363 20.5312 8.59485 20.242 8.57608C20.0618 8.56481 19.9266 8.73756 19.9754 8.91029L21.0268 12.534ZM50.8468 27.75H58.1469C55.1202 32.9284 48.65 36.5146 41.4475 36.5146C37.069 36.5146 33.7044 35.7073 30.9143 34.9713C28.6198 34.3667 26.5695 34.0362 24.8797 33.8597L25.9762 30.082C26.3029 30.1458 28.7625 30.6641 29.8102 30.8631C32.4877 31.3663 34.6995 31.6179 37.5046 31.6179C44.6282 31.6179 48.62 29.8642 50.8468 27.7463V27.75ZM41.2373 34.5507C41.2373 34.5507 41.2298 34.5432 41.2185 34.5244C41.2072 34.5094 41.1884 34.4868 41.1659 34.4643C41.1171 34.4155 41.0457 34.3479 40.9406 34.2803C40.7303 34.1451 40.3923 34.0099 39.8779 33.9874C39.3634 33.9611 39.0142 34.0663 38.7926 34.1789C38.68 34.2352 38.6011 34.2953 38.5485 34.3404C38.5223 34.3629 38.5035 34.3817 38.4922 34.3967C38.481 34.4117 38.4734 34.4192 38.4734 34.4192C38.342 34.5657 38.2819 34.7084 38.312 34.8135C38.342 34.9187 38.4697 34.9938 38.6499 35.0126C38.6499 35.0126 39.2921 34.9825 39.8291 35.0051C40.3623 35.0313 41.0007 35.1215 41.0007 35.1215C41.1847 35.1215 41.3161 35.0576 41.3574 34.9562C41.3987 34.8548 41.3537 34.7046 41.2335 34.5469L41.2373 34.5507ZM45.6759 34.5131C45.6947 34.4042 45.6196 34.269 45.4694 34.1376C45.4694 34.1376 45.4618 34.1301 45.4468 34.1188C45.4318 34.1076 45.413 34.0888 45.383 34.07C45.3267 34.0325 45.2403 33.9799 45.1239 33.9386C45.0075 33.8973 44.861 33.856 44.6808 33.8372C44.5906 33.8297 44.493 33.8222 44.3841 33.8259C44.2752 33.8259 44.1588 33.8334 44.0349 33.8522C43.7833 33.8898 43.5767 33.9423 43.4078 34.0099C43.2388 34.0775 43.1073 34.1526 43.0097 34.2277C42.9083 34.3028 42.8407 34.3704 42.7957 34.423C42.7731 34.4493 42.7581 34.4718 42.7468 34.4868C42.7356 34.5019 42.7318 34.5131 42.7318 34.5131C42.6229 34.6784 42.5854 34.8286 42.6342 34.9299C42.683 35.0313 42.8182 35.0802 43.006 35.0726C43.006 35.0726 43.1674 35.0426 43.3927 34.9975C43.618 34.9525 43.911 34.9037 44.1776 34.8624C44.4442 34.8286 44.7409 34.7985 44.9699 34.7835C45.0863 34.776 45.184 34.7685 45.2516 34.761C45.3191 34.7572 45.3605 34.7535 45.3605 34.7535C45.5407 34.7122 45.6609 34.6258 45.6797 34.5169L45.6759 34.5131ZM49.7953 33.1312C49.7878 33.0186 49.6827 32.9059 49.5099 32.8158C49.5099 32.8158 49.4987 32.812 49.4836 32.8008C49.4686 32.7933 49.4423 32.782 49.4086 32.767C49.3447 32.7407 49.2508 32.7106 49.1269 32.6956C48.8828 32.6618 48.5223 32.6768 48.0454 32.8533C47.9252 32.8984 47.8201 32.9435 47.7225 32.996C47.6248 33.0449 47.5422 33.0937 47.4671 33.1425C47.3169 33.2439 47.208 33.349 47.1254 33.4429C47.0428 33.5368 46.9902 33.6194 46.9602 33.6795C46.9451 33.7095 46.9339 33.7358 46.9264 33.7508C46.9189 33.7696 46.9151 33.7771 46.9151 33.7809C46.8438 33.9649 46.84 34.1226 46.9076 34.209C46.9752 34.2953 47.1179 34.3179 47.3019 34.269C47.3019 34.269 47.4521 34.2052 47.6624 34.1113C47.7675 34.0663 47.8914 34.0137 48.0154 33.9649C48.143 33.9123 48.2707 33.856 48.3984 33.8109C48.6538 33.7208 48.9354 33.6231 49.1569 33.5593C49.3747 33.488 49.5325 33.4391 49.5325 33.4391C49.7015 33.3603 49.7953 33.2476 49.7916 33.1387L49.7953 33.1312ZM50.8618 32.0272C50.8543 32.061 50.8468 32.0873 50.8468 32.1061C50.8468 32.1248 50.8468 32.1361 50.843 32.1361C50.8167 32.3314 50.843 32.4816 50.9332 32.5529C51.0195 32.6205 51.166 32.6092 51.3312 32.5229C51.3312 32.5229 51.4626 32.4252 51.6466 32.2863C51.8344 32.1511 52.071 31.9709 52.2963 31.8207C52.5216 31.6705 52.777 31.5165 52.9722 31.3926C53.1712 31.2724 53.3102 31.1898 53.3102 31.1898C53.4529 31.0696 53.5205 30.9382 53.4867 30.833C53.4529 30.7279 53.3214 30.6415 53.1337 30.5965C53.1337 30.5965 53.1224 30.5965 53.1037 30.589C53.0849 30.5852 53.0586 30.5777 53.0248 30.5739C52.9572 30.5664 52.8596 30.5589 52.7356 30.5739C52.4878 30.6002 52.1461 30.6979 51.7255 30.9795C51.3049 31.2611 51.0834 31.5428 50.967 31.7606C50.9106 31.8695 50.8768 31.9634 50.858 32.031L50.8618 32.0272ZM21.2747 29.5713C21.1583 29.5713 21.0569 29.6502 21.0268 29.7591L19.9754 33.3828C19.9266 33.5556 20.0618 33.7283 20.242 33.717C20.5312 33.6983 20.9818 33.6795 21.5751 33.6795C22.1684 33.6795 22.9533 33.702 23.847 33.7658L24.966 29.9055C23.0171 29.5976 21.7366 29.5676 21.2747 29.5713ZM29.8102 12.7856C29.8102 12.6204 29.66 12.4965 29.4985 12.5303C28.6574 12.6993 27.2267 12.9959 26.6784 13.1123C26.5582 13.1386 26.4719 13.2438 26.4719 13.3677V14.5468H29.814V12.7894L29.8102 12.7856Z"
                  fill="#F4BB3E"
                ></path>
              </svg>
            </div>
          </Link>
          <Navigations />
        </div>
        <div className="flex items-center gap-5">
          <div className="relative">
            <Input
              placeholder="Search"
              disableUnderline
              className="border-2 border-black rounded-lg px-[10px] py-[5px] bg-[#F5F5F5]"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
              <SearchIcon />
            </span>
          </div>
          <div className="cursor-pointer hover:text-[#ccc] transition-colors duration-300">
            {isLoggedIn ? (
              <>
                <div onClick={() => setIsHover(true)}>
                  <span className="font-second text-sm font-bold">
                    My account
                  </span>
                </div>
                {isHover && (
                  <div
                    className="absolute right-[8%] z-10 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                  >
                    <div className="py-1" role="none">
                      <Link
                        to="/account"
                        href="#"
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-0"
                      >
                        Information
                      </Link>
                      <button
                        href="#"
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-1"
                        onClick={() => dispatch(logout())}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <Person2OutlinedIcon />
              </Link>
            )}
          </div>
          <div className="cursor-pointer hover:text-[#ccc] transition-colors duration-300">
            <BookmarkBorderOutlinedIcon />
          </div>
          <div className="cursor-pointer hover:text-[#ccc] transition-colors duration-300">
            <ShoppingCartOutlinedIcon />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
