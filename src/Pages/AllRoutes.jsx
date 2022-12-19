import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";

import Products from "./Products";
import Category from "../Components/Products/Category";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:category" element={<Category />} />
    </Routes>
  );
}

export default AllRoutes;
