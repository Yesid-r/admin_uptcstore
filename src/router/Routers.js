import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/page/Home'
import Login from '../components/page/Login'
import ColorRegister from '../components/page/color/ColorRegister'

import ProductPage from '../components/page/product/page'
import RegisterProduct from '../components/page/product/RegisterProduct'
import CategoryPage from '../components/page/category/CategoryPage'
import SubCategoriesPage from '../components/page/subcategories/SubCategoriesPage'





const Routers = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/color_register' element = {<ColorRegister />} />
        <Route path='/productos' element = {<ProductPage />} />
        <Route path='/productos/:productId' element = {<RegisterProduct />} />
        <Route path='/categorias' element = {<CategoryPage />} />
        <Route path='/sub_categorias' element= {<SubCategoriesPage />} />

    </Routes>
  )
}

export default Routers