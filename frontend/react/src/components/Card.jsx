'use client'

import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
    useDisclosure,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody, AlertDialogFooter,
} from '@chakra-ui/react'

import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import {useRef} from "react";
import {deleteCustomer} from "../services/client.js";
import {errorNotification, successNotification} from "../services/notification.js";


export default function CardWithImage({id, name, age, email, gender, fetchCustomers}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    return (
        <Center py={6}>
            <Box
                maxW={'270px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}>
                <Image
                    h={'120px'}
                    w={'full'}
                    src={
                        'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                    }
                    objectFit="cover"
                    alt="#"
                />
                <Flex justify={'center'} mt={-12}>
                    <Avatar
                        size={'xl'}
                        src={
                            "https://randomuser.me/api/portraits/med/"+(gender === "MALE" ? "men" : "women")+"/"+(id%100)+".jpg"
                        }
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>

                <Box p={10}>
                    <Stack spacing={0} align={'center'} mb={5}>
                        <Text color={'gray.500'}>CustomerId : {id}</Text>
                        <Link href={"#"}><Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            {name}
                        </Heading></Link>
                        <Text color={'gray.500'}>{email}</Text>
                        <Text color={'gray.500'}>{age}</Text>
                        <Text color={'gray.500'}>{gender}</Text>
                    </Stack>
                </Box>
                <Stack m={8}>
                    <Button mt={0} bg={'red.400'} color={'white'} rounded={'full'} _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg'
                    }}
                    _focus={{
                        bg: 'green.500'
                    }}
                    onClick={onOpen}>Delete</Button>
                    <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                    Delete Customer
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                    Are you sure? You want to delete {name}.
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme='red' onClick={()=>{
                                        deleteCustomer(id).then(r =>{
                                            console.log("Delete Response : "+r)
                                            successNotification(`Customer ${name} Deleted`, `${name} Was Successfully Deleted`)
                                            fetchCustomers();
                                        }).catch(err=>{
                                            console.log(err);
                                            errorNotification(err.code, err.response.data.message);
                                        }).finally(()=>{
                                            onClose()
                                        })
                                    }} ml={3}>
                                        Delete
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                </Stack>
            </Box>
        </Center>
    )
}