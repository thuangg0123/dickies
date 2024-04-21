import React, { useCallback, useEffect, useState } from "react";
import { apiGetUsers, apiUpdateUsers, apiDeleteUser } from "../../apis/user";
import { roles } from "../../ultils/constans";
import moment from "moment";
import {
  InputFields,
  Pagination,
  InputForm,
  Select,
  Button,
} from "../../components";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function ManageUser() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    phone: "",
    status: "",
  });
  const [users, setUsers] = useState();
  const [update, setUpdate] = useState(false);
  const [editElement, setEditElement] = useState(null);
  const [queries, setQueries] = useState({
    q: "",
  });
  const [params] = useSearchParams();
  const fetchUsers = async (params) => {
    const response = await apiGetUsers({
      ...params,
      limit: +import.meta.env.VITE_APP_LIMIT,
    });
    if (response.success) {
      setUsers(response);
    }
  };
  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  const queriesDebounce = useDebounce(queries.q, 800);

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (queriesDebounce) {
      queries.q = queriesDebounce;
    }
    fetchUsers(queries);
  }, [queriesDebounce, params, update]);

  const handleUpdate = async (data) => {
    const response = await apiUpdateUsers(data, editElement._id);
    if (response.success) {
      render();
      setEditElement(null);
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const handleDelete = (userId) => {
    Swal.fire({
      title: "Delete user",
      text: "Are you sure delete this user ?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUser(userId);
        if (response.success) {
          render();
          setEditElement(null);
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      }
    });
  };
  return (
    <div className={editElement ? "w-full pl-12" : "w-full"}>
      <h1 className="h-[75px] px-4 flex justify-between items-center text-3xl font-bold border-b">
        <span>Manage users</span>
      </h1>
      <div className="w-full p-2">
        <div className="flex justify-end py-4">
          <InputFields
            nameKey={"q"}
            value={queries.q}
            setValue={setQueries}
            style
            fullWidth
            isHideLabel
            placeholder={"Search name or mail user ..."}
          />
        </div>
        <form onSubmit={handleSubmit(handleUpdate)}>
          {editElement && (
            <Button
              type="submit"
              name="Update"
              style={
                "p-2 mb-4 text-white bg-[#F4BB3E] font-main font-semibold transition duration-300 ease-in-out hover:bg-[#EFC15B]"
              }
            />
          )}
          <table className="table-auto mb-6 text-left text-sm w-full">
            <thead className="font-bold bg-black text-white text-center">
              <tr className="border boder-gray-500">
                <th className="px-2 py-1">#</th>
                <th className="px-2 py-1">Email</th>
                <th className="px-2 py-1">Firstname</th>
                <th className="px-2 py-1">Lastname</th>
                <th className="px-2 py-1">Role</th>
                <th className="px-2 py-1">Phone</th>
                <th className="px-2 py-1">Status</th>
                <th className="px-2 py-1">Created At</th>
                <th className="px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.data?.map((user, index) => (
                <tr key={user._id} className="border boder-gray-500">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">
                    {editElement?._id === user?._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        defaultValue={editElement?.email}
                        id={"email"}
                        validate={{
                          required: true,
                          pattern: {
                            value:
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Please enter a valid email",
                          },
                        }}
                      />
                    ) : (
                      <span>{user.email}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editElement?._id === user?._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        defaultValue={editElement?.firstName}
                        id={"firstName"}
                        validate={{ required: `Require fill firstName` }}
                      />
                    ) : (
                      <span>{user.firstName}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editElement?._id === user?._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        defaultValue={editElement?.lastName}
                        id={"lastName"}
                        validate={{ required: `Require fill lastName` }}
                      />
                    ) : (
                      <span>{user.lastName}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editElement?._id === user?._id ? (
                      <Select />
                    ) : (
                      <span>
                        {roles.find((role) => +role.code === +user.role)?.value}
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editElement?._id === user?._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        defaultValue={editElement?.phone}
                        id={"phone"}
                        validate={{
                          required: `Require fill phone`,
                          pattern: {
                            value: /^\d{10,}$/,
                            message: "Invalid phone number",
                          },
                        }}
                      />
                    ) : (
                      <span>{user.phone}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editElement?._id === user?._id ? (
                      <Select />
                    ) : (
                      <span>{user.isBlocked ? "Blocked" : "Active"}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {moment(user.updatedAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="font-second py-2 px-4">
                    {editElement?._id !== user?._id ? (
                      <span
                        onClick={() => setEditElement(user)}
                        className="px-2 hover:underline cursor-pointer text-[#F4BB3E]"
                      >
                        Edit
                      </span>
                    ) : (
                      <span
                        onClick={() => setEditElement(null)}
                        className="px-2 hover:underline cursor-pointer text-[#B22714]"
                      >
                        Back
                      </span>
                    )}
                    <span
                      className="px-2 hover:underline cursor-pointer text-[#B22714]"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>

        <div className="w-full text-right">
          <Pagination totalCount={users?.counts} />
        </div>
      </div>
    </div>
  );
}

export default ManageUser;
