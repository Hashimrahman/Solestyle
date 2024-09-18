// import {Link} from 'react-router-dom'
import { MdMenu, MdOutlineShoppingCart } from "react-icons/md";
import SoleStyle from "../../assets/SoleStyle4.png";
import { NavbarMenu } from "./NavbarMenu";
import {  useState } from "react";
import NavMobile from "./NavMobile";
import { IoClose } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
// import { LoginStatus } from "../Context/Context";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // const {status, setStatus} = useContext(LoginStatus)
  return (
    <>
      <nav className="fixed top-0 w-full m-0 p-4 backdrop-blur z-20">
        <div className="flex justify-between items-center mx-4">
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
                    isActive ? "border-b-2 border-secondary text-secondary font-semibold" : ""
                  }
                >
                  <div>{item.title}</div>
                </NavLink>
              ))}
            </div>
          </div>
          <div className="text-l hidden md:flex gap-10 items-center justify-center  ">
            <button className="text-3xl text-primary hover:bg-secondary rounded-full p-2">
              <MdOutlineShoppingCart />
            </button>
            <div className="flex gap-2">
              <button className="border-solid border-black border-2 py-2 px-4 rounded-md hover:bg-secondary hover:border-white hover:text-white "  onClick={() => navigate('/register')}>
                Register
              </button>
              <button className="border-solid border-black border-2 py-2 px-4 rounded-md hover:bg-secondary hover:border-white hover:text-white "  onClick={() => navigate('/login')}>
                Login
              </button>
            </div>
          </div>
          <div className="inline-block md:hidden text-3xl font-extrabold text-primary">
            <button
              onClick={() => setOpen(!open)}
              style={{ display: open ? "none" : "inline-block" }}
            >
              <MdMenu />
            </button>
            <button
              onClick={() => setOpen(!open)}
              style={{ display: open ? "inline-block" : "none" }}
            >
              <IoClose />
            </button>
          </div>
        </div>
      </nav>
      <NavMobile open={open} />
    </>
  );
};

export default Navbar;
