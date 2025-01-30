import React from "react";
import Slider from "react-slick";
import Image1 from "../assets/Hero/image1.png";
import Image2 from "../assets/Hero/image2.png";
import Image3 from "../assets/Hero/image3.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Spring Collections",
    description: "Discover our new spring collection with vibrant colors.",
  },
  {
    id: 2,
    img: Image2,
    title: "Design Your Future",
    description: "Step into the future with exclusive designs.",
  },
  {
    id: 3,
    img: Image3,
    title: "Exclusive Offers",
    description: "Limited time offers just for you!",
  },
];

const Hero = () => {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease",
    pauseOnHover: false,
    pauseOnFocus: false,
    dots: true,
    arrows: true,
    infinite: true,
    speed: 800,
  };

  return (
    <div className="relative overflow-hidden">
      <Slider {...settings}>
        {ImageList.map((item) => (
          <div key={item.id} className="relative h-[650px] w-full">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${item.img})`,
              }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6 md:px-20">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                {item.title}
              </h1>
              <p className="text-lg md:text-xl font-light mb-6 max-w-3xl leading-relaxed">
                {item.description}
              </p>
              <button className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-300 text-white py-3 px-8 rounded-full shadow-lg">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
