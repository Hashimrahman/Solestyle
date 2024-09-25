import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";

const Payment = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  // Validation schema for payment form
  const validationSchema = Yup.object().shape({
    cardNumber: Yup.string().required("Card Number is required"),
    cardName: Yup.string().required("Name on Card is required"),
    expiry: Yup.string().required("Expiry Date is required"),
    cvv: Yup.string().required("CVV is required"),
  });

  // Initial form values
  const initialValues = {
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  };

  const handlePaymentSubmit = async (values, { setSubmitting }) => {
    console.log("Payment Data Submitted:", values);
    try {
      const response = await axios.get(`http://localhost:8000/users/${userId}`);
      const userData = response.data;

      // Create a new order with the current cart
      const newOrder = {
        orderId: new Date().toISOString(), // Unique order ID based on timestamp
        products: userData.cart,
        orderDate: new Date(),
        status: "Paid", // Status of the order
      };

      // Update the user data with the new order and clear the cart
      const updatedUser = {
        ...userData,
        orders: [...(userData.orders || []), newOrder], // Add the new order to existing orders
        cart: [], // Clear the cart
      };

      // Update the user data in the backend
      const updateResponse = await axios.put(`http://localhost:8000/users/${userId}`, updatedUser);

      if (updateResponse.status === 200) {
        // Clear the cart from localStorage
        localStorage.removeItem(`cart_${userId}`);

        // Show success message
        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          navigate("/profile"); // Redirect to user profile page to show orders
        }, 1500);
      } else {
        throw new Error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not complete the payment. Please try again.",
      });
    }
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handlePaymentSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg my-6">
            <h2 className="text-2xl font-bold mb-6">Payment Form</h2>

            {/* Form fields */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Card Number</label>
              <Field
                type="text"
                name="cardNumber"
                className="w-full p-2 border rounded"
                placeholder="Enter your card number"
              />
              <ErrorMessage name="cardNumber" component="div" className="text-red-500" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name on Card</label>
              <Field
                type="text"
                name="cardName"
                className="w-full p-2 border rounded"
                placeholder="Enter name on the card"
              />
              <ErrorMessage name="cardName" component="div" className="text-red-500" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Expiry</label>
              <Field
                type="text"
                name="expiry"
                className="w-full p-2 border rounded"
                placeholder="MM/YY"
              />
              <ErrorMessage name="expiry" component="div" className="text-red-500" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">CVV</label>
              <Field
                type="password"
                name="cvv"
                className="w-full p-2 border rounded"
                placeholder="Enter your CVV"
              />
              <ErrorMessage name="cvv" component="div" className="text-red-500" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Submit Payment"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Payment;
