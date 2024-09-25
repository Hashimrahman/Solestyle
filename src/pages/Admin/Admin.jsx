// import React from 'react';

// const AdminPage = () => {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-800 text-white shadow-lg">
//         <div className="p-4">
//           <h1 className="text-2xl font-bold">Admin Panel</h1>
//         </div>
//         <nav className="mt-6">
//           <ul>
//             <li className="hover:bg-gray-700">
//               <a href="#" className="block py-2 px-4">Dashboard</a>
//             </li>
//             <li className="hover:bg-gray-700">
//               <a href="#" className="block py-2 px-4">Products</a>
//             </li>
//             <li className="hover:bg-gray-700">
//               <a href="#" className="block py-2 px-4">Users</a>
//             </li>
//             <li className="hover:bg-gray-700">
//               <a href="#" className="block py-2 px-4">All Products</a>
//             </li>
//             <li className="hover:bg-gray-700">
//               <a href="#" className="block py-2 px-4">All Orders</a>
//             </li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
//         <div className="flex flex-wrap -mx-4">
//           {/* Dashboard Cards */}
//           <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-4">
//             <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
//               <h3 className="text-lg font-semibold">Total Products</h3>
//               <p className="text-2xl font-bold">150</p>
//             </div>
//           </div>
//           <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-4">
//             <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
//               <h3 className="text-lg font-semibold">Total Users</h3>
//               <p className="text-2xl font-bold">75</p>
//             </div>
//           </div>
//           <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-4">
//             <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
//               <h3 className="text-lg font-semibold">Total Orders</h3>
//               <p className="text-2xl font-bold">200</p>
//             </div>
//           </div>
//           <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-4">
//             <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
//               <h3 className="text-lg font-semibold">Total Earnings</h3>
//               <p className="text-2xl font-bold">$5,000</p>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminPage;

import React, { useEffect, useState } from 'react';
import Products from './AdminProducts';
import AdminUsers from './AdminUsers'

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/products');
        if (!response.ok) {
          throw new Error(`Error fetching products: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/users');
        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.statusText}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  // Calculate total orders and earnings
  useEffect(() => {
    if (users.length === 0) {
      setTotalOrders(0);
      setTotalEarnings(0);
      return;
    }

    const ordersCount = users.reduce((acc, user) => {
      // Ensure user.orders is an array
      const userOrders = Array.isArray(user.orders) ? user.orders : [];
      return acc + userOrders.length;
    }, 0);

    const earnings = users.reduce((acc, user) => {
      const userOrders = Array.isArray(user.orders) ? user.orders : [];
      return acc + userOrders.reduce((orderAcc, order) => {
        const orderProducts = Array.isArray(order.products) ? order.products : [];
        return orderAcc + orderProducts.reduce((prodAcc, product) => {
          const price = typeof product.price === 'number' ? product.price : 0;
          const quantity = typeof product.quantity === 'number' ? product.quantity : 0;
          return prodAcc + (price * quantity);
        }, 0);
      }, 0);
    }, 0);

    setTotalOrders(ordersCount);
    setTotalEarnings(earnings);
  }, [users]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-30 md:w-64 text-sm bg-gray-800 text-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <ul>
            <li className={`hover:bg-gray-700 ${activeTab === 'dashboard' ? 'bg-gray-700' : ''}`}>
              <button onClick={() => setActiveTab('dashboard')} className="block w-full text-left py-2 px-4">
                Dashboard
              </button>
            </li>
            <li className={`hover:bg-gray-700 ${activeTab === 'products' ? 'bg-gray-700' : ''}`}>
              <button onClick={() => setActiveTab('products')} className="block w-full text-left py-2 px-4">
                Products
              </button>
            </li>
            <li className={`hover:bg-gray-700 ${activeTab === 'users' ? 'bg-gray-700' : ''}`}>
              <button onClick={() => setActiveTab('users')} className="block w-full text-left py-2 px-4">
                Users
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

        {activeTab === 'dashboard' ? (
          <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            <div className="flex flex-wrap -mx-4">
              {/* Total Products */}
              <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-4">
                <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                  <h3 className="text-lg font-semibold">Total Products</h3>
                  <p className="text-2xl font-bold">
                    {loadingProducts ? 'Loading...' : products.length}
                  </p>
                </div>
              </div>
              {/* Total Users */}
              <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-4">
                <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                  <h3 className="text-lg font-semibold">Total Users</h3>
                  <p className="text-2xl font-bold">
                    {loadingUsers ? 'Loading...' : users.length}
                  </p>
                </div>
              </div>
              {/* Total Orders */}
              <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-4">
                <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                  <h3 className="text-lg font-semibold">Total Orders</h3>
                  <p className="text-2xl font-bold">
                    {loadingUsers ? 'Loading...' : totalOrders}
                  </p>
                </div>
              </div>
              {/* Total Earnings */}
              <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-4">
                <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                  <h3 className="text-lg font-semibold">Total Earnings</h3>
                  <p className="text-2xl font-bold">
                    {loadingUsers ? 'Loading...' : `₹${totalEarnings}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'products' ? (
            // <h1>Products</h1>
            <Products />
          
        ) : activeTab === 'users' ? (
          // <h1> users</h1>
          <>
          <AdminUsers />
          </>
        ) : null}
      </main>
    </div>
  );
};

export default AdminPage;
