import "./App.css";
// import Logo from "./assets/SoleStyle.png";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
// import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AllProducts from "./pages/Products/AllProducts";
import { ProductProvider } from "./components/Context/Product";
import Men from "./pages/Products/Men";
import Navbar from "./components/Navbar/Navbar";
import Women from "./pages/Products/Women";
import Kids from "./pages/Products/Kids";
import DetailedView from "./pages/Products/DetailedView";
import Cart from "./pages/Cart/Cart";
// import { ContextProvider } from "./components/Context/Context";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<DetailedView />} />
            <Route path="shop" element={<AllProducts />} />
            <Route path="men" element={<Men />} />
            <Route path="women" element={<Women />} />
            <Route path="kids" element={<Kids />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<h1>Not Found</h1>} /> 
        </Routes>
      </ProductProvider>
    </>
  );
}

export default App;
