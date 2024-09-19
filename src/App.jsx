import "./App.css";
// import Logo from "./assets/SoleStyle.png";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
// import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AllProducts from "./pages/Products/AllProducts";
import { ProductProvider } from "./components/Context/Product";
// import { ContextProvider } from "./components/Context/Context";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route
          path="/shop"
          element={
            <ProductProvider>
              <AllProducts />
            </ProductProvider>
          }
        />
      </Routes>
    </>
  );
}

export default App;
