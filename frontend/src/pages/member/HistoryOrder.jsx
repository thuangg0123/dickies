import React, { useEffect, useState } from "react";
import { apiGetUserOrders } from "../../apis";
import { CustomSelect, InputForm, Pagination } from "../../components";
import { useForm } from "react-hook-form";
import { createSearchParams, useSearchParams } from "react-router-dom";
import moment from "moment";
import { statusOrders } from "../../ultils/constans";
import withBaseComponent from "../../hocs/withBaseComponent";

function HistoryOrder({ dispatch, navigate, location }) {
  const [orders, setOrders] = useState(null);
  const [counts, setCounts] = useState(0);
  const [params] = useSearchParams();
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();
  const status = watch("status");

  const fetchOrders = async (params) => {
    const response = await apiGetUserOrders({
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

  return (
    <div className="w-full relative p-4 font-second font-medium">
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
            <th className="text-center px-2 py-2">Products</th>
            <th className="text-center px-2 py-2">Total</th>
            <th className="text-center px-2 py-2">Status</th>
            <th className="text-center px-2 py-2">Date Created</th>
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
                <td className="py-2">
                  <span className="flex flex-col gap-5">
                    {order?.products?.map((element) => (
                      <span key={element._id} className="flex items-center">
                        •
                        <img
                          src={element.thumb}
                          alt={element.product.title}
                          className="w-[50px]"
                        />
                        <span>
                          {`${element.product.title} - Color: ${element.color} - Quantity: ${element.quantity} - Size: ${element.size} - Price: ${element.price}`}
                        </span>
                      </span>
                    ))}
                  </span>
                </td>
                <td className="py-2 max-w-[150px] overflow-hidden truncate">
                  ${parseFloat(order.total).toFixed(2)}
                </td>
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

export default withBaseComponent(HistoryOrder);
