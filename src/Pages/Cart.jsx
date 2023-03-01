import React, { useEffect, useState } from "react";
import { CartContext } from "../Contexts/CartContext";
import { useContext } from "react";
import { Box, Container } from "@chakra-ui/react";
import CartCard from "../Components/Cart/CartCard";
import EmptyCartPage from "../Components/Cart/EmptyCartPage";
import CartSummary from "../Components/Cart/CartSummary";

function Cart() {
  const { cartProduct, removeCartItem, isCoupanApplied } = useContext(CartContext);
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
  }, [price]);

  const handleRemove = (id) => {
    removeCartItem(id);
  };


  return (
    <>
      {
        cartProduct.length ? <Container border="1px" maxW="6xl" p={"20px"} m="20px auto" display="flex" gap={4}>
          <Box w="60%" border="1px solid red">
            {cartProduct.map((p) => (
              <CartCard key={p.id} product={p} handleRemove={handleRemove} />
            ))}
          </Box>
          <Box w={"40%"} border="1px solid blue">
            <CartSummary price={totalPrice} />
          </Box>
        </Container> : <EmptyCartPage />
      }
    </>
  );
}

export default Cart;
