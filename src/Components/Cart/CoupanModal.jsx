import {
    Button, Stack, Modal,
    ModalOverlay,
    ModalContent,
    FormControl,
    Input,
    useColorModeValue,
    Heading,
    Container,
    useToast,
} from '@chakra-ui/react'
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { CartContext } from '../../Contexts/CartContext';

function CoupanModal({ isOpen, onClose }) {
    const [coupan, setCoupan] = useState("");
    const { handleCoupan, loading, setLoading } = useContext(CartContext);
    const toast = useToast();

    // coupan input field change stored in coupan state
    const handleChange = (e) => {
        setCoupan(e.target.value);
    }

    // handle the coupan validation and submission
    const handleApply = () => {
        if (coupan === "CAPSULE10") {
            handleCoupan(true);
            onClose();
        } else {
            setLoading(false);
            toast({
                title: 'Invalid Coupan', position: 'bottom-left', status: 'error', duration: 4000, isClosable: true,
            })
        }

    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <Container
                    bg={useColorModeValue('white', 'whiteAlpha.100')}
                    boxShadow={'xl'}
                    rounded={'lg'}
                    p={6}
                    direction={'column'}>
                    <Heading
                        as={'h2'}
                        fontSize={{ base: 'xl', sm: '2xl' }}
                        textAlign={'center'}
                        mb={5}>
                        Enter coupan code
                    </Heading>
                    <Stack
                        direction={{ base: 'column', md: 'row' }}
                        as={'form'}
                        spacing={'12px'}
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                        <FormControl>
                            <Input
                                variant={'solid'}
                                borderWidth={1}
                                color={'gray.800'}
                                _placeholder={{
                                    color: 'gray.400',
                                }}
                                borderColor={useColorModeValue('gray.300', 'gray.700')}
                                type={'text'}
                                required
                                placeholder={'Coupan Code'}
                                aria-label={'Coupan Code'}
                                value={coupan}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl w={{ base: '100%', md: '40%' }}>
                            <Button isLoading={loading} loadingText={"Validating"} bg={"#ff6f61"} color="#fff" _hover={{ bg: "#ff4f41" }} onClick={handleApply}>
                                Submit
                            </Button>
                        </FormControl>
                    </Stack>
                </Container>
            </ModalContent>
        </Modal>
    )
}

export default CoupanModal