import styled from "styled-components"

import Button from "../button/button"

export const DropdownContainer = styled.div`
  position: absolute;
  width: 165px;
  height: 70px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
`

export const Items = styled.div`
  height: 50px;
  width: 200px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: scroll;
`

export const Item = styled.div`
  padding-top: 10px;
  cursor: pointer;
`
