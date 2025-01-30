import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import Orders from "../CheckOut/Orders";
import { ProductContext } from "../../components/Context/Product";
const apiUrl = import.meta.env.VITE_API_URL;

const ProfilePage = () => {
  const { order } = useContext(ProductContext);
  const [activeSection, setActiveSection] = useState("orders");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log("order page", order);
  

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (token) {
        try {
          const res = await axios.get(`${apiUrl}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("user details", res.data);
          setUserData(res.data);
        } catch (err) {
          console.error("Error fetching user details: ", err);
        }
      }
    };
    fetchUserDetails();
  }, []);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-100 m-5 rounded-lg">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-6 shadow-lg ">
        <div className="flex flex-col items-center">
          {/* Mock User Image */}
          <div className="w-32 h-32 flex justify-center items-center rounded-full mb-4 object-cover">
            <FaUserCircle className="w-full h-full" />
          </div>
          <h2 className="text-lg font-semibold mb-6">{userData.full_name}</h2>

          {/* Sidebar Links */}
          <div className="w-full">
            <button
              onClick={() => handleSectionClick("orders")}
              className={`w-full py-2 px-4 mb-4 text-left rounded ${
                activeSection === "orders"
                  ? "bg-blue-400 text-white"
                  : "bg-gray-200"
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => handleSectionClick("address")}
              className={`w-full py-2 px-4 mb-4 text-left rounded ${
                activeSection === "address"
                  ? "bg-blue-400 text-white"
                  : "bg-gray-200"
              }`}
            >
              Address
            </button>
            <button
              onClick={() => handleSectionClick("profile")}
              className={`w-full py-2 px-4 mb-4 text-left rounded ${
                activeSection === "profile"
                  ? "bg-blue-400 text-white"
                  : "bg-gray-200"
              }`}
            >
              Profile Details
            </button>
            <button
              onClick={() => navigate("/")}
              className={`w-full py-2 px-4 text-left rounded bg-gray-200`}
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8 ">
        {activeSection === "orders" && (
          <div >
            <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
            <Orders />
          </div>
        )}

        {activeSection === "address" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Address</h2>
            {order.map((order, index,arr) =>
              order.address && (
                <div key={index} className="border shadow-sm m-4 rounded-md p-4">
                  <h1>Address {arr.length - index +1}</h1>
                  <p>{order.address.street_address}</p>
                  <p>{order.address.phone}</p>
                  <p>{order.address.city}</p>
                  <p>{order.address.pincode}</p>

                </div>
              )
            )}
          </div>
        )}

        {activeSection === "profile" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              <p>
                <strong>Full Name: </strong> {userData.full_name}
              </p>
              <p>
                <strong>Email: </strong> {userData.email}
              </p>
              <p>
                <strong>Username: </strong> {userData.username}
              </p>
              <p>
                <strong>Account Created: </strong>{" "}
                {new Date(userData.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
