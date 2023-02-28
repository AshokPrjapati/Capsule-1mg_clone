
import { Box, Button, Stack, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import CoupanModal from './CoupanModal';

function CartSummary({ price, setPrice }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Stack textAlign={"left"}>
            <Stack p={2}>
                <Text fontWeight={"semibold"} fontSize="18px" color="teal.600">You can save extra by apply coupan</Text>
                <hr />
                <Button px="30px" bg={"#ff6f61"} color="#fff" borderRadius={"5px"} fontSize={"16px"} fontWeight="bold" _hover={{ bg: "#ff4f41" }} onClick={onOpen}>
                    Apply Coupan
                </Button>
            </Stack>
            <Box></Box>
            <CoupanModal isOpen={isOpen} onClose={onClose} price={price} setPrice={setPrice} />
        </Stack>
    )
}

export default CartSummary