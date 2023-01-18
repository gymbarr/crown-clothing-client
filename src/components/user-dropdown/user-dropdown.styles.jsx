import styled from "styled-components"

export const DropdownContainer = styled.div`
  position: absolute;
  width: 180px;
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
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: scroll;
`

export const Item = styled.div`
  padding: 5px;
  cursor: pointer;
`
