import React from "react";
import clsx from "clsx";
import { InputForm, Textarea, Select, Button } from "../../components";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { gender } from "../../ultils/constans";

function CreateProducts() {
  const { categories } = useSelector((state) => state.app);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const handleCreateNewProduct = (data) => {
    if (data.category) {
      data.category = categories?.find(
        (element) => element._id === data.category
      )?.title;
    }
    console.log(data);
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
              require: "Need fill this fields",
            }}
            fullWidth
            placeholder="Name of product"
          />
          <div className="my-3">
            <Textarea
              label="Description product"
              register={register}
              errors={errors}
              id="description"
              validate={{
                require: "Need fill this fields",
              }}
              fullWidth
              placeholder="Description of product"
            />
          </div>
          <div className="w-full flex gap-4 my-3">
            <InputForm
              label="Price product"
              register={register}
              errors={errors}
              id="price"
              validate={{
                require: "Need fill this fields",
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
                require: "Need fill this fields",
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
                require: "Need fill this fields",
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
              validate={{ require: "Need fill this fields" }}
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
              validate={{ require: "Need fill this fields" }}
              style="flex-auto"
              fullWidth
              errors={errors}
            />
            <Select
              label="Brand"
              options={[{ code: 1, value: "Dickies" }]}
              register={register}
              id="brand"
              validate={{ require: "Need fill this fields" }}
              style="flex-auto"
              fullWidth
              errors={errors}
            />
          </div>
          <Button type="submit" name="Create new product" />
        </form>
      </div>
    </div>
  );
}

export default CreateProducts;
