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
// import { LoginStatus } from "../Context/Context";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  // const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, users } = useContext(ProductContext);
  // const {status, setStatus} = useContext(LoginStatus)
  const id = localStorage.getItem("id");
  

  return (
    <>
      <nav className="fixed top-0 w-full m-0 p-4 backdrop-blur z-20 border-none outline-none">
        <div className="flex justify-between items-center mx-4 ">
          <div className=" w-[12em]">
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
          {id ? (
            <div className="flex flex-row-reverse gap-4 flex-wrap ">
              <LoginLayout open={open} openSet={setOpen} />
              <div className="flex h-full text-3xl justify-center items-center md:hidden">
                <FaCircleUser />
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
