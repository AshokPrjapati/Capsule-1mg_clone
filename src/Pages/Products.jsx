import { Box, Flex, Grid, useToast } from "@chakra-ui/react";

import React, { useEffect, useState, useContext } from "react";
import Pagination from "../Components/Products/Pagination";
import { CartContext } from "../Contexts/CartContext";

import ProductCard from "../Components/Products/ProductCard";

import Filter from "../Components/Products/Filter";
import { fetchProduct } from "../Components/API";
import { useParams } from "react-router-dom";
import Load from "../Components/Products/Load";
import { AuthContext } from "../Contexts/AuthContext";

function Products() {
  const { isReg } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(12);
  const [sort, setSort] = useState("");
  const { category } = useParams();
  const toast = useToast();
  const { handleCartProduct } = useContext(CartContext);

  let limit = 12;

  useEffect(() => {
    fetchProduct({ category, page, limit, sort }).then((res) => {
      setTotal(res.headers["x-total-count"]);
      setData(res.data);
    });
  }, [page, limit, sort, category]);

  const handlePage = (val) => {
    setPage(val);
  };

  const handleSort = (val) => {
    setSort(val);
  };

  const handleAdd = (e, i, p) => {
    // checking authentication before adding product to cart
    if (isReg) handleCartProduct(p)
    else toast({
      title: 'Please Login/signup to add product to cart', position: 'bottom-left', status: 'error', duration: 3000, isClosable: true
    });

  };

  let d = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <Flex
      gap={4}
      pt="40px"
      bg={"#f6f6f6"}
      flexDir={{ base: "column", lg: "row" }}
    >
      <Filter handleSort={handleSort} />
      <Box width={{ base: "100%", lg: "72%" }} m={{ base: 0, lg: "auto" }}>
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
          gap="20px 20px"
          p={3}
        >
          {data.length
            ? data.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                p={{ ...p }}
                category={category}
                handleAdd={handleAdd}
              />
            ))
            : d.map((el) => <Load key={el} />)}
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
