
import { Box, Button, Stack, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useContext } from 'react';
import { CartContext } from '../../Contexts/CartContext';
import CoupanModal from './CoupanModal';

function CartSummary({ price }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isCoupanApplied } = useContext(CartContext);
    return (
        <Stack textAlign={"left"}>
            <Stack p={2}>
                <Text fontWeight={"semibold"} fontSize="18px" color="teal.600">You can save extra by apply coupan</Text>
                <hr />
                <Button disabled={isCoupanApplied} px="30px" bg={"#ff6f61"} color="#fff" borderRadius={"5px"} fontSize={"16px"} fontWeight="bold" _hover={{ bg: "#ff4f41" }} onClick={onOpen}>
                    {isCoupanApplied ? "Applied" : "Apply Coupan"}
                </Button>
            </Stack>
            <Box>{price}</Box>
            <CoupanModal isOpen={isOpen} onClose={onClose} />
        </Stack>
    )
}

export default CartSummary