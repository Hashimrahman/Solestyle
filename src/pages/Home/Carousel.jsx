// Carousel.jsx
import { useState, useEffect } from "react";
import carousel1 from "../../assets/carousel/carousel1.png";
import carousel2 from "../../assets/carousel/carousel2.png";
import { useNavigate } from "react-router-dom";

const images = [carousel1, carousel2, carousel1];

const Carousel = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 3000); // Slide every 3 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToPreviousSlide = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNextSlide = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-screen overflow-hidden bg-black mt-0">
      <div
        className="flex transition-transform ease-in-out duration-500 object-contain"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-screen h-full object-fill"
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={goToPreviousSlide}
          className=" text-lg font-bold text-white p-3 rounded-full px-5 shadow-lg hover:bg-gray-700 transition"
        >
          &#10094;
        </button>

        <button
          onClick={goToNextSlide}
          className="text-lg font-bold text-white p-3 rounded-full px-5 shadow-lg hover:bg-gray-700 transition"
        >
          &#10095;
        </button>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-4">
        <button
          className="px-4 py-2 md:px-20 md:py-4 text-primary bg-secondary/70 rounded-md md:text-lg z-50"
          onClick={() => {
            navigate("/shop");
          }}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Carousel;
