import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../../components/Context/Product";
import Footer from "../../components/Footer/Footer";

const Featured = () => {
  const navigate = useNavigate();
  const { products } = useContext(ProductContext);
  const [isLoading, setIsLoading] = useState(true);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter((item) => item.trending == true);
      setTrending(filtered);
    }
  }, [products]);

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
        <h1 className="text-3xl font-bold">Explore The Trend</h1>

        <div className="flex flex-wrap mt-8 items-center justify-center">
          {trending.length > 0 &&
            trending.map((product) => (
              <div
                key={product.id}
                className="w-full sm:w-1/2 lg:w-1/4 h-auto p-4 flex items-center justify-center transition-all ease-in-out duration-500"
              >
                <ProductCard product={product} navigate={navigate} />
              </div>
            ))}
        </div>
        <div className="md:my-4 p-6">
          <button
            className="bg-blue-500 px-4 py-2 rounded-md w-full md:w-1/3 hover:scale-105 transition-all ease-in-out duration-500"
            onClick={() => navigate("/shop")}
          >
            Explore More
          </button>
        </div>
      </div>
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
          <img
            src={product.image.replace("https%3A/solestylebucket.s3.ap-south-1.amazonaws.com/", "")}
            alt={product.name}
            className={`w-full h-full object-cover cursor-pointer md:hover:scale-105 transition-all duration-500 ease-in-out transform ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
          />
        </Link>
      </div>
      <h3 className="opacity-60 uppercase">{product.brand}</h3>
      <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
      <p className="text-md font-medium text-gray-700">${product.price}</p>
      <div className="flex justify-center">
        <button
          className="bg-secondary/60 my-4 px-6 py-2 rounded-3xl md:hover:scale-105 md:hover:bg-primary/60 transition-all ease-in-out duration-500"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          View Product
        </button>
      </div>
    </div>
  );
};

export default Featured;
