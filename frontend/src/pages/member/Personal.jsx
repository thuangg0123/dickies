import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, InputForm } from "../../components";
import { useSelector } from "react-redux";
import moment from "moment";

function Personal() {
  const {
    register,
    formState: { errors },
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
    });
  }, [current]);

  const handleUpdateInfo = (data) => {
    console.log(data);
  };
  return (
    <div className="w-full relative p-4 font-second font-medium">
      <header className="text-3xl font-semibold py-4 border-b">Personal</header>
      <div className="w-3/5 mx-auto py-8 flex flex-col gap-4">
        <form onSubmit={handleSubmit(handleUpdateInfo)}>
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
            label="Email adress"
            register={register}
            errors={errors}
            id="email"
            validate={{
              required: `Require fill this fields`,
            }}
          />
          <InputForm
            label="phone"
            register={register}
            errors={errors}
            id="phone"
            validate={{
              required: `Require fill this fields`,
            }}
          />
          <Button
            type="submit"
            name="Update information"
            style="mt-5 p-4 text-white bg-black font-main font-semibold w-full transition duration-300 ease-in-out hover:bg-[#8D8D8D]"
          />
        </form>
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
      </div>
    </div>
  );
}

export default Personal;
