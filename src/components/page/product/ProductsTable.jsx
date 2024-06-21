import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Input,
  Box,
  Select,
} from '@chakra-ui/react';
import { Edit, Trash } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../utils/constants';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ProductsTable = ({ products }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    handleFilter();
  }, [filter, products]);

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      console.log(`Producto con ID: ${id} eliminado`);
      toast.success('Producto eliminado correctamente');
      setFilteredProducts(filteredProducts.filter(product => product.id !== id));
    } catch (error) {
      toast.error('Ups! Algo estuvo mal');
      console.error('Error al eliminar el producto:', error);
    }
  };

  const handleEditProduct = async (id) => {
    console.log(`Editar producto con ID: ${id}`);
    navigate(`/productos/${id}`);
  };

  const openDeleteDialog = (id) => {
    setSelectedProductId(id);
    onOpen();
  };

  const confirmDelete = () => {
    handleDeleteProduct(selectedProductId);
    onClose();
  };

  const handleFilter = () => {
    const filtered = products.filter(product => {
      return (
        product.name.toLowerCase().includes(filter.toLowerCase()) ||
        product.description.toLowerCase().includes(filter.toLowerCase()) ||
        product.category.name.toLowerCase().includes(filter.toLowerCase()) ||
        product.subCategory.name.toLowerCase().includes(filter.toLowerCase())
      );
    });
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <Box p={5}>
      <Input
        placeholder="Filter by name, description, category or sub-category"
        mb={4}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Descripcion</Th>
            <Th>Categoria</Th>
            <Th>Sub Categoria</Th>
            <Th>Img</Th>
            <Th>Precio</Th>
            <Th>Tamaños</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentProducts.map((product) => (
            <Tr key={product.id}>
              <Td>{product.name}</Td>
              <Td>{product.description}</Td>
              <Td>{product.category.name}</Td>
              <Td>{product.subCategory.name}</Td>
              <Td>
                {product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    style={{ width: '40px', height: '60px', borderRadius: '5px', marginRight: '10px' }}
                    alt="product"
                  />
                ) : null}
              </Td>
              <Td>{product.price}</Td>
              <Td>{product.sizes.map((size) => size.name).join(', ')}</Td>
              <Td>
                <Button onClick={() => openDeleteDialog(product.id)} mr={2}>
                  <Trash />
                </Button>
                <Button onClick={() => handleEditProduct(product.id)}>
                  <Edit />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box display="flex" justifyContent="space-between" mt={4}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Box>Page {currentPage} of {totalPages}</Box>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Box>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Eliminar producto
            </AlertDialogHeader>
            <AlertDialogBody>
              ¿Está seguro de eliminar el producto?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={confirmDelete} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default ProductsTable;
