import React from "react";
import Carousel from "../Components/Carousel";
import Category from "../Components/Navbar/Category";
import ProductCarousel from "../Components/Products/ProductCarousel";
import SearchNav from "../Components/Navbar/SearchNav";

function Home() {
  return (
    <>
      <SearchNav />
      <Category />
      <Carousel />
      <ProductCarousel />
    </>
  );
}

export default Home;
