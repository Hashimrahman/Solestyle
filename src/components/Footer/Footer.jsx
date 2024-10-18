// // import React from "react";

// const Footer = () => {
//   return (
//     <footer className="bg-[#383838] text-white p-8  mt-10 h-52 flex">
//       <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//         <div className="text-center md:text-left">
//           <h2 className="text-2xl font-semibold">SoleStyle</h2>
//           <p className="mt-2">Step into style with the best shoes in the market!</p>
//         </div>

//         <div className="flex space-x-6">
//           <a href="#" className="hover:text-[#fb923c]">Home</a>
//           <a href="#" className="hover:text-[#fb923c]">Shop</a>
//           <a href="#" className="hover:text-[#fb923c]">About Us</a>
//           <a href="#" className="hover:text-[#fb923c]">Contact</a>
//         </div>

//         <div className="text-center md:text-right">
//           <p>&copy; 2024 SoleStyle. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// import React from "react";
// import logo from "../../assets/SoleStyle4.png";

// const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-r from-[#cfcfcf] to-[#777777] text-white py-12 px-6 md:px-20 mt-10">
//       <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-black">
//         {/* Brand Section */}
//         <div className="text-center md:text-left">
//           <img
//             src={logo}
//             alt="SoleStyle Logo"
//             className="h-16 mx-auto md:mx-0 mb-4"
//           />
//           {/* <h2 className="text-3xl font-bold">SoleStyle</h2> */}
//           <p className="mt-4 text-sm">
//             Step into style with the best shoes in the market!
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div className="flex justify-between w-full">
//           <div className="text-left">
//             <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li>
//                 <a
//                   href="#"
//                   className="hover:text-[#fb923c] transition duration-300 ease-in-out"
//                 >
//                   Home
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="hover:text-[#fb923c] transition duration-300 ease-in-out"
//                 >
//                   Shop
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="hover:text-[#fb923c] transition duration-300 ease-in-out"
//                 >
//                   About Us
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="hover:text-[#fb923c] transition duration-300 ease-in-out"
//                 >
//                   Contact
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Customer Service */}
//           <div className="text-center md:text-left">
//             <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
//             <ul className="space-y-2">
//               <li>
//                 <a
//                   href="#"
//                   className="hover:text-[#fb923c] transition duration-300 ease-in-out"
//                 >
//                   FAQs
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="hover:text-[#fb923c] transition duration-300 ease-in-out"
//                 >
//                   Shipping & Returns
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="hover:text-[#fb923c] transition duration-300 ease-in-out"
//                 >
//                   Order Tracking
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="hover:text-[#fb923c] transition duration-300 ease-in-out"
//                 >
//                   Privacy Policy
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Newsletter Signup */}
//         <div className="text-center md:text-left">
//           <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
//           <p className="text-sm mb-4">
//             Subscribe to our newsletter for the latest updates and offers!
//           </p>
//           <form className="flex flex-col md:flex-row">
//             <input
//               type="email"
//               placeholder="Your email"
//               className="p-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fb923c] focus:border-transparent mb-2 md:mb-0"
//               required
//             />
//             <button
//               type="submit"
//               className="bg-[#fb923c] text-white p-2 rounded-r-md hover:bg-[#e78f29] transition duration-300 ease-in-out"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Copyright Section */}
//       <div className="text-center mt-12">
//         <p className="text-sm">&copy; 2024 SoleStyle. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
// import React from "react";
import logo from "../../assets/SoleStyle4.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#cfcfcf] to-[#777777] text-white py-12 px-6 md:px-20 mt-10">
      <div className="container flex flex-col md:flex-row justify-between  w-full">
        
        {/* Brand Section */}
        <div className="text-center md:text-left mb-8 md:mb-0 ">
          <img
            src={logo}
            alt="SoleStyle Logo"
            className="h-16 mx-auto md:mx-0 mb-4"
          />
          {/* <h2 className="text-3xl font-bold">SoleStyle</h2> */}
          <p className="mt-4 text-sm">
            Step into style with the best shoes in the market!
          </p>
        </div>

        {/* Links Section */}
        <div className="flex justify-between gap-8 text-left mb-8 md:mb-0 ">
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-[#fb923c] transition duration-300 ease-in-out"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#fb923c] transition duration-300 ease-in-out"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#fb923c] transition duration-300 ease-in-out"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#fb923c] transition duration-300 ease-in-out"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="ml-8">
            <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-[#fb923c] transition duration-300 ease-in-out"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#fb923c] transition duration-300 ease-in-out"
                >
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#fb923c] transition duration-300 ease-in-out"
                >
                  Order Tracking
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#fb923c] transition duration-300 ease-in-out"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="text-center md:text-left ">
          <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
          <p className="text-sm mb-4">
            Subscribe to our newsletter for the latest updates and offers!
          </p>
          <form className="flex flex-col md:flex-row">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fb923c] focus:border-transparent mb-2 md:mb-0 text-black"
              required
            />
            <button
              type="submit"
              className="bg-[#fb923c] text-white p-2 rounded-r-md hover:bg-[#e78f29] transition duration-300 ease-in-out"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-12">
        <p className="text-sm">&copy; 2024 SoleStyle. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

