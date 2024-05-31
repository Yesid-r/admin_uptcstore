import React from 'react';
import {
  Box,
  Flex,
  Button,
  IconButton,
  useDisclosure,
  useColorModeValue,
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
import { Link } from 'react-router-dom'; 

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nav_links = [
    {
      name: "Overview",
      href: "/Overview"
    },
    {
      name: "Productos",
      href: "/productos"
    },
    {
      name: "Categorias",
      href: "/categorias"
    },
    {
      name: "Sub categoria",
      href: "/sub_categorias"
    },
    {
      name: "Ordenes",
      href: "/ordenes"
    },
    {
      name: "Colores",
      href: "/color_register"}
  ]

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={<Menu />}
          aria-label="Open Menu"
          onClick={onOpen}
        />
        <Drawer
          isOpen={isOpen}
          placement='left'
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu Administrador</DrawerHeader>

            <DrawerBody>
              <VStack align="start" spacing={4}>

                {
                  nav_links.map((link) => (
                    <ChakraLink key={link.href} ChakraLink as= { Link } to = {link.href} onClick = { onClose } >
                  {link.name}
                  </ChakraLink>
                  ))
                }

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
        <Button
          variant="solid"
          colorScheme='blackAlpha'
          size="sm"
          mr={4}
        >
          Login
        </Button>
      </Flex>
    </Flex>
    </Box >
  );
};

export default Navbar;
