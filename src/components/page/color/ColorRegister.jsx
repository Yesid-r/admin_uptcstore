import React, { useEffect, useState } from 'react';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';
import { BASE_URL } from '../../../utils/constants';
import toast from 'react-hot-toast';

import TableColors from './TableColors';

const ColorRegister = () => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getColors();
  }, []);

  const getColors = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/color`);
      setColors(response.data.data);
    } catch (error) {
      console.error('Error fetching colors:', error);
    }
  };

  const handleAddColor = async () => {
    if (!name.trim() || !value.trim()) {
      setError('Nombre y valor no pueden estar vacios');
      return;
    }

    if (!/^#[0-9A-F]{6}$/i.test(value)) {
      setError('El color debe estar en formato hexadecimal');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/color/create`, { name, value });
      setName('');
      setValue('');
      toast.success('Color guardado correctamente');
      setError('');
      getColors();
    } catch (error) {
      console.error('Error guardando color:', error);
      toast.error('Ups! Algo estuvo mal');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className='w-full px-8 md:px-32 lg:px-24'>
      <h1 className='font-bold m-3 text-lg'>Registrar color</h1>
      <div className='bg-white rounded-md shadow-2xl p-5 mt-3 max-w-md mx-auto'>
        <FormControl id='color-name' mb={4} isInvalid={error && !name.trim()}>
          <FormLabel>Nombre</FormLabel>
          <Input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter color name'
            required
          />
        </FormControl>
        <FormControl id='color-value' mb={4} isInvalid={error && (!value.trim() || !/^#[0-9A-F]{6}$/i.test(value))}>
          <FormLabel>Color Value (Hex)</FormLabel>
          <Input
            type='text'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Enter color value in hex'
            required
          />
        </FormControl>
        <Button disabled={loading} colorScheme='teal' onClick={handleAddColor}>
          Guardar
        </Button>
        {error && (
          <div style={{ color: 'red', marginTop: '0.5rem' }}>
            {error}
          </div>
        )}
      </div>
        <TableColors colors={colors}/>
    </div>
  );
};

export default ColorRegister;
