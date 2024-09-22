import { AnimatePresence, motion } from "framer-motion";
import { NavbarMenu } from "./NavbarMenu";
import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";
import { ProductContext } from "../Context/Product";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
// import { FaCircleUser } from "react-icons/fa6";

const NavMobile = ({ open }) => {
  const navigate = useNavigate();
  // const { isLoggedIn, setIsLoggedIn } = useContext(ProductContext);
  const { users, handleLogout } = useContext(ProductContext);
  const [currentUser, setCurrentUser] = useState(null);
  const id = localStorage.getItem("id");

  useEffect(() => {
    const user = users.find((item) => item.id === id);
    if (user) {
      setCurrentUser(user);
    }
  }, [users, id]);
  const logoutFunction = () => {
    axios.patch(`http://localhost:8000/users/${currentUser.id}`, {
      isLoggedIn: false,
    });
    handleLogout();
  };
  return (
    <>
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 500 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16  w-full h-screen md:hidden z-50"
          >
            <div className="bg-secondary/80 p-4 m-4 rounded-md backdrop-blur flex flex-col justify-center items-center gap-6">
              <div className="flex flex-col justify-center items-center gap-6">
                {NavbarMenu.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.link}
                    className={({ isActive }) =>
                      isActive ? "border-b-2 border-blue-500" : ""
                    }
                  >
                    <div className="relative">
                      {item.title}
                      {item.trending && (
                        <div className="absolute top-[-15px] -right-2 bg-red-600 rounded-xl px-2 text-xs">
                          Hot
                        </div>
                      )}
                    </div>
                  </NavLink>
                ))}
              </div>
              {currentUser ? (
                <div className="w-full flex justify-center">
                  <button
                    className="w-1/2 border-solid border-black border-2 py-2 px-4 rounded-md hover:bg-secondary hover:border-white hover:text-white "
                    onClick={() => logoutFunction()}
                  >
                    {" "}
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-6 w-full">
                  <button
                    className="w-1/2 border-solid border-black border-2 py-2 px-4 rounded-md hover:bg-secondary hover:border-white hover:text-white "
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                  <button
                    className="w-1/2 border-solid border-black border-2 py-2 px-4 rounded-md hover:bg-secondary hover:border-white hover:text-white "
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

NavMobile.propTypes = {
  open: PropTypes.bool,
};

export default NavMobile;
