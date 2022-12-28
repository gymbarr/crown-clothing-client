import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Table, Column, HeaderCell, Cell } from "rsuite-table"
import "rsuite-table/dist/css/rsuite-table.css"

import { useSelector, useDispatch } from "react-redux"
import { getUsers } from "../../utils/api/users"
import { selectCurrentUser } from "../../store/user/user-selector"

import { addFlashMessage, removeFlashMessage } from "../../store/flash/flash-action"

const UsersTable = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    getUsers(currentUser?.token)
      .then((response) => response.data)
      .then((users) => setUsers(users))
      .catch((error) => {
        showFlashMessage(error.message)
        navigate("/")
      })
  }, [])

  const showFlashMessage = (message) => {
    dispatch(addFlashMessage(message))
    setTimeout(() => {dispatch(removeFlashMessage())}, 3000)
  }

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
