import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Signup from "./Signup";
import Login from "../Pages/login";
import Products from "./Products";
import Category from "../Components/Products/Category";
import SingleProduct from "./SingleProduct";
import Cart from "./Cart";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products/:category" element={<Products />} />
      <Route path="/products/:category/:id" element={<SingleProduct />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default AllRoutes;
