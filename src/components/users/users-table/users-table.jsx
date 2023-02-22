import { useState, useEffect, Fragment, useCallback } from "react"
import { Table, Column, HeaderCell, Cell } from "rsuite-table"
import "rsuite-table/dist/css/rsuite-table.css"
import InfiniteScroll from "react-infinite-scroll-component"
import { CircularProgress } from "@mui/material"

import { getUsers } from "../../../utils/api/users"

import { Title, Loader } from "./users-table.styles"

const UsersTable = () => {
  const [users, setUsers] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [nextPage, setNextPage] = useState(1)

  useEffect(() => {
    getMoreUsers()
  }, [])

  const getMoreUsers = () => {
    getUsers(nextPage)
      .then((response) => {
        setIsAdmin(true)
        setUsers(users.concat(response.data.users))
        setNextPage(response.data.pagy.next)
      })
      .catch((error) => {
        // error handling
      })
  }

  return (
    <Fragment>
      {isAdmin ? (
        <InfiniteScroll
          dataLength={users.length} //This is important field to render the next data
          next={getMoreUsers}
          hasMore={nextPage}
          loader={
            <Loader>
              <CircularProgress color="inherit" />
            </Loader>
          }
        >
          <Title>USERS</Title>
          <Table data={users} width={1000} autoHeight>
            <Column width={100} sortable fixed>
              <HeaderCell>ID</HeaderCell>
              <Cell dataKey="id" />
            </Column>

            <Column width={300} sortable>
              <HeaderCell>Username</HeaderCell>
              <Cell dataKey="username" />
            </Column>

            <Column width={400} sortable>
              <HeaderCell>Email</HeaderCell>
              <Cell dataKey="email" />
            </Column>

            <Column width={200}>
              <HeaderCell>Roles</HeaderCell>
              <Cell dataKey="roles_name" />
            </Column>
          </Table>
        </InfiniteScroll>
      ) : (
        <Loader>
          <CircularProgress color="inherit" />
        </Loader>
      )}
    </Fragment>
  )
}

export default UsersTable
