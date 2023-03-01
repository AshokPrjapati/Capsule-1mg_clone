import React, { useEffect, useState } from "react";
import { CartContext } from "../Contexts/CartContext";
import { useContext } from "react";
import { Box, Container, Stack } from "@chakra-ui/react";
import CartCard from "../Components/Cart/CartCard";
import EmptyCartPage from "../Components/Cart/EmptyCartPage";
import CartSummary from "../Components/Cart/CartSummary";

function Cart() {
  const { cartProduct, isCoupanApplied, handleCoupanStatus } = useContext(CartContext);
  const [totalPrice, setTotalprice] = useState(0);

  let price = 0;
  if (cartProduct.length) {
    for (let p of cartProduct) price += p.quantity * p.price;
    if (isCoupanApplied) {
      price -= (price * .10);
    }
  }


  useEffect(() => {
    setTotalprice(price.toFixed(2));
    if (!cartProduct.length && isCoupanApplied) {
      handleCoupanStatus(false);
    }
  }, [price]);

  return (
    <Box w="100%" h="100vh" bg={"#f1f4f6"} >
      {
        cartProduct.length ? <Container maxW="6xl" p={"20px"} m="20px auto" display="flex" flexDir={{ base: "column", md: "row" }} gap={4}>
          <Stack w={{ base: "100%", md: "60%" }} gap="10px">
            {cartProduct.map((p) => (
              <CartCard key={p.id} product={p} />
            ))}
          </Stack>
          <Box w={{ base: "100%", md: "40%" }}>
            <CartSummary price={totalPrice} />
          </Box>
        </Container> : <EmptyCartPage />
      }
    </Box>
  );
}

export default Cart;
