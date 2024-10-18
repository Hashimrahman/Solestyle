// import { useContext, useEffect, useState } from "react";
// import SoleStyle from "../../assets/SoleStyle.png";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ProductContext } from "../../components/Context/Product";
// import Swal from "sweetalert2";

// const Login = () => {
//   const { isLoggedIn, setIsLoggedIn, users, handleLogin } = useContext(
//     ProductContext
//   );
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setError] = useState({});
//   const [valid, setValid] = useState(true);

//   // UseEffect to load login state from localStorage on mount
//   // useEffect(() => {
//   //   const storedLoginState = localStorage.getItem("isLoggedIn");
//   //   if (storedLoginState === "true") {
//   //     setIsLoggedIn(true);
//   //   } else {
//   //     setIsLoggedIn(false);
//   //   }
//   // }, [setIsLoggedIn]);

//   // // Function to handle login and set localStorage
//   // const handleLogin = () => {
//   //   setIsLoggedIn(true);
//   //   localStorage.setItem("isLoggedIn", "true");
//   // };

//   // const handleLogout = () => {
//   //   setIsLoggedIn(false);
//   //   localStorage.removeItem("isLoggedIn");
//   // };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   let isValid = true;
//   //   let validationErrors = {};

//   //   // Validation logic
//   //   if (formData.email.trim() === "" || formData.email === null) {
//   //     isValid = false;
//   //     validationErrors.email = "Email Required";
//   //   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//   //     isValid = false;
//   //     validationErrors.email = "Email Not Valid";
//   //   }

//   //   if (formData.password.trim() === "" || formData.password === null) {
//   //     isValid = false;
//   //     validationErrors.password = "Password Required";
//   //   } else if (formData.password.length < 6) {
//   //     isValid = false;
//   //     validationErrors.password = "Password Should be at least 6 characters";
//   //   }

//   //   if (!isValid) {
//   //     setError(validationErrors);
//   //     setValid(false);
//   //     return; // Exit if validation fails
//   //   }

//   //   // Axios call to check user credentials
//   //   axios
//   //     .get("http://localhost:8000/users")
//   //     .then((res) => {
//   //       const user = res.data.find((user) => user.email === formData.email);
//   //       if (!user) {
//   //         validationErrors.email = "Email not found";
//   //         setError(validationErrors);
//   //         setValid(false);
//   //       } else if (user.password === formData.password) {
//   //         alert("Login Successful");
//   //         // localStorage.setItem("id",user.id);
//   //         handleLogin(user.id);
//   //         axios
//   //           .patch(`http://localhost:8000/users/${user.id}`, {
//   //             isLoggedIn: true,
//   //           })
//   //           .then(() => {
//   //             console.log("User login status updated to true");
//   //             navigate("/");
//   //           })
//   //           .catch((err) => {
//   //             console.log("Error updating login status:", err);
//   //             alert("Failed to update login status");
//   //           });
//   //         navigate("/");
//   //         localStorage.setItem("id",user.id);
//   //         localStorage.setItem("name",user.fullName);
//   //         localStorage.setItem("email",user.email);
//   //       } else {
//   //         validationErrors.password = "Wrong Password";
//   //         setError(validationErrors);
//   //         setValid(false);
//   //       }
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //       alert("An Unexpected error occurred");
//   //     });

//   //   setError(validationErrors);
//   //   setValid(isValid);
//   // };
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   let isValid = true;
//   //   let validationErrors = {};

//   //   // Validation logic
//   //   if (formData.email.trim() === "" || formData.email === null) {
//   //     isValid = false;
//   //     validationErrors.email = "Email Required";
//   //   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//   //     isValid = false;
//   //     validationErrors.email = "Email Not Valid";
//   //   }

//   //   if (formData.password.trim() === "" || formData.password === null) {
//   //     isValid = false;
//   //     validationErrors.password = "Password Required";
//   //   } else if (formData.password.length < 6) {
//   //     isValid = false;
//   //     validationErrors.password = "Password Should be at least 6 characters";
//   //   }

//   //   if (!isValid) {
//   //     setError(validationErrors);
//   //     setValid(false);
//   //     return; // Exit if validation fails
//   //   }

//   //   // Use the 'users' from the context for the login check
//   //   const user = users.find((user) => user.email === formData.email);

//   //   if (!user) {
//   //     validationErrors.email = "Email not found";
//   //     setError(validationErrors);
//   //     setValid(false);
//   //   } else if (user.password === formData.password) {
//   //     alert("Login Successful");
//   //     handleLogin(user.id); // Call handleLogin from context

//   //     // Update user's login status
//   //     axios
//   //       .patch(`http://localhost:8000/users/${user.id}`, {
//   //         isLoggedIn: true,
//   //       })
//   //       .then(() => {
//   //         console.log("User login status updated to true");
//   //         navigate("/");
//   //       })
//   //       .catch((err) => {
//   //         console.log("Error updating login status:", err);
//   //         alert("Failed to update login status");
//   //       });

//   //     // Store user info in localStorage
//   //     localStorage.setItem("id", user.id);
//   //     localStorage.setItem("name", user.fullName);
//   //     localStorage.setItem("email", user.email);
//   //   } else {
//   //     validationErrors.password = "Wrong Password";
//   //     setError(validationErrors);
//   //     setValid(false);
//   //   }
//   // };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let isValid = true;
//     let validationErrors = {};

//     // Validation logic
//     if (formData.email.trim() === "" || formData.email === null) {
//       isValid = false;
//       validationErrors.email = "Email Required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       isValid = false;
//       validationErrors.email = "Email Not Valid";
//     }

//     if (formData.password.trim() === "" || formData.password === null) {
//       isValid = false;
//       validationErrors.password = "Password Required";
//     } else if (formData.password.length < 6) {
//       isValid = false;
//       validationErrors.password = "Password Should be at least 6 characters";
//     }

//     if (!isValid) {
//       setError(validationErrors);
//       setValid(false);
//       return; // Exit if validation fails
//     }

//     // Use the 'users' from the context for the login check
//     const user = users.find((user) => user.email === formData.email);

//     if (!user) {
//       validationErrors.email = "Email not found";
//       setError(validationErrors);
//       setValid(false);
//     } else if (user.password === formData.password) {
//       let timerInterval;
//       Swal.fire({
//         icon: "success",
//         title: `Login Successful\nPlease Wait !`,
//         timer: 2000,
//         timerProgressBar: true,
//         willClose: () => {
//           clearInterval(timerInterval);
//         },
//       }).then((result) => {
//         if (result.dismiss === Swal.DismissReason.timer) {
//           console.log("The alert was closed by the timer");
//         }
//       });
//       handleLogin(user.id); // Call handleLogin from context

//       // Update user's login status
//       axios
//         .patch(`http://localhost:8000/users/${user.id}`, {
//           isLoggedIn: true,
//         })
//         .then(() => {
//           console.log("User login status updated to true");

//           if (user.isAdmin) {
//             // Navigate to the admin dashboard and prevent back navigation
//             setTimeout(() => {
//               navigate("/admin", { replace: true });
//             }, 2000);
            
          
            
//           }
//            else {
//             setTimeout(() => {
//               navigate("/", { replace: true });
//             }, 2000);
//              // Navigate to home page for regular users
//           }
//         })
//         .catch((err) => {
//           console.log("Error updating login status:", err);
//           alert("Failed to update login status");
//         });

//       // Store user info in localStorage
//       localStorage.setItem("id", user.id);
//       localStorage.setItem("name", user.fullName);
//       localStorage.setItem("email", user.email);
//     } else {
//       validationErrors.password = "Wrong Password";
//       setError(validationErrors);
//       setValid(false);
//     }
//   };

//   return (
//     <div className="h-[100vh] p-4 sm:p-20 flex items-center">
//       <form
//         className="bg-slate-300 rounded-lg shadow-custom-shadow p-8 md:p-16 w-[100%]"
//         onSubmit={handleSubmit}
//       >
//         <h1 className="text-3xl font-bold text-center md:text-left">Login</h1>
//         <div className="flex flex-row-reverse mb-8 text-sm">
//           <div className="w-1/2 hidden lg:flex items-center justify-center">
//             <img src={SoleStyle} alt="" className="w-3/4" />
//           </div>
//           <div className="w-full lg:w-1/2 ">
//             <div className="flex flex-col w-full gap-2 mt-4  ">
//               <label htmlFor="email" className="text-lg font-bold opacity-70">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 id="inputEmail"
//                 placeholder="Enter Your Email"
//                 className=" h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid "
//                 required
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//               />
//               {valid ? (
//                 <></>
//               ) : (
//                 <span className="text-red-600">{errors.email}</span>
//               )}
//             </div>
//             <div className="flex flex-col w-full gap-2 mt-4  ">
//               <label
//                 htmlFor="password"
//                 className="text-lg font-bold opacity-70"
//               >
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 id="inputPassword"
//                 placeholder="Enter Your Password"
//                 className=" h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid "
//                 required
//                 onChange={(e) =>
//                   setFormData({ ...formData, password: e.target.value })
//                 }
//               />
//               {valid ? (
//                 <></>
//               ) : (
//                 <span className="text-red-600">{errors.password}</span>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
//           <button className="bg-slate-200 text-base md:text-lg w-3/4 lg:w-1/2 p-2 rounded-full lg:hover:bg-slate-600 lg:hover:text-white transition-all ease-in-out duration-1000">
//             Login
//           </button>
//           <p className="mt-2 text-center">
//             Not a Member?{" "}
//             <Link to="/register">
//               <span className="text-blue-800 hover:cursor-pointer">
//                 Register{" "}
//               </span>
//             </Link>
//             Here
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;

import { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SoleStyle from "../../assets/SoleStyle.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ProductContext } from "../../components/Context/Product";
import Swal from "sweetalert2";

// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const { users, handleLogin } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    const user = users.find((user) => user.email === values.email);

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Email not found",
        text: "Please register or check your email",
      });
    } else if (user.password === values.password) {
      Swal.fire({
        icon: "success",
        title : "Login Successful",
        text: `Redirecting to SOLESTYLE...`,
        timer: 1000,
        timerProgressBar: false,
        showConfirmButton: false,
      }).then(() => {
        handleLogin(user.id); // Call handleLogin from context

        // Update user's login status
        axios
          .patch(`http://localhost:8000/users/${user.id}`, {
            isLoggedIn: true,
          })
          .then(() => {
            console.log("User login status updated to true");

            if (user.isAdmin) {
              // Navigate to the admin dashboard and prevent back navigation
              navigate("/admin", { replace: true });
            } else {
              // Navigate to the home page for regular users
              navigate("/", { replace: true });
            }
          })
          .catch((err) => {
            console.log("Error updating login status:", err);
            Swal.fire("Failed to update login status", "Please try again", "error");
          });

        // Store user info in localStorage
        localStorage.setItem("id", user.id);
        localStorage.setItem("name", user.fullName);
        localStorage.setItem("email", user.email);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Wrong Password",
        text: "Please check your password and try again",
      });
      setSubmitting(false);
    }
  };

  return (
    <div className="h-[100vh] p-4 sm:p-20 flex items-center">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-slate-300 rounded-lg shadow-custom-shadow p-8 md:p-16 w-[100%]">
            <h1 className="text-3xl font-bold text-center md:text-left">Login</h1>
            <div className="flex flex-row-reverse mb-8 text-sm">
              <div className="w-1/2 hidden lg:flex items-center justify-center">
                <img src={SoleStyle} alt="" className="w-3/4" />
              </div>
              <div className="w-full lg:w-1/2">
                <div className="flex flex-col w-full gap-2 mt-4">
                  <label htmlFor="email" className="text-lg font-bold opacity-70">
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
                  <label htmlFor="password" className="text-lg font-bold opacity-70">
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
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-slate-200 text-base md:text-lg w-3/4 lg:w-1/2 p-2 rounded-full lg:hover:bg-slate-600 lg:hover:text-white transition-all ease-in-out duration-1000"
              >
                {isSubmitting ? "Logging in..." : "Login"}
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
