import { useState, Fragment } from "react"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

import useComponentVisible from "../../custom-hooks/use-component-visible"
import { UserIcon } from "../../components/user-icon/user-icon"
import UserDropwdown from "../../components/user-dropdown/user-dropdown" 
import { selectCurrentUser } from "../../store/user/user-selector"

import { ReactComponent as CrownLogo } from "../../assets/crown.svg"

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles"

const Navigation = () => {
  const { ref, isComponentVisible: isDropdownVisible, setIsComponentVisible: setIsDropdownVisible } = useComponentVisible(false)
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="nav-logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <UserIcon setIsDropdownVisible={setIsDropdownVisible} />
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
        </NavLinks>
        {isDropdownVisible && <UserDropwdown dropdownRef={ref} setIsDropdownVisible={setIsDropdownVisible} />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
