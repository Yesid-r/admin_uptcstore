import React, { useContext } from 'react'
import Layout from './layout/Layout'
import { AuthContext } from './context/AuthContext'
import Login from './components/page/Login'

const App = () => {
  const {user} = useContext(AuthContext)
  if(!user){
    return (<Login/>)
  }
  return (
    <Layout />
  )
}

export default App