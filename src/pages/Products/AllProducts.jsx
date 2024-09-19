// import Navbar from "../../components/Navbar/Navbar";
// import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ProductContext } from "../../components/Context/Product";

// const AllProducts = () => {
//   const navigate = useNavigate();
//   const { products } = useContext(ProductContext); 
//   const [isLoaded, setIsLoaded] = useState(false);

//   return (
//     <>
//       <Navbar />
//       <div className="mt-20 text-center relative">
//         <h1 className="text-3xl font-bold">Explore SoleStyle</h1>
//         <div className="flex flex-wrap mt-8 items-center justify-center">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="w-full sm:w-1/2 lg:w-1/4 h-auto p-4 flex items-center justify-center transition-all ease-in-out duration-500"
//             >
//               <div className="relative group border-[2px] p-4 w-full text-left rounded-md ">
//                 <div className="w-full h-[22rem] flex flex-col items-center justify-center overflow-hidden rounded-lg object-contain">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-full hover:scale-105 transition-all ease-in-out duration-200 cursor-pointer "
//                   />
//                 </div>
                
//                 <h3 className="opacity-60 uppercase">{product.brand}</h3>
//                 <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
//                 <p className="text-md font-medium text-gray-700">
//                   ${product.price}
//                 </p>
//                 <div className="flex justify-center">
//                   <button
//                     className="bg-secondary/60 my-4 px-6 py-2 rounded-3xl hover:scale-105 hover:bg-primary/60 transition-all ease-in-out duration-500"
//                     onClick={() => navigate(`/product/${product.id}`)}
//                   >
//                     View Product
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AllProducts;

import Navbar from "../../components/Navbar/Navbar";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../components/Context/Product";

const AllProducts = () => {
  const navigate = useNavigate();
  const { products } = useContext(ProductContext); // Get products from context

  return (
    <>
      <Navbar />
      <div className="mt-20 text-center relative">
        <h1 className="text-3xl font-bold">Explore SoleStyle</h1>
        <div className="flex flex-wrap mt-8 items-center justify-center">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full sm:w-1/2 lg:w-1/4 h-auto p-4 flex items-center justify-center transition-all ease-in-out duration-500"
            >
              <ProductCard product={product} navigate={navigate} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const ProductCard = ({ product, navigate }) => {
  const [isLoaded, setIsLoaded] = useState(false); // State to track image load

  return (
    <div className="relative group border-[2px] p-4 w-full text-left rounded-md">
      <div className="w-full h-[22rem] flex flex-col items-center justify-center overflow-hidden rounded-lg object-contain relative">
        {/* Show skeleton animation while the image is loading */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            {/* Optional Spinner or Animated Icon */}
            <div className="w-12 h-12 border-4 border-t-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-500 ease-in-out transform ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          loading="lazy" // Lazy load the image
          onLoad={() => setIsLoaded(true)} // Set image as loaded
        />
      </div>
      <h3 className="opacity-60 uppercase">{product.brand}</h3>
      <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
      <p className="text-md font-medium text-gray-700">${product.price}</p>
      <div className="flex justify-center">
        <button
          className="bg-secondary/60 my-4 px-6 py-2 rounded-3xl hover:scale-105 hover:bg-primary/60 transition-all ease-in-out duration-500"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          View Product
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
