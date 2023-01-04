import { Fragment } from "react"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

import { UserIcon } from "../../components/user-icon/user-icon"
import UserDropwdown from "../../components/user-dropdown/user-dropdown" 
import { selectCurrentUser } from "../../store/user/user-selector"
import { selectDropdownVisible } from "../../store/user/user-selector"

import { ReactComponent as CrownLogo } from "../../assets/crown.svg"

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles"

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const dropdownVisible = useSelector(selectDropdownVisible)

  console.log()
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="nav-logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <UserIcon />
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
        </NavLinks>
        {dropdownVisible && <UserDropwdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
