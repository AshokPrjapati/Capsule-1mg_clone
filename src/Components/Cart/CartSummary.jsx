
import { Button, Flex, Stack, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useContext } from 'react';
import { CartContext } from '../../Contexts/CartContext';
import CoupanModal from './CoupanModal';

function CartSummary({ price }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isCoupanApplied, discount, handleCoupanStatus, load } = useContext(CartContext);

    return (
        <Stack textAlign={"left"} gap="10px">
            <Stack px={4} py={2} shadow="xl" bg="#fff" borderRadius={"5px"}>
                <Text fontWeight={"semibold"} fontSize="18px" color="teal.600">You can save extra by apply coupan</Text>
                <hr />
                <Button px="30px" bg={"#ff6f61"} color="#fff" borderRadius={"5px"} fontSize={"16px"} fontWeight="bold" _hover={{ bg: "#ff4f41" }} onClick={isCoupanApplied ? () => handleCoupanStatus(false) : onOpen}>
                    {isCoupanApplied ? "Remove Coupan" : "Apply Coupan"}
                </Button>
            </Stack>
            <Stack px={4} py={2} shadow="xl" bg="#fff" borderRadius={"5px"}>
                <Flex justifyContent={"space-between"}>
                    <Text fontWeight={"semibold"} fontSize="17px">Total</Text>
                    <Text color="gray.600" fontWeight={"medium"}>₹ {price}</Text>
                </Flex>
                <Flex justifyContent={"space-between"}>
                    <Text fontWeight={"semibold"} fontSize="17px">Discount</Text>
                    <Button mt={-2} mr={-4} isLoading={load} loadingText='Loading' bg="#fff" _hover={{ bg: "none", cursor: "default" }} color="gray.600" fontWeight={"medium"}>₹ {discount}</Button>
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