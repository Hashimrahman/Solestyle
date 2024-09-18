import { AnimatePresence, motion } from "framer-motion";
import { NavbarMenu } from "./NavbarMenu";
import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";

const NavMobile = ({ open }) => {
  const navigate = useNavigate();
  return (
    <>
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 500 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16  w-full h-screen md:hidden z-20"
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
                    <div>{item.title}</div>
                  </NavLink>
                ))}
              </div>
              <div className="flex gap-6 w-full">
                <button className="w-1/2 border-solid border-black border-2 py-2 px-4 rounded-md hover:bg-secondary hover:border-white hover:text-white " onClick={() => navigate('/register')}>
                  Register
                </button>
                <button className="w-1/2 border-solid border-black border-2 py-2 px-4 rounded-md hover:bg-secondary hover:border-white hover:text-white " onClick={() => navigate('/login')}>
                  Login
                </button>
              </div>
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
