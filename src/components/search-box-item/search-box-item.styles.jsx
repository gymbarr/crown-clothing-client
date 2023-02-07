import styled from "styled-components"

export const SearchBoxItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  &:hover {
    background-color: #f2f2f2;
  }
`

export const ImageContainer = styled.div`
  width: 10%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`

export const Title = styled.span`
  width: 80%;
`

export const Price = styled.span`
  width: 10%;
`
