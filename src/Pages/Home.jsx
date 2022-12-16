import React from "react";
import MainCarousel from "../Components/Carousel";
import Category from "../Components/Category";

import SearchNav from "../Components/SearchNav";

function Home() {
  return (
    <>
      <SearchNav />
      <Category />
      <MainCarousel />
    </>
  );
}

export default Home;
