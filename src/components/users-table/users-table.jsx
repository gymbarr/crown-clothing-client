import { useState, useEffect, Fragment } from "react"
import { useNavigate } from "react-router-dom"
import { Table, Column, HeaderCell, Cell } from "rsuite-table"
import "rsuite-table/dist/css/rsuite-table.css"
import InfiniteScroll from "react-infinite-scroll-component"

import { useSelector, useDispatch } from "react-redux"
import { getUsers } from "../../utils/api/users"
import { selectCurrentUser } from "../../store/user/user-selector"

import {
  addFlashMessage,
  removeFlashMessage,
} from "../../store/flash/flash-action"

import { Title } from "./users-table.styles"

const UsersTable = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [getMoreUsers, setGetMoreUsers] = useState(false)
  const [nextPage, setNextPage] = useState(1)
  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    getUsers(currentUser?.token, nextPage)
      .then((response) => {
        console.log(response)
        setUsers(users.concat(response.data.users))
        setNextPage(response.data.pagy.next)
        console.log(nextPage)
      })
      .catch((error) => {
        showFlashMessage(error.message)
        navigate("/")
      })
  }, [getMoreUsers])

  const getMoreUsersHandler = () => {
    setGetMoreUsers(!getMoreUsers)
  }

  const showFlashMessage = (message) => {
    dispatch(addFlashMessage(message))
    setTimeout(() => {
      dispatch(removeFlashMessage())
    }, 5000)
  }

  return (
    <Fragment>
      <InfiniteScroll
        dataLength={users.length} //This is important field to render the next data
        next={getMoreUsersHandler}
        hasMore={nextPage}
        loader={<h4>Loading...</h4>}
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
    </Fragment>
  )
}

export default UsersTable
