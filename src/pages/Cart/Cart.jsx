import {useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { ProductContext } from "../../components/Context/Product";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const Cart = () => {
  const navigate = useNavigate();
  const {cart, incrementQuantity, decrementQuantity, handleDelete } = useContext(
    ProductContext
  );
  // const token = localStorage.getItem("token")
  // const [cart, setCart] = useState([])

  const totalPrice = cart.reduce(
    (total, item) => total + item.item_subtotal,
    0
  );

  // const handleClick = (id) =>{
  //   console.log(typeof id);
  //   console.log(token);
    
  // }


  return (
    <>
      <div className="container mx-auto mt-16 p-6">
        <h1 className="text-4xl font-bold text-center mb-8">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <p className="text-gray-500 mt-2">Start adding some items to it!</p>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-6"
              >
                <img
                  src={item.product_image.replace("https%3A/solestylebucket.s3.ap-south-1.amazonaws.com/", "")}
                  alt={item.name}
                  className="h-28 w-28 object-cover rounded-lg shadow-sm"
                />
                <div className="flex-1 ml-4">
                  <h2 className="text-xl font-semibold">{item.product_name}</h2>
                  <p className="text-gray-500 mt-1">{item.product_price} ₹</p>
                  <p className="text-gray-600 mt-1">
                    Subtotal: ₹{item.item_subtotal}
                  </p>
                  <p className="text-gray-600 mt-1">
                    size: {item.size}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center mb-4">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="mx-3 text-lg">{item.quantity}</span>
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-6">
              <h2 className="text-2xl font-bold">Total Price: ₹{totalPrice}</h2>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                onClick={() => {
                  navigate("/submit");
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
