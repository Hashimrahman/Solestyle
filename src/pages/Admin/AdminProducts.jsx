import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../components/Context/Product";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const apiUrl2 = import.meta.env.VITE_API_URL;

const Products = () => {
  const { products, fetchProducts } = useContext(ProductContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    category: Yup.string().required("Category is required"),
    price: Yup.number()
      .positive("Price must be greater than zero")
      .required("Price is required"),
    description: Yup.string().required("Description is required"),
    sizes: Yup.string().required("Sizes are required (e.g., S, M, L)"),
    brand: Yup.string().required("Brand is required"),
    stock: Yup.number()
      .integer("Stock must be an integer")
      .min(0, "Stock cannot be negative")
      .required("Stock is required"),
    trending: Yup.string().required("Please select if the product is trending"),
    image: Yup.mixed().nullable().required("Product image is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "sizes") {
        formData.append(key, JSON.stringify(value.split(",")));
      } else {
        formData.append(key, value);
      }
    });
    formData.append("trending", values.trending === "true");

    try {
      const response = await axios.post(`${apiUrl2}/products/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Product added successfully:", response.data);
      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("Hi");
      const res = await axios.delete(`${apiUrl2}/products/${id}/`,
        {
          headers:{
            Authorization : `Bearer ${token}`
          }
        }
      )
      console.log(res.data);
      
      
    }
    catch(err){
      console.error("Error in deleting",err);
      
    }
    const updatedProducts = filteredProducts.filter((item) => item.id !== id);
    setFilteredProducts(updatedProducts);
    setProductsList(updatedProducts);

  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div>
          <h2 className="text-2xl font-bold mb-6">Products</h2>

          {/* Add New Product Form */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Add New Product</h3>
            <Formik
              initialValues={{
                name: "",
                category: "",
                price: "",
                description: "",
                sizes: "",
                brand: "",
                stock: "",
                trending: false,
                image: null,
                // quantity: 1,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, setFieldValue }) => (
                <Form encType="multipart/form-data">
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
                      as="select"
                      id="category"
                      name="category"
                      className="border border-gray-300 rounded p-2 mb-2 w-full"
                    >
                      <option value="">Select Category</option>
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                      <option value="kids">Kids</option>
                    </Field>
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
                      name="sizes"
                      placeholder="Sizes"
                      className="border border-gray-300 rounded p-2 mb-2 w-full"
                    />
                    <ErrorMessage
                      name="sizes"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="mb-2">
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={(e) =>
                        setFieldValue("image", e.currentTarget.files[0])
                      }
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
                      value="true"
                      checked={values.trending === "true"}
                      onChange={() =>
                        handleChange({
                          target: { name: "trending", value: "true" },
                        })
                      }
                    />
                    <label>Yes</label>
                    <Field
                      type="radio"
                      name="trending"
                      value="false"
                      checked={values.trending === "false"}
                      onChange={() =>
                        handleChange({
                          target: { name: "trending", value: "false" },
                        })
                      }
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

          {/* Products Table */}
          <table className="min-w-full bg-white border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Image</th>
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
                    <td className="border border-gray-300 px-4 py-2 flex items-center justify-center">
                      <img src={product.image.replace("https%3A/solestylebucket.s3.ap-south-1.amazonaws.com/", "")} alt="" className="w-12 h-12 rounded-md" />
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
