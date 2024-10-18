import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../components/Context/Product";

const Orders = () => {
  // const { users } = useContext(ProductContext); // Assuming users context has the order data
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/${userId}`);
        const userData = response.data;

        // Check if the user has any orders
        if (userData.orders && userData.orders.length > 0) {
          setOrders(userData.orders);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">No Orders Found</h2>
        <p className="text-gray-500">You have not placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Your Orders</h2>
      <div className="max-w-4xl mx-auto">
        {orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)).map((order) => {
          // Calculate the total price for the current order
          const orderTotal = order.products.reduce(
            (total, product) => total + product.price * product.quantity,
            0
          );

          return (
            <div
              key={order.orderId}
              className="bg-white p-6 rounded-lg shadow-lg mb-6"
            >
              <h3 className="text-xl font-semibold mb-2">
                Order ID: {order.orderId}
              </h3>
              <p className="text-gray-500 mb-2">
                Order Date: {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <p className="text-gray-500 mb-4">Status: {order.status}</p>
              <div>
                <h4 className="text-lg font-semibold mb-2">Products:</h4>
                <ul>
                  {order.products.map((product) => (
                    <li key={product.id} className="mb-2">
                      <div className="flex items-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p>Price: ₹{product.price}</p>
                          <p>Quantity: {product.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* Display the total price for the current order */}
                <h1 className="font-semibold mt-4">
                  Total Price: ₹{orderTotal}
                </h1>
                
                {/* Display the status with color coding */}
                {/* <h1 className="">
                  Status:{" "}
                  {order.status === "Pending" && (
                    <span className="text-red-600">Pending</span>
                  )}
                  {order.status === "Shipped" && (
                    <span className="text-yellow-600">Shipped</span>
                  )}
                  {order.status === "Delivered" && (
                    <span className="text-green-600">Delivered</span>
                  )}
                </h1> */}
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-center">
        <button
          className="bg-blue-400 px-16 py-4 rounded-3xl text-lg"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Orders;
// import axios from "axios";
// import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ProductContext } from "../../components/Context/Product";

// const Orders = () => {
//   const { users } = useContext(ProductContext);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("id");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/users/${userId}`);
//         const userData = response.data;

//         if (userData.orders && userData.orders.length > 0) {
//           setOrders(userData.orders);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [userId]);

//   if (loading) {
//     return <div>Loading orders...</div>;
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center">
//         <h2 className="text-2xl font-bold mb-4">No Orders Found</h2>
//         <p className="text-gray-500">You have not placed any orders yet.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-20">
//       <h2 className="text-4xl font-bold text-center mb-8">Your Orders</h2>
//       <div className="max-w-6xl mx-auto space-y-8">
//         {orders.map((order) => {
//           const orderTotal = order.products.reduce(
//             (total, product) => total + product.price * product.quantity,
//             0
//           );

//           return (
//             <div
//               key={order.orderId}
//               className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <div>
//                   <h3 className="text-2xl font-semibold">
//                     Order ID: {order.orderId}
//                   </h3>
//                   <p className="text-gray-500">
//                     Order Date: {new Date(order.orderDate).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <p
//                   className={`font-bold text-lg ${
//                     order.status === "Pending"
//                       ? "text-red-500"
//                       : order.status === "Shipped"
//                       ? "text-yellow-500"
//                       : "text-green-500"
//                   }`}
//                 >
//                   {order.status}
//                 </p>
//               </div>
//               <div className="border-t pt-4">
//                 <h4 className="text-xl font-semibold mb-4">Products:</h4>
//                 <div className="space-y-4">
//                   {order.products.map((product) => (
//                     <div
//                       key={product.id}
//                       className="flex items-center space-x-6 border p-4 rounded-lg"
//                     >
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         className="w-20 h-20 object-cover rounded-lg"
//                       />
//                       <div>
//                         <h5 className="font-semibold text-lg">{product.name}</h5>
//                         <p className="text-gray-500">Price: ₹{product.price}</p>
//                         <p className="text-gray-500">
//                           Quantity: {product.quantity}
//                         </p>
//                         <p className="text-gray-600 font-semibold">
//                           Sub Total: ₹{product.price * product.quantity}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <h4 className="text-xl font-semibold mt-6">
//                   Total Price: ₹{orderTotal}
//                 </h4>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="w-full flex justify-center mt-10">
//         <button
//           className="bg-blue-500 text-white px-12 py-3 rounded-full hover:bg-blue-600 transition-colors duration-300"
//           onClick={() => navigate("/")}
//         >
//           Go to Home
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Orders;
