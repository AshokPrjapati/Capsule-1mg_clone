import {
  Box,
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
import React, { useEffect, useState } from "react";
import Pagination from "../Components/Products/Pagination";

import styles from "../Components/Products/ProductCarousel.module.css";

function Products() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(12);
  const [sort, setSort] = useState("");
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

  return (
    <Flex gap={4} mt="40px">
      <Box
        w={"20%"}
        flexShrink={0}
        ml="20px"
        mt="10px"
        p={4}
        maxH={"100vh"}
        textAlign="left"
        className={styles.shadow}
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
          <Select>
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
            <GridItem
              key={p.title}
              w="100%"
              cursor={"pointer"}
              className={styles.shadow}
              padding={4}
              textAlign="left"
            >
              <Box maxW={"100%"} h={"150px"} mb={"10px"} align={"center"}>
                <Image h="100%" src={p.src} />
              </Box>
              <Text
                className={styles.text}
                color="grey"
                fontSize={"15px"}
                mb={"10px"}
                fontWeight={600}
              >
                {p.title}
              </Text>
              <Text
                className={styles.text1}
                color="grey"
                fontSize={"13px"}
                mb={"10px"}
                fontWeight={600}
              >
                {p.packsize}
              </Text>
              <Flex gap={"10px"}>
                <Text
                  className={styles.text}
                  color="grey"
                  fontSize={"13px"}
                  mb={"10px"}
                  textDecor="line-through"
                  fontWeight={600}
                >
                  {p["strike-price"]}{" "}
                </Text>
                <Text
                  className={styles.text}
                  fontSize={"13px"}
                  mb={"10px"}
                  color="green"
                  fontWeight={600}
                >
                  {p["discount-percent"]}
                </Text>
              </Flex>
              <Heading
                className={styles.text}
                color="grey"
                fontSize={"15px"}
                mb={"10px"}
                fontWeight={600}
              >
                {p.price}
              </Heading>
            </GridItem>
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
