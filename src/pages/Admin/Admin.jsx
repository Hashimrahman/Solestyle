

import React, { useContext, useEffect, useState } from "react";
import Products from "./AdminProducts";
import AdminUsers from "./AdminUsers";
import { ProductContext } from "../../components/Context/Product";

const AdminPage = () => {
  const { products, users, handleLogout } = useContext(ProductContext);
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "dashboard";
  });
  const [viewProducts, setProducts] = useState([]);
  const [viewUsers, setUsers] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    setProducts(products);
  }, [products]);
  useEffect(() => {
    setUsers(users);
  }, [users]);
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);
  
  // Calculate total orders and earnings
  useEffect(() => {
    if (viewUsers.length === 0) {
      setTotalOrders(0);
      setTotalEarnings(0);
      return;
    }
    let totalOrders = 0;
    users.forEach((user) => {
      totalOrders += user.orders?.length || 0;
    });

    let totalEarnings = 0;
    users.forEach((user) => {
      const userOrders = user.orders || [];

      userOrders.forEach((order) => {
        const orderProducts = order.products || [];

        orderProducts.forEach((product) => {
          const price = product.price || 0;
          const quantity = product.quantity || 0;
          totalEarnings += price * quantity;
        });
      });
    });

    setTotalOrders(totalOrders);
    setTotalEarnings(totalEarnings);
  }, [viewUsers]);
  const handleAdminLogout = () =>{
    localStorage.setItem('activeTab', "dashboard")
    handleLogout();
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-30 md:w-64 text-sm bg-gray-800 text-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <ul>
            <li
              className={`hover:bg-gray-700 ${
                activeTab === "dashboard" ? "bg-gray-700" : ""
              }`}
            >
              <button
                onClick={() => setActiveTab("dashboard")}
                className="block w-full text-left py-2 px-4"
              >
                Dashboard
              </button>
            </li>
            <li
              className={`hover:bg-gray-700 ${
                activeTab === "products" ? "bg-gray-700" : ""
              }`}
            >
              <button
                onClick={() => setActiveTab("products")}
                className="block w-full text-left py-2 px-4"
              >
                Products
              </button>
            </li>
            <li
              className={`hover:bg-gray-700 ${
                activeTab === "users" ? "bg-gray-700" : ""
              }`}
            >
              <button
                onClick={() => setActiveTab("users")}
                className="block w-full text-left py-2 px-4"
              >
                Users
              </button>
            </li>
            <li
              className={`hover:bg-gray-700 `}
            >
              <button
                onClick={handleAdminLogout}
                className="block w-full text-left py-2 px-4 mt-8 border rounded-md"
              >
                Log Out
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
            <div className="flex flex-wrap -mx-4">
              {/* Total Products */}
              <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-4">
                <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                  <h3 className="text-lg font-semibold">Total Products</h3>
                  <p className="text-2xl font-bold">
                    {viewProducts.length}
                  </p>
                </div>
              </div>
              {/* Total Users */}
              <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-4">
                <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                  <h3 className="text-lg font-semibold">Total Users</h3>
                  <p className="text-2xl font-bold">
                    {viewUsers.length}
                  </p>
                </div>
              </div>
              {/* Total Orders */}
              <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-4">
                <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                  <h3 className="text-lg font-semibold">Total Orders</h3>
                  <p className="text-2xl font-bold">
                    {totalOrders}
                  </p>
                </div>
              </div>
              {/* Total Earnings */}
              <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-4">
                <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                  <h3 className="text-lg font-semibold">Total Earnings</h3>
                  <p className="text-2xl font-bold">
                    {`₹${totalEarnings}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === "products" ? (
          <Products />
        ) : activeTab === "users" ? (
          <>
            <AdminUsers />
          </>
        ) : null}
      </main>
    </div>
  );
};

export default AdminPage;

// import React, { useContext, useEffect, useState } from "react";
// import Products from "./AdminProducts";
// import AdminUsers from "./AdminUsers";
// import { ProductContext } from "../../components/Context/Product";
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const AdminPage = () => {
//   const { products, users } = useContext(ProductContext);
//   const [activeTab, setActiveTab] = useState(() => {
//     return localStorage.getItem("activeTab") || "dashboard";
//   });
//   const [viewProducts, setProducts] = useState([]);
//   const [viewUsers, setUsers] = useState([]);
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [totalEarnings, setTotalEarnings] = useState(0);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setProducts(products);
//   }, [products]);
//   useEffect(() => {
//     setUsers(users);
//   }, [users]);
//   useEffect(() => {
//     localStorage.setItem("activeTab", activeTab);
//   }, [activeTab]);
  
//   // Calculate total orders and earnings
//   useEffect(() => {
//     if (viewUsers.length === 0) {
//       setTotalOrders(0);
//       setTotalEarnings(0);
//       return;
//     }
//     let totalOrders = 0;
//     users.forEach((user) => {
//       totalOrders += user.orders?.length || 0;
//     });

//     let totalEarnings = 0;
//     users.forEach((user) => {
//       const userOrders = user.orders || [];

//       userOrders.forEach((order) => {
//         const orderProducts = order.products || [];

//         orderProducts.forEach((product) => {
//           const price = product.price || 0;
//           const quantity = product.quantity || 0;
//           totalEarnings += price * quantity;
//         });
//       });
//     });

//     setTotalOrders(totalOrders);
//     setTotalEarnings(totalEarnings);
//   }, [viewUsers]);

//   // Prepare data for the bar chart
//   const chartData = {
//     labels: ['Total Products', 'Total Users', 'Total Orders', 'Total Earnings'],
//     datasets: [
//       {
//         label: 'Metrics',
//         data: [
//           viewProducts.length,
//           viewUsers.length,
//           totalOrders,
//           totalEarnings,
//         ],
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//       },
//     ],
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-30 md:w-64 text-sm bg-gray-800 text-white shadow-lg">
//         <div className="p-4">
//           <h1 className="text-2xl font-bold">Admin Panel</h1>
//         </div>
//         <nav className="mt-6">
//           <ul>
//             <li
//               className={`hover:bg-gray-700 ${
//                 activeTab === "dashboard" ? "bg-gray-700" : ""
//               }`}
//             >
//               <button
//                 onClick={() => setActiveTab("dashboard")}
//                 className="block w-full text-left py-2 px-4"
//               >
//                 Dashboard
//               </button>
//             </li>
//             <li
//               className={`hover:bg-gray-700 ${
//                 activeTab === "products" ? "bg-gray-700" : ""
//               }`}
//             >
//               <button
//                 onClick={() => setActiveTab("products")}
//                 className="block w-full text-left py-2 px-4"
//               >
//                 Products
//               </button>
//             </li>
//             <li
//               className={`hover:bg-gray-700 ${
//                 activeTab === "users" ? "bg-gray-700" : ""
//               }`}
//             >
//               <button
//                 onClick={() => setActiveTab("users")}
//                 className="block w-full text-left py-2 px-4"
//               >
//                 Users
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-auto">
//         {error && (
//           <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
//             {error}
//           </div>
//         )}

//         {activeTab === "dashboard" ? (
//           <div>
//             <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
//             <div className="flex flex-wrap -mx-4">
//               {/* Total Products */}
//               <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-4">
//                 <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
//                   <h3 className="text-lg font-semibold">Total Products</h3>
//                   <p className="text-2xl font-bold">
//                     {viewProducts.length}
//                   </p>
//                 </div>
//               </div>
//               {/* Total Users */}
//               <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-4">
//                 <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
//                   <h3 className="text-lg font-semibold">Total Users</h3>
//                   <p className="text-2xl font-bold">
//                     {viewUsers.length}
//                   </p>
//                 </div>
//               </div>
//               {/* Total Orders */}
//               <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-4">
//                 <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
//                   <h3 className="text-lg font-semibold">Total Orders</h3>
//                   <p className="text-2xl font-bold">
//                     {totalOrders}
//                   </p>
//                 </div>
//               </div>
//               {/* Total Earnings */}
//               <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-4">
//                 <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
//                   <h3 className="text-lg font-semibold">Total Earnings</h3>
//                   <p className="text-2xl font-bold">
//                     {`₹${totalEarnings}`}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             {/* Bar Chart */}
//             <div className="bg-white shadow-md rounded-lg p-4 mt-6">
//               <h3 className="text-lg font-semibold mb-4">Metrics Overview</h3>
//               <Bar data={chartData} />
//             </div>
//           </div>
//         ) : activeTab === "products" ? (
//           <Products />
//         ) : activeTab === "users" ? (
//           <AdminUsers />
//         ) : null}
//       </main>
//     </div>
//   );
// };

// export default AdminPage;
