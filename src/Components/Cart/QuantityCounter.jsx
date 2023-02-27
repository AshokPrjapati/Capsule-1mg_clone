import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function QuantityCounter({ sPrice, quantity, handleQuantity }) {


  return (
    <>
      {sPrice ? <Text
        color="grey"
        textDecor="line-through"
        fontSize={"12px"}
        fontWeight={800}
      >
        ₹ {sPrice}
      </Text> : null}

      <Flex>
        <Button
          size={"xs"}
          borderRadius="50%"
          border={"1px solid #ff6f61"}
          color="#ff6f61"
          bg={"#fff"}
          fontWeight={700}
          p={1}
          _hover={{}}
          disabled={quantity === 1}
          onClick={() => handleQuantity(-1)}
        >
          -
        </Button>
        <Text>{quantity}</Text>
        <Button
          size={"xs"}
          borderRadius="50%"
          border={"1px solid #ff6f61"}
          bg="#ff6f61"
          color={"#fff"}
          p={1}
          fontWeight={700}
          _hover={{}}
          onClick={() => handleQuantity(1)}
        >
          +
        </Button>
      </Flex>
    </>
  );
}

export default QuantityCounter;
