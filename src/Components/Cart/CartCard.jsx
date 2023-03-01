import { DeleteIcon } from '@chakra-ui/icons'
import { Button, Flex, Heading, Stack, Text, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Contexts/AuthContext';
import { CartContext } from '../../Contexts/CartContext';
import { updateCart } from '../API';
import QuantityCounter from './QuantityCounter'

function CartCard({ product, handleRemove }) {
    const { cartProduct, setCartProduct, loading } = useContext(CartContext);
    const [quantity, setQuantity] = useState(product.quantity || 1);
    const { userData } = useContext(AuthContext);
    const toast = useToast();

    const handleQuantity = (val) => {
        userData?.id ? setQuantity(quantity + val) : toast({
            title: 'Please login First to update quantity', position: 'bottom-left', status: 'info', duration: 5000, isClosable: true,
        });
    }

    useEffect(() => {
        const cProducts = cartProduct.map(p => p.id === product.id ? { ...p, "quantity": quantity } : p);
        setCartProduct(cProducts);
        updateCart(userData.id, cProducts);
    }, [quantity])


    return (
        <Flex
            w={"100%"}
            justify={"space-between"}
            px={4}
            py={2}
            gap={"20px"}
            borderBottom="1px solid grey"
            bg="#fff"
            shadow="xl"
            borderRadius={"5px"}
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
                    isLoading={loading}
                    loadingText={"Removing"}
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
            <Stack textAlign={"right"}>
                <Heading ml={2} color="grey" fontSize={"15px"} fontWeight={600} >
                    ₹{product.price}
                </Heading>
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