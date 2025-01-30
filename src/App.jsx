import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AllProducts from "./pages/Products/AllProducts";
import { ProductProvider } from "./components/Context/Product";
import Navbar from "./components/Navbar/Navbar";
import DetailedView from "./pages/Products/DetailedView";
import Cart from "./pages/Cart/Cart";
import CheckOut from "./pages/CheckOut/Checkout";
import Payment from "./pages/CheckOut/Payment";
import Orders from "./pages/CheckOut/Orders";
import AdminPage from "./pages/Admin/Admin";
import ProfilePage from "./pages/Home/Profile";
import UserDetailedView from "./pages/Admin/UserDetailedView";
import EditProductForm from "./pages/Admin/ProductEditing";
import AboutUs from "./pages/About/AboutUs";
import Featured from "./pages/Products/Featured";
import ContactUs from "./pages/Contact/ContactUs";
import Hero from "./components/Hero";
import Form from "./Form";
// import CameraCapture from "./components/camera/CameraCapture";

function App() {

  return (
    <>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="product/:id" element={<DetailedView />} />
            <Route path="shop" element={<AllProducts />} />
            <Route path="cart" element={<Cart />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="trending" element={<Featured />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="submit" element={<CheckOut />} />
            <Route path="payment" element={<Payment />} />
            <Route path = "form" element = {<Form />} />
          </Route>
          <Route path="/register" element={<Register />} />
          {/* <Route path="/capture" element={<CameraCapture />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/slider" element={<Hero />} />
          

          <Route path="*" element={<h1>Not Found</h1>} />
          
          
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user/:id" element={<UserDetailedView />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/product/edit/:id" element={<EditProductForm />} />
        </Routes>
      </ProductProvider>
    </>
  );
}

export default App;
