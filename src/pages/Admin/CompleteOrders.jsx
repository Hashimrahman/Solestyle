import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../components/Context/Product";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const CompleteOrders = () => {
  const { users,totalOrders,loadingTotalOrder } = useContext(ProductContext);
  // const [orders, setOrders] = useState([]);
  const [viewUsers, setUsers] = useState([]);
  // const token = localStorage.getItem("token");
  // const [loading, setLoading] = useState(true);

  // Update viewUsers whenever users change
  useEffect(() => {
    setUsers(users);
  }, [users]);

  // useEffect(() => {
  //   const fetchAllOrder = async () => {
  //     try {
  //       console.log("Orders");
  //       const res = await axios.get(`${apiUrl}/total-orders/`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setOrders(res.data);
  //       setLoading(false);
  //     } catch (err) {
  //       console.error("Error fetching Orders", err);
  //     }
  //   };
  //   fetchAllOrder();
  // }, [token]);


  if (loadingTotalOrder) {
    return (
      <div className="loader">
        <div className="justify-content-center jimu-primary-loading"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {totalOrders.map((order) => (
        <div
          key={order.order_id}
          className="border border-gray-300 p-6 mb-6 rounded-lg shadow-lg"
        >
          <div className="flex justify-between items-center ">
            <div>
              <h2 className="text-lg font-bold mb-2">
                User Name : {order.username}
              </h2>
              <h2 className="text-lg font-bold mb-2 text-gray-600">
                Order ID: {order.order_id}
              </h2>
              <p className="text-sm text-gray-600">
                Date: {new Date(order.created_at).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Status: {order.status}</p>
              {order.razorpay_order.status == "paid" ? <p className="text-sm text-gray-600">Payment Status: <span className="text-green-500">Paid</span></p> : <p className="text-sm text-gray-600">Payment Status: <span className="text-red-500">Pending</span></p>}
              {/* <p className="text-sm text-gray-600">Payment Status: {order.status}</p> */}
            </div>
            <h4 className="text-lg font-semibold">
            Total Amount: ₹{order.total_price}
            {/* {order.products.reduce(
              (acc, product) =>
                acc + parseInt(product.price) * product.quantity,
              0
            )} */}
          </h4>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-lg mb-4">Products:</h3>
            <div className="flex flex-col space-y-4">
              {order.items.map((product,index) => (
                <div
                  key={index}
                  className="flex items-center border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <img
                    src={`${apiUrl}/${product.product_image}`}
                    alt={product.product_name}
                    className="h-24 w-24 object-cover rounded-lg mr-6"
                  />
                  {/* Product Info */}
                  <div className="flex-1">
                    <p className="text-lg font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-600">
                      Category: {product.product_category}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {product.quantity}
                    </p>
                  </div>
                  {/* Product Pricing */}
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      Price: ₹{product.product_price}
                    </p>
                    <p className="font-semibold text-lg">
                      Sub Total: ₹{product.item_subtotal}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompleteOrders;
