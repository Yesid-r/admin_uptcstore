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
  useDisclosure
} from '@chakra-ui/react';
import { Edit, Trash } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../utils/constants';
import toast from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom';


const ProductsTable = ({ products }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate()
  

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      console.log(`Producto con ID: ${id} eliminado`);
      toast.success("Producto eliminado correctamente")
      

    } catch (error) {
      toast.error("Ups! Algo estuvo mal")
      console.error('Error al eliminar el producto:', error);
    }
  };

  const handleEditProduct = async (id) => {
    console.log(`Editar producto con ID: ${id}`);
    navigate(`/productos/${id}`)

  };

  const openDeleteDialog = (id) => {
    setSelectedProductId(id);
    onOpen();
  };

  const confirmDelete = () => {
    handleDeleteProduct(selectedProductId);
    onClose();
  };

  return (
    <div>
      <Table>
        <Thead>
          <Tr>
            <Th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </Th>
            <Th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descripcion
            </Th>
            <Th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoria
            </Th>
            <Th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sub Categoria
            </Th>
            <Th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Img
            </Th>
            <Th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Precio
            </Th>
            <Th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tamaños
            </Th>
            <Th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </Th>
          </Tr>
        </Thead>
        <Tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <Tr key={product.id}>
              <Td>{product.name}</Td>
              <Td>{product.description}</Td>
              <Td>{product.category.name}</Td>
              <Td>{product.subCategory.name}</Td>
              <Td>{product.images.length > 0 ? (<img src={product.images[0]}style={{ width: '40px', height: '60px', borderRadius: '5px', marginRight: '10px' }} ></img>): <></>}</Td>
              <Td>{product.price}</Td>
              <Td>{product.sizes.map((size) => size.name).join(', ')}</Td>
              <Td>
                <Button onClick={() => openDeleteDialog(product.id)}><Trash /></Button>
                <Button onClick={() => handleEditProduct(product.id)}><Edit /></Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
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
    </div>
  );
};

export default ProductsTable;
