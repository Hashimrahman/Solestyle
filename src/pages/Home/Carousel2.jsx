import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import carousels from "../../data/carousel.json";

function Carousel2() {
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2500,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
    swipeToSlide: true,
    touchMove: true,
    draggable: true,
    swipe: true,
  };

  return (
    <section id="projects" className="z-30 py-0 ">
      <Slider {...settings}>
        {carousels.map((carousel, i) => (
          <img
            key={i}
            src={`/assets/images/carousel/${carousel}`}
            alt={carousel.name}
            className="w-full"
          />
        ))}
      </Slider>
    </section>
  );
}

export default Carousel2;
