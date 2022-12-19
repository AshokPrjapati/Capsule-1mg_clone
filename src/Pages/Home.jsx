import React from "react";
import Carousel from "../Components/Carousel";
import Category from "../Components/Navbar/Category";
import ProductCarousel from "../Components/Products/ProductCarousel";
import SearchNav from "../Components/Navbar/SearchNav";

function Home() {
  return (
    <>
      <Carousel />
      <ProductCarousel category={"vitamins-suppliments"} />
      <ProductCarousel category={"combo"} />
      <ProductCarousel category={"medicine"} />
      <ProductCarousel category={"disease"} />
    </>
  );
}

export default Home;
