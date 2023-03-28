import styled from 'styled-components'

export const SearchBoxItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  padding: 10px;

  &:hover {
    background-color: #f2f2f2;
  }
`

export const ImageContainer = styled.div`
  width: 5%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`

export const Title = styled.span`
  width: 80%;
`
