import { useEffect, useState, useContext } from "react";
import { ProductContext } from "../../components/Context/Product";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { incrementQuantity, decrementQuantity } = useContext(ProductContext);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Function to load separate cart for each of the user from localStorage
  const loadCart = (userId) => {
    const savedCart = localStorage.getItem(`cart_${userId}`);

    if (savedCart) {
      setCart(JSON.parse(savedCart)); // Load from localStorage
    } else {
      axios
        .get(`http://localhost:8000/users/${userId}`)
        .then((res) => {
          const userCart = res.data.cart || [];
          setCart(userCart);

          // Save the cart to localStorage 
          localStorage.setItem(`cart_${userId}`, JSON.stringify(userCart));
        })
        .catch((err) => {
          console.error("Error fetching the user's cart:", err);
        });
    }
  };

  // Load the cart when the component mounts
  useEffect(() => {
    const loggedInUserId = localStorage.getItem("id");
    if (loggedInUserId) {
      loadCart(loggedInUserId); 
    } else {
      navigate("/login"); 
    }
  }, [navigate]); 

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center">
          <h2 className="text-xl">Your cart is empty</h2>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <img src={item.image} alt={item.name} className="h-24 w-24 object-cover rounded-md" />
              <div className="flex-1 mx-4">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-md text-gray-600">{item.price} ₹</p>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => decrementQuantity(item.id)} 
                  className="border px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button 
                  onClick={() => incrementQuantity(item.id)} 
                  className="border px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4">
            <h2 className="text-xl font-bold">Total Price: {totalPrice} ₹</h2>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
