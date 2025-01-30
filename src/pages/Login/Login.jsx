import { useContext, useState } from "react";
import SoleStyle from "../../assets/SoleStyle.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ProductContext } from "../../components/Context/Product";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const validationErrors = {};
    if (!formData.username.trim()) {
      validationErrors.username = "Username is required";
    }
    if (formData.password.trim().length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/login-form/`, formData); 
      const { user } = response.data;
      console.log("response -user", user);
      if (user.is_blocked == true) {
        Swal.fire({
          icon: "error",
          title: "Account Blocked",
          text: `Your account is currently blocked, ${user.full_name} \n Contact Customer Support`,
          timer: 2000,
          timerProgressBar: true,
        });
        return;
      } else {
        Swal.fire({
          icon: "success",
          title: `Welcome ${user.full_name}`,
          timer: 2000,
          timerProgressBar: true,
        });
        localStorage.setItem("token", response.data.access_token);

        if (user.is_staff == true) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);

      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: error.response?.data.error || "An error occurred",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="h-[100vh] p-4 sm:p-20 flex items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-300 rounded-lg shadow-custom-shadow p-8 md:p-16 w-[100%]"
      >
        <h1 className="text-3xl font-bold text-center md:text-left">Login</h1>
        <div className="flex flex-row-reverse mb-8 text-sm">
          <div className="w-1/2 hidden lg:flex items-center justify-center">
            <img src={SoleStyle} alt="" className="w-3/4" />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col w-full gap-2 mt-4">
              <label
                htmlFor="username"
                className="text-lg font-bold opacity-70"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter Your Username"
                value={formData.username}
                onChange={handleChange}
                className="h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid"
              />
              {errors.username && (
                <span className="text-red-600">{errors.username}</span>
              )}
            </div>
            <div className="flex flex-col w-full gap-2 mt-4">
              <label
                htmlFor="password"
                className="text-lg font-bold opacity-70"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handleChange}
                className="h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid"
              />
              {errors.password && (
                <span className="text-red-600">{errors.password}</span>
              )}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
          <button
            type="submit"
            className="bg-slate-200 text-base md:text-lg w-3/4 lg:w-1/2 p-2 rounded-full lg:hover:bg-slate-600 lg:hover:text-white transition-all ease-in-out duration-1000"
          >
            Login
          </button>
          <p className="mt-2 text-center">
            Not a Member?{" "}
            <Link to="/register">
              <span className="text-blue-800 hover:cursor-pointer">
                Register
              </span>
            </Link>{" "}
            Here
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
