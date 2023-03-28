import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import {
  Table, Column, HeaderCell, Cell,
} from 'rsuite-table'

import 'rsuite-table/dist/css/rsuite-table.css'
import { Title, OrdersContainer } from './orders.styles'
import { getOrders } from '../../utils/api/orders'

const Orders = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    getOrders()
      .then((response) => setOrders(response.data))
      .catch(() => {
        // error handling
      })
  }, [])

  const handleOnRowClick = (rowData) => navigate(`${rowData.id}`)

  return (
    <>
      <Title>Orders</Title>
      <OrdersContainer>
        <Table
          data={orders}
          width={1000}
          autoHeight
          onRowClick={handleOnRowClick}
        >
          <Column width={100} sortable fixed>
            <HeaderCell>ID</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column width={300} sortable>
            <HeaderCell>Total price</HeaderCell>
            <Cell dataKey="total" />
          </Column>

          <Column width={400} sortable>
            <HeaderCell>Date created</HeaderCell>
            <Cell dataKey="dateCreated" />
          </Column>

          <Column width={200}>
            <HeaderCell>Status</HeaderCell>
            <Cell dataKey="status" />
          </Column>
        </Table>
      </OrdersContainer>
    </>
  )
}

export default Orders
