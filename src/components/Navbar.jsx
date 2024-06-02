import React, { useContext } from 'react';
import {
  Box,
  Flex,
  Button,
  IconButton,
  useDisclosure,
  VStack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Menu } from 'lucide-react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Cookies from 'js-cookie'

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext)
  console.log(user)
  const handleClick = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    Cookies.set('accessToken', '', { expires: 1, path: '/' });
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  const nav_links = [
    { name: "Overview", href: "/Overview" },
    { name: "Productos", href: "/productos" },
    { name: "Categorias", href: "/categorias" },
    { name: "Sub categoria", href: "/sub_categorias" },
    { name: "Ordenes", href: "/ordenes" },
    { name: "Colores", href: "/color_register" },
  ];

  return (
    <Box bg="white" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={<Menu />}
          aria-label="Open Menu"
          onClick={onOpen}
          bg="white"

          color="black"
        />
        <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu Administrador</DrawerHeader>
            <DrawerBody>
              <VStack align="start" spacing={4}>
                {nav_links.map((link) => (
                  <ChakraLink
                    key={link.href}
                    as={Link}
                    to={link.href}
                    onClick={onClose}

                  >
                    {link.name}
                  </ChakraLink>
                ))}
              </VStack>
            </DrawerBody>
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancelar
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Flex alignItems="center">
          {
            !user ? <Button
              variant="solid"
              bg="black"
              color="white"
              size="sm"
              mr={4}
              onClick={handleClick}
              _hover={{ bg: 'gray.800' }}
            >
              Login
            </Button> : <Button
              variant="outline"

              colorScheme="red"
              size="sm"
              mr={4}
              onClick={handleLogout}
              _hover={{ bg: 'red.400' }}
            >
              Logout
            </Button>
          }
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
