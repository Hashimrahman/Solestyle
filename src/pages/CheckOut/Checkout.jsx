import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../components/Footer/Footer";

const CheckOut = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    streetAddress: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    Swal.fire({
        icon: "success",
        title: "Order Placed Successfully",
        showConfirmButton: false,
        timer: 1500
      });
      setTimeout(() => {
        navigate('/');
    }, 1500);
  };

  return (
    <>
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg my-6">
        <h2 className="text-2xl font-bold mb-6">CheckOut Form</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Street Address</label>
          <input
            type="text"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your street address"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your pincode"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your city"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your state"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your country"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default CheckOut;
