import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Carousel from "./Carousel";
import Category from "./Category";
import './Home.css'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="overflow-hidden mt-20 md:mt-0 transition-all ease-in-out duration-500">
        <Carousel /> 
      </div>
      <Category />
      <Footer />
    </>
  );
};

export default Home;
