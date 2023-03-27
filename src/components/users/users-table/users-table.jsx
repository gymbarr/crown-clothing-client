import {
  useState, useEffect,
} from 'react'
import {
  Table, Column, HeaderCell, Cell,
} from 'rsuite-table'
import 'rsuite-table/dist/css/rsuite-table.css'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from '../../feedback/loader/loader'

import { getUsers } from '../../../utils/api/users'

import Title from './users-table.styles'

function UsersTable() {
  const [users, setUsers] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [nextPage, setNextPage] = useState(1)

  const getMoreUsers = () => {
    getUsers(nextPage)
      .then((response) => {
        setIsAdmin(true)
        setUsers(users.concat(response.data.users))
        setNextPage(response.data.pagy.next)
      })
      .catch(() => {
        // error handling
      })
  }

  useEffect(() => {
    getMoreUsers()
  }, [])

  return (
    <div>
      {isAdmin ? (
        <InfiniteScroll
          dataLength={users.length} // This is important field to render the next data
          next={getMoreUsers}
          hasMore={nextPage}
          loader={<Loader />}
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
        <Loader />
      )}
    </div>
  )
}

export default UsersTable
