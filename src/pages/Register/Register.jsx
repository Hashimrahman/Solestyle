import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import SoleStyle from "../../assets/SoleStyle.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { ProductContext } from "../../components/Context/Product";

// Validation schema using Yup
const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const Register = () => {
  const navigate = useNavigate();
  const { users, setUsers } = useContext(ProductContext);

  // Handles form submission and validation.
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // Check if email already exists
      const response = await axios.get("http://localhost:8000/users");
      const user = response.data.find((user) => user.email === values.email);

      if (user) {
        setErrors({ email: "Email Already Exists" });
        setSubmitting(false);
        return;
      }

      // Create new id for each user
      const newUser = { ...values, id: uuidv4(), isLoggedIn: false };

      await axios.post("http://localhost:8000/users", newUser); // Post user details to JSON server
      const updateUser = [...users, newUser];
      setUsers(updateUser);

      // Show success message with SweetAlert2
      Swal.fire({
        title: "Registration Successful!",
        text: "Redirecting to login page...",
        icon: "success",
        timer: 1000, // Timer set to 1000ms
        showConfirmButton: false, // Hides the confirmation button
        willClose: () => {
          navigate("/login"); // Navigate to login after SweetAlert closes
        }
      });

    } catch (error) {
      console.log("Error during registration:", error);
      alert("An error occurred. Please try again later.");
      setSubmitting(false);
    }
  };

  return (
    <div className="h-[100vh] p-4 sm:p-20 flex items-center">
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
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
                    htmlFor="fullName"
                    className="text-lg font-bold opacity-70"
                  >
                    Full Name
                  </label>
                  <Field
                    type="text"
                    name="fullName"
                    placeholder="Enter Your Full Name"
                    className="h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="span"
                    className="text-red-600"
                  />
                </div>
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
                    htmlFor="confirmPassword"
                    className="text-lg font-bold opacity-70"
                  >
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-Enter Your Password"
                    className="h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid"
                  />
                  <ErrorMessage
                    name="confirmPassword"
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
