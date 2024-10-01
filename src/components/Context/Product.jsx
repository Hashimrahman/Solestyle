import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState(null);
  const [men, setMen] = useState([]);
  const [women, setWomen] = useState([]);
  const [kids, setKids] = useState([]);
  const [users, setUsers] = useState([]);
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState();
  const [cartLength, setCartLength] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/products");
        console.log("API Response:", res.data);
        setProducts(res.data);
        setProductCount(products.length);
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchProducts();
  }, []);
  // const fetchProducts = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/products");
  //     if (!response.ok) {
  //       throw new Error(`Error fetching products: ${response.statusText}`);
  //     }
  //     const data = await response.json();
  //     setProducts(data);
  //   } catch (err) {
  //     console.error(err);
  //     setError(err.message);
  //   } finally {
  //     setLoadingProducts(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);
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
  const handleDeleteUser = (id) => {
    axios
      .delete(`http://localhost:8000/users/${id}`)
      .then((res) => {
        console.log("User deleted succesfully", res);
        const deletedUserData = res.data;
        const updatedUsers = users.filter(
          (item) => item.id != deletedUserData.id
        );
        setUsers(updatedUsers);
      })
      .catch((err) => {
        console.log("An error occured", err);
      });
    navigate("/admin");
  };

  // useEffect(()=>{
  //   const deleteUser = async (id) =>{
  //     const res = axios.delete(`http://localhost:8000/users/${id}`)
  //   }
  // })

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
    localStorage.setItem("isBlocked", false);
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
    localStorage.removeItem("isBlocked");
    setCart([]);

    navigate("/");
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
    const blockedStatus = localStorage.getItem("isBlocked");

    if (!loggedInUserId) {
      alert("Please Login");
    } else if (blockedStatus === "true") {
      alert("Please Contact Administrator");
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

            // Update cart state
            setCart(updatedCart);

            // Save the updated cart in localStorage
            localStorage.setItem(
              `cart_${loggedInUserId}`,
              JSON.stringify(updatedCart)
            );

            // Update cart length from the logged-in user's cart
            const cartLength = updatedCart.length;
            setCartLength(cartLength);

            alert("Item Added Successfully");
          })
          .catch((err) => {
            console.error("Error updating the cart in the database:", err);
          });
      }
    }
  };

  const handleProductUpdate = async (e, currentProduct) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `http://localhost:8000/products/${currentProduct.id}`,
        currentProduct
      );
      const updatedProducts = products.map((product) =>
        product.id === currentProduct.id ? currentProduct : product
      );

      setProducts(updatedProducts);

      console.log("Updated Product:", response.data);
      // Navigate to the admin page after a successful update
      navigate("/admin");
    } catch (error) {
      console.error("Error updating product:", error);
      // Optionally, you could show an error message to the user here
    }
  };

  const handleBlockUser = (userId) => {
    // Toggle the blocked state manually and get the updated value
    const updatedBlocked = !blocked;

    // Update the state with the new blocked value
    setBlocked(updatedBlocked);

    // Make sure to send the updatedBlocked value in the PATCH request
    axios
      .patch(`http://localhost:8000/users/${userId}`, {
        isblocked: updatedBlocked,
      })
      .then((res) => {
        console.log("User Block Status Updated", res.data);
        // Store the updated blocked value in localStorage
        localStorage.setItem("isBlocked", updatedBlocked);
      })
      .catch((err) => {
        console.log("Error in updating user status", err);
      });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        productCount,
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
        cartLength,
        handleDeleteUser,
        handleProductUpdate,
        blocked,
        handleBlockUser,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
