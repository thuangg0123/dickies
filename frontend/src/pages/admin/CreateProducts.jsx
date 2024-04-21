import React, { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { InputForm, Select, Button, MarkDownEditor } from "../../components";
import { set, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { gender } from "../../ultils/constans";
import { getBase64, validate } from "../../ultils/helper";
import { toast } from "react-toastify";
import icons from "../../ultils/icons";

function CreateProducts() {
  const { DeleteForeverIcon } = icons;
  const [payload, setPayload] = useState({
    description: "",
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const [hoverElement, setHoverElement] = useState(null);
  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });
  const { categories } = useSelector((state) => state.app);
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

  const handleCreateNewProduct = (data) => {
    const invalid = validate(payload, setInvalidFields);
    if (invalid === 0) {
      if (data.category) {
        data.category = categories?.find(
          (element) => element._id === data.category
        )?.title;
        const finalPayload = { ...data, ...payload };
        const formData = new FormData();
        for (let i of Object.entries(finalPayload)) {
          formData.append(i[0], i[1]);
        }
      }
    }
  };

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
    if (imagesPreview.length > 0) {
      setPreview((prev) => ({ ...prev, images: imagesPreview }));
    }
  };

  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };

  useEffect(() => {
    handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);

  useEffect(() => {
    handlePreviewImage(watch("images"));
  }, [watch("images")]);

  const handleRemoveImage = (name) => {
    const files = [...watch("images")];
    reset({
      images: files?.filter((element) => element.name !== name),
    });
    if (preview.images.some((element) => element.name === name)) {
      setPreview((prev) => ({
        ...prev,
        images: prev.images.filter((element) => element.name !== name),
      }));
    }
  };

  return (
    <div className="w-full">
      <h1 className="h-[75px] px-4 flex justify-between items-center text-3xl font-bold border-b">
        <span>Create New Product</span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateNewProduct)}>
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
                code: index,
                value: element,
              }))}
              register={register}
              id="gender"
              validate={{ required: "Need fill this fields" }}
              style="flex-auto"
              errors={errors}
            />
          </div>
          <div className="w-full my-3 flex gap-4">
            <Select
              label="Category"
              options={categories?.map((category) => ({
                code: category._id,
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
              options={[{ code: 1, value: "Dickies" }]}
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
                <div
                  onMouseEnter={() => setHoverElement(image.name)}
                  onMouseLeave={() => setHoverElement(null)}
                  className="w-fit relative"
                  key={index}
                >
                  <img
                    src={image.path}
                    alt="product"
                    className="w-[200px] object-contain"
                  />
                  {/* {hoverElement === image.name && (
                    <div
                      className="absolute inset-0 bg-overlay animate-scale-up-ver-center flex items-center justify-center"
                      onClick={() => handleRemoveImage(image.name)}
                    >
                      <DeleteForeverIcon
                        style={{
                          color: "#B22714",
                          fontSize: "60px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  )} */}
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

export default CreateProducts;
