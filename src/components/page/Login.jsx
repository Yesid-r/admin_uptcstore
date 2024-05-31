import React from 'react'
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
} from '@chakra-ui/react'


const Login = () => {
    return (
        <div>
            <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type='email' />
                <FormHelperText>We'll never share your email.</FormHelperText>
                <FormLabel>password</FormLabel>
                <Input type='password' />
                <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
        </div>
    )
}

export default Login