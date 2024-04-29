import React, { useEffect, useState } from "react";
import {
  apiAllOrdersByAdmin,
  apiGetDetailOrder,
  apiUpdateStatusOrder,
} from "../../apis";
import { CustomSelect, InputForm, Pagination } from "../../components";
import { set, useForm } from "react-hook-form";
import { createSearchParams, useSearchParams } from "react-router-dom";
import moment from "moment";
import { statusOrders } from "../../ultils/constans";
import withBaseComponent from "../../hocs/withBaseComponent";
import icons from "../../ultils/icons";
import { toast } from "react-toastify";
import DetailOrder from "./DetailOrder";

function ManageOrder({ navigate, location }) {
  const { VisibilityIcon } = icons;
  const [orders, setOrders] = useState(null);
  const [detailOrder, setDetailOrder] = useState(false);
  const [dataDetailOrder, setDataDetailOrder] = useState(null);
  const [counts, setCounts] = useState(0);
  const [params] = useSearchParams();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const status = watch("status");

  const fetchOrders = async (params) => {
    const response = await apiAllOrdersByAdmin({
      ...params,
      limit: +import.meta.env.VITE_APP_LIMIT,
    });
    if (response.success) {
      setOrders(response.orders);
      setCounts(response.counts);
    }
  };

  useEffect(() => {
    const pr = Object.fromEntries([...params]);
    fetchOrders(pr);
  }, [params]);

  const handleSearchStatus = ({ value }) => {
    navigate({
      pathname: location.path,
      search: createSearchParams({ status: value }).toString(),
    });
  };

  const handleUpdateStatusOrder = async ({ orderId, status }) => {
    const response = await apiUpdateStatusOrder(orderId, status);
    if (response.success) {
      toast.success(response.message);
      fetchOrders();
    } else {
      toast.error(response.message);
    }
  };

  const handleDetailOrder = async (orderId) => {
    const data = await apiGetDetailOrder(orderId);
    setDataDetailOrder(data.data);
    setDetailOrder(true);
  };

  return (
    <div className="w-full relative p-4 font-second font-medium">
      {detailOrder && (
        <div className="absolute inset-0 min-h-screen bg-white z-50">
          <DetailOrder
            setDetailOrder={setDetailOrder}
            dataDetailOrder={dataDetailOrder}
          />
        </div>
      )}
      <header className="text-3xl font-semibold py-4 border-b">
        History Order
      </header>
      <div>
        <form className="flex w-full items-center gap-4">
          <InputForm
            id="q"
            register={register}
            errors={errors}
            fullWidth
            placeholder={"Search orders by status ..."}
            style={"w-[70%]"}
          />
          <CustomSelect
            width="w-[30%]"
            options={statusOrders}
            value={status}
            onChange={(value) => handleSearchStatus(value)}
          />
        </form>
      </div>
      <table className="table-auto text-sm w-full">
        <thead>
          <tr className="border bg-black text-white">
            <th className="text-center px-2 py-2">#</th>
            <th className="text-center px-2 py-2">Id order</th>
            <th className="text-center px-2 py-2">Total quantity products</th>
            <th className="text-center px-2 py-2">Total price</th>
            <th className="text-center px-2 py-2">Order by</th>
            <th className="text-center px-2 py-2">Status</th>
            <th className="text-center px-2 py-2">Date Created</th>
            <th className="text-center px-2 py-2">Update status</th>
            <th className="text-center px-2 py-2">View detail</th>
          </tr>
        </thead>
        <tbody className="text-center border border-black">
          {orders &&
            orders?.length > 0 &&
            orders.map((order, index) => (
              <tr key={order._id} className="border-b border-black">
                <td className="py-2">
                  {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                    +import.meta.env.VITE_APP_LIMIT +
                    index +
                    1}
                </td>
                <td className="py-2">{order?._id}</td>
                <td className="py-2">{order?.products?.length}</td>
                <td className="py-2 max-w-[150px] overflow-hidden truncate">
                  ${parseFloat(order.total).toFixed(2)}
                </td>
                <td>{`${order.orderBy.firstName} ${order.orderBy.lastName}`}</td>
                <td
                  className={`py-2 max-w-[150px] overflow-hidden truncate font-bold ${
                    order.status === "Succeed"
                      ? "text-[#5EBF5C]"
                      : order.status === "Pending"
                      ? "text-[#F4BB3E]"
                      : "text-[#B22714]"
                  }`}
                >
                  {order.status}
                </td>
                <td className="py-2 max-w-[150px] overflow-hidden truncate">
                  {moment(order.createdAt).format("DD/MM/YYYY")}
                </td>
                <td className="py-2 max-w-[150px] overflow-hidden truncate">
                  <select
                    name="status"
                    id="status"
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={order.status}
                    onChange={(e) =>
                      handleUpdateStatusOrder({
                        orderId: order._id,
                        status: e.target.value,
                      })
                    }
                    disabled={order.status !== "Pending"}
                  >
                    <option value="Cancelled">Cancelled</option>
                    <option value="Pending">Pending</option>
                    <option value="Succeed">Succeed</option>
                  </select>
                </td>

                <td className="py-2 max-w-[150px] overflow-hidden truncate text-[#204387]">
                  <span
                    onClick={() => handleDetailOrder(order._id)}
                    className="cursor-pointer"
                  >
                    <VisibilityIcon titleAccess="View detail order" />
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="w-full flex justify-end my-8">
        <Pagination totalCount={counts} />
      </div>
    </div>
  );
}

export default withBaseComponent(ManageOrder);
