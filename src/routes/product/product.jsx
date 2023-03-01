import { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { getProduct, getProductVariants } from "../../utils/api/products"
import { selectCartItems } from "../../store/cart/cart-selector"
import { addItemToCart } from "../../store/cart/cart-action"

import Button from "../../components/inputs/button/button"
import BasicSelect from "../../components/inputs/basic-select/basic-select"
import {
  Title,
  ProductContainer,
  ImageContainer,
  Info,
  InfoItem,
  VariantRequiredText,
} from "./product.styles"

const Product = () => {
  const dispatch = useDispatch()
  const { productCategory, productId } = useParams()
  const [product, setProduct] = useState({})
  const [color, setColor] = useState("")
  const [size, setSize] = useState("")
  const [sizes, setSizes] = useState([])
  const [variants, setVariants] = useState([])
  const [variantRequired, setVariantRequired] = useState(false)
  const cartItems = useSelector(selectCartItems)

  const { title, imageUrl, category, price, colors } = product

  useEffect(() => {
    getProduct(productCategory, productId).then((response) =>
      setProduct(response.data)
    )
  }, [productId])

  useEffect(() => {
    if (!color) return

    const attributes = { color: color }
    getProductVariants(productCategory, productId, attributes).then(
      (response) => setVariants(response.data)
    )
  }, [color])

  useEffect(() => {
    if (!variants) return

    setSizes(variants.map((variant) => variant.size).sort())
  }, [variants])

  const handleAddProductToCart = () => {
    if (color && size) {
      dispatch(addItemToCart(cartItems, product))
    } else {
      setVariantRequired(true)
      setTimeout(() => setVariantRequired(false), 2000)
    }
  }

  return (
    <Fragment>
      <Title>{title?.toUpperCase()}</Title>
      <ProductContainer>
        <ImageContainer>
          <img src={imageUrl} alt={`${title}`}></img>
        </ImageContainer>
        <Info>
          <InfoItem>{`Description: ${title}`}</InfoItem>
          <InfoItem>{`Category: ${category}`}</InfoItem>
          <InfoItem>{`Price: ${price}`}</InfoItem>
          {colors && (
            <InfoItem>
              <BasicSelect
                label="Color"
                currentValue={color}
                values={colors}
                setValue={setColor}
              />
            </InfoItem>
          )}
          {sizes && (
            <InfoItem>
              <BasicSelect
                label="Size"
                currentValue={size}
                values={sizes}
                setValue={setSize}
              />
            </InfoItem>
          )}
          {variantRequired && (
            <VariantRequiredText>
              Please choose a color and a size
            </VariantRequiredText>
          )}
          <Button onClick={handleAddProductToCart}>Add to cart</Button>
        </Info>
      </ProductContainer>
    </Fragment>
  )
}

export default Product
