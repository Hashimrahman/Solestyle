import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../../components/Context/Product';

const EditProductForm = () => {
  const { id } = useParams();
  const { products,handleProductUpdate } = useContext(ProductContext);

  const [currentProduct, setCurrentProduct] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const search = products.find((item) => item.id == id);
    if (search) {
      setCurrentProduct(search);
    } else {
      console.warn(`Product with id ${id} not found.`);
    }
    setLoading(false); // Set loading to false after search
  }, [products, id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (currentProduct) {
      handleProductUpdate(e, currentProduct); // Call the update handler with current product
    }
  };


  // Show loading or form based on state
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
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={currentProduct.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter product name"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Category</label>
          <select
            name="category"
            value={currentProduct.category}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={currentProduct.price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter price"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={currentProduct.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter product description"
          />
        </div>

        {/* Sizes */}
        {/* <div>
          <label className="block text-gray-700 font-medium mb-2">Available Sizes</label>
          <input
            type="text"
            name="sizes"
            value={currentProduct.sizes.join(', ')}
            onChange={(e) =>
              setCurrentProduct((prevProduct) => ({
                ...prevProduct,
                sizes: e.target.value.split(',').map(Number),
              }))
            } 
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter sizes separated by commas (e.g. 8,9,10)"
          />
        </div> */}

        {/* Brand */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Brand</label>
          <input
            type="text"
            name="brand"
            value={currentProduct.brand}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter brand name"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Image URL</label>
          <input
            type="text"
            name="image"
            value={currentProduct.image}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter image URL"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Stock</label>
          <input
            type="number"
            name="stock"
            value={currentProduct.stock}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter stock quantity"
          />
        </div>

        {/* Trending */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="trending"
            checked={currentProduct.trending}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label className="text-gray-700 font-medium">Trending Product</label>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={currentProduct.quantity}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter quantity"
          />
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
