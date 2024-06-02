import React, { useContext, useState } from 'react'
import {
    Button,
    Link,
    Input,
    FormControl,
    FormLabel,
    Box,
    Flex,
    Heading,
    useColorModeValue,
} from '@chakra-ui/react'
import { Store } from 'lucide-react'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import {AuthContext} from '../../context/AuthContext'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const cardBgColor = useColorModeValue('white', 'gray.800')
    const primaryColor = 'rgb(255, 204, 41)'
    const textColor = useColorModeValue('gray.700', 'white')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const {dispatch} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post(`${BASE_URL}/api/auth/login`, {email, password})
            toast.success("Inicio de sesion correcto")
            Cookies.set('accessToken', response.data.token, { expires: 1, path: '/' })
            dispatch({type: 'LOGIN_SUCCESS', payload: response.data.data})
            navigate('/')
        } catch (error) {
            toast.error("Ups! Algo estuvo mal")
        }
    }

    return (
        <Flex minH="100vh" w="full" align="center" justify="center" bg="white">
            <Box mx="4" w="full" maxW="md" borderRadius="lg" bg={cardBgColor} p="6" shadow="lg">
                <Flex mb="8" align="center" justify="center">
                    <Link href="#" display="flex" alignItems="center" gap="2" fontWeight="semibold">
                        <Store className="h-6 w-6" />
                        <Heading as="span" size="lg" color={textColor}>
                            Uptc Store
                        </Heading>
                    </Link>
                </Flex>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <FormControl id="username">
                        <FormLabel>Email</FormLabel>
                        <Input onChange={(e) => {setEmail(e.target.value)}}  required type="text" placeholder="Enter your email" />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input onChange={(e) => {setPassword(e.target.value)}} required type="password" placeholder="Enter your password" />
                    </FormControl>
                    <Button disabled= {loading} type="submit" colorScheme="yellow" bg={primaryColor} color="black" _hover={{ bg: 'yellow.500' }} width="full">
                        Login
                    </Button>
                </form>
            </Box>
        </Flex>
    )
}

export default Login
