import React from "react";
import Carousel from "../Components/Carousel";
import ProductCarousel from "../Components/Products/ProductCarousel";

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
