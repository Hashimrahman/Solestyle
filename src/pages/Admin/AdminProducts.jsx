// import React, { useContext, useEffect, useState } from "react";
// import { ProductContext } from "../../components/Context/Product";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const Products = () => {
//   const { products } = useContext(ProductContext);
//   const navigate = useNavigate();

//   const [productsList, setProductsList] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [category, setCategory] = useState("");
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     category: "",
//     price: "",
//     description: "",
//     // sizes: [],
//     brand: "",
//     image: "",
//     stock: "",
//     trending: true,
//     quantity: 1,
//   });
//   useEffect(() => {
//     if (products && products.length > 0) {
//       setProductsList(products);
//       setFilteredProducts(products); // This will display all products initially
//     }
//   }, [products]);

//   const handleDrpodown = (e) => {
//     const selectedCategory = e.target.value;
//     setCategory(selectedCategory);

//     if (selectedCategory === "all") {
//       setFilteredProducts(productsList);
//     } else {
//       const filtered = productsList.filter(
//         (item) =>
//           item.category.toLowerCase().trim() ===
//           selectedCategory.toLowerCase().trim()
//       );
//       setFilteredProducts(filtered);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewProduct((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleAddProduct = async (e) => {
//     e.preventDefault();
  
//     if (!newProduct.name || !newProduct.price || !newProduct.category) {
//       alert("Please fill in all required fields");
//       return;
//     }
  
//     // Set the ID for the new product
//     const newProductWithId = { ...newProduct, id: `${productsList.length + 1}` };
  
//     try {
//       const response = await axios.post("http://localhost:8000/products", newProductWithId);
//       const addedProduct = response.data;
  
//       setProductsList((prevProductsList) => [...prevProductsList, addedProduct]);
//       setFilteredProducts((prevFilteredProducts) => [...prevFilteredProducts, addedProduct]);
  
//       // Reset the form after successful addition
//       setNewProduct({
//         name: "",
//         price: "",
//         category: "",
//         description: "",
//         brand: "",
//         image: "",
//         stock: "",
//         trending: true,
//         quantity: 1,
//       });
  
//       console.log("Product successfully added:", addedProduct);
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };
  

//   const handleDelete = (id) => {
//     // Remove the product from the state immediately
//     const updatedProducts = filteredProducts.filter((item) => item.id !== id);
//     setFilteredProducts(updatedProducts);
//     setProductsList(updatedProducts);
  
//     // Then make the delete request to the server
//     axios.delete(`http://localhost:8000/products/${id}`)
//       .then((response) => {
//         console.log('Product deleted successfully', response);
//       })
//       .catch((error) => {
//         console.error('Error deleting the product:', error);
//       });
//   };
  
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <div>
//           <h2 className="text-2xl font-bold mb-6">Products</h2>
//           {/* Category Dropdown */}
//           <label className="block mb-2">Select Category:</label>
//           <div className="mb-4 flex gap-4">
//             <select
//               className="border border-gray-300 rounded p-2"
//               name="category"
//               onChange={handleDrpodown}
//               value={category}
//             >
//               <option value="all">Select a category</option>
//               <option value="all">All</option>
//               <option value="Men">Men</option>
//               <option value="Women">Women</option>
//               <option value="Kids">Kids</option>
//             </select>
//             {/* <input
//               type="text"
//               placeholder="Search Products"
//               className="px-4 w-full border border-gray-300"
//             /> */}
//           </div>

//           <div className="mb-4">
//             <h3 className="text-lg font-semibold">Add New Product</h3>
//             <form onSubmit={handleAddProduct}>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Product Name"
//                 value={newProduct.name}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 rounded p-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 name="price"
//                 placeholder="Price"
//                 value={newProduct.price}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 rounded p-2 mb-2 w-full"
//               />
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 value={newProduct.description}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 rounded p-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 name="brand"
//                 placeholder="Brand"
//                 value={newProduct.brand}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 rounded p-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 name="category"
//                 placeholder="Category"
//                 value={newProduct.category}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 rounded p-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 name="image"
//                 placeholder="Image URL"
//                 value={newProduct.image}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 rounded p-2 mb-2 w-full"
//               />
//               <input
//                 type="text"
//                 name="stock"
//                 placeholder="Stock"
//                 value={newProduct.stock}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 rounded p-2 mb-2 w-full"
//               />
//               <div className="flex items-center mb-2 gap-2">
//                 <h1>Trending</h1>
//                 <input
//                   type="radio"
//                   id="trendingYes"
//                   name="trending"
//                   className="scale-125"
//                   value={true}
//                   checked={newProduct.trending === true}
//                   onChange={() =>
//                     setNewProduct({ ...newProduct, trending: true })
//                   }
//                 />
//                 <label htmlFor="trendingNo">Yes</label>
//                 <input
//                   type="radio"
//                   name="trending"
//                   className="scale-125"
//                   value={false}
//                   checked={newProduct.trending === false}
//                   onChange={() =>
//                     setNewProduct({ ...newProduct, trending: false })
//                   }
//                 />
//                 <label htmlFor="">No</label>
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white rounded p-2"
//               >
//                 Add Product
//               </button>
//             </form>
//           </div>

//           {/* Products Table */}
//           <table className="min-w-full bg-white border border-gray-300 mt-4">
//             <thead>
//               <tr>
//                 <th className="border border-gray-300 px-4 py-2">ID</th>
//                 <th className="border border-gray-300 px-4 py-2">Name</th>
//                 <th className="border border-gray-300 px-4 py-2">Category</th>
//                 <th className="border border-gray-300 px-4 py-2">Price</th>
//                 <th className="border border-gray-300 px-4 py-2">Stock</th>
//                 <th className="border border-gray-300 px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProducts.length > 0 ? (
//                 filteredProducts.map((product) => (
//                   <tr key={product.id}>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {product.id}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {product.name}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {product.category}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {product.price}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {product.stock}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       <button
//                         className="text-blue-500 hover:underline"
//                         onClick={() => navigate(`/product/edit/${product.id}`)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="text-red-500 hover:underline ml-2"
//                         onClick={() => handleDelete(product.id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <p>No products Found for this</p>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Products;

import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../components/Context/Product";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Products = () => {
  const { products } = useContext(ProductContext);
  const navigate = useNavigate();

  const [productsList, setProductsList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (products && products.length > 0) {
      setProductsList(products);
      setFilteredProducts(products); // This will display all products initially
    }
  }, [products]);

  const handleDropdown = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (selectedCategory === "all") {
      setFilteredProducts(productsList);
    } else {
      const filtered = productsList.filter(
        (item) =>
          item.category.toLowerCase().trim() ===
          selectedCategory.toLowerCase().trim()
      );
      setFilteredProducts(filtered);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    brand: Yup.string().required("Brand is required"),
    image: Yup.string().required("Image URL is required"),
    stock: Yup.number()
      .typeError("Stock must be a number")
      .required("Stock is required"),
  });

  const handleAddProduct = async (values, { resetForm }) => {
    const newProductWithId = { ...values, id: `${productsList.length + 1}` };

    try {
      const response = await axios.post(
        "http://localhost:8000/products",
        newProductWithId
      );
      const addedProduct = response.data;

      setProductsList((prevProductsList) => [...prevProductsList, addedProduct]);
      setFilteredProducts((prevFilteredProducts) => [...prevFilteredProducts, addedProduct]);

      resetForm();
      console.log("Product successfully added:", addedProduct);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDelete = (id) => {
    const updatedProducts = filteredProducts.filter((item) => item.id !== id);
    setFilteredProducts(updatedProducts);
    setProductsList(updatedProducts);

    axios.delete(`http://localhost:8000/products/${id}`)
      .then((response) => {
        console.log("Product deleted successfully", response);
      })
      .catch((error) => {
        console.error("Error deleting the product:", error);
      });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div>
          <h2 className="text-2xl font-bold mb-6">Products</h2>
          {/* Category Dropdown */}
          <label className="block mb-2">Select Category:</label>
          <div className="mb-4 flex gap-4">
            <select
              className="border border-gray-300 rounded p-2"
              name="category"
              onChange={handleDropdown}
              value={category}
            >
              <option value="all">Select a category</option>
              <option value="all">All</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          {/* Add New Product Form */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Add New Product</h3>
            <Formik
              initialValues={{
                name: "",
                price: "",
                category: "",
                description: "",
                brand: "",
                image: "",
                stock: "",
                trending: true,
                quantity: 1,
              }}
              validationSchema={validationSchema}
              onSubmit={handleAddProduct}
            >
              {({ values, handleChange }) => (
                <Form>
                  <div className="mb-2">
                    <Field
                      type="text"
                      name="name"
                      placeholder="Product Name"
                      className="border border-gray-300 rounded p-2 mb-2 w-full"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-2">
                    <Field
                      type="text"
                      name="price"
                      placeholder="Price"
                      className="border border-gray-300 rounded p-2 mb-2 w-full"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-2">
                    <Field
                      type="text"
                      name="category"
                      placeholder="Category"
                      className="border border-gray-300 rounded p-2 mb-2 w-full"
                    />
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-2">
                    <Field
                      as="textarea"
                      name="description"
                      placeholder="Description"
                      className="border border-gray-300 rounded p-2 mb-2 w-full"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-2">
                    <Field
                      type="text"
                      name="brand"
                      placeholder="Brand"
                      className="border border-gray-300 rounded p-2 mb-2 w-full"
                    />
                    <ErrorMessage
                      name="brand"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-2">
                    <Field
                      type="text"
                      name="image"
                      placeholder="Image URL"
                      className="border border-gray-300 rounded p-2 mb-2 w-full"
                    />
                    <ErrorMessage
                      name="image"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-2">
                    <Field
                      type="text"
                      name="stock"
                      placeholder="Stock"
                      className="border border-gray-300 rounded p-2 mb-2 w-full"
                    />
                    <ErrorMessage
                      name="stock"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="flex items-center mb-2 gap-2">
                    <label>Trending:</label>
                    <Field
                      type="radio"
                      name="trending"
                      value={true}
                      checked={values.trending === true}
                      onChange={() => handleChange({ target: { name: 'trending', value: true } })}
                    />
                    <label>Yes</label>
                    <Field
                      type="radio"
                      name="trending"
                      value={false}
                      checked={values.trending === false}
                      onChange={() => handleChange({ target: { name: 'trending', value: false } })}
                    />
                    <label>No</label>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded p-2"
                  >
                    Add Product
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          {/* Products Table */}
          <table className="min-w-full bg-white border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Stock</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.category}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.price}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.stock}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => navigate(`/product/edit/${product.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:underline ml-2"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <p>No products found</p>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Products;
