import React, { useContext, useState } from "react";
import { ProductContext } from "../../components/Context/Product";
const Products = () => {
  // Sample product data
  const { products } = useContext(ProductContext);

  // const [activeTab, setActiveTab] = useState("dashboard");
  const [productsList, setProductsList] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [category, setCategory] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    sizes: [],
    brand: "",
    image: "",
    stock: "",
    trending: false,
    quantity: "",
  });

  const handleDrpodown = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (selectedCategory === "all") {
      setFilteredProducts(productsList);
    } else {
      const filtered = productsList.filter(
        (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleAddProduct = (e) => {
  //   e.preventDefault();
  //   setProductsList((prev) => [
  //     ...prev,
  //     { ...newProduct, id: `${prev.length + 1}` },
  //   ]);
  //   setNewProduct({
  //     name: "",
  //     category: "",
  //     price: "",
  //     description: "",
  //     sizes: [],
  //     brand: "",
  //     image: "",
  //     stock: "",
  //     trending: false,
  //     quantity: "",
  //   });
  //   console.log("Product Added:", newProduct);
  //   alert("item added")
  // };
  const handleAddProduct = async (e) => {
    e.preventDefault(); // Prevent the page from reloading
  
    // Basic validation
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert("Please fill in all required fields");
      return;
    }

    setNewProduct({ ...newProduct, id: `${products.length + 1}` })
  
    // Send a POST request to the server to add the new product
    try {
      const response = await fetch("http://localhost:8000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
  
      const addedProduct = await response.json();
  
      // Update the local product list (optional)
      setProductsList((prev) => [...prev, addedProduct]);
  
      // Reset the form fields after a successful submission
      setNewProduct({
        name: "",
        price: "",
        description: "",
        brand: "",
        category: "",
        image: "",
        stock: "",
      });
  
      console.log("Product successfully added:", addedProduct);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div>
          <h2 className="text-2xl font-bold mb-6">Products</h2>
          {/* Category Dropdown */}
          <div className="mb-4">
            <label className="block mb-2">Select Category:</label>
            <select
              className="border border-gray-300 rounded p-2"
              name="category"
              onChange={handleDrpodown}
              value={category}
            >
              <option value="all">Select a category</option>
              <option value="all">All</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Add New Product</h3>
            <form onSubmit={handleAddProduct}>
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 mb-2 w-full"
              />
              <input
                type="text"
                name="price"
                placeholder="Price"
                value={newProduct.price}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 mb-2 w-full"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={newProduct.description}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 mb-2 w-full"
              />
              <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={newProduct.brand}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 mb-2 w-full"
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={newProduct.category}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 mb-2 w-full"
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={newProduct.image}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 mb-2 w-full"
              />
              <input
                type="text"
                name="stock"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 mb-2 w-full"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded p-2"
              >
                Add Product
              </button>
            </form>
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
                      <button className="text-blue-500 hover:underline">
                        Edit
                      </button>
                      <button className="text-red-500 hover:underline ml-2">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <p>No products Found for this</p>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Products;
