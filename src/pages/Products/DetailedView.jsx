import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../components/Context/Product";
import axios from "axios";

const DetailedView = () => {
  const { id } = useParams();
  const { products, handleAddToCart, count, setCount } = useContext(
    ProductContext
  );
  const [isLoading, setIsLoading] = useState(true);
  // const [count, setCount] = useState();
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    loadData();
  }, []);

  const product = products.find((item) => parseInt(item.id) == parseInt(id));
  useEffect(() => {
    if (product) setCount(product.quantity);
  }, [product, setCount]);

  const updateQuantity = async (id, newQuantity) => {
    setLoadingUpdate(true);
    try {
      await axios.patch(`http://localhost:8000/products/${id}`, {
        quantity: newQuantity,
      });
      setCount(newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setLoadingUpdate(false);
    }
  };

  const incrementCount = () => {
    updateQuantity(product.id, count + 1);
  };

  const decrementCount = () => {
    if (count > 0) {
      updateQuantity(product.id, count - 1);
    }
  };

  if (!product) {
    return (
      <div className="mt-20 text-center">
        <h1 className="text-3xl">Product not found</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="loader">
          <div>
            <div className="load-inner load-one"></div>
            <div className="load-inner load-two"></div>
            <div className="load-inner load-three"></div>
            <span className="text text-xl font-bold text-secondary z-100">
              SoleStyle
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <div className="mx-8 my-28 ">
        {/* <h1 className="text-3xl">Detailed view</h1> */}
        <div className="w-full flex md:p-4 flex-wrap ">
          <div className="h-auto w-full md:w-1/2 mt-4 md:mt-0 md:p-4">
            <div className="w-full h-full flex justify-center items-center md:justify-start flex-col object-contain gap-4 md:gap-0">
              <div className="text-left w-full inline-block md:hidden">
                <h1 className="text-3xl ">{product.name}</h1>
              </div>
              <img src={product.image} alt={product.name} className="h-4/5" />
            </div>
          </div>
          <div className="h-auto w-full md:w-1/2 md:p-4">
            <div className="flex flex-col justify-start md:p-6 gap-4">
              <h1 className="text-3xl hidden md:inline-block">
                {product.name}
              </h1>
              <h4 className="text-md uppercase opacity-50 font-bold">
                {product.brand}
              </h4>
              <h2 className="text-xl">{product.price} ₹</h2>
              <h3 className="text-justify">{product.description}</h3>
              <div>
                <p>Size :</p>
                <div className="flex gap-4">
                  {product.sizes.map((item, index) => (
                    <button
                      key={index}
                      className="bg-slate-200/60 px-4 py-2 rounded-full"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full flex justify-center items-center flex-col gap-4">
                <div className="flex w-full sm:w-1/2 lg:w-1/4 justify-between">
                  <button
                    onClick={decrementCount}
                    disabled={loadingUpdate || count === 0}
                    className="border-2 border-black w-1/3 py-2"
                  >
                    -
                  </button>
                  <p className="border-b-2 border-t-2 border-black w-1/3 py-2 text-center bg-slate-300/50">
                    {count}
                  </p>
                  <button
                    onClick={incrementCount}
                    disabled={loadingUpdate}
                    className="border-2 border-black w-1/3 py-2"
                  >
                    +
                  </button>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/4">
                  <button
                    className="w-full bg-slate-500/70 py-2 rounded-3xl hover:scale-105 transform-all ease-in-out duration-500"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedView;
