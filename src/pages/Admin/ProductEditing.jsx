import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../../components/Context/Product";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const EditProductForm = () => {
  const { id } = useParams();
  const { products,setProducts } = useContext(ProductContext);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCurrentProduct = async () => {
      try {
        const res = await axios.get(`${apiUrl}/products/${id}/`);
        setCurrentProduct(res.data);
      } catch (err) {
        console.error("Error in fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentProduct();
  }, [id]);

  const handleProductUpdate = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    
    Object.entries(currentProduct).forEach(([key, value]) => {
      // if(key === "sizes"){
      //   console.log("size type",typeof JSON.stringify(value))
      // }
      if (key === "image" && value instanceof File) {
        formData.append(key, value);
      }
      else if (key === "sizes") {
        try {
          const sizesValue = typeof value == "string" ? JSON.stringify(value.split(",").map(size => size.trim())) : JSON.stringify(currentProduct.sizes.map(size => size));
          console.log("size to upload",sizesValue);
          formData.append(key, sizesValue);
        } catch (error) {
          console.error("Invalid sizes format:", error);
        }
      }
            
      else {
        formData.append(key, value);
      }
    });
  
    formData.append("trending", currentProduct.trending === "true");
  
    try {
      const response = await axios.put(
        `${apiUrl}/products/${currentProduct.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Update products list after successful update
      const updatedProducts = products.map((product) =>
        product.id === currentProduct.id ? response.data : product
      );
      setProducts(updatedProducts);
      console.log("Updated Product:", response.data);
      navigate("/admin");
    } catch (error) {
      console.log("size to upload", currentProduct.sizes)
      console.error("Error updating product:", error);
    }
  };
  
  

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setCurrentProduct((prevProduct) => ({
      ...prevProduct,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentProduct) {
      handleProductUpdate(e, currentProduct);
    }
  };

  if (loading) {
    return <div className="text-center">Loading product details...</div>;
  }

  if (!currentProduct) {
    return <div className="text-center">Product not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={currentProduct.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <select
            name="category"
            value={currentProduct.category}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={currentProduct.price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={currentProduct.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Sizes (e.g., S, M, L)
          </label>
          <input
            type="text"
            name="sizes"
            value={currentProduct.sizes}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Brand</label>
          <input
            type="text"
            name="brand"
            value={currentProduct.brand}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Stock</label>
          <input
            type="number"
            name="stock"
            value={currentProduct.stock}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="text-gray-700 font-medium">Trending:</label>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="trending"
              value={true}
              checked={currentProduct.trending === "true"}
              onChange={handleInputChange}
            />
            <label>Yes</label>
            <input
              type="radio"
              name="trending"
              value={false}
              checked={currentProduct.trending === "false"}
              onChange={handleInputChange}
            />
            <label>No</label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductForm;
