import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../../components/Context/Product";

const Men = () => {
  const navigate = useNavigate();
  const { men } = useContext(ProductContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    loadData();
  }, []);

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
        <div className="sticky top-16 z-50 backdrop-blur border-none outline-none text-secondary">
          <div className="w-full h-auto p-4 flex flex-wrap justify-around items-center my-4">
            <Link to='/shop'><h4 className="cursor-pointer">All Products</h4></Link>
            <Link to='/men'><h4 className="cursor-pointer">Men</h4></Link>
            <Link to='/women'><h4 className="cursor-pointer">Women</h4></Link>
            <Link to='/kids'><h4 className="cursor-pointer">Kids</h4></Link>
          </div>
        </div>
        <div className="flex flex-wrap mt-8 items-center justify-center">
          {men.map((men) => (
            <div
              key={men.id}
              className="w-full sm:w-1/2 lg:w-1/4 h-auto p-4 flex items-center justify-center transition-all ease-in-out duration-500"
            >
              <ProductCard men={men} navigate={navigate} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const ProductCard = ({ men, navigate }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative group border-[2px] p-4 w-full text-left rounded-md">
      <div className="w-full h-[22rem] flex flex-col items-center justify-center overflow-hidden rounded-lg object-contain relative">
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-t-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <Link to={`/product/${men.id}`}>
          <img
            src={men.image}
            alt={men.name}
            className={`w-full h-full object-cover cursor-pointer md:hover:scale-105 transition-all duration-500 ease-in-out transform ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
          />
        </Link>
      </div>
      <h3 className="opacity-60 uppercase">{men.brand}</h3>
      <h2 className="mt-4 text-lg font-semibold">{men.name}</h2>
      <p className="text-md font-medium text-gray-700">${men.price}</p>
      <div className="flex justify-center">
        <button
          className="bg-secondary/60 my-4 px-6 py-2 rounded-3xl md:hover:scale-105 md:hover:bg-primary/60 transition-all ease-in-out duration-500"
          onClick={() => navigate(`/product/${men.id}`)}
        >
          View Product
        </button>
      </div>
    </div>
  );
};

export default Men;