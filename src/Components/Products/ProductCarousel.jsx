import { Flex, Spacer, Stack, Text, Button, Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CarouselData } from "../API";
import CarouselCard from "./CarouselCard";
import Load from "./Load";

function ProductCarousel({ category }) {
  const [data, setData] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    CarouselData({ category }).then((res) => {
      setData(res.data);
    });
  }, [category]);

  // const slider = document.getElementById("slider");
  const handlePrev = () => {
    let w = sliderRef.current.clientWidth;
    sliderRef.current.scrollLeft -= w;
  };

  const handleNext = () => {
    let w = sliderRef.current.clientWidth;
    sliderRef.current.scrollLeft += w;
  };

  return (
    <Stack>
      <Flex p={"25px 0 10px 0"} bg={"#f6f6f6"}>
        <Text ml={"20px"} fontSize="23px" fontWeight={600}>
          {category}
        </Text>
        <Spacer />
        <Button size={"sm"} bg="#ff6f61" _hover={{ bg: "#ff4f61" }} mr={"20px"}>
          <Link to={`products/${category}`}>See All</Link>
        </Button>
      </Flex>
      <Box position="relative" overflow={"hidden"} shadow={"lg"}>
        <Button
          // display={"none"}
          zIndex={10}
          w="50px"
          h={"50px"}
          position={"absolute"}
          rounded={"50%"}
          shadow={"dark-lg"}
          top={"35%"}
          left="10px"
          onClick={handlePrev}
          bg="none"
        >
          <FaAngleLeft fontSize={"50px"} color={"#ff6f61"} />
        </Button>
        <Button
          zIndex={10}
          w="50px"
          h={"50px"}
          position={"absolute"}
          rounded={"50%"}
          shadow={"dark-lg"}
          top={"35%"}
          right="10px"
          bg="none"
          onClick={handleNext}
        >
          <FaAngleRight fontSize={"40px"} color={"#ff6f61"} />
        </Button>
        <Flex
          ref={sliderRef}
          p={4}
          id="slider"
          textAlign="left"
          overflowX={"hidden"}
          gap="20px"
          scrollBehavior={"smooth"}
        >
          {data.length
            ? data.map((p) => (
              <CarouselCard key={p.title} p={{ ...p }} category={category} />
            ))
            : [1, 2, 3, 4, 5, 6, 7, 8].map((el) => <Load key={el} />)}
        </Flex>
      </Box>
    </Stack>
  );
}

export default ProductCarousel;
