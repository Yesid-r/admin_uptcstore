import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../utils/constants';
import axios from 'axios';
import { Button, Divider } from '@chakra-ui/react';
import ProductsTable from './ProductsTable';
import {Plus} from 'lucide-react'

const ProductPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/products`);
            setProducts(response.data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };



    return (
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-md shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Productos</h1>
                    <a href="/productos/new">
                        <Button leftIcon={<Plus />} colorScheme="blue">
                            Registrar Nuevo Producto
                        </Button>
                    </a>
                </div>

            </div>
            <Divider />
            <ProductsTable products= {products}/>
            
        </div>
    );
};

export default ProductPage;
