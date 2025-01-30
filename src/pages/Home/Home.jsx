import Navbar from "../../components/Navbar/Navbar";
import Featured from "../Products/Featured";
// import Carousel from "./Carousel";
import Carousel2 from "./Carousel2";
import './Home.css'

const Home = () => {
  return (
    <>
      <Navbar />
      {/* <div className="overflow-hidden mt-20 md:mt-0 transition-all ease-in-out duration-500"> */}
        <Carousel2 /> 
      {/* </div> */}
      <Featured />
      {/* <Footer /> */}
    </>
  );
};

export default Home;
