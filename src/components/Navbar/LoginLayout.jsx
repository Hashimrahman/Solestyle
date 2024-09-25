import { useContext, useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdMenu, MdOutlineShoppingCart } from "react-icons/md";
import { ProductContext } from "../Context/Product";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

const LoginLayout = ({ open, openSet }) => {
  const navigate = useNavigate();
  const { users, handleLogout } = useContext(ProductContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [cartLength, setCartLength] = useState(0);
  const id = localStorage.getItem("id");

  useEffect(() => {
    const user = users.find((item) => item.id === id);
    if (user) {
      setCurrentUser(user);
    }
  }, [users, id]);
  useEffect(()=>{
    const cartLength = currentUser?.cart?.length || 0;
    setCartLength(cartLength); 

  },[currentUser])
  // const cartLength = currentUser.cart.length();
  const openDetails = (user, handleLogout) => {
    Swal.fire({
      position: "top-end",
      // text: 'hi',
      showConfirmButton: false,
      html: `<div class="swal-div">
      <h1 class='swal-name'>${user.fullName}</h1>
      <p >${user.email}</p>
       <button id="orders" class="swal2-confirm swal-button">Orders</button>
       <button id="logoutButton" class="swal2-confirm swal-button">Logout</button>
      </div>`, // Add a logout button
      customClass: {
        popup: "swal-margin",
        title: "swal-title",
      },
      didRender: () => {
        // Attach a click event listener to the logout button
        const logoutButton = document.getElementById("logoutButton");
        const order = document.getElementById("orders");
        order.addEventListener("click", () => {
          navigate('/orders'), Swal.close();
        });
        logoutButton.addEventListener("click", () => {
          handleLogout(), Swal.close();
        });
      },
    });
  };

  // console.log(currentUser.fullName);
  // console.log(currentUser ? currentUser.fullName : "No user found");
  return (
    <div>
      <div className="text-l hidden md:flex gap-10 items-center justify-center">
        <button
          className="text-3xl text-primary hover:bg-secondary rounded-full p-2"
          onClick={() => navigate("/cart")}
        >
          <div className="relative h-full">
          <MdOutlineShoppingCart />
          <p className="absolute -top-4 -right-5 text-base bg-red-500 px-2 rounded-full">{cartLength}</p>
          </div>
        </button>
        <div>
          {currentUser ? (
            <p className="text-primary uppercase font-bold text-2xl">
              {currentUser.fullName}
            </p>
          ) : (
            <p className="">Loading...</p>
          )}
        </div>
        <button
          className="text-3xl text-primary hover:bg-secondary rounded-lg p-2 px-4 bg-slate-200"
          onClick={() => openDetails(currentUser, handleLogout)}
        >
          <FaCircleUser />
        </button>
      </div>
      <div className="flex md:hidden text-3xl font-extrabold text-primary">
        <button
          onClick={() => openSet(!open)}
          style={{ display: open ? "none" : "inline-block" }}
        >
          <MdMenu />
        </button>
        <button
          onClick={() => openSet(!open)}
          style={{ display: open ? "inline-block" : "none" }}
        >
          <IoClose />
        </button>
      </div>
    </div>
  );
};

export default LoginLayout;
