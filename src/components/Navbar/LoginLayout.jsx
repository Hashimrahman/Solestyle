import { useContext, useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdMenu, MdOutlineShoppingCart } from "react-icons/md";
import { ProductContext } from "../Context/Product";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL

const LoginLayout = ({ open, openSet }) => {
  const navigate = useNavigate();
  const { handleLogout, cart } = useContext(ProductContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [cartLength, setCartLength] = useState(0);
  const token = localStorage.getItem("token");


  useEffect(() => {
    const fetchUserDetails = async () => {
      if (token) {
        try {
          const res = await axios.get(`${apiUrl}/user-details/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("details",res);
          setCurrentUser(res.data)
          
        } catch (err) {
          console.error("Error fetching user details: ",err);
        }
      }
    };
    fetchUserDetails()
  },[token]);

  useEffect(() => {
    const cartLength = cart?.length || 0;
    setCartLength(cartLength);
  }, [cart]);
  const openDetails = (user, handleLogout) => {
    Swal.fire({
      position: "top-end",
      showConfirmButton: false,
      html: `<div class="swal-div">
        <h1 class='swal-name'>${user.full_name}</h1>
        <p>${user.email}</p>
        <button id="profile" class="swal2-confirm swal-button">Profile</button>
        <button id="logoutButton" class="swal2-confirm swal-button">Logout</button>
      </div>`, 
      customClass: {
        popup: "swal-margin",
        title: "swal-title",
      },
      didRender: () => {
        const logoutButton = document.getElementById("logoutButton");
        const order = document.getElementById("profile");
        order.addEventListener("click", () => {
          navigate("/profile");
          Swal.close();
        });

        logoutButton.addEventListener("click", () => {
          Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: "You will be logged out.",
            showCancelButton: true,
            confirmButtonText: "Logout",
            cancelButtonText: "Cancel",
          }).then((result) => {
            if (result.isConfirmed) {
              handleLogout();
              Swal.fire({
                icon: "success",
                title: "Logged Out",
                text: "You have been logged out successfully.",
                timer: 1000,
                showConfirmButton: false,
              });
            }
          });
        });
      },
    });
  };

  return (
    <div>
      <div className="text-l hidden md:flex gap-10 items-center justify-center">
        <button
          className="text-3xl text-primary hover:bg-secondary rounded-full p-2"
          onClick={() => navigate("/cart")}
        >
          <div className="relative h-full">
            <MdOutlineShoppingCart />
            <p className="absolute -top-4 -right-5 text-base bg-red-500 px-2 rounded-full">
              {cartLength}
            </p>
          </div>
        </button>
        <div>
          {currentUser ? (
            <p className="text-primary uppercase font-bold text-2xl">
              {currentUser.full_name}
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
