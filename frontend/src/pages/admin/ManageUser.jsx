import React, { useEffect, useState } from "react";
import { apiGetUsers } from "../../apis/user";
import { roles } from "../../ultils/constans";
import moment from "moment";

function ManageUser() {
  const [users, setUsers] = useState();
  const fetchUsers = async (params) => {
    const response = await apiGetUsers(params);
    if (response.success) {
      setUsers(response);
    }
    console.log(response);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="w-full">
      <h1 className="h-[75px] px-4 flex justify-between items-center text-3xl font-bold border-b">
        <span>Manage users</span>
      </h1>
      <div className="w-full p-2">
        <table className="table-auto mb-6 text-left text-sm w-full">
          <thead className="font-bold bg-black text-white text-center">
            <tr className="border boder-gray-500">
              <th className="px-2 py-1">#</th>
              <th className="px-2 py-1">Email</th>
              <th className="px-2 py-1">Fullname</th>
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
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{`${user.lastName} ${user.firstName}`}</td>
                <td className="py-2 px-4">
                  {roles.find((role) => +role.code === +user.role)?.value}
                </td>
                <td className="py-2 px-4">{user.phone}</td>
                <td className="py-2 px-4">
                  {user.isBlocked ? "Blocked" : "Active"}
                </td>
                <td className="py-2 px-4">
                  {moment(user.updatedAt).format("DD/MM/YYYY")}
                </td>
                <td className="font-second py-2 px-4">
                  <span className="px-2 hover:underline cursor-pointer text-[#F4BB3E]">
                    Edit
                  </span>
                  <span className="px-2 hover:underline cursor-pointer text-[#B22714]">
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUser;
