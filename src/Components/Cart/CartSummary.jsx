
import { Box, Button, Flex, Stack, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { CartContext } from '../../Contexts/CartContext';
import { fetchUser } from '../API';
import CoupanModal from './CoupanModal';

function CartSummary({ price }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isCoupanApplied, cartProduct } = useContext(CartContext);
    const [discount, setDiscount] = useState(0);
    const [loading, setLoading] = useState()

    // calculating discounting by getting mrp from database
    const getDiscount = () => {
        setLoading(true);
        fetchUser().then(res => {
            let mrp = 0;
            let price = 0;
            let dis = 0;
            let cart = res.data[0].cart;
            if (cart.length) {
                cart.forEach(product => {
                    if (product["strike-price"]) mrp += product["strike-price"] * product.quantity;
                    price += product.price * product.quantity
                })
            }
            if (mrp) dis += mrp - price;
            if (isCoupanApplied) dis += price * .10;
            setDiscount(dis.toFixed(2));
            setLoading(false);
        }).catch((err) => setLoading(false));
    }

    useEffect(() => {
        getDiscount();
    }, [isCoupanApplied, cartProduct])

    return (
        <Stack textAlign={"left"} gap="10px">
            <Stack px={4} py={2} shadow="xl" bg="#fff" borderRadius={"5px"}>
                <Text fontWeight={"semibold"} fontSize="18px" color="teal.600">You can save extra by apply coupan</Text>
                <hr />
                <Button disabled={isCoupanApplied} px="30px" bg={"#ff6f61"} color="#fff" borderRadius={"5px"} fontSize={"16px"} fontWeight="bold" _hover={{ bg: "#ff4f41" }} onClick={onOpen}>
                    {isCoupanApplied ? "Applied" : "Apply Coupan"}
                </Button>
            </Stack>
            <Stack px={4} py={2} shadow="xl" bg="#fff" borderRadius={"5px"}>
                <Flex justifyContent={"space-between"}>
                    <Text fontWeight={"semibold"} fontSize="17px">Total</Text>
                    <Text color="gray.600" fontWeight={"medium"}>₹ {price}</Text>
                </Flex>
                <Flex justifyContent={"space-between"}>
                    <Text fontWeight={"semibold"} fontSize="17px">Discount</Text>
                    <Button mt={-2} mr={-4} isLoading={loading} loadingText='Loading' bg="#fff" _hover={{ bg: "none", cursor: "default" }} color="gray.600" fontWeight={"medium"}>₹ {discount}</Button>
                </Flex>
                <hr />
                <Flex justifyContent={"space-between"}>
                    <Text fontWeight={"bold"} fontSize="18px">To be paid</Text>
                    <Text color="gray.600" fontWeight={"medium"}>₹ {price}</Text>
                </Flex>
                <Flex justifyContent={"space-between"}>
                    <Text fontWeight={"semibold"} fontSize="16px" color="gray.900">Total Saving</Text>
                    <Text color="green.600" fontWeight={"medium"} fontSize="18px">₹ {discount}</Text>
                </Flex>
            </Stack>
            <CoupanModal isOpen={isOpen} onClose={onClose} />
        </Stack>
    )
}

export default CartSummary