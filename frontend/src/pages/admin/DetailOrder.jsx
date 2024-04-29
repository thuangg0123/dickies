import React, { useState } from "react";
import moment from "moment";
import icons from "../../ultils/icons";
import { PDFOrder } from "./index";
import { PDFViewer } from "@react-pdf/renderer";

function DetailOrder({ setDetailOrder, dataDetailOrder }) {
  const [showPDF, setShowPDF] = useState(false);
  const { DownloadIcon } = icons;
  const handleExportPDF = () => {
    setShowPDF(true);
  };
  return (
    <div>
      <div className="w-full pl-4 flex flex-col gap-4 relative bg-[#F5F5F5]">
        <div className="py-4 border-b w-full flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Detail order</h1>
          <span
            className="p-2 rounded-sm hover:bg-[rgb(180,91,81)] cursor-pointer text-white bg-[#B22714]"
            onClick={() => setDetailOrder(false)}
          >
            Back
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-3">Information Customer</h3>
            <div className="flex flex-col gap-1">
              <span className="text-lg">
                Name:
                {`${dataDetailOrder?.orderBy?.firstName} ${dataDetailOrder?.orderBy?.lastName}`}
              </span>
              <span>Address: {dataDetailOrder?.orderBy?.address}</span>
              <span>Email: {dataDetailOrder?.orderBy?.email}</span>
              <span>Phone: {dataDetailOrder?.orderBy?.phone}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex gap-2 items-center mb-1">
              <span>{dataDetailOrder?._id}</span>
              <div
                className={`p-1 rounded-lg text-white font-bold ${
                  dataDetailOrder?.status === "Succeed"
                    ? "bg-[#5EBF5C]"
                    : dataDetailOrder?.status === "Pending"
                    ? "bg-[#F4BB3E]"
                    : "bg-[#B22714]"
                }`}
              >
                {dataDetailOrder?.status}
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-1">Payment Methods</h3>
            <span>Paypal</span>
            <h3 className="text-xl font-semibold mb-1">
              Order is created date
            </h3>
            <span>
              {moment(dataDetailOrder?.createdAt).format("DD/MM/YYYY")}
            </span>
          </div>
        </div>
      </div>
      <div className="px-4">
        <h3 className="text-xl font-semibold mb-3">Information Product</h3>
        <table className="table-auto text-sm w-full">
          <thead>
            <tr className="border bg-black text-white">
              <th className="text-center px-2 py-2">#</th>
              <th className="text-center px-2 py-2">Image</th>
              <th className="text-center px-2 py-2">Name Product</th>
              <th className="text-center px-2 py-2">Price</th>
              <th className="text-center px-2 py-2">Quantity</th>
              <th className="text-center px-2 py-2">Total Price</th>
            </tr>
          </thead>
          <tbody className="text-center border border-black">
            {dataDetailOrder?.products?.map((product, index) => (
              <tr key={product._id} className="border-b border-black">
                <td className="py-2">{index + 1}</td>
                <td className="py-2 text-center">
                  <img
                    src={product?.thumb}
                    alt={product?.product?.title}
                    className="w-10 h-10 object-cover inline-block"
                  />
                </td>
                <td className="py-2 font-bold">
                  <span className="block">{product?.product?.title}</span>
                  <span className="block">Color: {product?.color}</span>
                  <span className="block">Size: {product?.size}</span>
                </td>
                <td className="py-2 font-bold">
                  ${parseFloat(product?.price).toFixed(2)}
                </td>
                <td className="py-2">{product?.quantity}</td>
                <td className="py-2 font-bold">
                  ${parseFloat(product?.price * product?.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="6" className="text-right px-2 py-2">
                Total Price:&nbsp;
                <span className="font-bold">
                  ${parseFloat(dataDetailOrder.total).toFixed(2)}
                </span>
              </td>
            </tr>
            {dataDetailOrder?.status === "Succeed" && (
              <tr>
                <td colSpan="6" className="text-right p-2">
                  <span
                    className="p-1 rounded-xl font-bold text-[#B22714] cursor-pointer"
                    onClick={handleExportPDF}
                  >
                    Export PDF <DownloadIcon />
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showPDF && (
        <PDFViewer width="100%" height="600px">
          <PDFOrder dataDetailOrder={dataDetailOrder} />
        </PDFViewer>
      )}
    </div>
  );
}

export default DetailOrder;
