import React, { useState, useEffect } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
  Box,
  Select,
  Button,
} from '@chakra-ui/react'
import { BASE_URL } from '../../../utils/constants'

const OrderList = () => {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [ordersPerPage] = useState(5)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    handleFilter()
  }, [filter, orders])

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/order`)
      const data = await response.json()
      setOrders(data.data)
      setFilteredOrders(data.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const handleFilter = () => {
    const filtered = orders.filter(order => {
      return (
        order.user.name.toLowerCase().includes(filter.toLowerCase()) ||
        order.user.email.toLowerCase().includes(filter.toLowerCase())
      )
    })
    setFilteredOrders(filtered)
    setCurrentPage(1)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

  return (
    <div className='container mx-auto p-4'>
    <Box p={5} >
      <Input
        placeholder="Filter by user name or email"
        mb={4}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <TableContainer>
        <Table variant="striped">
          <TableCaption>Order List</TableCaption>
          <Thead>
            <Tr>
              <Th>Order ID</Th>
              <Th>User ID</Th>
              <Th>User Name</Th>
              <Th>User Email</Th>
              <Th>Order Date</Th>
              <Th>Items</Th>
              <Th>Paid</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentOrders.map(order => (
              <Tr key={order.id}>
                <Td>{order.id}</Td>
                <Td>{order.userId}</Td>
                <Td>{order.user.name}</Td>
                <Td>{order.user.email}</Td>
                <Td>{new Date(order.createdAt).toLocaleString()}</Td>
                <Td>
                  {order.orderItems.map(item => (
                    <div key={item.id}>
                      Product ID: {item.productId}, Quantity: {item.quantity}, Size: {item.selectedSize}
                    </div>
                  ))}
                </Td>
                <Td>{order.isPaid ? 'Yes' : 'No'}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="space-between" mt={4}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Box>Page {currentPage} of {totalPages}</Box>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Box>
    </Box>
    </div>

  )
}

export default OrderList
