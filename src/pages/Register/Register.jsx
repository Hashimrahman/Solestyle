import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import SoleStyle from "../../assets/SoleStyle.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { ProductContext } from "../../components/Context/Product";
// import api from "../Login/api";  
const apiUrl = import.meta.env.VITE_API_URL;

// Validation schema using Yup
const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("user Name is required"),
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile_number: Yup.string().required("Mobile Number is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
  password2: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const Register = () => {
  const navigate = useNavigate();
  const { users, setUsers } = useContext(ProductContext);

  // Handles form submission and validation.
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post(`${apiUrl}/register/`, values);
      const user = response.data;

      Swal.fire({
        title: "Registration Successful!",
        text: "Redirecting to login page...",
        icon: "success",
        timer: 1000, 
        showConfirmButton: false, 
        willClose: () => {
          navigate("/login"); 
        },
      });
      console.log(user);
    } catch (error) {
      if (error.response && error.response.data) {
        const backendErrors = error.response.data;
        const formattedErrors = {};
        console.log("new", backendErrors);

        // Map the backend errors to Formik field errors
        Object.keys(backendErrors).forEach((key) => {
          formattedErrors[key] = backendErrors[key];
        });

        setErrors(formattedErrors); 
      }
    }
  };

  return (
    <div className="h-[100vh] p-4 sm:p-20 flex items-center">
      <Formik
        initialValues={{
          username: "",
          first_name: "",
          last_name: "",
          email: "",
          mobile_number: "",
          password: "",
          password2: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-slate-300 rounded-lg shadow-custom-shadow p-8 md:p-16 w-[100%]">
            <h1 className="text-3xl font-bold text-center md:text-left">
              Register Now
            </h1>
            <div className="flex flex-row-reverse mb-8 text-sm">
              <div className="w-1/2 hidden lg:flex items-center justify-center">
                <img src={SoleStyle} alt="SoleStyle Logo" className="w-3/4" />
              </div>
              <div className="w-full lg:w-1/2">
                <div className="flex flex-col w-full gap-2 mt-4">
                  <label
                    htmlFor="username"
                    className="text-lg font-bold opacity-70"
                  >
                    User Name
                  </label>
                  <Field
                    type="username"
                    name="username"
                    placeholder="Enter Your username"
                    className="h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid"
                  />
                  <ErrorMessage
                    name="username"
                    component="span"
                    className="text-red-600"
                  />
                </div>
                <div className="md:flex gap-4">
                  <div className="flex flex-col w-full gap-2 mt-4">
                    <label
                      htmlFor="first_name"
                      className="text-lg font-bold opacity-70"
                    >
                      First Name
                    </label>
                    <Field
                      type="text"
                      name="first_name"
                      placeholder="Enter Your Full Name"
                      className="h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid"
                    />
                    <ErrorMessage
                      name="first_name"
                      component="span"
                      className="text-red-600"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2 mt-4">
                    <label
                      htmlFor="lastName"
                      className="text-lg font-bold opacity-70"
                    >
                      Last Name
                    </label>
                    <Field
                      type="text"
                      name="last_name"
                      placeholder="Enter Your Full Name"
                      className="h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid"
                    />
                    <ErrorMessage
                      name="last_name"
                      component="span"
                      className="text-red-600"
                    />
                  </div>
                </div>

                <div className="md:flex gap-4">
                  <div className="flex flex-col w-full gap-2 mt-4">
                    <label
                      htmlFor="email"
                      className="text-lg font-bold opacity-70"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter Your Email"
                      className="h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid"
                    />
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="text-red-600"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2 mt-4">
                    <label
                      htmlFor="mobile_number"
                      className="text-lg font-bold opacity-70"
                    >
                      Phone
                    </label>
                    <Field
                      type="text"
                      name="mobile_number"
                      placeholder="Enter Your Phone Number"
                      className="h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid"
                    />
                    <ErrorMessage
                      name="mobile_number"
                      component="span"
                      className="text-red-600"
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full gap-2 mt-4">
                  <label
                    htmlFor="password"
                    className="text-lg font-bold opacity-70"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter Your Password"
                    className="h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid"
                  />
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="text-red-600"
                  />
                </div>
                <div className="flex flex-col w-full gap-2 mt-4">
                  <label
                    htmlFor="password2"
                    className="text-lg font-bold opacity-70"
                  >
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="password2"
                    placeholder="Re-Enter Your Password"
                    className="h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid"
                  />
                  <ErrorMessage
                    name="password2"
                    component="span"
                    className="text-red-600"
                  />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-slate-200 text-base md:text-lg w-3/4 lg:w-1/2 p-2 rounded-full hover:bg-slate-600 hover:text-white transition-all ease-in-out duration-1000"
              >
                {isSubmitting ? "Registering..." : "Register Now"}
              </button>
              <p className="mt-2 text-center">
                Have an Account?{" "}
                <Link to="/login">
                  <span className="text-blue-800 hover:cursor-pointer">
                    Login{" "}
                  </span>
                </Link>
                Here
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
