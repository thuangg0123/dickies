import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputForm, Button, Loading } from "../../components";
import { toast } from "react-toastify";
import { getBase64 } from "../../ultils/helper";
import Swal from "sweetalert2";
import { showModal } from "../../store/app/appSlice";
import { apiAddVariant } from "../../apis";
import { useDispatch } from "react-redux";

function CustomizeVariant({ customizeVariant, setCustomizeVariant, render }) {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState({
    thumb: "",
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

  useEffect(() => {
    reset({
      title: customizeVariant?.title,
      color: customizeVariant?.color,
      price: customizeVariant?.price,
    });
  }, [customizeVariant]);

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
    if (watch("thumb") instanceof FileList && watch("thumb").length > 0) {
      handlePreviewThumb(watch("thumb")[0]);
    }
  }, [watch("thumb")]);

  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0) {
      handlePreviewImage(watch("images"));
    }
  }, [watch("images")]);

  const handleAddVariant = async (data) => {
    if (data.color === customizeVariant.color) {
      Swal.fire("Oops!", "Color must be changed", "info");
    } else {
      const formData = new FormData();
      for (let i of Object.entries(data)) {
        formData.append(i[0], i[1]);
      }
      if (data.thumb) {
        formData.append("thumb", data.thumb[0]);
      }
      if (data.images) {
        for (let image of data.images) {
          formData.append("images", image);
        }
      }
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiAddVariant(formData, customizeVariant._id);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));

      if (response.success) {
        reset();
        toast.success(response.message);
        setPreview({
          thumb: "",
          images: [],
        });
      } else {
        toast.error(response.message);
      }
    }
  };
  return (
    <div className="w-full pl-4 flex flex-col gap-4 relative bg-[#F5F5F5]">
      <div className="py-4 border-b w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">CustomizeVariant</h1>
        <span
          className="p-2 rounded-sm hover:bg-[rgb(180,91,81)] cursor-pointer text-white bg-[#B22714]"
          onClick={() => setCustomizeVariant(null)}
        >
          Back
        </span>
      </div>
      <div>
        <form
          onSubmit={handleSubmit(handleAddVariant)}
          className="w-full flex flex-col gap-4"
        >
          <InputForm
            label="Original name product"
            register={register}
            errors={errors}
            id="title"
            validate={{
              required: "Need fill this fields",
            }}
            fullWidth
            style="flex-auto"
          />
          <div className="flex gap-4 items-center">
            <InputForm
              label="Original price product"
              register={register}
              errors={errors}
              id="price"
              validate={{
                required: "Need fill this fields",
              }}
              type="number"
              fullWidth
              style="flex-auto"
            />
            <InputForm
              label="Original color product"
              register={register}
              errors={errors}
              id="color"
              validate={{
                required: "Need fill this fields",
              }}
              fullWidth
              style="flex-auto"
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
                    src={image.path}
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
          <Button type="submit" name="Add variant" />
        </form>
      </div>
    </div>
  );
}

export default memo(CustomizeVariant);
