import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { InputFields, Button, Loading } from "../../../components";
import {
  apiRegister,
  apiLogin,
  apiForgotPassword,
  apiFinalRegister,
} from "../../../apis/user";
import { login } from "../../../store/user/userSlice";
import { getCurrent } from "../../../store/user/asyncActions";
import { showModal } from "../../../store/app/appSlice";
import path from "../../../ultils/path";
import { validate } from "../../../ultils/helper";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [invalidFields, setInvalidFields] = useState([]);
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [modalThanks, setModalThanks] = useState(false);
  const [token, setToken] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
    });
  };

  //submit
  const handleSubmit = useCallback(async () => {
    const { firstName, lastName, phone, ...data } = payload;
    const invalids = isRegister
      ? validate(payload, setInvalidFields)
      : validate(data, setInvalidFields);

    if (invalids === 0) {
      if (isRegister) {
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
        const response = await apiRegister(payload);
        dispatch(showModal({ isShowModal: false, modalChildren: null }));
        if (response.success) {
          setIsVerifiedEmail(true);
        } else {
          Swal.fire("Oops !", response.message, "error");
        }
      } else {
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
        const result = await apiLogin(data);
        if (result.success) {
          dispatch(
            login({
              isLoggedIn: true,
              token: result.accessToken,
              userData: result.userData,
            })
          );
          await dispatch(getCurrent());
          dispatch(showModal({ isShowModal: false, modalChildren: null }));
          navigate(`/${path.HOME}`);
        } else {
          Swal.fire("Oops !", result.message, "error");
        }
      }
    }
  }, [payload, isRegister, dispatch, navigate]);

  useEffect(() => {
    resetPayload();
  }, [isRegister]);

  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email });
    if (response.success !== false) {
      setModalThanks(true);
    } else {
      toast.error(response.message);
    }
  };

  const handleCloseModal = () => {
    setIsForgotPassword(false);
    setModalThanks(false);
    setEmail("");
  };

  const finalRegister = async () => {
    const response = await apiFinalRegister(token);
    if (response.success) {
      Swal.fire("Congratulation", response.data, "success").then(() => {
        setIsRegister(false);
        resetPayload();
      });
    } else {
      Swal.fire("Oops !", response.data, "error");
    }
    setIsVerifiedEmail(false);
    setToken("");
  };

  return (
    <>
      {isVerifiedEmail && (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-overlay flex justify-center items-center z-50">
          <div className="bg-white w-[500px] p-8">
            <h4 className="font-second mb-3">
              We sent a code to your mail. Please check your mail and enter your
              code:{" "}
            </h4>
            <input
              type="text"
              name=""
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full p-4 outline-none border border-gray-300 mb-3"
              placeholder="Enter your code"
            />
            <Button name="Send Code" handleOnClick={finalRegister} />
          </div>
        </div>
      )}
      {isForgotPassword && (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-overlay flex justify-center items-center z-50">
          <div className="bg-white w-[400px] p-8">
            <div className="flex justify-between mb-10">
              <h2 className="text-2xl font-semibold">
                {modalThanks ? "Thanks" : "Forgot password?"}
              </h2>
              <button className="cursor-pointer" onClick={handleCloseModal}>
                X
              </button>
            </div>
            <div>
              <p className="font-second mb-3">
                {modalThanks
                  ? `We've just sent you an email with instructions on how to reset your password. It might take a couple of minutes to reach you, but please check your junk folder just in case.`
                  : "Don't worry - it's easily done! Just enter your email address below and we'll send you a link to reset your password."}
              </p>
              {!modalThanks && (
                <div className="mt-3 mb-10">
                  <label htmlFor="email"></label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Email*"
                    className="w-full p-4 outline-none border border-gray-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}
              <Button
                name={modalThanks ? "Got it, close" : "Reset password"}
                handleOnClick={
                  modalThanks ? handleCloseModal : handleForgotPassword
                }
              />
            </div>
          </div>
        </div>
      )}
      <div className="top-0 left-0 relative h-full flex justify-center items-center font-second w-full m-5">
        <div className="min-w-[664px] relative">
          <h2 className="text-5xl mb-5 font-semibold">
            {isRegister ? "Register" : "Log In"}
          </h2>
          <div>
            <div className="relative">
              <div className="flex">
                <button
                  className={
                    isRegister
                      ? "text-lg font-medium mr-5 pb-3 z-10"
                      : "text-lg font-medium mr-5 pb-3 border-b-2 border-black relative z-10"
                  }
                  onClick={() => setIsRegister(false)}
                >
                  Log In
                </button>
                <button
                  className={
                    !isRegister
                      ? "text-lg font-medium mr-5 pb-3 z-10"
                      : "text-lg font-medium mr-5 pb-3 border-b-2 border-black relative z-10"
                  }
                  onClick={() => setIsRegister(true)}
                >
                  Create Account
                </button>
              </div>
              <div className="absolute left-0 bottom-0 w-full border-b-2 border-gray-300"></div>
            </div>

            <div>
              {isRegister && (
                <>
                  <InputFields
                    value={payload.firstName}
                    setValue={setPayload}
                    nameKey="firstName"
                    invalidFields={invalidFields}
                    setInValidFields={setInvalidFields}
                  />
                  <InputFields
                    value={payload.lastName}
                    setValue={setPayload}
                    nameKey="lastName"
                    invalidFields={invalidFields}
                    setInValidFields={setInvalidFields}
                  />
                  <InputFields
                    value={payload.phone}
                    setValue={setPayload}
                    nameKey="phone"
                    invalidFields={invalidFields}
                    setInValidFields={setInvalidFields}
                  />
                </>
              )}
              <InputFields
                value={payload.email}
                setValue={setPayload}
                nameKey="email"
                invalidFields={invalidFields}
                setInValidFields={setInvalidFields}
              />
              <InputFields
                value={payload.password}
                setValue={setPayload}
                nameKey="password"
                type="password"
                invalidFields={invalidFields}
                setInValidFields={setInvalidFields}
              />
            </div>
          </div>
          {!isRegister && (
            <div className="flex justify-between text-xs items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-info-login"
                  name="remember-info-login"
                  value="Remember Me"
                  className="cursor-pointer w-5 h-5 border border-black mr-2"
                />
                <label htmlFor="remember-info-login"> Remember Me</label>
              </div>
              <Link
                to="#"
                className="underline transition duration-300 ease-in-out hover:text-[#8D8D8D] cursor-pointer"
                onClick={() => setIsForgotPassword(true)}
              >
                Forgot your password?
              </Link>
            </div>
          )}
          <div className="my-5">
            <Button
              name={isRegister ? "Register" : "Login"}
              handleOnClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
