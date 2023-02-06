import styled from "styled-components"

export const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

export const ItemsContainer = styled.div`
  height: 800px;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`

export const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
`
