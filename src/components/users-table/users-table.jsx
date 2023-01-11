import { useState, useEffect, Fragment, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { Table, Column, HeaderCell, Cell } from "rsuite-table"
import "rsuite-table/dist/css/rsuite-table.css"
import InfiniteScroll from "react-infinite-scroll-component"
import { CircularProgress } from "@mui/material"

import { useSelector, useDispatch } from "react-redux"
import { getUsers } from "../../utils/api/users"
import { selectCurrentUser, selectCurrentUserIsLoading } from "../../store/user/user-selector"
import { updateUserToken } from "../../store/user/user-action"

import {
  addFlashMessage,
  removeFlashMessage,
} from "../../store/flash/flash-action"

import { Title } from "./users-table.styles"

const UsersTable = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [users, setUsers] = useState([])
  const [nextPage, setNextPage] = useState(1)
  const currentUser = useSelector(selectCurrentUser)
  const currentUserLoaded = useSelector(selectCurrentUserIsLoading)

  useEffect(() => {
    if (currentUser) getMoreUsers()
  }, [currentUserLoaded])

  const getMoreUsers = () => {
    getUsers(currentUser?.token, nextPage)
      .then((response) => {
        setUsers(users.concat(response.data.users))
        setNextPage(response.data.pagy.next)
        dispatch(updateUserToken(response.headers.token))
      })
      .catch((error) => {
        if (error.response.data.errors === "Nil JSON web token") {
          showFlashMessage("You are not authorized to perform this action")
        }
        navigate("/")
      })
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
        next={getMoreUsers}
        hasMore={nextPage}
        loader={<CircularProgress color="inherit" />}
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
