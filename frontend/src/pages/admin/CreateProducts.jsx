import React, { useCallback, useState } from "react";
import clsx from "clsx";
import { InputForm, Select, Button, MarkDownEditor } from "../../components";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { gender } from "../../ultils/constans";
import { validate } from "../../ultils/helper";

function CreateProducts() {
  const [payload, setPayload] = useState({
    description: "",
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const { categories } = useSelector((state) => state.app);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    formState,
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
