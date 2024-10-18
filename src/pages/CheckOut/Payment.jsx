// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";
// import Swal from "sweetalert2";
// import axios from "axios";
// import Footer from "../../components/Footer/Footer";

// const Payment = () => {
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("id");

//   // Validation schema for payment form
//   const validationSchema = Yup.object().shape({
//     cardNumber: Yup.string().required("Card Number is required"),
//     cardName: Yup.string().required("Name on Card is required"),
//     expiry: Yup.string().required("Expiry Date is required"),
//     cvv: Yup.string().required("CVV is required"),
//   });

//   // Initial form values
//   const initialValues = {
//     cardNumber: "",
//     cardName: "",
//     expiry: "",
//     cvv: "",
//   };

//   // ===========================================================================================================================

//   const handlePaymentSubmit = async (values, { setSubmitting }) => {
//     console.log("Payment Data Submitted:", values);
//     try {
//       const response = await axios.get(`http://localhost:8000/users/${userId}`);
//       const userData = response.data;

//       // Create a new order with the current cart
//       const newOrder = {
//         orderId: new Date().toISOString(), // Unique order ID based on timestamp
//         products: userData.cart,
//         orderDate: new Date(),
//         status: "Paid", // Status of the order
//       };

//       // Update the user data with the new order and clear the cart
//       const updatedUser = {
//         ...userData,
//         orders: [...(userData.orders || []), newOrder], // Add the new order to existing orders
//         cart: [], // Clear the cart
//       };

//       // Update the user data in the backend
//       const updateResponse = await axios.put(
//         `http://localhost:8000/users/${userId}`,
//         updatedUser
//       );

//       if (updateResponse.status === 200) {
//         // Clear the cart from localStorage
//         localStorage.removeItem(`cart_${userId}`);

//         // Show success message
//         Swal.fire({
//           icon: "success",
//           title: "Payment Successful",
//           showConfirmButton: false,
//           timer: 1500,
//         });

//         setTimeout(() => {
//           navigate("/profile"); // Redirect to user profile page to show orders
//         }, 1500);
//       } else {
//         throw new Error("Failed to update user data");
//       }
//     } catch (error) {
//       console.error("Error processing payment:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Could not complete the payment. Please try again.",
//       });
//     }
//     setSubmitting(false);
//   };

//   // ====================================================================================================================================

//   return (
//     <>
//       <div className="flex justify-center items-center min-h-screen">
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handlePaymentSubmit}
//         >
//           {({ isSubmitting }) => (
//             <Form className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg my-6">
//               <h2 className="text-2xl font-bold mb-6">Payment Form</h2>

//               {/* Form fields */}
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2">Card Number</label>
//                 <Field
//                   type="text"
//                   name="cardNumber"
//                   className="w-full p-2 border rounded"
//                   placeholder="Enter your card number"
//                 />
//                 <ErrorMessage
//                   name="cardNumber"
//                   component="div"
//                   className="text-red-500"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2">Name on Card</label>
//                 <Field
//                   type="text"
//                   name="cardName"
//                   className="w-full p-2 border rounded"
//                   placeholder="Enter name on the card"
//                 />
//                 <ErrorMessage
//                   name="cardName"
//                   component="div"
//                   className="text-red-500"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2">Expiry</label>
//                 <Field
//                   type="text"
//                   name="expiry"
//                   className="w-full p-2 border rounded"
//                   placeholder="MM/YY"
//                 />
//                 <ErrorMessage
//                   name="expiry"
//                   component="div"
//                   className="text-red-500"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2">CVV</label>
//                 <Field
//                   type="password"
//                   name="cvv"
//                   className="w-full p-2 border rounded"
//                   placeholder="Enter your CVV"
//                 />
//                 <ErrorMessage
//                   name="cvv"
//                   component="div"
//                   className="text-red-500"
//                 />
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white p-2 rounded"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? "Processing..." : "Submit Payment"}
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Payment;

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";

const Payment = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const [checkoutDetails, setCheckoutDetails] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);

  // Fetch checkout details and cart items from localStorage and user data
  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("checkoutDetails"));
    const cart = JSON.parse(localStorage.getItem(`cart_${userId}`));
    setCheckoutDetails(details);
    setOrderDetails(cart);
  }, [userId]);

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

  // const handlePaymentSubmit = async (values, { setSubmitting }) => {
  //   console.log("Payment Data Submitted:", values);
  //   try {
  //     const response = await axios.get(`http://localhost:8000/users/${userId}`);
  //     const userData = response.data;

  //     // Create a new order with the current cart
  //     const newOrder = {
  //       orderId: new Date().toISOString(), // Unique order ID based on timestamp
  //       products: userData.cart,
  //       orderDate: new Date(),
  //       status: "Paid", // Status of the order
  //     };

  //     // Update the user data with the new order and clear the cart
  //     const updatedUser = {
  //       ...userData,
  //       orders: [...(userData.orders || []), newOrder], // Add the new order to existing orders
  //       cart: [], // Clear the cart
  //     };

  //     // Update the user data in the backend
  //     const updateResponse = await axios.put(
  //       `http://localhost:8000/users/${userId}`,
  //       updatedUser
  //     );

  //     if (updateResponse.status === 200) {
  //       // Clear the cart from localStorage
  //       localStorage.removeItem(`cart_${userId}`);

  //       // Show success message
  //       Swal.fire({
  //         icon: "success",
  //         title: "Payment Successful",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });

  //       setTimeout(() => {
  //         navigate("/profile"); // Redirect to user profile page to show orders
  //       }, 1500);
  //     } else {
  //       throw new Error("Failed to update user data");
  //     }
  //   } catch (error) {
  //     console.error("Error processing payment:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Could not complete the payment. Please try again.",
  //     });
  //   }
  //   setSubmitting(false);
  // };
  const handlePaymentSubmit = async (values, { setSubmitting }) => {
    console.log("Payment Data Submitted:", values);

    // Show processing state with Swal
    Swal.fire({
      title: "Processing Payment...",
      text: "Please wait while we process your payment.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Show the loading indicator
      },
    });

    // Simulate payment processing delay
    setTimeout(async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/users/${userId}`
        );
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
        const updateResponse = await axios.put(
          `http://localhost:8000/users/${userId}`,
          updatedUser
        );

        if (updateResponse.status === 200) {
          // Clear the cart from localStorage
          localStorage.removeItem(`cart_${userId}`);

          // After payment processing, show success message
          Swal.fire({
            icon: "success",
            title: "Payment Successful",
            showConfirmButton: false,
            timer: 1500,
          });

          // Redirect to the profile page after a delay
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

      setSubmitting(false); // Allow resubmission after processing
    }, 2000); // Simulate a 2-second delay for processing
  };

  return (
    <>
      <div className="flex justify-center items-start min-h-screen mt-20">
        {/* Address and Order Summary Section */}
        <div className="w-full max-w-xl bg-white p-4 shadow-lg rounded-lg m-6">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            {orderDetails.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              orderDetails.map((item) => (
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
              Total: ₹
              {orderDetails.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
            </h2>
          </div>

          {/* Address Details */}
          <div className="bg-white shadow-md p-4 mt-4">
            {checkoutDetails && (
              <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
                <p>{checkoutDetails.fullName}</p>
                <p>{checkoutDetails.streetAddress}</p>
                <p>
                  {checkoutDetails.city}, {checkoutDetails.state} -{" "}
                  {checkoutDetails.pincode}
                </p>
                <p>{checkoutDetails.country}</p>
                <p>Email: {checkoutDetails.email}</p>
                <p>Phone: {checkoutDetails.phone}</p>
              </div>
            )}
          </div>
        </div>

        {/* Payment Form Section */}
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
                <ErrorMessage
                  name="cardNumber"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name on Card</label>
                <Field
                  type="text"
                  name="cardName"
                  className="w-full p-2 border rounded"
                  placeholder="Enter name on the card"
                />
                <ErrorMessage
                  name="cardName"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Expiry</label>
                <Field
                  type="text"
                  name="expiry"
                  className="w-full p-2 border rounded"
                  placeholder="MM/YY"
                />
                <ErrorMessage
                  name="expiry"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">CVV</label>
                <Field
                  type="password"
                  name="cvv"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your CVV"
                />
                <ErrorMessage
                  name="cvv"
                  component="div"
                  className="text-red-500"
                />
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
      <Footer />
    </>
  );
};

export default Payment;
