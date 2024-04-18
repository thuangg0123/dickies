import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import path from "../../../ultils/path";
import Swal from "sweetalert2";

function FinalRegister() {
  const { status } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "false")
      Swal.fire("Oop !", "Register failed", "error").then(() => {
        navigate(`/${path.LOGIN}`);
      });
    if (status === "success")
      Swal.fire("Congratulation !", "Register success", "success").then(() => {
        navigate(`/${path.LOGIN}`);
      });
  }, []);
  return <div className="h-screen w-screen bg-gray-100"></div>;
}

export default FinalRegister;
