import {
  Flex,
  Spacer,
  Stack,
  Text,
  Button,
  Box,
  Image,
  Center,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function ProductCarousel({ category }) {
  const [data, setData] = useState([]);
  const fetchData = () => {
    return axios
      .get(`http://localhost:8080/vitamins-suppliments`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Stack m="40px 0">
      <Flex py={"10px"}>
        <Text>{category}</Text>
        <Spacer />
        <Button size={"sm"} bg="#ff6f61" _hover={{ bg: "#ff4f61" }} mr={"20px"}>
          See All
        </Button>
      </Flex>
    </Stack>
  );
}

export default ProductCarousel;
