import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ImageSlider = () => {
  const slider = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy0x1DIqBOz746o4VvJSCG27hFWL6ER_wjCA&s",
    "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqGK3diR3Zi-mnOXEaj-3ewmFyRYVxGzVzZw&s",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervelId = setInterval(() => {
      if (currentIndex == slider.length-1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex((c) => c + 1);
      }
    }, 4000);
    

    return () => {
      clearInterval(intervelId);
    };
  },[currentIndex]);

  

  return (
    <div className="h-[70vh] w-full bg-gray-600 mt-20 overflow-hidden ">
      <div className="h-full relative">
      <div className="h-full flex justify-center items-center object-fill bg-fuchsia-500" >
        <img
          src={slider[currentIndex]}
          alt=""
          className="h-full w-full rounded-sm object-cover"
        />
        <button className="absolute right-8 top-1/2 text-3xl text-white"><FaChevronRight/></button>
        <button className="absolute left-8 top-1/2 text-3xl text-white"><FaChevronLeft/></button>
      </div>
      </div>
    </div>
  );
};

export default ImageSlider;
