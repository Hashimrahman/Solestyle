// import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../components/Context/Product";
import { CiBookmarkCheck, CiBookmarkRemove } from "react-icons/ci";
// const apiUrl = import.meta.env.VITE_API_URL;

const Orders = () => {
  const { order, loadingOrder } = useContext(ProductContext);
  const navigate = useNavigate();
  // const [currentUser, setCurrentUser] = useState(null);
  // const token = localStorage.getItem("token")


  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     if (token) {
  //       try {
  //         const res = await axios.get("http://127.0.0.1:8000/user-details/", {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  //         console.log("details",res);
  //         setCurrentUser(res.data)
          
  //       } catch (err) {
  //         console.error("Error fetching user details: ",err);
  //       }
  //     }
  //   };
  //   fetchUserDetails()
  // },[token]);


  const handleSubmit = ()=>{
    console.log("Initiating Payment");
    
  }
  

  if (loadingOrder) {
    return <div>Loading orders...</div>;
  }

  if (order.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">No OrdersFound</h2>
        <p className="text-gray-500">You have not placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Your Orders</h2>
      <div className="max-w-4xl mx-auto">
        {/* {order.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)).map((order) => { */}
        {order
          ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((order) => (
            <div
              key={order.order_id}
              className="bg-white p-6 rounded-lg shadow-lg mb-6"
            >
              <h3 className="text-xl font-semibold mb-2">
                Order ID: {order.order_id}
              </h3>
              <p className="text-gray-500 mb-2">
                Order Date: {new Date(order.created_at).toLocaleDateString()}
              </p>
              <p className="text-gray-500 mb-4">Status: {order.status}</p>
              <div>
                <h4 className="text-lg font-semibold mb-2">Products:</h4>
                <ul>
                  {order.items.map((product, index) => (
                    <li key={index} className="mb-2 bg-gray-100 p-4 rounded-md">
                      <div className="flex items-center">
                        <img
                          src={product.product_image.replace("https%3A/solestylebucket.s3.ap-south-1.amazonaws.com/", "")}
                          alt={product.name}
                          className={`w-16 h-16 object-cover rounded mr-4 ${product.is_cancelled ? "opacity-50" : ""}`}
                        />
                        <div>
                          <p className="font-semibold">
                            {product.product_name}
                          </p>
                          <p className={`${product.is_cancelled ? "line-through" : ""}`}>Price: ₹{product.product_price}</p>
                          <p className={`${product.is_cancelled ? "line-through" : ""}`}>Quantity: {product.quantity}</p>
                        </div>
                      </div>
                      <button className="mt-4 p-2 bg-gray-200 rounded-md shadow-md">Cancel Order</button>
                    </li>
                  ))}
                </ul>
                <h1 className="font-semibold mt-4">
                  Total Price: ₹{order.total_price}
                </h1>
                {order.razorpay_order.status == "paid" ? (
                  <div className="flex flex-row-reverse gap-2 items-center text-green-500 font-bold">
                    <h1>Payment Successful </h1>
                    <CiBookmarkCheck className="text-xl font-bold" />
                  </div>
                ) : (
                  <div className="text-red-500 font-bold flex flex-col items-end">
                    <div className="flex flex-row-reverse gap-2 items-center">
                      <h1>Payment Pending </h1>
                      <CiBookmarkRemove className="text-xl font-bold" />
                    </div>
                    <button className="bg-blue-500 text-white px-9 py-2 rounded-sm mt-3" onClick={handleSubmit}>Pay Now</button>
                  </div>
                )}
              </div>
            </div>
          ))}
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
//   const { order } = useContext(ProductContext); // Assuming users context has the order data
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("id");

//   // useEffect(() => {
//   //   const fetchOrders = async () => {
//   //     try {
//   //       const response = await axios.get(`http://localhost:8000/users/${userId}`);
//   //       const userData = response.data;

//   //       // Check if the user has any orders
//   //       if (userData.orders && userData.orders.length > 0) {
//   //         setOrders(userData.orders);
//   //       }
//   //       setLoading(false);
//   //     } catch (error) {
//   //       console.error("Error fetching orders:", error);
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchOrders();
//   // }, [userId]);

//   // if (loading) {
//   //   return <div>Loading orders...</div>;
//   // }

//   if (order.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center">
//         <h2 className="text-2xl font-bold mb-4">No OrdersFound</h2>
//         <p className="text-gray-500">You have not placed any orders yet.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-10">
//       <h2 className="text-3xl font-bold text-center mb-8">Your Orders</h2>
//       <div className="max-w-4xl mx-auto">
//         {order.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)).map((order) => {
//           // Calculate the total price for the current order
//           const orderTotal = order.products.reduce(
//             (total, product) => total + product.price * product.quantity,
//             0
//           );

//           return (
//             <div
//               key={order.orderId}
//               className="bg-white p-6 rounded-lg shadow-lg mb-6"
//             >
//               <h3 className="text-xl font-semibold mb-2">
//                 Order ID: {order.orderId}
//               </h3>
//               <p className="text-gray-500 mb-2">
//                 Order Date: {new Date(order.orderDate).toLocaleDateString()}
//               </p>
//               <p className="text-gray-500 mb-4">Status: {order.status}</p>
//               <div>
//                 <h4 className="text-lg font-semibold mb-2">Products:</h4>
//                 <ul>
//                   {order.products.map((product) => (
//                     <li key={product.id} className="mb-2">
//                       <div className="flex items-center">
//                         <img
//                           src={product.image}
//                           alt={product.name}
//                           className="w-16 h-16 object-cover rounded mr-4"
//                         />
//                         <div>
//                           <p className="font-semibold">{product.name}</p>
//                           <p>Price: ₹{product.price}</p>
//                           <p>Quantity: {product.quantity}</p>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//                 {/* Display the total price for the current order */}
//                 <h1 className="font-semibold mt-4">
//                   Total Price: ₹{orderTotal}
//                 </h1>

//                 {/* Display the status with color coding */}
//                 {/* <h1 className="">
//                   Status:{" "}
//                   {order.status === "Pending" && (
//                     <span className="text-red-600">Pending</span>
//                   )}
//                   {order.status === "Shipped" && (
//                     <span className="text-yellow-600">Shipped</span>
//                   )}
//                   {order.status === "Delivered" && (
//                     <span className="text-green-600">Delivered</span>
//                   )}
//                 </h1> */}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="w-full flex justify-center">
//         <button
//           className="bg-blue-400 px-16 py-4 rounded-3xl text-lg"
//           onClick={() => navigate("/")}
//         >
//           Go to Home
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Orders;
