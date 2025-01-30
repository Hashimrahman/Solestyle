import React, { useContext, useEffect, useState } from "react";
import Products from "./AdminProducts";
import AdminUsers from "./AdminUsers";
import { ProductContext } from "../../components/Context/Product";
import CompleteOrders from "./CompleteOrders";
import {
  FiHome,
  FiBox,
  FiUsers,
  FiShoppingCart,
  FiLogOut,
} from "react-icons/fi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const {
    products,
    users,
    handleLogout,
    currentUser,
    totalOrders,
  } = useContext(ProductContext);
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "dashboard";
  });
  const [viewProducts, setProducts] = useState([]);
  const [viewUsers, setUsers] = useState([]);
  const [totalOrderCount, setTotalOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(products);
  }, [products]);

  useEffect(() => {
    setUsers(users);
  }, [users]);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (totalOrders.length != 0) {
      setTotalOrderCount(totalOrders.length);
      let totalEarnings = 0;
      totalOrders.forEach((order) => {
        if (order.razorpay_order.status == "paid") {
          order.items.forEach((orderItem) => {
            if (orderItem.is_cancelled == false) {
              totalEarnings += orderItem.item_subtotal || 0;
            }
          });
        }
      });
      totalEarnings = parseFloat(totalEarnings.toFixed(2));
      setTotalEarnings(totalEarnings);
      setLoading(false);
    }
  }, [totalOrders]);
  console.log("order count admin", totalOrders.length);

  const handleAdminLogout = () => {
    localStorage.setItem("activeTab", "dashboard");
    handleLogout();
  };

  useEffect(() => {
    if (currentUser.is_staff == false) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You do not have permission to access this page.",
        confirmButtonText: "Go to Home",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    }
  }, [navigate, currentUser.is_staff]);

  return (
    <>
      {currentUser.is_staff ? (
        <div className="flex min-h-screen bg-gray-100">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-800 text-white shadow-lg">
            <div className="p-6">
              <h1 className="text-3xl font-bold text-center">Admin Panel</h1>
            </div>
            <nav className="mt-6">
              <ul>
                <li>
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className={`flex items-center py-3 px-4 w-full text-left transition duration-200 hover:bg-gray-700 rounded ${
                      activeTab === "dashboard" ? "bg-gray-700" : ""
                    }`}
                  >
                    <FiHome className="mr-3" /> Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("products")}
                    className={`flex items-center py-3 px-4 w-full text-left transition duration-200 hover:bg-gray-700 rounded ${
                      activeTab === "products" ? "bg-gray-700" : ""
                    }`}
                  >
                    <FiBox className="mr-3" /> Products
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("users")}
                    className={`flex items-center py-3 px-4 w-full text-left transition duration-200 hover:bg-gray-700 rounded ${
                      activeTab === "users" ? "bg-gray-700" : ""
                    }`}
                  >
                    <FiUsers className="mr-3" /> Users
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`flex items-center py-3 px-4 w-full text-left transition duration-200 hover:bg-gray-700 rounded ${
                      activeTab === "orders" ? "bg-gray-700" : ""
                    }`}
                  >
                    <FiShoppingCart className="mr-3" /> Orders
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleAdminLogout}
                    className="flex items-center py-3 px-4 w-full text-left transition duration-200 hover:bg-gray-700 rounded mt-8 border border-transparent text-red-500"
                  >
                    <FiLogOut className="mr-3" /> Log Out
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            {activeTab === "dashboard" ? (
              <div>
                <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Overview</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Total Products */}
                    <div className="bg-gray-50 shadow-md rounded-lg p-4 flex flex-col items-center">
                      <h4 className="text-md font-medium">Total Products</h4>
                      <p className="text-2xl font-bold">
                        {viewProducts.length}
                      </p>
                    </div>
                    {/* Total Users */}
                    <div className="bg-gray-50 shadow-md rounded-lg p-4 flex flex-col items-center">
                      <h4 className="text-md font-medium">Total Users</h4>
                      <p className="text-2xl font-bold">
                        {viewUsers.length - 1}
                      </p>
                    </div>
                    {/* Total Orders */}
                    <div className="bg-gray-50 shadow-md rounded-lg p-4 flex flex-col items-center">
                      <h4 className="text-md font-medium">Total Orders</h4>
                      {loading == true ? (
                        <p className="text-sm ">{`Loading...`}</p>
                      ) : (
                        <p className="text-2xl font-bold">{`${totalOrderCount}`}</p>
                      )}
                      {/* <p className="text-2xl font-bold">{temp}</p> */}
                    </div>
                    {/* Total Earnings */}
                    <div className="bg-gray-50 shadow-md rounded-lg p-4 flex flex-col items-center">
                      <h4 className="text-md font-medium">Total Earnings</h4>
                      {loading == true ? (
                        <p className="text-sm">{`Loading...`}</p>
                      ) : (
                        <p className="text-2xl font-bold">{`₹${totalEarnings}`}</p>
                      )}
                      {/* <p className="text-2xl font-bold">{`₹$`}</p> */}
                    </div>
                  </div>
                </div>
              </div>
            ) : activeTab === "products" ? (
              <Products />
            ) : activeTab === "users" ? (
              <AdminUsers />
            ) : activeTab === "orders" ? (
              <CompleteOrders />
            ) : null}
          </main>
        </div>
      ) : null}
    </>
  );
};

export default AdminPage;
