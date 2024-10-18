import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../components/Context/Product";

const CompleteOrders = () => {
  const { users } = useContext(ProductContext);
  const [orders, setOrders] = useState([]);
  const [viewUsers, setUsers] = useState([]);

  // Update viewUsers whenever users change
  useEffect(() => {
    setUsers(users);
  }, [users]);

  // Update orders whenever viewUsers change
  useEffect(() => {
    if (viewUsers.length === 0) {
      setOrders([]);
      return;
    }

    // Collect all user orders
    const allOrders = viewUsers.reduce((acc, user) => {
      const userOrders = user.orders || [];
      const userId = user.id;
      const userName = user.fullName;
      const mappedOrders = userOrders.map((item) => ({
        ...item,
        userId,
        userName,
      }));
      return [...acc, ...mappedOrders]; // Combine all orders into one array
    }, []);

    setOrders(allOrders); // Set orders once after loop finishes
  }, [viewUsers]);

  return (
    <div className="p-6">
      {orders.map((order) => (
        <div
          key={order.orderId}
          className="border border-gray-300 p-6 mb-6 rounded-lg shadow-lg"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold mb-2">User Id : {order.userId}</h2>
              <h2 className="text-lg font-bold mb-2">User Name : {order.userName}</h2>
              <h2 className="text-lg font-bold mb-2 text-gray-600">
                Order ID: {order.orderId}
              </h2>
              <p className="text-sm text-gray-600">
                Date: {new Date(order.orderDate).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Status: {order.status}</p>
            </div>
            <h4 className="text-lg font-semibold">
              Total Amount: ₹
              {order.products.reduce(
                (acc, product) =>
                  acc + parseInt(product.price) * product.quantity,
                0
              )}
            </h4>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-lg mb-4">Products:</h3>
            <div className="flex flex-col space-y-4">
              {order.products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-24 w-24 object-cover rounded-lg mr-6"
                  />
                  {/* Product Info */}
                  <div className="flex-1">
                    <p className="text-lg font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-600">
                      Category: {product.category}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {product.quantity}
                    </p>
                  </div>
                  {/* Product Pricing */}
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      Price: ₹{product.price}
                    </p>
                    <p className="font-semibold text-lg">
                      Sub Total: ₹{product.price * product.quantity}
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
