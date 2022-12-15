import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Signup from "./Signup";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default AllRoutes;
