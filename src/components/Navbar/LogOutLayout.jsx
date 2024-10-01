import { FaCircleUser } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdMenu, MdOutlineShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const LogOutLayout = ({ open, openSet }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="text-l hidden md:flex gap-10 items-center justify-center">
        <button className="text-3xl text-primary hover:bg-secondary rounded-full p-2">
          <MdOutlineShoppingCart />
        </button>
        <div className="flex gap-2">
          <button
            className="border-solid border-black border-2 py-2 px-4 rounded-md hover:bg-secondary hover:border-white hover:text-white "
            onClick={() => navigate("/register")}
          >
            Register
          </button>
          <button
            className="border-solid border-black border-2 py-2 px-4 rounded-md hover:bg-secondary hover:border-white hover:text-white "
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
      <div className="inline-block md:hidden text-3xl font-extrabold text-primary">
        <div>
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
    </div>
  );
};

export default LogOutLayout;
