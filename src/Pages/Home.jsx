import React from "react";
import Category from "../Components/Category";
import Navbar from "../Components/Navbar";
import SearchNav from "../Components/SearchNav";

function Home() {
  return (
    <>
      <Navbar />
      <SearchNav />
      <Category />
    </>
  );
}

export default Home;
