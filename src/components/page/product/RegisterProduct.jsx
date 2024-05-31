import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Select, Stack, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import axios from 'axios';
import { BASE_URL } from '../../../utils/constants';
import toast from 'react-hot-toast';
import UploadWidget from '../../UploadWidget';
import { useNavigate, useParams } from 'react-router-dom'

const RegisterProduct = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    sizes: [],
    colors: [],
    categoryId: '',
    subCategoryId: '',
    price: '',
    images: []
  });

  const [size, setSize] = useState({ name: '', quantity: '' });
  const [color, setColor] = useState('');
  const [image, setImage] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const { productId } = useParams();
  const isNewProduct = productId === 'new';

  const navigate = useNavigate()

  useEffect(() => {
    getCategories();
    if (!isNewProduct) {
      getProduct();

    }

  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${productId}`);
      const productData = response.data.data;
      setFormValues(productData);
      if (productData.categoryId) {
        getSubCategories(productData.categoryId);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/category`);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const getSubCategories = async (categoryId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/category/${categoryId}/subcategories`);
      setSubCategories(response.data.data.subCategories);
    } catch (error) {
      console.error("Error fetching subcategories", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormValues({ ...formValues, categoryId: value, subCategoryId: '' });
    getSubCategories(value);
  };

  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    setSize({ ...size, [name]: value });
  };

  const addSize = () => {
    setFormValues({ ...formValues, sizes: [...formValues.sizes, size] });
    setSize({ name: '', quantity: '' });
  };

  const addColor = () => {
    setFormValues({ ...formValues, colors: [...formValues.colors, color] });
    setColor('');
  };

  const addImage = () => {
    setFormValues({ ...formValues, images: [...formValues.images, image] });
    setImage('');
  };

  const handleUpload = (url) => {
    setFormValues({ ...formValues, images: [...formValues.images, url] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isNewProduct) {
        await axios.post(`${BASE_URL}/api/products/create`, formValues);
      } else {

        const formatUpdate = {
          name: formValues.name,
          description: formValues.description,
          categoryId: formValues.categoryId,
          subCategoryId: formValues.subCategoryId,
          price: formValues.price,
          images: formValues.images
        }
        console.log(`data to update: ${JSON.stringify(formatUpdate)}`)
        await axios.put(`${BASE_URL}/api/products/update/${productId}`, formatUpdate);
      }
      toast.success("Producto guardado correctamente");
      navigate('/productos')
    } catch (error) {
      toast.error("Ups! Algo salió mal");
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={5} p={5} className="bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit}>
        <FormControl id="name" mb={4}>
          <FormLabel>Nombre</FormLabel>
          <Input name="name" value={formValues.name} onChange={handleInputChange} />
        </FormControl>

        <FormControl id="description" mb={4}>
          <FormLabel>Descripción</FormLabel>
          <Textarea name="description" value={formValues.description} onChange={handleInputChange} />
        </FormControl>

        <FormControl id="sizes" mb={4}>
          <FormLabel>Tamaños</FormLabel>
          <Stack direction="row">
            <Input name="name" placeholder="Nombre" value={size.name} onChange={handleSizeChange} />
            <Input name="quantity" placeholder="Cantidad" value={size.quantity} onChange={handleSizeChange} />
            <Button onClick={addSize}>Añadir</Button>
          </Stack>
          <Stack mt={2}>
            {formValues.sizes && formValues.sizes.map((size, index) => (
              <Tag key={index} size="sm" borderRadius="full" variant="solid" colorScheme="teal">
                <TagLabel>{`${size.name} - ${size.quantity}`}</TagLabel>
                <TagCloseButton onClick={() => {
                  const newSizes = formValues.sizes.filter((_, i) => i !== index);
                  setFormValues({ ...formValues, sizes: newSizes });
                }} />
              </Tag>
            ))}
          </Stack>
        </FormControl>

        <FormControl id="colors" mb={4}>
          <FormLabel>Colores</FormLabel>
          <Stack direction="row">
            <Input name="color" placeholder="Color" value={color} onChange={(e) => setColor(e.target.value)} />
            <Button onClick={addColor}>Añadir</Button>
          </Stack>
          <Stack mt={2}>
            {formValues.colors && formValues.colors.map((color, index) => (
              <Tag key={index} size="sm" borderRadius="full" variant="solid" colorScheme="teal">
                <TagLabel>{color}</TagLabel>
                <TagCloseButton onClick={() => {
                  const newColors = formValues.colors.filter((_, i) => i !== index);
                  setFormValues({ ...formValues, colors: newColors });
                }} />
              </Tag>
            ))}
          </Stack>
        </FormControl>

        <FormControl id="categoryId" mb={4}>
          <FormLabel>Categoría</FormLabel>
          <Select name="categoryId" value={formValues.categoryId} onChange={handleCategoryChange}>
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </Select>
        </FormControl>

        {formValues.categoryId && (
          <FormControl id="subCategoryId" mb={4}>
            <FormLabel>Subcategoría</FormLabel>
            <Select name="subCategoryId" value={formValues.subCategoryId} onChange={handleInputChange}>
              <option value="">Selecciona una subcategoría</option>
              {subCategories.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
              ))}
            </Select>
          </FormControl>
        )}

        <FormControl id="price" mb={4}>
          <FormLabel>Precio</FormLabel>
          <Input name="price" type="number" value={formValues.price} onChange={handleInputChange} />
        </FormControl>

        <FormControl id="images" mb={4}>
          <FormLabel>Imágenes</FormLabel>
          <Stack direction="row">
            <Input name="image" placeholder="URL de la imagen" value={image} onChange={(e) => setImage(e.target.value)} />
            <Button onClick={addImage}>Añadir</Button>
            <UploadWidget onUpload={handleUpload} />
          </Stack>
          <Stack mt={2}>
            {formValues.images && formValues.images.map((img, index) => (
              <Tag key={index} size="lg" borderRadius="full" variant="solid" colorScheme="teal" display="flex" alignItems="center">
                <img src={img} alt={`image-${index}`} style={{ width: '40px', height: '60px', borderRadius: '5px', marginRight: '10px' }} />
                <TagLabel>{`Image ${index + 1}`}</TagLabel>
                <TagCloseButton onClick={() => {
                  const newImages = formValues.images.filter((_, i) => i !== index);
                  setFormValues({ ...formValues, images: newImages });
                }} />
              </Tag>
            ))}
          </Stack>

        </FormControl>

        <Button type="submit" colorScheme="teal" width="full">{isNewProduct ? 'Registrar producto' : 'Actualizar producto'}</Button>
      </form>
    </Box>
  );
};

export default RegisterProduct;
