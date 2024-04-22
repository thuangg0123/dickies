import React, { useCallback, useEffect, useState } from "react";
import {
  InputForm,
  Select,
  Button,
  MarkDownEditor,
  Loading,
} from "../../components";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { gender, size } from "../../ultils/constans";
import { getBase64, validate } from "../../ultils/helper";
import { toast } from "react-toastify";
import { apiCreateProduct } from "../../apis";
import { showModal } from "../../store/app/appSlice";

function UpdateProduct({ editProduct, render }) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.app);
  const [payload, setPayload] = useState({
    description: "",
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    formState,
    watch,
  } = useForm();
  const { isSubmitted } = formState;

  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );

  const handlePreviewImage = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        toast.warning("File not supported!");
        return;
      }
      const base64 = await getBase64(file);
      imagesPreview.push({
        name: file.name,
        path: base64,
      });
    }
    setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };

  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };

  useEffect(() => {
    if (editProduct) {
      reset({
        title: editProduct?.title || "",
        price: editProduct?.price || "",
        quantity: editProduct?.quantity || "",
        color: editProduct?.color || "",
        gender: editProduct?.gender[0] || "",
        sizes: editProduct?.sizes?.join(",") || "",
        category: editProduct?.category.toUpperCase() || "",
        brand: editProduct?.brand || "",
      });

      setPayload({
        description:
          typeof editProduct?.description === "object"
            ? editProduct?.description.join(", ")
            : editProduct?.description,
      });

      setPreview({
        thumb: editProduct?.thumb || "",
        images: editProduct?.images || [],
      });
    }
  }, [editProduct]);

  console.log("editProduct", editProduct.category);
  console.log("categories", categories);

  useEffect(() => {
    if (watch("thumb")) {
      handlePreviewThumb(watch("thumb")[0]);
    }
  }, [watch("thumb")]);

  useEffect(() => {
    if (watch("images")) {
      handlePreviewImage(watch("images"));
    }
  }, [watch("images")]);

  const handleUpdateProduct = (data) => {
    console.log(data);
  };
  return (
    <div className="w-full pl-4 flex flex-col gap-4 relative bg-[#F5F5F5]">
      <div className="py-4 border-b w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Update Products</h1>
      </div>
      <div className="">
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <InputForm
            label="Name product"
            register={register}
            errors={errors}
            id="title"
            validate={{
              required: "Need fill this fields",
            }}
            fullWidth
            placeholder="Name of product"
          />
          <div className="w-full flex gap-4 my-3">
            <InputForm
              label="Price product"
              register={register}
              errors={errors}
              id="price"
              validate={{
                required: "Need fill this fields",
              }}
              style="flex-auto"
              placeholder="Price of product"
              type="number"
              fullWidth
            />
            <InputForm
              label="Quantity product"
              register={register}
              errors={errors}
              id="quantity"
              validate={{
                required: "Need fill this fields",
              }}
              style="flex-auto"
              placeholder="Quantity of product"
              type="number"
              fullWidth
            />
            <InputForm
              label="Color product"
              register={register}
              errors={errors}
              id="color"
              validate={{
                required: "Need fill this fields",
              }}
              style="flex-auto"
              placeholder="Color of product"
              fullWidth
            />
            <Select
              label="Gender"
              options={gender.map((element, index) => ({
                code: element,
                value: element,
              }))}
              register={register}
              id="gender"
              validate={{ required: "Need fill this fields" }}
              style="flex-auto"
              errors={errors}
            />
            <Select
              label="Sizes"
              options={size.map((element) => ({
                code: element.value,
                value: element.value.join(", "),
              }))}
              register={register}
              id="sizes"
              validate={{ required: "Need fill this fields" }}
              style="flex-auto"
              errors={errors}
            />
          </div>
          <div className="w-full my-3 flex gap-4">
            <Select
              label="Category"
              options={categories?.map((category) => ({
                code: category.title,
                value: category.title,
              }))}
              register={register}
              id="category"
              validate={{ required: "Need fill this fields" }}
              style="flex-auto"
              fullWidth
              errors={errors}
            />
            <Select
              label="Brand"
              options={[{ code: "Dickies", value: "Dickies" }]}
              register={register}
              id="brand"
              validate={{ required: "Need fill this fields" }}
              style="flex-auto"
              fullWidth
              errors={errors}
            />
          </div>
          <div>
            <MarkDownEditor
              name="description"
              changeValue={changeValue}
              label="Description"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              value={payload.description}
            />
          </div>
          <div className="flex flex-col gap-2 my-8">
            <label htmlFor="thumb" className="font-semibold">
              Upload thumb
            </label>
            <input
              type="file"
              id="thumb"
              {...register("thumb", { required: "Need fill" })}
            />
            {errors && errors["thumb"] && (
              <small className="text-xs text-red-500 whitespace-nowrap">
                {errors["thumb"]?.message}
              </small>
            )}
          </div>
          {preview.thumb && (
            <div>
              <img
                src={preview.thumb}
                alt="thumbnail"
                className="w-[200px] object-contain"
              />
            </div>
          )}
          <div className="flex flex-col gap-2 my-8">
            <label htmlFor="products" className="font-semibold">
              Upload images of product
            </label>
            <input
              type="file"
              id="products"
              multiple
              {...register("images", { required: "Need fill" })}
            />
            {errors && errors["images"] && (
              <small className="text-xs text-red-500 whitespace-nowrap">
                {errors["images"]?.message}
              </small>
            )}
          </div>
          {preview.images && preview.images.length > 0 && (
            <div className="flex w-full gap-3 flex-wrap mb-3">
              {preview.images.map((image, index) => (
                <div className="w-fit relative" key={index}>
                  <img
                    src={image}
                    alt="product"
                    className="w-[200px] object-contain"
                  />
                </div>
              ))}
            </div>
          )}
          {isSubmitted && !errors && (
            <small className="text-xs text-red-500 whitespace-nowrap">
              Please fill out all required fields.
            </small>
          )}
          <Button type="submit" name="Create new product" />
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
