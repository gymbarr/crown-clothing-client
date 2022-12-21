import { Fragment } from "react"
import { Outlet } from "react-router-dom"

import { ReactComponent as CrownLogo } from "../../assets/crown.svg"

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles"

const Navigation = () => {
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="nav-logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          <NavLink to="/auth">SIGN IN</NavLink>
        </NavLinks>
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
