import { useContext } from "react";
import { ProductContext } from "../../components/Context/Product";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import axios from "axios";

const UserDetailedView = () => {
  const { id } = useParams();
  const {
    users,
    handleDeleteUser,
    blocked,
    handleBlockUser,
    totalOrders,
    totalCart,
  } = useContext(ProductContext);
  const navigate = useNavigate();
  if (!users || users.length === 0) {
    return <p>Loading user data...</p>; 
  }
  const user = users.find((item) => item.id == id);
  console.log("admin user detailed view",user);
  

  if (!user) {
    return <p>User Not Found</p>;
  }
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">User Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="bg-slate-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Basic Information
          </h3>
          <p>
            <span className="font-semibold">Full Name: </span>
            {user.first_name} {user.last_name}
          </p>
          <p>
            <span className="font-semibold">Email: </span>
            {user.email}
          </p>
          <p>
            <span className="font-semibold">Logged In: </span>
            {user.isLoggedIn ? "Yes" : "No"}
          </p>
        </div>

        {/* Cart Details */}
        <div className="bg-slate-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Cart Details
          </h3>
          {totalCart.find((item)=>item.user == id) ? (
            <ul>
              {totalCart.find((item)=>item.user == id).cartItems?.map((item) => (
                <li
                  key={item.id}
                  className="mb-4 bg-slate-500/10 p-2 rounded-md"
                >
                  <span className="font-semibold">Product: </span>
                  {item.product_name} <br />
                  <span className="font-semibold">Price: </span>${item.product_price}{" "}
                  <br />
                  <span className="font-semibold">Quantity: </span>
                  {item.quantity}
                </li>
              ))}
            </ul>
          ) : (
            <p>No items in cart.</p>
          )}
          <h1>Total Cart Amount : {totalCart.find((item)=>item.user == id)?.total_price}</h1>
        </div>

        {/* Order History */}
        <div className="bg-slate-100 p-4 rounded-lg h-[75vh] overflow-y-scroll">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Order History
          </h3>
          {totalOrders && totalOrders.length > 0 ? (
            totalOrders.filter((item) => item.user == id).length > 0 ? (
              <ul className="">
                {totalOrders
                  .filter((item) => item.user == id)
                  .map((order, index) => (
                    <li
                      key={index}
                      className="mb-4 bg-slate-500/10 p-2 rounded-md"
                    >
                      <span className="font-semibold">Order ID: </span>
                      {order.order_id} <br />
                      <span className="font-semibold">Products : </span>
                      <ul className="">
                        {order.items.map((item, productIndex) => (
                          <li key={productIndex} className="ml-6 border-dotted">
                            {item.product_name}
                          </li>
                        ))}
                      </ul>
                      <span className="font-semibold">Date: </span>
                      {new Date(order.created_at).toLocaleDateString()}
                    </li>
                  ))}
              </ul>
            ) : (
              <p>No Orders Found</p>
            )
          ) : (
            <p>Loading ...</p>
          )}
        </div>

        {/* Additional Info */}
        <div className="bg-slate-100 p-4 rounded-lg overflow-x-scroll">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Additional Information
          </h3>
          <p>
            <span className="font-semibold">User ID: </span>
            {user.id}
          </p>
          <p className="">
            <span className="font-semibold">Password: </span>
            {user.password}
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center bg-slate-100 rounded-md mt-4 py-4">
        <div className="w-2/3 flex justify-between flex-wrap">
          <button
            className="w-full m-2 md:w-1/4 px-10 py-2 bg-[#d97706] rounded-md"
            onClick={() => {
              handleBlockUser(id, user.is_blocked);
            }}
          >
            {user.is_blocked === true ? "Unblock" : "Block"}
          </button>
          <button
            className="w-full m-2 md:w-1/4 px-10 py-2 bg-[#dc2626] rounded-md"
            onClick={() => {
              handleDeleteUser(id);
            }}
          >
            Delete
          </button>
          <button
            className="w-full m-2 md:w-1/4 px-10 py-2 bg-[#6b7280] rounded-md"
            onClick={() => navigate("/admin")}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailedView;
