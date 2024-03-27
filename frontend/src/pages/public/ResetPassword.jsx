import React, { useState } from "react";
import { Button } from "../../components";
import { useParams, useNavigate } from "react-router-dom";
import { apiResetPassword } from "../../apis/user";

import { toast } from "react-toastify";
import path from "../../ultils/path";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  console.log("token", token);
  const [dataPassword, setDataPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleResetPassword = async () => {
    if (dataPassword.password !== dataPassword.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    let response = await apiResetPassword({
      password: dataPassword.password,
      token,
    });
    toast.success(response.success);
    navigate(`${path.LOGIN}`);
    setDataPassword("");
  };

  return (
    <div className="top-0 left-0 relative h-full flex justify-center items-center w-full m-5">
      <div className="min-w-[664px] relative">
        <div className="flex justify-between mb-10">
          <h2 className="text-5xl font-semibold">Set New Password</h2>
        </div>
        <div>
          <div className="mt-3 mb-10">
            <label htmlFor="password"></label>
            <input
              type="text"
              id="password"
              placeholder="Password*"
              className="w-full p-4 outline-none border border-gray-300"
              value={dataPassword.password}
              onChange={(e) =>
                setDataPassword({ ...dataPassword, password: e.target.value })
              }
            />
          </div>
          <div className="mt-3 mb-10">
            <label htmlFor="confirmPassword"></label>
            <input
              type="text"
              id="confirmPassword"
              placeholder="Confirm Password*"
              className="w-full p-4 outline-none border border-gray-300"
              value={dataPassword.confirmPassword}
              onChange={(e) =>
                setDataPassword({
                  ...dataPassword,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>
          <Button
            name="Reset New Password"
            handleOnClick={handleResetPassword}
          />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
