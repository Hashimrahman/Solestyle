import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Footer from "../../components/Footer/Footer";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../components/Context/Product";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const CheckOut = () => {
  const navigate = useNavigate();
  const { cart,fetchOrder } = useContext(ProductContext); // Access cart from context
  const [razorpayOrder, setRazorpayOrder] = useState(null);

  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone is required"),
    street_address: Yup.string().required("Street address is required"),
    pincode: Yup.string()
      .matches(/^\d{6}$/, "Pincode must be 6 digits")
      .required("Pincode is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
  });

  const initialValues = {
    phone: "",
    street_address: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (!token) {
      alert("User not authenticated");
      setSubmitting(false);
      return;
    }

    console.log("Submitting form...");
    // console.log("Data to API:", {
    //   address: {
    //     street_address: values.street_address,
    //     pincode: values.pincode,
    //     city: values.city,
    //     state: values.state,
    //     country: values.country,
    //   },
    //   cart_items: cart,
    // });

    try {
      const response = await axios.post(
        `${apiUrl}/checkout/`,
        {
          phone: values.phone,
          street_address: values.street_address,
          pincode: values.pincode,
          city: values.city,
          state: values.state,
          country: values.country,
          cart_items: cart,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);
      console.log("razorpay Response:", response.data.razorpay_order);
      const data = response.data;

      if (data.razorpay_order) {
        setRazorpayOrder(data.razorpay_order);
        openRazorpayPayment(data.razorpay_order);
      } else {
        alert("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Checkout failed. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  // Initialize Razorpay payment
  const openRazorpayPayment = (razorpay_order) => {
    const options = {
      key: "rzp_test_KVYa3j27SRKqtq", // Your Razorpay test key
      amount: razorpay_order.amount,
      currency: razorpay_order.currency,
      order_id: razorpay_order.id,
      handler: function (response) {
        // Handle payment response here
        const paymentId = response.razorpay_payment_id;
        console.log("Payment Successful!", paymentId);
        fetchOrder()
        navigate('/profile')
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "1234567890",
      },
      theme: {
        color: "#00faed",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
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
                  src={item.product_image.replace("https%3A/solestylebucket.s3.ap-south-1.amazonaws.com/", "")}
                  alt={item.product_name}
                  className="h-20 w-20 object-cover rounded-lg shadow-sm mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.product_name}</h3>
                  <p className="text-gray-500">Price: ₹{item.product_price}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">Size: {item.size}</p>
                </div>
              </div>
            ))
          )}
          <h2 className="text-xl font-bold mt-4">
            Total: ₹
            {cart.reduce((total, item) => total + item.item_subtotal, 0)}
          </h2>
        </div>

        {/* Checkout Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form className="w-full bg-white p-8 shadow-lg rounded-lg m-6">
              <h2 className="text-2xl font-bold mb-6">CheckOut Form</h2>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Phone</label>
                <Field
                  type="text"
                  name="phone"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your phone number"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Street Address
                </label>
                <Field
                  type="text"
                  name="street_address"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your street address"
                />
                <ErrorMessage
                  name="street_address"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Pincode</label>
                <Field
                  type="text"
                  name="pincode"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your pincode"
                />
                <ErrorMessage
                  name="pincode"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">City</label>
                <Field
                  type="text"
                  name="city"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your city"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">State</label>
                <Field
                  type="text"
                  name="state"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your state"
                />
                <ErrorMessage
                  name="state"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Country</label>
                <Field
                  type="text"
                  name="country"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your country"
                />
                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <button
                type="button"
                onClick={() => console.log("Formik State:", values)}
              >
                Debug Values
              </button>
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
