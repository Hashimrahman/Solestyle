import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [men, setMen] = useState([]);
  const [women, setWomen] = useState([]);
  const [kids, setKids] = useState([]);
  const [users, setUsers] = useState([]);
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState();
  const navigate = useNavigate();
  // const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/products");
        console.log("API Response:", res.data);
        setProducts(res.data);
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/users");
        console.log("API Response:", res.data);
        setUsers(res.data);
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let FilteredMen = products.filter((product) => product.category == "Men");
    setMen(FilteredMen);
    let FilteredWomen = products.filter(
      (product) => product.category == "Women"
    );
    setWomen(FilteredWomen);
    let FilteredKids = products.filter((product) => product.category == "Kids");
    setKids(FilteredKids);
  }, [products]);

  const handleLogin = (userId) => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
    loadCart(userId);
  };

  const handleLogout = () => {
    const loggedInUserId = localStorage.getItem("id");
    if (loggedInUserId) {
      localStorage.removeItem(`cart_${loggedInUserId}`);
    }
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("isLoggedIn");
    setCart([]);

    navigate("/login");
  };

  const loadCart = (userId) => {
    //load the cart from localStorage first
    const savedCart = localStorage.getItem(`cart_${userId}`);

    if (savedCart) {
      // If cart exists in localStorage, load it into the state
      setCart(JSON.parse(savedCart));
    } else {
      //else, load it from the db.json
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

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("id");
    if (loggedInUserId) {
      loadCart(loggedInUserId); // Load the cart on component mount or refresh
    }
  }, []);

  const handleAddToCart = (elem) => {
    const loggedInUserId = localStorage.getItem("id");

    if (!loggedInUserId) {
      alert("Please Login");
    } else {
      console.log("User logged in:", loggedInUserId);

      let isPresent = cart.some((item) => item.id === elem.id);

      if (isPresent) {
        alert("Item Already Added");
      } else {
        const updatedCart = [...cart, elem];

        axios
          .patch(`http://localhost:8000/users/${loggedInUserId}`, {
            cart: updatedCart,
          })
          .then((res) => {
            console.log("Cart updated in the database:", res.data);

            setCart(updatedCart);

            // Save in localStorage
            localStorage.setItem(
              `cart_${loggedInUserId}`,
              JSON.stringify(updatedCart)
            );

            alert("Item Added Successfully");
          })
          .catch((err) => {
            console.error("Error updating the cart in the database:", err);
          });
      }
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        men,
        women,
        kids,
        isLoggedIn,
        setIsLoggedIn,
        users,
        handleLogin,
        handleLogout,
        handleAddToCart,
        count,
        setCount,
        cart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
