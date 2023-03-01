import { Box, Button, Container, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function EmptyCartPage() {
    return (
        <Container maxW="5xl">
            <Stack align="center" py={"40px"} lineHeight="2">
                <Box>
                    <Image w={"200px"} src="https://www.1mg.com/images/online_consultation/empty-cart-icon.svg" />
                </Box>
                <Text fontWeight="bold" fontSize={"25px"}>Oops..</Text>
                <Text>Looks like there is no item in your cart yet.</Text>
                <Button as={Link} to="/" px="30px" bg={"#ff6f61"} color="#fff" borderRadius={"5px"} fontSize={"16px"} fontWeight="bold" _hover={{ bg: "#ff4f41" }}>
                    Add Products
                </Button>
            </Stack>
        </Container>
    )
}

export default EmptyCartPage