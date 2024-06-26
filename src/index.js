import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import { AuthContextProvider } from './context/AuthContext';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <BrowserRouter>
      <ChakraProvider>
        <App />
        <Toaster position="top-center" reverseOrder={false} />

      </ChakraProvider>

    </BrowserRouter>
  </AuthContextProvider>


);

