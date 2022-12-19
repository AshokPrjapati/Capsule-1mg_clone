import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Pagination from "../Components/Products/Pagination";
import { CartContext } from "../Contexts/CartContext";

import styles from "../Components/Products/ProductCarousel.module.css";
import ProductCard from "../Components/Products/ProductCard";
import { Link } from "react-router-dom";

function Products() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(12);
  const [sort, setSort] = useState("");

  const { handleCartCount, handleCartProduct } = useContext(CartContext);
  //&_sort=${param}&_order=${order}&rating_gte=${gte}&rating_lte=${lte}`

  let limit = 12;

  const fetchData = ({ page, limit, sort }) => {
    console.log(sort);
    return axios
      .get(
        `http://localhost:8080/products?_page=${page}&_limit=${limit}&${sort}`
      )
      .then((res) => {
        setTotal(res.headers["x-total-count"]);
        setData(res.data);
      });
  };

  useEffect(() => {
    fetchData({ page, limit, sort });
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
    handleCartProduct({ p });
  };

  return (
    <Flex gap={4} pt="40px" bg={"#f6f6f6"}>
      <Box
        w={"20%"}
        flexShrink={0}
        ml="20px"
        mt="10px"
        p={4}
        maxH={"100vh"}
        textAlign="left"
        className={styles.shadow}
        bg="#fff"
      >
        <Stack gap={2}>
          {/* <Heading fontSize={"20px"}>Category</Heading>
          <Select onChange={handleCategory}>
            <option value="">All Products</option>
            <option value="/vitamins-suppliments">Vitamins Suppliments</option>
            <option value="/medicine">Medicine</option>
            <option value="/combo">Combo Offer</option>
          </Select>
          <Divider /> */}
          <Heading fontSize={"20px"}>Price</Heading>
          <Select
            onChange={(e) => handleSort(`_sort=price&_order=${e.target.value}`)}
          >
            <option value="">Select</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </Select>
          <Divider />
          <Heading fontSize={"20px"}>Rating</Heading>
          <Select
            onChange={(e) =>
              handleSort(`_sort=rating&_order=${e.target.value}`)
            }
          >
            <option value="">Select</option>
            <option value="asc">Rating: Low to High</option>
            <option value="desc">Rating: High to Low</option>
          </Select>
          <Divider />
          <Heading fontSize={"20px"}>Discount</Heading>
          <Select>
            <option value="">Select</option>
            <option value="">Less than 10%</option>
            <option value="desc">20% and above</option>
            <option value="desc">40% and above</option>
            <option value="desc">60% and above</option>
          </Select>
        </Stack>
      </Box>
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
