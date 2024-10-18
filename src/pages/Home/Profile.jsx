import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import Orders from "../CheckOut/Orders";

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState("orders");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/users/${userId}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-100 m-5 rounded-lg">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-6 shadow-lg">
        <div className="flex flex-col items-center">
          {/* Mock User Image */}
          {/* <img
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            className="w-32 h-32 rounded-full mb-4"
          /> */}
          <div className="w-32 h-32 flex justify-center items-center rounded-full mb-4 object-cover">
            <FaUserCircle className="w-full h-full" />
          </div>
          <h2 className="text-lg font-semibold mb-6">{userData.fullName}</h2>

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
      <div className="w-3/4 p-8">
        {activeSection === "orders" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
            <Orders />
          </div>
        )}

        {activeSection === "address" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Address</h2>
            {userData.address ? (
              <div className="bg-white p-4 rounded-lg shadow">
                <p>
                  <strong>Full Name: </strong> {userData.address.fullName}
                </p>
                <p>
                  <strong>Email: </strong> {userData.address.email}
                </p>
                <p>
                  <strong>Phone: </strong> {userData.address.phone}
                </p>
                <p>
                  <strong>Street Address: </strong>{" "}
                  {userData.address.streetAddress}
                </p>
                <p>
                  <strong>City: </strong> {userData.address.city}
                </p>
                <p>
                  <strong>State: </strong> {userData.address.state}
                </p>
                <p>
                  <strong>Country: </strong> {userData.address.country}
                </p>
                <p>
                  <strong>Pincode: </strong> {userData.address.pincode}
                </p>
              </div>
            ) : (
              <p>No address found.</p>
            )}
          </div>
        )}

        {activeSection === "profile" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              <p>
                <strong>Full Name: </strong> {userData.fullName}
              </p>
              <p>
                <strong>Email: </strong> {userData.email}
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
