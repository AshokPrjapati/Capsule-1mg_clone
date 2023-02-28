import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Contexts/CartContext';
import QuantityCounter from './QuantityCounter'

function CartCard({ product, handleRemove }) {
    const { cartProduct, setCartProduct } = useContext(CartContext);
    const [quantity, setQuantity] = useState(product.quantity || 1);

    const handleQuantity = (val) => {
        setQuantity(quantity + val);
    }

    useEffect(() => {
        const cProducts = cartProduct.map(p => p.id === product.id ? { ...p, "quantity": quantity } : p);
        setCartProduct(cProducts);
    }, [quantity])


    return (
        <Flex
            w={"100%"}
            justify={"space-between"}
            p="10px"
            gap={"20px"}
            borderBottom="1px solid grey"
        >
            <Stack maxW={"80%"} textAlign="justify">
                <Text color="#000" fontSize={"13px"} fontWeight={600}>
                    {product.title}
                </Text>
                <Text
                    color="grey"
                    fontSize={"13px"}
                    mb={"20px"}
                    fontWeight={600}
                >
                    {product.packsize}
                </Text>
                <Button
                    width={"min-content"}
                    size={"sm"}
                    leftIcon={<DeleteIcon />}
                    color={"grey"}
                    _hover={{
                        bg: "#ff6f61",
                        color: "#fff",
                    }}
                    onClick={() => handleRemove(product.id)}
                >
                    Remove
                </Button>
            </Stack>
            <Stack>

                <Box fontSize={"13px"}>
                    MRP
                    <Heading ml={2} color="grey" fontSize={"15px"} fontWeight={600} as={"span"}>₹{product.price}</Heading>
                </Box>

                <QuantityCounter
                    handleQuantity={handleQuantity}
                    quantity={quantity}
                    sPrice={product["strike-price"]}
                />
            </Stack>
        </Flex>
    )
}

export default CartCard