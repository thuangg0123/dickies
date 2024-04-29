import React, { useEffect, useState } from "react";
import icons from "../../ultils/icons";
import {
  apiAllOrdersByAdmin,
  apiGetProductByQuery,
  apiGetUsers,
} from "../../apis";
import Chart from "chart.js/auto";

function Dashboard() {
  const { Person2OutlinedIcon, InventoryIcon, CategoryIcon, AttachMoneyIcon } =
    icons;
  const [orders, setOrders] = useState(null);
  const [products, setProducts] = useState(null);
  const [users, setUsers] = useState(null);
  const [selectedMode, setSelectedMode] = useState("All");

  const fetchOrders = async () => {
    let order = await apiAllOrdersByAdmin();
    setOrders(order);
  };

  const fetchProducts = async () => {
    const product = await apiGetProductByQuery();
    setProducts(product);
  };

  const fetchUsers = async () => {
    const user = await apiGetUsers();
    setUsers(user);
  };

  const totalMoney = parseFloat(
    orders?.orders?.reduce((pre, curr) => pre + curr.total, 0)
  ).toFixed(2);

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (orders && products && users) {
      createChart(selectedMode);
    }
  }, [orders, products, users, selectedMode]);

  const createChart = (mode) => {
    const data = [];
    const labels = [];
    let label = "";
    let backgroundColor = "";
    let borderColor = "";
    let chartType = "line";

    const existingChart = Chart.getChart("dashboardChart");
    if (existingChart) {
      existingChart.destroy();
    }

    switch (mode) {
      case "Orders":
        label = "Orders";
        data.push(orders.counts);
        labels.push("Orders");
        backgroundColor = "rgba(255, 99, 132, 0.2)";
        borderColor = "rgba(255, 99, 132, 1)";
        break;
      case "Revenues":
        label = "Revenues";
        data.push(totalMoney);
        labels.push("Revenues");
        backgroundColor = "rgba(54, 162, 235, 0.2)";
        borderColor = "rgba(54, 162, 235, 1)";
        break;
      case "Products":
        label = "Products";
        data.push(products.counts);
        labels.push("Products");
        backgroundColor = "rgba(255, 206, 86, 0.2)";
        borderColor = "rgba(255, 206, 86, 1)";
        break;
      case "Accounts":
        label = "Accounts";
        data.push(users.counts);
        labels.push("Accounts");
        backgroundColor = "rgba(255, 159, 64, 0.2)";
        borderColor = "rgba(255, 159, 64, 1)";
        break;
      default:
        label = "All";
        data.push(orders.counts, totalMoney, products.counts, users.counts);
        labels.push("Orders", "Revenues", "Products", "Accounts");
        backgroundColor = [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ];
        borderColor = [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 159, 64, 1)",
        ];
        chartType = "line";
    }

    const canvas = document.getElementById("dashboardChart");
    new Chart(canvas, {
      type: chartType,
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  const handleModeChange = (e) => {
    setSelectedMode(e.target.value);
  };

  return (
    <div>
      <div className="w-full pl-8 flex flex-col gap-4 relative bg-[#F5F5F5]">
        <div className="py-4 border-b w-full flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>
      </div>
      <div className="flex justify-between p-8">
        <div className="flex">
          <div className="bg-[#D82F3E] flex justify-center items-center w-20 h-20">
            <CategoryIcon />
          </div>
          <div className="flex flex-col justify-center items-start p-4 w-40 h-20 border border-gray-300">
            <span className="font-semibold">Orders</span>
            <span className="font-bold">{orders?.counts}</span>
          </div>
        </div>
        <div className="flex">
          <div className="bg-[#167B4A] flex justify-center items-center w-20 h-20">
            <AttachMoneyIcon />
          </div>
          <div className="flex flex-col justify-center items-start p-4 w-40 h-20 border border-gray-300">
            <span className="font-semibold">Revenues</span>
            <span className="font-bold">${totalMoney}</span>
          </div>
        </div>
        <div className="flex">
          <div className="bg-[#0C63FC] flex justify-center items-center w-20 h-20">
            <InventoryIcon />
          </div>
          <div className="flex flex-col justify-center items-start p-4 w-40 h-20 border border-gray-300">
            <span className="font-semibold">Products</span>
            <span className="font-bold">{products?.counts}</span>
          </div>
        </div>
        <div className="flex">
          <div className="bg-[#FEB908] flex justify-center items-center w-20 h-20">
            <Person2OutlinedIcon />
          </div>
          <div className="flex flex-col justify-center items-start p-4 w-40 h-20 border border-gray-300">
            <span className="font-semibold">Accounts</span>
            <span className="font-bold">{users?.counts}</span>
          </div>
        </div>
      </div>
      <div className="flex p-8">
        <select
          className="p-2 rounded-md border-gray-300 border"
          value={selectedMode}
          onChange={handleModeChange}
        >
          <option value="Orders">Orders</option>
          <option value="Revenues">Revenues</option>
          <option value="Products">Products</option>
          <option value="Accounts">Accounts</option>
          <option value="All">All</option>
        </select>
      </div>
      <div className="p-8">
        <h2>Dashboard Chart</h2>
        <canvas id="dashboardChart" width="400" height="200"></canvas>
      </div>
    </div>
  );
}

export default Dashboard;
