import React from 'react'
import Navbar from '../components/Navbar'
import Routers from '../router/Routers'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <>
        <Navbar/>
        <Routers/>
        <Footer />
    </>
  )
}

export default Layout