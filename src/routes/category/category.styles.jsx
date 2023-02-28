import styled from "styled-components"

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
`

export const CategoryTitle = styled.h2`
  font-size: 38px;
  margin-bottom: 25px;
  text-align: center;
`

export const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 20px;
`

export const PaginationTop = styled.div`
  display: flex;
  margin-bottom: 50px;
  justify-content: center;
`

export const PaginationBottom = styled.div`
  display: flex;
  margin-top: 50px;
  justify-content: center;
`
