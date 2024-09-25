// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import Footer from "../../components/Footer/Footer";

// const CheckOut = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     streetAddress: "",
//     pincode: "",
//     city: "",
//     state: "",
//     country: "",
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data Submitted:", formData);
//     Swal.fire({
//         icon: "success",
//         title: "Order Placed Successfully",
//         showConfirmButton: false,
//         timer: 1500
//       });
//       setTimeout(() => {
//         navigate('/');
//     }, 1500);
//   };

//   return (
//     <>
//     <div className="flex justify-center items-center min-h-screen">
//       <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg my-6">
//         <h2 className="text-2xl font-bold mb-6">CheckOut Form</h2>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Full Name</label>
//           <input
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="Enter your full name"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="Enter your email"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Phone</label>
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="Enter your phone number"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Street Address</label>
//           <input
//             type="text"
//             name="streetAddress"
//             value={formData.streetAddress}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="Enter your street address"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Pincode</label>
//           <input
//             type="text"
//             name="pincode"
//             value={formData.pincode}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="Enter your pincode"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">City</label>
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="Enter your city"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">State</label>
//           <input
//             type="text"
//             name="state"
//             value={formData.state}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="Enter your state"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Country</label>
//           <input
//             type="text"
//             name="country"
//             value={formData.country}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="Enter your country"
//             required
//           />
//         </div>

//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Submit
//         </button>
//       </form>
//     </div>
//     <Footer />
//     </>
//   );
// };

// export default CheckOut;

// import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Footer from "../../components/Footer/Footer";

const CheckOut = () => {
  const navigate = useNavigate();

  // Validation schema with Yup
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number should be 10 digits")
      .required("Phone number is required"),
    streetAddress: Yup.string().required("Street Address is required"),
    pincode: Yup.string().matches(/^[0-9]{6}$/, "Pincode should be 6 digits").required("Pincode is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
  });

  // Initial form values
  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    streetAddress: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  };

  // Submit handler to navigate to the payment page
  const handleSubmit = (values, { setSubmitting }) => {
    // Save form data to localStorage to pass it to the payment page
    localStorage.setItem("checkoutDetails", JSON.stringify(values));
    navigate("/payment"); // Navigate to payment page
    setSubmitting(false);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg my-6">
              <h2 className="text-2xl font-bold mb-6">CheckOut Form</h2>

              {/* Form fields */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Full Name</label>
                <Field
                  type="text"
                  name="fullName"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your full name"
                />
                <ErrorMessage name="fullName" component="div" className="text-red-500" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Phone</label>
                <Field
                  type="tel"
                  name="phone"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your phone number"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Street Address</label>
                <Field
                  type="text"
                  name="streetAddress"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your street address"
                />
                <ErrorMessage name="streetAddress" component="div" className="text-red-500" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Pincode</label>
                <Field
                  type="text"
                  name="pincode"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your pincode"
                />
                <ErrorMessage name="pincode" component="div" className="text-red-500" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">City</label>
                <Field
                  type="text"
                  name="city"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your city"
                />
                <ErrorMessage name="city" component="div" className="text-red-500" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">State</label>
                <Field
                  type="text"
                  name="state"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your state"
                />
                <ErrorMessage name="state" component="div" className="text-red-500" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Country</label>
                <Field
                  type="text"
                  name="country"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your country"
                />
                <ErrorMessage name="country" component="div" className="text-red-500" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Proceed to Payment"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </>
  );
};

export default CheckOut;

