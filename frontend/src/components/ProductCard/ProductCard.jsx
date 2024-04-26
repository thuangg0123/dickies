import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import icons from "../../ultils/icons";
import { getDetailProduct } from "../../store/products/asyncActions";
import { getCurrent } from "../../store/user/asyncActions";
import { apiUpdateCart } from "../../apis";
import { toast } from "react-toastify";
import withBaseComponent from "../../hocs/withBaseComponent";
import Swal from "sweetalert2";
import path from "../../ultils/path";

function ProductCard({ product, isHoverEnabled, navigate, dispatch }) {
  const {
    StarIcon,
    StarOutlineIcon,
    BookmarkBorderOutlinedIcon,
    AddShoppingCartIcon,
    CheckBoxRoundedIcon,
    ShoppingCartCheckoutIcon,
  } = icons;
  const [hoveredImage, setHoveredImage] = useState(product?.thumb);
  const [showActions, setShowActions] = useState(false);
  const { current } = useSelector((state) => state.user);
  useEffect(() => {
    setHoveredImage(product.thumb);
  }, [product]);

  const renderStarFromNumber = (number) => {
    if (!Number(number)) {
      return;
    }
    const stars = [];
    for (let i = 0; i < +number; i++) {
      stars.push(<StarIcon key={i} fontSize="small" />);
    }
    for (let i = 5; i > +number; i--) {
      stars.push(<StarOutlineIcon key={i} fontSize="small" />);
    }
    return stars;
  };

  const handleAddToCart = async (data) => {
    if (!current) {
      return Swal.fire({
        title: "Almost ...",
        text: "Please login logged in to perform this action",
        icons: "info",
        showCancelButton: true,
        confirmButtonText: "Go to login page",
      }).then((results) => {
        if (results.isConfirmed) {
          navigate(`/${path.LOGIN}`);
        }
      });
    }
    const response = await apiUpdateCart({
      productId: data?._id,
      thumb: data?.thumb,
      color: data?.color[0],
      quantity: 1,
      size: data?.sizes[0],
      price: data?.price,
    });
    if (response.success) {
      toast.success(response.message);
      dispatch(getCurrent());
    } else {
      toast.error(response.message);
    }
  };

  const handleProductInCart = () => {
    toast.warning("You have already added this product to your cart");
  };

  const handleHoverImage = () => {
    if (isHoverEnabled) {
      setHoveredImage(product?.variants[0]?.images[0] || product.thumb);
    }
    setShowActions(true);
  };

  return (
    <div
      className="px-2 cursor-pointer relative"
      onMouseEnter={handleHoverImage}
      onMouseLeave={() => {
        setHoveredImage(product.thumb);
        setShowActions(false);
      }}
    >
      <Link
        to={`/products/${product.gender[0]}s-clothing/${product.category}/${product.slug}/${product?._id}`}
        onClick={() => dispatch(getDetailProduct({ productId: product._id }))}
        title="Click to see detail"
      >
        <img src={hoveredImage} alt={product.title} />
        <div className="flex flex-col justify-between gap-2">
          <div>
            <ul className="flex mt-4 gap-3">
              {product?.color?.map((color, index) => (
                <li
                  key={index}
                  className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black"
                  style={{ backgroundColor: color }}
                ></li>
              ))}
              {product?.variants?.map((variant, index) => (
                <li
                  key={index}
                  className="cursor-pointer w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center overflow-hidden hover:border-black"
                  style={{ backgroundColor: variant.color }}
                ></li>
              ))}
            </ul>
          </div>
          <h3 className="font-medium lg:text-[15px] md:text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
            <Link
              to={`/products/${product.gender[0]}s-clothing/${product.category}/${product.slug}/${product?._id}`}
            >
              {product.title}
            </Link>
          </h3>
          <div>
            <span className="text-sm">
              ${parseFloat(product.price).toFixed(2)}
            </span>
          </div>
          <span>{renderStarFromNumber(product.totalRatings)}</span>
        </div>
      </Link>
      {showActions && (
        <div className="flex w-full justify-between absolute top-0 left-0 p-3">
          <div className="cursor-pointer transition duration-300 ease-in-out hover:text-[#8D8D8D]">
            <BookmarkBorderOutlinedIcon />
          </div>
          <div className="flex flex-col items-center justify-between">
            <div className="cursor-pointer transition duration-300 ease-in-out hover:text-[#8D8D8D] py-">
              {!current?.cart?.some(
                (element) => element.product === product._id
              ) ? (
                <div
                  title="Add to cart"
                  onClick={() => handleAddToCart(product)}
                >
                  <AddShoppingCartIcon />
                </div>
              ) : (
                <div
                  title="Product is added in cart"
                  onClick={handleProductInCart}
                >
                  <CheckBoxRoundedIcon style={{ color: "#00BB27" }} />
                </div>
              )}
            </div>
            <div
              title="Buy now"
              className="cursor-pointer transition duration-300 ease-in-out hover:text-[#8D8D8D] py-2"
            >
              <ShoppingCartCheckoutIcon />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withBaseComponent(ProductCard);
