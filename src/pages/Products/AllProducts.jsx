import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../../components/Context/Product";
import Footer from "../../components/Footer/Footer";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import axios from "axios";

const AllProducts = () => {
  const navigate = useNavigate();
  const { products, totalPages, setCurrentPage, currentPage } = useContext(
    ProductContext
  );
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);
  const [categorizedProduct, setCategorizedProduct] = useState([]);

  const [men, setMen] = useState([]);
  const [women, setWomen] = useState([]);
  const [kids, setKids] = useState([]);

  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // log


  


  useEffect(() => {
    if (products.length > 0) {
      setCategorizedProduct(products);
      setSearchProducts(products);
      const FilteredMen = products.filter(
        (product) => product.category === "men"
      );
      setMen(FilteredMen);
      const FilteredWomen = products.filter(
        (product) => product.category === "women"
      );
      setWomen(FilteredWomen);
      const FilteredKids = products.filter(
        (product) => product.category === "kids"
      );
      setKids(FilteredKids);
    }
  }, [products]);

  const handleCategory = (category, productList) => {
    setActiveCategory(category);
    setCategorizedProduct(productList);
  };

  useEffect(() => {
    if (search) {
      const filtered = categorizedProduct.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setSearchProducts(filtered);
    } else {
      setSearchProducts(categorizedProduct);
    }
  }, [search, categorizedProduct]);
  
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="loader">
          <div>
            <div className="load-inner load-one"></div>
            <div className="load-inner load-two"></div>
            <div className="load-inner load-three"></div>
            <span className="text text-xl font-bold text-secondary z-50">
              SoleStyle
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-20 text-center relative">
        <h1 className="text-3xl font-bold">Explore SoleStyle</h1>
        <div className="my-6">
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-2 w-2/3 sm:w-1/3 "
          />
        </div>
        <div className="sticky top-16 z-20 backdrop-blur border-none outline-none text-secondary">
          <div className="w-full h-auto p-4 flex flex-wrap justify-around items-center my-4">
            <button
              className={`cursor-pointer ${
                activeCategory === "All"
                  ? "text-secondary font-bold text-lg transform-all ease-in-out duration-500"
                  : "text-primary"
              } px-4 py-2 rounded-lg`}
              onClick={() => handleCategory("All", products)}
            >
              All Products
            </button>
            <button
              className={`cursor-pointer ${
                activeCategory === "Men"
                  ? "text-secondary font-bold text-lg transform-all ease-in-out duration-500"
                  : "text-primary"
              } px-4 py-2 rounded-lg`}
              onClick={() => handleCategory("Men", men)}
            >
              Men
            </button>
            <button
              className={`cursor-pointer ${
                activeCategory === "Women"
                  ? "text-secondary font-bold text-lg tranform-all ease-in-out duration-500"
                  : "text-primary"
              } px-4 py-2 rounded-lg`}
              onClick={() => handleCategory("Women", women)}
            >
              Women
            </button>
            <button
              className={`cursor-pointer ${
                activeCategory === "Kids"
                  ? "text-secondary font-bold text-lg tranform-all ease-in-out duration-500"
                  : "text-primary"
              } px-4 py-2 rounded-lg`}
              onClick={() => handleCategory("Kids", kids)}
            >
              Kids
            </button>
          </div>
        </div>

        <div className="flex flex-wrap mt-8 items-center justify-center">
          {searchProducts.length > 0 ? (
            searchProducts.map((product) => (
              <div
                key={product.id}
                className="w-full sm:w-1/2 lg:w-1/4 h-auto p-4 flex items-center justify-center transition-all ease-in-out duration-500"
              >
                <ProductCard product={product} navigate={navigate} />
              </div>
            ))
          ) : (
            <p>No Products Found For the term `{search}`</p>
          )}
        </div>
      </div>
      {/* <div className="flex flex-col justify-center items-center">
        <div className="flex gap-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className="flex gap-3 justify-center items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <MdOutlineNavigateBefore className="text-3xl" />
          </button>
          <p>{currentPage}</p>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <MdOutlineNavigateNext className="text-3xl" />
          </button>
        </div>
      </div> */}
      <Footer />
    </>
  );
};

const ProductCard = ({ product, navigate }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  

  return (
    <div className="relative group border-[2px] p-4 w-full text-left rounded-md">
      <div className="w-full h-[22rem] flex flex-col items-center justify-center overflow-hidden rounded-lg object-contain relative">
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-t-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <Link to={`/product/${product.id}`}>
        {product.image_url && (
          <img
          src={product.image.replace("https%3A/solestylebucket.s3.ap-south-1.amazonaws.com/", "")}
          alt={product.name}
          className={`w-full h-full object-cover cursor-pointer md:hover:scale-105 transition-all duration-500 ease-in-out transform ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />
        )}
          
        </Link>
      </div>
      <h3 className="opacity-60 uppercase">{product.brand}</h3>
      <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
      <p className="text-md font-medium text-gray-700">${product.price}</p>
      <div className="flex justify-center">
        <button
          className="bg-secondary/60 my-4 px-6 py-2 rounded-3xl md:hover:scale-105 md:hover:bg-primary/60 transition-all ease-in-out duration-500"
          onClick={() => navigate(`/product/${product.id}`)}
          // onClick={() => handleClick(product.id)}
        >
          View Product
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
