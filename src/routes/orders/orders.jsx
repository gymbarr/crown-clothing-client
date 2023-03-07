import { useState, useEffect, Fragment } from "react"
import { useSelector } from "react-redux"
import { Table, Column, HeaderCell, Cell } from "rsuite-table"
import "rsuite-table/dist/css/rsuite-table.css"
import { getOrders } from "../../utils/api/orders"
import { selectCurrentUser } from "../../store/user/user-selector"

import { Title, OrdersContainer } from "./orders.styles"

const Orders = () => {
  const currentUser = useSelector(selectCurrentUser)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (!currentUser) return

    getOrders(currentUser.username)
      .then(response => setOrders(response.data))
      .catch((error) => {
        // error handling
      })
  }, [currentUser])

  return (
    <Fragment>
      <Title>Orders</Title>
      <OrdersContainer>
        <Table data={orders} width={1000} autoHeight>
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
    </Fragment>
  )
}

export default Orders
