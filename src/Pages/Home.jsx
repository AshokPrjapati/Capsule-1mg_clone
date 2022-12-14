import React from "react";
import MainCarousel from "../Components/Carousel";
import Category from "../Components/Category";
import Navbar from "../Components/Navbar";
import SearchNav from "../Components/SearchNav";

function Home() {
  return (
    <>
      <Navbar />
      <SearchNav />
      <Category />
      <MainCarousel />
    </>
  );
}

export default Home;
