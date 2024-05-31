import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../../utils/constants';
import axios from 'axios';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { Edit, Trash } from 'lucide-react';

const CategoryPage = () => {
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [selectedcategoryId, setSelectedCategoryId] = useState(null);


    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/category`);
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching colors:', error);
        }
    };
    const handleSubmit = async () => {
        setLoading(true)
        try {
            await axios.post(`${BASE_URL}/api/category/create`, { name })
            toast.success("Categoria guardada correctamente")
            setLoading(false)
        } catch (error) {
            toast.error("Ups! Algo estuvo mal")
        }
    }
    const openDeleteDialog = (id) => {
        setSelectedCategoryId(id);
        onOpen();
      };
    const handleDeleteCategory = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/api/category/delete/${id}`);
            console.log(`category con ID: ${id} eliminado`);
            toast.success("Categoria eliminada correctamente")
            getCategories()
      
          } catch (error) {
            toast.error("Ups! Algo estuvo mal")
            console.error('Error al eliminar el producto:', error);
          }
    }

    const confirmDelete = () => {
        handleDeleteCategory(selectedcategoryId);
        onClose();
        
      };
    return (
        <div className='w-full px-8 md:px-32 lg:px-24'>
            <div className="bg-white rounded-md shadow-2xl p-6 mt-6 max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-4 text-center">Registrar categoría</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                        Ingrese el nombre de la categoría
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                        required
                    />
                    <Button
                        disabled={loading}
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:opacity-50"
                    >
                        Guardar
                    </Button>
                </form>
            </div>
            <div className='bg-white rounded-md shadow-2xl p-6 mt-6  mx-auto'>
                <h1 className="text-2xl font-bold mb-4 text-center">Lista de categorías({categories.length})</h1>
                <Table variant='simple' mt={4}>
                    <Thead>
                        <Tr>
                            <Th>Categoria</Th>
                            <Th>Acciones</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {categories.map((category) => (
                            <Tr key={category.id}>
                                <Td>{category.name}</Td>
                                <Td>
                                    <Button variant="outline" size='sm' onClick={() => openDeleteDialog(category.id)}>
                                        <Trash />
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </div>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Eliminar categoria
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            ¿Está seguro de eliminar la categoria?
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
    )
}

export default CategoryPage