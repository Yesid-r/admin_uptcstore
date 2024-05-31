import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../utils/constants';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@chakra-ui/react';
import { Edit, Trash } from 'lucide-react';

const SubCategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categoryId, setCategoryId] = useState('');

    useEffect(() => {
        getCategories();
        getSubCategories();
    }, []);

    const getCategories = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/category`);
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const getSubCategories = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/sub_category`);
            setSubCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            console.log(name, categoryId)
            await axios.post(`${BASE_URL}/api/sub_category/create`, { name, categoryId });

            toast.success('Subcategoría guardada correctamente');
            setName('');
            setCategoryId('');
            getSubCategories();
        } catch (error) {
            console.error('Error saving subcategory:', error);
            toast.error('Ups! Algo estuvo mal');
        } finally {
            setLoading(false);
        }
    };

    const handleEditSubCategory = async (id) => {
        
        console.log(`Editar subcategoría con ID: ${id}`);
    };

    const handleDeleteSubcategory = async (id) => {
        
        console.log(`Eliminar subcategoría con ID: ${id}`);
    };

    const handleCategoryChange = (event) => {
        setCategoryId(event.target.value);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-md shadow-md p-6">
                <h1 className="text-2xl font-bold mb-4 text-center">Registrar subcategoría</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium mb-1">
                            Categoría
                        </label>
                        <select
                            id="category"
                            className="w-full p-2 border rounded-md"
                            onChange={handleCategoryChange}
                            value={categoryId}
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Nombre
                        </label>
                        <input
                            id="name"
                            className="w-full p-2 border rounded-md"
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading || !name || !categoryId}
                        className={`w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 ${
                            loading || !name || !categoryId ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? 'Guardando...' : 'Guardar'}
                    </button>
                </form>

                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Subcategorías creadas</h2>
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-md">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nombre
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {subCategories.map((subcategory) => (
                                <tr key={subcategory.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {subcategory.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDeleteSubcategory(subcategory.id)}
                                        >
                                            <Trash />
                                        </Button>
                                        <Button
                                            className="m-3"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEditSubCategory(subcategory.id)}
                                        >
                                            <Edit />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SubCategoriesPage;
