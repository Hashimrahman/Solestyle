// import React, { useContext, useEffect, useState } from "react";
// import Products from "./AdminProducts";
// import AdminUsers from "./AdminUsers";
// import { ProductContext } from "../../components/Context/Product";
// import CompleteOrders from "./CompleteOrders";

// const AdminPage = () => {
//   const { products, users, handleLogout } = useContext(ProductContext);
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
//   }, [viewUsers,users]);
//   const handleAdminLogout = () => {
//     localStorage.setItem("activeTab", "dashboard");
//     handleLogout();
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
//             <li
//               className={`hover:bg-gray-700 ${
//                 activeTab === "orders" ? "bg-gray-700" : ""
//               }`}
//             >
//               <button
//                 onClick={() => setActiveTab("orders")}
//                 className="block w-full text-left py-2 px-4"
//               >
//                 Orders
//               </button>
//             </li>
//             <li className={`hover:bg-gray-700 `}>
//               <button
//                 onClick={handleAdminLogout}
//                 className="block w-full text-left py-2 px-4 mt-8 border rounded-md"
//               >
//                 Log Out
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
//                   <p className="text-2xl font-bold">{viewProducts.length}</p>
//                 </div>
//               </div>
//               {/* Total Users */}
//               <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-4">
//                 <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
//                   <h3 className="text-lg font-semibold">Total Users</h3>
//                   <p className="text-2xl font-bold">{viewUsers.length}</p>
//                 </div>
//               </div>
//               {/* Total Orders */}
//               <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-4">
//                 <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
//                   <h3 className="text-lg font-semibold">Total Orders</h3>
//                   <p className="text-2xl font-bold">{totalOrders}</p>
//                 </div>
//               </div>
//               {/* Total Earnings */}
//               <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-4">
//                 <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
//                   <h3 className="text-lg font-semibold">Total Earnings</h3>
//                   <p className="text-2xl font-bold">{`₹${totalEarnings}`}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : activeTab === "products" ? (
//           <Products />
//         ) : activeTab === "users" ? (
//           <>
//             <AdminUsers />
//           </>
//         ) : activeTab === "orders" ? (
//           <>
//             <CompleteOrders />
//           </>
//         ) : null}
//       </main>
//     </div>
//   );
// };

// export default AdminPage;
import React, { useContext, useEffect, useState } from "react";
import Products from "./AdminProducts";
import AdminUsers from "./AdminUsers";
import { ProductContext } from "../../components/Context/Product";
import CompleteOrders from "./CompleteOrders";
import { FiHome, FiBox, FiUsers, FiShoppingCart, FiLogOut } from "react-icons/fi";

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
  }, [viewUsers, users]);

  const handleAdminLogout = () => {
    localStorage.setItem("activeTab", "dashboard");
    handleLogout();
  };

  return (
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
            {/* Dashboard Card */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Overview</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Total Products */}
                <div className="bg-gray-50 shadow-md rounded-lg p-4 flex flex-col items-center">
                  <h4 className="text-md font-medium">Total Products</h4>
                  <p className="text-2xl font-bold">{viewProducts.length}</p>
                </div>
                {/* Total Users */}
                <div className="bg-gray-50 shadow-md rounded-lg p-4 flex flex-col items-center">
                  <h4 className="text-md font-medium">Total Users</h4>
                  <p className="text-2xl font-bold">{viewUsers.length}</p>
                </div>
                {/* Total Orders */}
                <div className="bg-gray-50 shadow-md rounded-lg p-4 flex flex-col items-center">
                  <h4 className="text-md font-medium">Total Orders</h4>
                  <p className="text-2xl font-bold">{totalOrders}</p>
                </div>
                {/* Total Earnings */}
                <div className="bg-gray-50 shadow-md rounded-lg p-4 flex flex-col items-center">
                  <h4 className="text-md font-medium">Total Earnings</h4>
                  <p className="text-2xl font-bold">{`₹${totalEarnings}`}</p>
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
  );
};

export default AdminPage;
