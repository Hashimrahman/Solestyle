// import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#383838] text-white p-8  mt-10 h-52 flex">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold">SoleStyle</h2>
          <p className="mt-2">Step into style with the best shoes in the market!</p>
        </div>

        <div className="flex space-x-6">
          <a href="#" className="hover:text-[#fb923c]">Home</a>
          <a href="#" className="hover:text-[#fb923c]">Shop</a>
          <a href="#" className="hover:text-[#fb923c]">About Us</a>
          <a href="#" className="hover:text-[#fb923c]">Contact</a>
        </div>

        <div className="text-center md:text-right">
          <p>&copy; 2024 SoleStyle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
