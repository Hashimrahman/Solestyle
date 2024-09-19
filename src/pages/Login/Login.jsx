import { useState } from "react";
import SoleStyle from "../../assets/SoleStyle.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { LoginStatus } from "../Context/Context";

const Login = () => {
  // const {setStatus} = useContext(LoginStatus)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setError] = useState({});
  const [valid, setValid] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let validationErrors = {};

    if (formData.email.trim() == "" || formData.email === null) {
      isValid = false;
      validationErrors.email = "Email Required";
    } else if (!/\S+@\S+.\S/.test(formData.email)) {
      isValid = false;
      validationErrors.email = "Email Not Valid";
    }

    if (formData.password.trim() == "" || formData.password === null) {
      isValid = false;
      validationErrors.password = "Password Required";
    } else if (formData.password.length < 6) {
      isValid = false;
      validationErrors.password = "Password Should be atleast 6 charecters";
    }

    if (!isValid) {
      setError(validationErrors);
      setValid(false);
    }

    axios
      .get("http://localhost:8000/users")
      .then((res) => {
        const user = res.data.find((user) => user.email === formData.email);
        if (!user) {
          validationErrors.email = "Email not found";
          setError(validationErrors);
          setValid(false);
        } else if (user.password === formData.password) {
          alert("Login Successful");
          navigate("/");
          // setStatus(false)
        } else {
          validationErrors.password = "Wrong Password";
          setError(validationErrors);
          setValid(false);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An Unexpected error occured");
      });
    setError(validationErrors);
    setValid(isValid);
  };

  return (
    <div className="h-[100vh] p-4 sm:p-20 flex items-center">
      <form
        className="bg-slate-300 rounded-lg shadow-custom-shadow p-8 md:p-16 w-[100%]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-center md:text-left">Login</h1>
        <div className="flex flex-row-reverse mb-8 text-sm">
          <div className="w-1/2 hidden lg:flex items-center justify-center">
            <img src={SoleStyle} alt="" className="w-3/4" />
          </div>
          <div className="w-full lg:w-1/2 ">
            <div className="flex flex-col w-full gap-2 mt-4  ">
              <label htmlFor="email" className="text-lg font-bold opacity-70">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="inputEmail"
                placeholder="Enter Your Email"
                className=" h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid "
                required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {valid ? (
                <></>
              ) : (
                <span className="text-red-600">{errors.email}</span>
              )}
            </div>
            <div className="flex flex-col w-full gap-2 mt-4  ">
              <label
                htmlFor="password"
                className="text-lg font-bold opacity-70"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="inputPassword"
                placeholder="Enter Your Password"
                className=" h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid "
                required
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              {valid ? (
                <></>
              ) : (
                <span className="text-red-600">{errors.password}</span>
              )}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
          <button className="bg-slate-200 text-base md:text-lg w-3/4 lg:w-1/2 p-2 rounded-full lg:hover:bg-slate-600 lg:hover:text-white transition-all ease-in-out duration-1000">
            Login
          </button>
          <p className="mt-2 text-center">
            Not a Member?{" "}
            <Link to="/register">
              <span className="text-blue-800 hover:cursor-pointer">
                Register{" "}
              </span>
            </Link>
            Here
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
