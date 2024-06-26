import React, { useCallback, useEffect, useState } from "react";
import { InputForm, Pagination } from "../../components";
import { useForm } from "react-hook-form";
import { apiGetProductByQuery, apiDeleteProduct } from "../../apis/app";
import moment from "moment";
import {
  useSearchParams,
  createSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { CustomizeVariant, UpdateProduct } from "./index";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import icons from "../../ultils/icons";

function ManageProducts() {
  const { EditIcon, DeleteIcon, AutoAwesomeIcon } = icons;
  const location = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [products, setProducts] = useState(null);
  const [counts, setCounts] = useState(0);
  const [editProduct, setEditProduct] = useState(null);
  const [update, setUpdate] = useState(false);
  const [customizeVariant, setCustomizeVariant] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const render = useCallback(() => {
    setUpdate(!update);
  }, []);

  const fetchProducts = async (params) => {
    const response = await apiGetProductByQuery({
      ...params,
      limit: +import.meta.env.VITE_APP_LIMIT,
    });
    if (response.success) {
      setCounts(response.counts);
      setProducts(response.dataProduct);
    }
  };

  const queryDebounce = useDebounce(watch("q"), 800);
  useEffect(() => {
    if (queryDebounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: queryDebounce }).toString(),
      });
    } else {
      navigate({
        pathname: location.pathname,
      });
    }
  }, [queryDebounce]);

  useEffect(() => {
    const searchParams = Object.fromEntries([...params]);
    fetchProducts(searchParams);
  }, [params, update]);

  const handleSearchProduct = (data) => {};

  const handleDeleteProduct = async (productId) => {
    Swal.fire({
      title: "Delete product",
      text: "Are you sure delete this product ?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteProduct(productId);
        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
        render();
      }
    });
  };

  return (
    <div className="w-full pl-4 flex flex-col gap-4 relative">
      {editProduct && (
        <div className="absolute inset-0 min-h-screen bg-white z-50">
          <UpdateProduct
            editProduct={editProduct}
            render={render}
            setEditProduct={setEditProduct}
          />
        </div>
      )}
      {customizeVariant && (
        <div className="absolute inset-0 min-h-screen bg-white z-50">
          <CustomizeVariant
            customizeVariant={customizeVariant}
            render={render}
            setCustomizeVariant={setCustomizeVariant}
          />
        </div>
      )}
      <div className="py-4 border-b w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Manage Products</h1>
      </div>
      <div>
        <form
          className="flex w-full justify-end items-center"
          onSubmit={handleSubmit(handleSearchProduct)}
        >
          <InputForm
            id="q"
            register={register}
            errors={errors}
            fullWidth
            placeholder={"Search product by title, description, ..."}
            style={"w-full"}
          />
        </form>
      </div>
      <table className="table-auto text-sm">
        <thead>
          <tr className="border bg-black text-white">
            <th className="text-center px-2 py-2">Order</th>
            <th className="text-center px-2 py-2">Thumb</th>
            <th className="text-center px-2 py-2">Title</th>
            <th className="text-center px-2 py-2">Gender</th>
            <th className="text-center px-2 py-2">Brand</th>
            <th className="text-center px-2 py-2">Category</th>
            <th className="text-center px-2 py-2">Price</th>
            <th className="text-center px-2 py-2">Color</th>
            <th className="text-center px-2 py-2">Sold</th>
            <th className="text-center px-2 py-2">Quantity</th>
            <th className="text-center px-2 py-2">Ratings</th>
            <th className="text-center px-2 py-2">Variant counts</th>
            <th className="text-center px-2 py-2">Date Created</th>
            <th className="text-center px-2 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {products &&
            products?.length > 0 &&
            products.map((product, index) => (
              <tr key={product._id}>
                <td className="py-2">
                  {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                    +import.meta.env.VITE_APP_LIMIT +
                    index +
                    1}
                </td>
                <td className="py-2">
                  <img
                    src={product.thumb}
                    alt={product.title}
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td className="py-2 max-w-[150px] overflow-hidden truncate">
                  {product.title}
                </td>
                <td className="py-2 max-w-[150px] overflow-hidden truncate">
                  {product.gender[0]}
                </td>
                <td className="py-2 max-w-[150px] overflow-hidden truncate">
                  {product.brand}
                </td>
                <td className="py-2 max-w-[150px] overflow-hidden truncate">
                  {product.category}
                </td>
                <td className="py-2 max-w-[150px] overflow-hidden truncate">
                  {product.price}
                </td>
                <td className="py-2 max-w-[150px] overflow-hidden truncate">
                  {product.color[0]}
                </td>
                <td className="py-2 max-w-[150px] overflow-hidden truncate">
                  {product.sold}
                </td>
                <td className="py-2 max-w-[150px] overflow-hidden truncate">
                  {product.quantity}
                </td>
                <td className="py-2 max-w-[150px] overflow-hidden truncate">
                  {product.totalRatings}
                </td>
                <td className="py-2 max-w-[150px] overflow-hidden truncate">
                  {product?.variants?.length || 0}
                </td>
                <td className="py-2 max-w-[150px] overflow-hidden truncate">
                  {moment(product.createdAt).format("DD/MM/YYYY")}
                </td>
                <td>
                  <span
                    className="px-2 hover:underline cursor-pointer text-[#F4BB3E]"
                    onClick={() => setEditProduct(product)}
                    title="edit"
                  >
                    <EditIcon style={{ fontSize: "16px" }} />
                  </span>
                  <span
                    className="px-2 hover:underline cursor-pointer text-[#B22714]"
                    onClick={() => handleDeleteProduct(product._id)}
                    title="delete"
                  >
                    <DeleteIcon style={{ fontSize: "16px" }} />
                  </span>
                  <span
                    className="px-2 hover:underline cursor-pointer text-[#204387]"
                    onClick={() => setCustomizeVariant(product)}
                    title="variant"
                  >
                    <AutoAwesomeIcon style={{ fontSize: "16px" }} />
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="w-full flex justify-end my-8">
        <Pagination totalCount={counts} />
      </div>
    </div>
  );
}

export default ManageProducts;
