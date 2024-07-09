import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/page/Home'
import Login from '../components/page/Login'
import ColorRegister from '../components/page/color/ColorRegister'

import ProductPage from '../components/page/product/page'
import RegisterProduct from '../components/page/product/RegisterProduct'
import CategoryPage from '../components/page/category/CategoryPage'
import SubCategoriesPage from '../components/page/subcategories/SubCategoriesPage'
import { AuthContext } from '../context/AuthContext'
import OrderList from '../components/page/order/OrderList'
import Dashboard from '../components/page/overview/Dashboard'





const Routers = () => {
  const { user } = useContext(AuthContext)
  if (!user) {

    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>)
  }
  return (
    <Routes>
      <Route path="/" element={<ProductPage />} />
      <Route path='/color_register' element={<ColorRegister />} />
      <Route path='/productos' element={<ProductPage />} />
      <Route path='/productos/:productId' element={<RegisterProduct />} />
      <Route path='/categorias' element={<CategoryPage />} />
      <Route path='/sub_categorias' element={<SubCategoriesPage />} />
      <Route path='/ordenes' element={<OrderList />} />
      <Route path='/Overview' element={<Dashboard />} />

    </Routes>
  )
}

export default Routers