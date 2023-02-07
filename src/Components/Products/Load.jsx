import { GridItem, Skeleton } from "@chakra-ui/react";
import React from "react";

function Load() {
  return (
    <GridItem w="100%" padding={4} textAlign="left" bg="#fff">
      <Skeleton
        w="100%"
        startColor="#ff6f61"
        endColor="#af4f61"
        height="250px"
      />
    </GridItem>
  );
}

export default Load;
