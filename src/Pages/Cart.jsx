import React, { useEffect, useState } from "react";
import { CartContext } from "../Contexts/CartContext";
import { useContext } from "react";
import { Box, Flex } from "@chakra-ui/react";
import CartCard from "../Components/Cart/CartCard";
import EmptyCartPage from "../Components/Cart/EmptyCartPage";

function Cart() {
  const { cartProduct, removeCartItem } = useContext(CartContext);
  const [totalPrice, setTotalprice] = useState(0);

  let price = 0;
  if (cartProduct.length) for (let p of cartProduct) price += p.quantity * p.price;


  useEffect(() => {
    setTotalprice(price.toFixed(2));
  }, [cartProduct]);

  const handleRemove = (id) => {
    removeCartItem(id);
  };


  return (
    <>
      {
        cartProduct.length ? <Flex w={"80%"} p={"20px"} m="20px auto" gap={4}>
          <Box>
            {cartProduct.map((p) => (
              <CartCard key={p.id} product={p} handleRemove={handleRemove} />
            ))}
          </Box>
          <Box w={"40%"}>{totalPrice}</Box>
        </Flex> : <EmptyCartPage />
      }
    </>
  );
}

export default Cart;
