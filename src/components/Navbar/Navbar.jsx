// import {Link} from 'react-router-dom'
// import { MdMenu, MdOutlineShoppingCart } from "react-icons/md";
import SoleStyle from "../../assets/SoleStyle4.png";
import { NavbarMenu } from "./NavbarMenu";
import { useContext, useEffect, useState } from "react";
import NavMobile from "./NavMobile";
// import { IoClose } from "react-icons/io5";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ProductContext } from "../Context/Product";
import LogOutLayout from "./LogOutLayout";
// import { FaCircleUser } from "react-icons/fa6";
import LoginLayout from "./LoginLayout";
import { FaCircleUser } from "react-icons/fa6";
import Swal from "sweetalert2";
import { MdOutlineShoppingCart } from "react-icons/md";
// import { LoginStatus } from "../Context/Context";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { users, handleLogout, cart } = useContext(ProductContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [cartLength, setCartLength] = useState(0);

  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const user = users.find((item) => item.id === id);
    if (user) {
      setCurrentUser(user);
    }
  }, [users, id]);
  useEffect(() => {
    const cartLength = cart?.length || 0;
    setCartLength(cartLength);
  }, [cart]);

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

  return (
    <>
      <nav className="fixed top-0 w-full m-0 p-4 backdrop-blur z-20 border-none outline-none">
        <div className="flex justify-between items-center mx-4 ">
          <div className="w-[6em] md:w-[12em]">
            <img src={SoleStyle} alt="" />
          </div>
          <div className="hidden md:inline-block">
            <div className="flex gap-6 text-l ">
              {NavbarMenu.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.link}
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-2 border-secondary text-secondary font-semibold"
                      : ""
                  }
                >
                  <div className="hover:text-secondary hover:-translate-y-1 transform-all ease-in-out duration-300 relative">
                    {item.title}
                    {item.trending && (
                      <div className="absolute top-[-15px] -right-2 bg-red-600/70 rounded-xl px-2 text-xs uppercase">
                        Hot
                      </div>
                    )}
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
          {token ? (
            <div className="flex flex-row-reverse gap-4 flex-wrap ">
              <LoginLayout open={open} openSet={setOpen} />
              <div className="flex flex-row-reverse gap-6 ">
                <button
                  className="flex h-full text-3xl justify-center items-center md:hidden"
                  onClick={() => openDetails(currentUser, handleLogout)}
                >
                  <FaCircleUser />
                </button>
                <div className="md:hidden">
                  <button
                    className=" relative h-full text-3xl"
                    onClick={() => navigate("/cart")}
                  >
                    <MdOutlineShoppingCart />
                    <p className="absolute -top-4 -right-5 text-base bg-red-500 px-2 rounded-full">
                      {cartLength}
                    </p>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <LogOutLayout open={open} openSet={setOpen} />
          )}
        </div>
      </nav>
      <NavMobile open={open} />
      <Outlet />
    </>
  );
};

export default Navbar;
