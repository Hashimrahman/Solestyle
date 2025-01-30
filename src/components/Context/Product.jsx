import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css"; // Don't forget to include the CSS for Toastify
const apiUrl2 = import.meta.env.VITE_API_URL;

import "animate.css";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [error, setError] = useState(null);
  const [men, setMen] = useState([]);
  const [women, setWomen] = useState([]);
  const [kids, setKids] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [cart, setCart] = useState([]);
  const [totalCart, setTotalCart] = useState([]);
  const [count, setCount] = useState(0);
  const [cartLength, setCartLength] = useState(0);
  const [order, setOrder] = useState([]);
  const [totalOrders, setTotalOrders] = useState([]);
  const [loadingTotalOrder, setLoadingTotalOrder] = useState(true);
  const [orderStatus, setOrderStatus] = useState("Pending");
  const [blocked, setBlocked] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();
  // const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  // ============================================================ FETCH PRODUCTS ============================================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const res = await axios.get(`${apiUrl}/products`);
        const res = await axios.get(`${apiUrl2}/products/`);
        console.log("API Response product:", res.data);
        setProducts(res.data);
        setProductCount(products.length);
      } catch (err) {
        console.error("API Error product:", err);
      }
    };

    fetchProducts();
  }, [products.length]);

  //   const fetchProducts = async () => {
  // useEffect(() => {
  //     try {
  //       const res = await axios.get(`http://127.0.0.1:8000/products/`, {
  //         params: { page: currentPage },
  //       });
  //       console.log("API Response product:", res.data.results);
  //       setProducts(res.data.results);
  //       setTotalPages(Math.ceil(res.data.count / 10));
  //     } catch (err) {
  //       console.error("API Error product:", err);
  //     }
  //   };

  //   fetchProducts();
  // }, [currentPage]);

  // ============================================================ FETCH CURRENT USER ============================================================

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (token) {
        try {
          const res = await axios(`${apiUrl2}/user-details/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setCurrentUser(res.data);
        } catch (err) {
          console.error("Error in fetching user", err);
        }
      }
    };
    fetchCurrentUser();
  }, [token]);

  // ============================================================ FETCH USER ============================================================

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${apiUrl2}/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:users", res.data);
        setUsers(res.data);
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchUsers();
  }, [token]);

  // ============================================================ FETCH ORDER ============================================================

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`${apiUrl2}/order/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("orders", res.data);
      console.log("orders address", res.data);
      if (res.data) {
        setOrder(res.data);
      }

      setLoadingOrder(false);
    } catch (err) {
      console.error("Error in fetching orders", err);
      setLoadingOrder(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [token]);

  // ============================================================ FETCH ALL ORDER ============================================================

  useEffect(() => {
    const fetchAllOrder = async () => {
      try {
        console.log("Orders");
        const res = await axios.get(`${apiUrl2}/total-orders/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Total Orders:", res.data);
        setTotalOrders(res.data);
        setLoadingTotalOrder(false);
      } catch (err) {
        console.error("Error fetching Orders", err);
      }
    };
    fetchAllOrder();
  }, [token]);

  // ===============================================================================================================================

  useEffect(() => {
    console.log("jkk", products);
    let FilteredMen = products.filter((product) => product.category == "men");
    setMen(FilteredMen);
    let FilteredWomen = products.filter(
      (product) => product.category == "Women"
    );
    setWomen(FilteredWomen);
    let FilteredKids = products.filter((product) => product.category == "Kids");
    setKids(FilteredKids);
  }, [products]);

  // ============================================================ FETCH CART ============================================================
  
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${apiUrl2}/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("cart Items row", res.data);
      console.log("cart Items", res.data[0].cartItems);
      setCart(res.data[0].cartItems);
      setCartLength(res.data[0].cartItems.length);
    } catch (err) {
      console.error("Error in fetching cart", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  // ============================================================ FETCH CART ============================================================
  
  useEffect(()=>{
    const fetchAllCart = async ()=>{
      try{
        const res = await axios.get(`${apiUrl2}/total-cart/`,
          {
            headers:{
              Authorization: `Bearer ${token}`
            }
          }
        )
        console.log("all cart",res.data);
        setTotalCart(res.data)
        
      }
      catch(err){
        console.error("error",err);
        
      }
    }
    fetchAllCart()
  },[])

  
  // ============================================================ INCREASE QUANTITY ============================================================

  const incrementQuantity = async (itemId) => {
    try {
      const res = await axios.post(
        `${apiUrl2}/cart/items/${itemId}/increase/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      fetchCart();
    } catch (err) {
      Swal.fire({
        icon: "fail",
        title: "Error in increasing quantity",
        showConfirmButton: true,
        timer: 1000,
        timerProgressBar: true,
      });
      console.log("hii");

      console.error("Error in increasing", err);
    }
  };

  // ============================================================ DECREMENT QUANTITY ============================================================

  const decrementQuantity = async (itemId) => {
    try {
      const res = await axios.post(
        `${apiUrl2}/cart/items/${itemId}/decrease/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      fetchCart();
    } catch (err) {
      console.log("hii");
      console.error("Error in decreasing", err);
    }
  };

  // ============================================================ DELETE CART ITEM ============================================================

  const handleDelete = async (itemId) => {
    try {
      const res = await axios.delete(
        `${apiUrl2}/cart/items/${itemId}/delete/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      fetchCart();
    } catch (err) {
      console.error("Error in deleting", err);
    }
  };

  // ============================================================ ADD TO CART ============================================================

  // const handleAddToCart = (elem) => {
  //   const loggedInUserId = localStorage.getItem("id");
  //   const blockedStatus = localStorage.getItem("isBlocked");

  //   if (!loggedInUserId) {
  //     let timerInterval;
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Please login",
  //       timer: 2000,
  //       timerProgressBar: true,
  //       willClose: () => {
  //         clearInterval(timerInterval);
  //       },
  //     }).then((result) => {
  //       if (result.dismiss === Swal.DismissReason.timer) {
  //         console.log("The alert was closed by the timer");
  //       }
  //     });
  //   } else if (blockedStatus === "true") {
  //     let timerInterval;
  //     Swal.fire({
  //       icon: "warning",
  //       title: `Something Wrong !!\nPlease Contact The Admin`,
  //       timer: 2000,
  //       timerProgressBar: true,
  //       willClose: () => {
  //         clearInterval(timerInterval);
  //       },
  //     }).then((result) => {
  //       if (result.dismiss === Swal.DismissReason.timer) {
  //         console.log("The alert was closed by the timer");
  //       }
  //     });
  //   } else {
  //     console.log("User logged in:", loggedInUserId);

  //     let isPresent = cart.some((item) => item.id === elem.id);

  //     if (isPresent) {
  //       let timerInterval;
  //       Swal.fire({
  //         icon: "warning",
  //         title: `Item Already Added`,
  //         timer: 1000,
  //         timerProgressBar: true,
  //         showClass: {
  //           popup: "animate__animated animate__fadeIn", // Show animation
  //         },
  //         hideClass: {
  //           popup: "animate__animated animate__fadeOut", // Hide animation
  //         },

  //         willClose: () => {
  //           clearInterval(timerInterval);
  //         },
  //       }).then((result) => {
  //         if (result.dismiss === Swal.DismissReason.timer) {
  //           console.log("The alert was closed by the timer");
  //         }
  //       });
  //     } else {
  //       const updatedCart = [...cart, elem];

  //       axios
  //         .patch(`${apiUrl}/users/${loggedInUserId}`, {
  //           cart: updatedCart,
  //         })
  //         .then((res) => {
  //           console.log("Cart updated in the database:", res.data);

  //           // Update cart state
  //           setCart(updatedCart);

  //           // Save the updated cart in localStorage
  //           localStorage.setItem(
  //             `cart_${loggedInUserId}`,
  //             JSON.stringify(updatedCart)
  //           );

  //           // Update cart length from the logged-in user's cart
  //           const cartLength = updatedCart.length;
  //           setCartLength(cartLength);

  //           Toastify({
  //             text: "Item Added Successfully",
  //             duration: 4000, // Increased duration
  //             close: true,
  //             gravity: "top", // Position on top
  //             position: "right", // Align to the right
  //             backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)", // New gradient
  //             style: {
  //               fontSize: "20px", // Bigger text
  //               width: "350px", // Increase width for visibility
  //             },
  //           }).showToast();
  //         })
  //         .catch((err) => {
  //           console.error("Error updating the cart in the database:", err);
  //         });

  //       axios
  //         .patch(`${apiUrl}/products/${elem.id}`, { quantity: 1 })
  //         .then((res) => console.log("Success", res.data))
  //         .catch((err) => {
  //           console.log("Error", err);
  //         });
  //     }
  //   }
  // };

  const handleAddToCart = async (productId, size, count) => {
    console.log("Adding to cart");
    try {
      const res = await axios.post(
        `${apiUrl2}/cart/add/`,
        {
          product: productId,
          size: size,
          quantity: count,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("added to cart", res.data);
      Toastify({
        text: "Item Added Successfully",
        duration: 2000,
        close: true,
        gravity: "top", 
        position: "right", 
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)", 
        style: {
          fontSize: "20px", 
          width: "350px", 
        },
      }).showToast();

      await fetchCart();
    } catch (err) {
      console.error("error in adding to cart", err);
      Swal.fire({
        icon: "error",
        title: "Failed to Add Item",
        text:
          "There was an issue adding the item to your cart. Please try again later.",
        showConfirmButton: true,
      });
    }
  };

  // ============================================================ PRODUCT UPDATE ============================================================
  const handleProductUpdate = async (e, currentProduct) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${apiUrl2}/products/${currentProduct.id}/`,
        currentProduct,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedProducts = products.map((product) =>
        product.id === currentProduct.id ? currentProduct : product
      );

      setProducts(updatedProducts);

      console.log("Updated Product:", response.data);
      navigate("/admin");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // ============================================================ DELETE USER ============================================================

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiUrl2}/users/${id}`)
          .then((res) => {
            console.log("User deleted successfully", res);
            const deletedUserData = res.data;

            const updatedUsers = users.filter(
              (item) => item.id !== deletedUserData.id
            );
            setUsers(updatedUsers);

            Swal.fire("Deleted!", "The user has been deleted.", "success");

            navigate("/admin");
          })
          .catch((err) => {
            console.log("An error occurred", err);
            Swal.fire("Error", "Failed to delete the user", "error");
          });
      }
    });
  };

  // ============================================================ BLOCK USER ============================================================

  const handleBlockUser = (userId, blocked) => {
    // Show a SweetAlert confirmation popup
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${blocked ? "unblock" : "block"} this user.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${blocked ? "unblock" : "block"} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        // Determine the action based on the current blocked status
        const action = blocked ? "unblock" : "block";
  
        axios
          .post(`${apiUrl2}/user/block-unblock/${userId}/`, {
            action: action, 
          },
          {
            headers:{
              Authorization :`Bearer ${token}`
            }
          }
        )
          .then((res) => {
            console.log("User Block Status Updated", res.data);
            // Show a success message
            Swal.fire(
              `${action === "block" ? "Blocked" : "Unblocked"}!`,
              `The user has been ${action === "block" ? "blocked" : "unblocked"}.`,
              "success"
            );
          })
          .catch((err) => {
            console.log("Error in updating user status", err);
            Swal.fire("Error", "Failed to update user status", "error");
          });
      }
    });
  };
  

  // ============================================================ LOGOUT ============================================================

  const handleLogout = () => {
    localStorage.clear();
    setCart([]);
    navigate("/");
  };

  // ===============================================================================================================================

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
        setUsers,
        handleLogout,
        handleAddToCart,
        incrementQuantity,
        decrementQuantity,
        handleDelete,
        count,
        setCount,
        cart,
        cartLength,
        handleDeleteUser,
        handleProductUpdate,
        blocked,
        handleBlockUser,
        orderStatus,
        setOrderStatus,
        totalPages,
        setCurrentPage,
        currentPage,
        order,
        loadingOrder,
        fetchOrder,
        currentUser,
        setProducts,
        totalOrders,
        loadingTotalOrder,
        totalCart
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
