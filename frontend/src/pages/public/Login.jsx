import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import { InputFields, Button } from "../../components";

const Login = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = useCallback(() => {
    console.log(payload);
  }, [payload]);
  return (
    <>
      <div className="top-0 left-0 relative h-full flex justify-center items-center font-second w-full">
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
                <InputFields
                  value={payload.name}
                  setValue={setPayload}
                  nameKey="name"
                />
              )}
              <InputFields
                value={payload.email}
                setValue={setPayload}
                nameKey="email"
              />
              <InputFields
                value={payload.password}
                setValue={setPayload}
                nameKey="password"
                type="password"
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
              <Link className="underline transition duration-300 ease-in-out hover:text-[#8D8D8D] cursor-pointer">
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
