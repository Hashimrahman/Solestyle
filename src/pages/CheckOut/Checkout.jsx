import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Footer from "../../components/Footer/Footer";
import { useContext } from "react";
import { ProductContext } from "../../components/Context/Product";

const CheckOut = () => {
  const navigate = useNavigate();
  const { cart } = useContext(ProductContext); // Access cart from context

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
      <div className="flex justify-center items-start min-h-screen mt-20">
        {/* Order Summary */}
        <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg m-6">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 object-cover rounded-lg shadow-sm mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500">Price: ₹{item.price}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))
          )}
          <h2 className="text-xl font-bold mt-4">
            Total: ₹{cart.reduce((total, item) => total + item.price * item.quantity, 0)}
          </h2>
        </div>

        {/* Checkout Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full bg-white p-8 shadow-lg rounded-lg m-6">
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
