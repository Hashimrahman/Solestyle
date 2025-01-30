import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiUrl}/categories`)
      .then((res) => {
        // Check the structure of your response
        console.log("API Response:", res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  }, []);

  return (
    <div className="m-8 text-center relative">
      <h1 className="text-3xl font-bold">Welcome To Our Arena</h1>
      <div className="flex flex-wrap mt-8 justify-center">
        {categories.map((item) => (
          <div
            key={item.id}
            className="w-full sm:w-1/2 lg:w-1/3 h-auto p-4 flex items-center justify-center"
          >
            <div className="relative group">
              <div className="w-full h-60 bg-black flex flex-col items-center justify-center overflow-hidden rounded-lg">
                <img
                  src={item.image}
                  alt={item.category}
                  className="object-cover w-full h-full"
                />
                <div className="absolute md:left-6 md:top-24 opacity-100 transform md:opacity-0 group-hover:opacity-100 md:group-hover:-translate-y-3 transition-all duration-500">
                  <h1 className="text-white text-2xl bg-white/50 py-2 px-6 rounded-md inline-block">
                    {item.category}
                  </h1>
                  <br />
                  <button className="bg-secondary/50 m-4 px-6 py-2 rounded-md shadow-custom-shadow-2" onClick={() => navigate(`${item.link}`)}>
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
