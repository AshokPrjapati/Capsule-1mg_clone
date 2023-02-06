import { Box, Divider, Heading, Select, Stack } from "@chakra-ui/react";
import React from "react";
import styles from "./ProductCarousel.module.css";

function Filter({ handleSort }) {
  return (
    <Box
      w={{ base: "100%", lg: "20%" }}
      flexShrink={{ base: 1, lg: 0 }}
      ml={{ base: 0, lg: "20px" }}
      mt="10px"
      p={4}
      maxH={{ base: "max-content", lg: "100vh" }}
      textAlign="left"
      className={styles.shadow}
      bg="#fff"
    >
      <Stack gap={2}>
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
          onChange={(e) => handleSort(`_sort=rating&_order=${e.target.value}`)}
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
  );
}

export default Filter;
