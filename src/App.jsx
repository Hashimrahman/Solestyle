import "./App.css";
// import Logo from "./assets/SoleStyle.png";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
// import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home/Home";
// import { ContextProvider } from "./components/Context/Context";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      {/* <ContextProvider> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      {/* </ContextProvider> */}
    </>
  );
}

export default App;
