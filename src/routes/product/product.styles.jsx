import styled from "styled-components"

export const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 25px;
`

export const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 50px auto 0;
`

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;

  button {
    width: 80%;
    margin-top: 25px;
  }
`

export const InfoItem = styled.div`
  font-size: 22px;
  margin-top: 25px;
`
