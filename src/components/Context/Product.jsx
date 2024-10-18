import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";  // Don't forget to include the CSS for Toastify

import "animate.css";

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
  const [count, setCount] = useState(0);
  const [cartLength, setCartLength] = useState(0);
  const [orderStatus, setOrderStatus] = useState("Pending");
  const [blocked, setBlocked] = useState(false);
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  // ===============================================================================================================================

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

  // ===============================================================================================================================

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

  // ===============================================================================================================================

  // const handleDeleteUser = (id) => {
  //   axios
  //     .delete(`http://localhost:8000/users/${id}`)
  //     .then((res) => {
  //       console.log("User deleted succesfully", res);
  //       const deletedUserData = res.data;
  //       const updatedUsers = users.filter(
  //         (item) => item.id != deletedUserData.id
  //       );
  //       setUsers(updatedUsers);
  //     })
  //     .catch((err) => {
  //       console.log("An error occured", err);
  //     });
  //   navigate("/admin");
  // };

  // ===============================================================================================================================

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

  // ===============================================================================================================================

  const handleLogin = (userId) => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("isBlocked", false);
    loadCart(userId);
  };

  // ===============================================================================================================================

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
    localStorage.removeItem("activeTab");
    localStorage.removeItem("checkoutDetails");
    setCart([]);

    navigate("/");
  };

  // ===============================================================================================================================

  const loadCart = (userId) => {
    const savedCart = localStorage.getItem(`cart_${userId}`);

    if (savedCart) {
      setCart(JSON.parse(savedCart));
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

  // ===============================================================================================================================

  const saveCart = (userId, updatedCart) => {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));

    axios
      .patch(`http://localhost:8000/users/${userId}`, { cart: updatedCart })
      .then((res) => {
        console.log("Cart updated successfully:", res.data);
      })
      .catch((err) => {
        console.error("Error updating the cart:", err);
      });
  };

  // ===============================================================================================================================

  // Load the cart when the component mounts
  useEffect(() => {
    const loggedInUserId = localStorage.getItem("id");
    if (loggedInUserId) {
      loadCart(loggedInUserId);
    }
  }, [navigate]);

  const incrementQuantity = (itemId) => {
    const loggedInUserId = localStorage.getItem("id");
    const updatedCart = cart.map((item) =>
      item.id === itemId
        ? { ...item, quantity: parseInt(item.quantity) + 1 }
        : item
    );
    setCart(updatedCart);
    saveCart(loggedInUserId, updatedCart);
  };

  // ===============================================================================================================================

  const decrementQuantity = (itemId) => {
    const loggedInUserId = localStorage.getItem("id");
    const updatedCart = cart.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    saveCart(loggedInUserId, updatedCart);
  };

  // ===============================================================================================================================

  const removeItem = (itemId) => {
    const loggedInUserId = localStorage.getItem("id");
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    saveCart(loggedInUserId, updatedCart);
    axios
      .patch(`http://localhost:8000/users/${loggedInUserId}`, {
        cart: updatedCart,
      })
      .then((res) => {
        console.log("Cart Updated Successfully", res.data);
      })
      .catch((err) => {
        console.log("Error in removing item", err);
      });
  };

  // ===============================================================================================================================

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
  //       title: `Something Wrong !!\nPlease Contact The Admin`, // New alert message
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
  //         .patch(`http://localhost:8000/users/${loggedInUserId}`, {
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

  //           // alert("Item Added Successfully");
  //           let timerInterval;
  //           Swal.fire({
  //             icon: "success",
  //             title: `Item Added Successfully`,
  //             timer: 1000,
  //             timerProgressBar: true,
  //             willClose: () => {
  //               clearInterval(timerInterval);
  //             },
  //           }).then((result) => {
  //             if (result.dismiss === Swal.DismissReason.timer) {
  //               console.log("The alert was closed by the timer");
  //             }
  //           });
  //         })
  //         .catch((err) => {
  //           console.error("Error updating the cart in the database:", err);
  //         });
  //     }
  //   }
  // };
  const handleAddToCart = (elem) => {
    const loggedInUserId = localStorage.getItem("id");
    const blockedStatus = localStorage.getItem("isBlocked");
  
    if (!loggedInUserId) {
      let timerInterval;
      Swal.fire({
        icon: "warning",
        title: "Please login",
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("The alert was closed by the timer");
        }
      });
    } else if (blockedStatus === "true") {
      let timerInterval;
      Swal.fire({
        icon: "warning",
        title: `Something Wrong !!\nPlease Contact The Admin`,
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("The alert was closed by the timer");
        }
      });
    } else {
      console.log("User logged in:", loggedInUserId);
  
      let isPresent = cart.some((item) => item.id === elem.id);
  
      if (isPresent) {
        let timerInterval;
        Swal.fire({
          icon: "warning",
          title: `Item Already Added`,
          timer: 1000,
          timerProgressBar: true,
          showClass: {
            popup: "animate__animated animate__fadeIn", // Show animation
          },
          hideClass: {
            popup: "animate__animated animate__fadeOut", // Hide animation
          },
  
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("The alert was closed by the timer");
          }
        });
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
  
            Toastify({
              text: "Item Added Successfully",
              duration: 4000, // Increased duration
              close: true,
              gravity: "top", // Position on top
              position: "right", // Align to the right
              backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)", // New gradient
              style: {
                fontSize: "20px", // Bigger text
                // padding: "20px", // Increase padding for larger size
                width: "350px",  // Increase width for visibility
              },
            }).showToast();
          })
          .catch((err) => {
            console.error("Error updating the cart in the database:", err);
          });

          axios.patch(`http://localhost:8000/products/${elem.id}`, {quantity:1})
          .then((res) => console.log('Success', res.data)
          )
          .catch((err)=> {
            console.log("Error", err)
            
          })
      }
    }
  };
  

  // ===============================================================================================================================

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

  // ===============================================================================================================================

  const handleDeleteUser = (id) => {
    // Show a SweetAlert confirmation popup
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
        // Proceed with deletion if the user confirms
        axios
          .delete(`http://localhost:8000/users/${id}`)
          .then((res) => {
            console.log("User deleted successfully", res);
            const deletedUserData = res.data;

            // Update the users state by removing the deleted user
            const updatedUsers = users.filter(
              (item) => item.id !== deletedUserData.id
            );
            setUsers(updatedUsers);

            // Show success message
            Swal.fire("Deleted!", "The user has been deleted.", "success");

            // Navigate back to admin page
            navigate("/admin");
          })
          .catch((err) => {
            console.log("An error occurred", err);
            Swal.fire("Error", "Failed to delete the user", "error");
          });
      }
    });
  };

  // ===============================================================================================================================

  const handleBlockUser = (userId) => {
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

            // Show a success message
            Swal.fire(
              `${updatedBlocked ? "Blocked" : "Unblocked"}!`,
              `The user has been ${updatedBlocked ? "blocked" : "unblocked"}.`,
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
        handleLogin,
        handleLogout,
        handleAddToCart,
        incrementQuantity,
        decrementQuantity,
        removeItem,
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
