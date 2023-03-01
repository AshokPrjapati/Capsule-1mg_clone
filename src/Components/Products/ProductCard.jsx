import {
  GridItem,
  Box,
  Image,
  Text,
  Flex,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCarousel.module.css";
import { BsStarFill } from "react-icons/bs";
import { CartContext } from "../../Contexts/CartContext";
import { AuthContext } from "../../Contexts/AuthContext";

function ProductCard({ category, id, p }) {
  const { isReg } = useContext(AuthContext);
  const { handleCartProduct } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const toast = useToast();


  const handleAdd = () => {
    // checking authentication before adding product to cart
    if (isReg && p.id) {
      handleCartProduct(p, setLoading);
    }
    else toast({
      title: 'Please Login/signup to add product to cart', position: 'bottom-left', status: 'error', duration: 3000, isClosable: true
    });

  };

  return (
    <GridItem
      w="100%"
      className={styles.shadow}
      padding={4}
      textAlign="left"
      bg="#fff"
    >
      <Link to={`/products/${category}/${p.id}`}>
        <Box maxW={"100%"} h={"150px"} mb={"10px"} align={"center"}>
          <Image h="100%" src={p.src} />
        </Box>
        <Text
          className={styles.text}
          color="grey"
          fontSize={"15px"}
          mb={"10px"}
          fontWeight={600}
          textAlign="center"
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
          {p.packsize ? p.packsize : null}
        </Text>
        {p.rating ? (
          <Flex gap={"20px"}>
            <Button
              bg="#1aab2a"
              size={"xs"}
              color={"#fff"}
              fontSize={"13px"}
              mb={"10px"}
              fontWeight={600}
              _hover={{}}
            >
              {p.rating} <BsStarFill />
            </Button>
            <Text
              fontSize={"13px"}
              mb={"10px"}
              color="#ff6f61"
              fontWeight={600}
            >
              {p.CardRatingDetail}
            </Text>
          </Flex>
        ) : null}
        <Flex gap={"10px"}>
          <Text
            className={styles.text}
            color="grey"
            fontSize={"13px"}
            mb={"10px"}
            textDecor="line-through"
            fontWeight={600}
          >
            {p["strike-price"] ? `₹${p["strike-price"]}` : null}
          </Text>
          <Text
            className={styles.text}
            fontSize={"13px"}
            mb={"10px"}
            color="green"
            fontWeight={600}
          >
            {p["discount-percent"] ? `₹${p["discount-percent"]}` : null}
          </Text>
        </Flex>{" "}
      </Link>
      <Flex align={"center"} justify="space-between">
        <Heading
          className={styles.text}
          color="grey"
          fontSize={"15px"}
          mb={"10px"}
          fontWeight={600}
        >
          {p["price"] ? `₹${p["price"]}` : null}
        </Heading>
        <Button
          isLoading={loading}
          loadingText={"Adding"}
          zIndex={100}
          bg={"#fff"}
          id={"btn" + id}
          size={"sm"}
          color="#ff6f61"
          _hover={{ bg: "#ff6f61", color: "#fff" }}
          onClick={handleAdd}
        >
          {category === "disease" ? null : "Add"}
        </Button>
      </Flex>
    </GridItem>
  );
}

export default ProductCard;
