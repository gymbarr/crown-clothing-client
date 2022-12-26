import { useState, useEffect } from "react"
import { Table, Column, HeaderCell, Cell } from "rsuite-table"
import "rsuite-table/dist/css/rsuite-table.css"

import { useSelector } from "react-redux"
import { getUsers } from "../../utils/api/users"
import { selectCurrentUser } from "../../store/user/user-selector"

const UsersTable = () => {
  const [users, setUsers] = useState([])
  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    getUsers(currentUser.token)
      .then((response) => response.data)
      .then((users) => setUsers(users))
      .catch((error) => {
        alert(error)
      })
  }, [])

  return (
    <Table data={users} width={1000} autoHeight>
      <Column width={100} sortable fixed>
        <HeaderCell>ID</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={300} sortable>
        <HeaderCell>Username</HeaderCell>
        <Cell dataKey="username" />
      </Column>

      <Column width={300} sortable>
        <HeaderCell>Email</HeaderCell>
        <Cell dataKey="email" />
      </Column>

      <Column width={300}>
        <HeaderCell>Roles</HeaderCell>
        <Cell dataKey="roles_name" />
      </Column>
    </Table>
  )
}

export default UsersTable
