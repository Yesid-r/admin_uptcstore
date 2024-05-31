import React from 'react'
import { Edit, Trash } from 'lucide-react';
import { Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { BASE_URL } from '../../../utils/constants';
import axios from 'axios';
import toast from 'react-hot-toast';

const TableColors = ({ colors }) => {

    const handleDeleteColor = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/api/color/delete/${id}`);
            toast.success('Color eliminado correctamente');
            
        } catch (error) {
            console.error('Error eliminando el color:', error);
            toast.error('Ups! Algo estuvo mal');
        }
    };
    return (
        <div className='bg-white rounded md mt-3 bottom-3 p-3'>
            <h2 className='font-bold text-lg'>Colores: ({colors.length})</h2>
            <Table variant='simple' mt={4}>
                <Thead>
                    <Tr>
                        <Th>Color</Th>
                        <Th>Valor</Th>
                        <Th>Acciones</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {colors.map((color) => (
                        <Tr key={color.id}>
                            <Td>{color.name}</Td>
                            <Td>{color.value}</Td>
                            <Td>
                                <Button variant="outline" size='sm' onClick={() => handleDeleteColor(color.id)}>
                                    <Trash />
                                </Button>
                                <Button className='m-3' variant="outline" size='sm' onClick={() => handleDeleteColor(color.id)}>
                                    <Edit />
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </div>
    )
}

export default TableColors