import { Box, Flex, Grid } from "@chakra-ui/react";

import React, { useEffect, useState, useContext } from "react";
import Pagination from "../Components/Products/Pagination";
import { CartContext } from "../Contexts/CartContext";

import ProductCard from "../Components/Products/ProductCard";

import Filter from "../Components/Products/Filter";
import { fetchProduct } from "../Components/API";

function Products() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(12);
  const [sort, setSort] = useState("");

  const { handleCartCount, handleCartProduct } = useContext(CartContext);

  let limit = 12;

  useEffect(() => {
    fetchProduct({ page, limit, sort }).then((res) => {
      setTotal(res.headers["x-total-count"]);
      setData(res.data);
    });
  }, [page, limit, sort]);

  const handlePage = (val) => {
    setPage(val);
  };

  const handleSort = (val) => {
    setSort(val);
    console.log(val);
  };

  const handleAdd = (e, i, p) => {
    handleCartCount(1);
    const btn = document.getElementById("btn" + i);
    btn.disabled = true;
    e.target.childNodes[0].data = "Added";
    console.log(p);
    handleCartProduct(p);
  };

  return (
    <Flex gap={4} pt="40px" bg={"#f6f6f6"}>
      <Filter handleSort={handleSort} />
      <Box width={"72%"} m={"auto"}>
        <Grid templateColumns={"repeat(4, 1fr)"} gap="20px 20px" p={3}>
          {data.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              p={{ ...p }}
              handleAdd={handleAdd}
            />
          ))}
        </Grid>
        <Pagination
          page={page}
          total={Math.ceil(total / limit)}
          handlePage={handlePage}
        />
      </Box>
    </Flex>
  );
}

export default Products;
