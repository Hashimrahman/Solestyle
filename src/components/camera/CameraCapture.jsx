// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// // import Footer from "./Folder/Footer";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// const ProductDetails = () => {
//   const { id } = useParams(); 
//   const navigate = useNavigate(); 

//   const [productDetails, setProductDetails] = useState(null);
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("http://localhost:5004/products");
//         const product = response.data.find((product) => product.id === parseInt(id));
//         setProductDetails(product);
//         console.log(product,"hujgbu");
        
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductDetails();
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!productDetails) {
//     return (
//       <div className="p-4 text-center">
//         <h2 className="text-2xl font-bold">Product not found!</h2>
//       </div>
//     );
//   }


//   const handleAddToCart = async (product) => {
//     const userId = 1; 
  
//     try {
     
//       const userResponse = await axios.get(`http://localhost:5004/users/${userId}`);
//       const userData = userResponse.data;
  
//       if (!userData) {
//         toast.error("User not found!");
//         return;
//       }
  
      
//       const existingProduct = userData.cart.some((item) => item.id === product.id);
  
//       if (existingProduct) {
//         toast.warning("Product is already in the cart");
//         return;
//       }
  
      
//       const updatedCart = [...userData.cart, product];
//       await axios.patch(`http://localhost:5004/users/${userId}`, { cart: updatedCart });
  
//       toast.success("Product added successfully");
//       navigate("/cart");
//     } catch (error) {
//       console.error("Error occurred while adding the product:", error);
//       toast.error("Failed to add product to the cart");
//     }
//   };
  
//   return (
//     <div>
//       <div className="container flex flex-col md:flex-row gap-8 mt-4">
//         <div className="flex-1">
//           <img
//             src={productDetails.image || "/default-image.jpg"}
//             alt={productDetails.name || "Product"}
//             className="w-[500px] h-auto object-cover rounded-lg shadow-xl mb-7"
//           />
//         </div>

//         <div className="flex-1">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">
//             {productDetails.name}
//           </h1>
//           <p className="text-gray-600 dark:text-gray-300 mb-4">
//             {productDetails.description}
//           </p>
//           <p className="text-xl font-semibold text-green-600 mb-4">
//             ${productDetails.price}
//           </p>

//           <div className="flex items-center gap-2 mb-6">
//             <span className="text-yellow-400 text-lg">★</span>
//             <span className="text-gray-500">{productDetails.rating}</span>
//           </div>

//           <div className="flex gap-4 mb-4">
//             <button
//               className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600"
//               onClick={() => handleAddToCart(productDetails)}
//             >
//               Add to Cart
//             </button>

//             {/* <button
//               className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-gray-600"
//               onClick={handleAddToWishlist}
//             >
//               Add to Wishlist
//             </button> */}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default ProductDetails;
// // import React, { useRef, useState } from "react";

// // const CameraCapture = () => {
// //   const [image, setImage] = useState(null);
// //   const videoRef = useRef(null);
// //   const canvasRef = useRef(null);

// //   // Access the camera
// //   const startCamera = () => {
// //     navigator.mediaDevices
// //       .getUserMedia({ video: true })
// //       .then((stream) => {
// //         videoRef.current.srcObject = stream;
// //       })
// //       .catch((err) => {
// //         console.error("Error accessing camera: " + err);
// //       });
// //   };

// //   // Capture the photo
// //   const capturePhoto = () => {
// //     const canvas = canvasRef.current;
// //     const context = canvas.getContext("2d");
// //     const video = videoRef.current;
// //     context.drawImage(video, 0, 0, canvas.width, canvas.height);

// //     // Get the image data from canvas and store it in the state
// //     const capturedImage = canvas.toDataURL("image/png");
// //     setImage(capturedImage);
// //   };

// //   // Start camera on component mount
// //   React.useEffect(() => {
// //     startCamera();
// //     return () => {
// //       // Cleanup the stream when the component unmounts
// //       const stream = videoRef.current?.srcObject;
// //       const tracks = stream?.getTracks();
// //       tracks?.forEach((track) => track.stop());
// //     };
// //   }, []);

// //   return (
// //     <div>
// //       <video ref={videoRef} width="300" height="200" autoPlay />
// //       <button onClick={capturePhoto}>Take Photo</button>
// //       {image && (
// //         <div>
// //           <h3>Captured Image:</h3>
// //           <div className="border-red-300 border-2">
            
// //           <img src={image} alt="Captured" width="300" />
// //           </div>
// //         </div>
// //       )}
// //       <canvas
// //         ref={canvasRef}
// //         width="300"
// //         height="200"
// //         style={{ display: "none" }}
// //       />
// //     </div>
// //   );
// // };

// // export default CameraCapture;
