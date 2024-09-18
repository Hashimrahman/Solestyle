import { useState } from "react";
import SoleStyle from "../../assets/SoleStyle.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setError] = useState({});
  const [valid, setValid] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    let validationErrors = {};

    if (formData.fullName.trim() == "" || formData.fullName === null) {
      isValid = false;
      validationErrors.fullName = "Name Required";
    }

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

    if (formData.confirmPassword !== formData.password) {
      isValid = false;
      validationErrors.confirmPassword = "Password not Matching";
    }

    setError(validationErrors);
    setValid(isValid);
    if (!isValid) return;

    try {
      const response = await axios.get("http://localhost:8000/users");
      const user = response.data.find((user) => user.email === formData.email);
      if (user) {
        isValid = false;
        validationErrors.email = "Email Already Existing";
        setValid(isValid);
        setError(validationErrors)
        return;
      }

      const newUser = {...formData, id: uuidv4}

      await axios.post("http://localhost:8000/users", newUser);
      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      console.log("Error during registration:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="h-[100vh] p-4 sm:p-20 flex items-center">
      <form
        className="bg-slate-300 rounded-lg shadow-custom-shadow p-8 md:p-16 w-[100%]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-center md:text-left">
          Register Now
        </h1>
        <div className="flex flex-row-reverse mb-8 text-sm">
          <div className="w-1/2 hidden lg:flex items-center justify-center">
            <img src={SoleStyle} alt="" className="w-3/4" />
          </div>
          <div className="w-full lg:w-1/2 ">
            <div className="flex flex-col w-full gap-2 mt-4">
              <label
                htmlFor="fullName"
                className="text-lg font-bold opacity-70"
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Enter Your Full Name"
                className=" h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid"
                onChange={(event) =>
                  setFormData({ ...formData, fullName: event.target.value })
                }
              />
              {valid ? (
                <></>
              ) : (
                <span className="text-red-600">{errors.fullName}</span>
              )}
            </div>
            <div className="flex flex-col w-full gap-2 mt-4  ">
              <label htmlFor="email" className="text-lg font-bold opacity-70">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                className=" h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid "
                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
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
                id="password"
                placeholder="Enter Your Password"
                className=" h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid "
                onChange={(event) =>
                  setFormData({ ...formData, password: event.target.value })
                }
              />
              {valid ? (
                <></>
              ) : (
                <span className="text-red-600">{errors.password}</span>
              )}
            </div>
            <div className="flex flex-col w-full gap-2 mt-4  ">
              <label
                htmlFor="confirmPassword"
                className="text-lg font-bold opacity-70"
              >
                Confirm Password
              </label>
              <input
                type="text"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Re-Enter Your Password"
                className=" h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid "
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    confirmPassword: event.target.value,
                  })
                }
              />
              {valid ? (
                <></>
              ) : (
                <span className="text-red-600">{errors.confirmPassword}</span>
              )}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
          <button className="bg-slate-200 text-base md:text-lg w-3/4 lg:w-1/2 p-2 rounded-full hover:bg-slate-600 hover:text-white transition-all ease-in-out duration-1000">
            Register Now
          </button>
          <p className="mt-2 text-center">
            Have an Account?{" "}
            <Link to="/login">
              <span className="text-blue-800 hover:cursor-pointer">Login </span>
            </Link>
            Here
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
