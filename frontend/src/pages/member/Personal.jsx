import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, InputForm } from "../../components";
import { useSelector } from "react-redux";
import moment from "moment";
import avatarDefault from "../../img/anonymous.png";
import { apiUpdateCurrent } from "../../apis";
import { getCurrent } from "../../store/user/asyncActions";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import withBaseComponent from "../../hocs/withBaseComponent";

function Personal({ dispatch, navigate }) {
  const [searchParams] = useSearchParams();
  const {
    register,
    formState: { errors, isDirty, isSubmitted },
    handleSubmit,
    reset,
    watch,
  } = useForm();

  const { current } = useSelector((state) => state.user);

  useEffect(() => {
    reset({
      firstName: current?.firstName,
      lastName: current?.lastName,
      phone: current?.phone,
      email: current?.email,
      avatar: current?.avatar,
      address: current?.address,
    });
  }, [current]);

  const handleUpdateInfo = async (data) => {
    const formData = new FormData();
    if (data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }
    delete data.avatar;
    for (let i of Object.entries(data)) {
      formData.append(i[0], i[1]);
    }
    const response = await apiUpdateCurrent(formData);
    if (response.success) {
      dispatch(getCurrent());
      toast.success(response.message);
      if (searchParams.get("redirect")) {
        navigate(searchParams.get("redirect"));
      }
      window.scrollTo(0, 0);
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div className="w-full relative p-4 font-second font-medium">
      <header className="text-3xl font-semibold py-4 border-b">Personal</header>
      <div className="w-3/5 mx-auto py-8 flex flex-col gap-4">
        <form
          onSubmit={handleSubmit(handleUpdateInfo)}
          className="flex flex-col gap-4"
        >
          <InputForm
            label="Firstname"
            register={register}
            errors={errors}
            id="firstName"
            validate={{
              required: `Require fill this fields`,
            }}
          />
          <InputForm
            label="Lastname"
            register={register}
            errors={errors}
            id="lastName"
            validate={{
              required: `Require fill this fields`,
            }}
          />
          <InputForm
            label="Email address"
            register={register}
            errors={errors}
            id="email"
            validate={{
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email",
              },
              required: `Require fill this fields`,
            }}
          />
          <InputForm
            label="Phone"
            register={register}
            errors={errors}
            id="phone"
            validate={{
              pattern: {
                value: /^(0|\+84)\d{9}$/,
                message: "Invalid phone number",
              },
              required: `Require fill this fields`,
            }}
          />
          <InputForm
            label="Address"
            register={register}
            errors={errors}
            id="address"
            validate={{
              required: `Require fill this fields`,
            }}
          />
          {isSubmitted && !errors && (
            <small className="text-xs text-red-500 whitespace-nowrap">
              Please fill out all required fields.
            </small>
          )}
          <div className="flex items-center gap-2">
            <span className="font-bold">Account status: </span>
            <span
              className={
                current?.isBlocked
                  ? "text-[#B22714] font-semibold"
                  : "text-[#204387] font-semibold"
              }
            >
              {current?.isBlocked ? "Blocked" : "Active"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold">Role: </span>
            <span className="font-semibold">
              {+current?.role === 0 ? "Admin" : "User"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold">Created at: </span>
            <span className="font-semibold">
              {moment(current?.createdAt).format("DD/MM/YYYY")}
            </span>
          </div>
          <div className="flex gap-2 flex-col">
            <span className="font-bold">Profile image: </span>
            <label htmlFor="file">
              <img
                src={current?.avatar || avatarDefault}
                alt="avatar"
                className="w-20 h-20 object-cover rounded-full"
              />
            </label>
            <input type="file" id="file" hidden {...register("avatar")} />
          </div>
          {isDirty && (
            <Button
              type="submit"
              name="Update information"
              style="mt-5 p-4 text-white bg-black font-main font-semibold w-full transition duration-300 ease-in-out hover:bg-[#8D8D8D]"
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default withBaseComponent(Personal);
