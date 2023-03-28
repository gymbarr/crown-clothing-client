import { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import {
  Title,
  ProductContainer,
  ImageContainer,
  Info,
  InfoItem,
  AddToCartError,
} from './product.styles'
import BasicSelect from '../../components/inputs/basic-select/basic-select'
import Button from '../../components/inputs/button/button'
import { addItemToCart } from '../../store/cart/cart-action'
import { selectCartItems } from '../../store/cart/cart-selector'
import { getProduct, getProductVariants } from '../../utils/api/products'

function Product() {
  const dispatch = useDispatch()
  const { productCategory, productId } = useParams()
  const [product, setProduct] = useState({})
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  const [variants, setVariants] = useState([])
  const [variantRequired, setVariantRequired] = useState(false)
  const [notEnoughQuantity, setNotEnoughQuantity] = useState(false)
  const cartItems = useSelector(selectCartItems)
  const {
    title, imageUrl, category, price, colors,
  } = product
  const sizes = variants.map((variant) => variant.size)

  const handleOnChangeColor = (selectedColor) => {
    if (!selectedColor) return

    setColor(selectedColor)
    setSize('')
    const attributes = { color: selectedColor }
    getProductVariants(productCategory, productId, attributes).then(
      (response) => setVariants(response.data),
    )
  }

  const handleOnChangeSize = (selectedSize) => {
    if (!selectedSize) return

    setSize(selectedSize)
  }

  const handleAddProductToCart = () => {
    if (color && size) {
      const selectedVariant = variants.find(
        (variant) => variant.color === color && variant.size === size,
      )
      const existingVariant = cartItems.find(
        (variant) => variant.id === selectedVariant.id,
      )

      if (
        selectedVariant.availableQuantity < 1
        || existingVariant?.quantity >= existingVariant?.availableQuantity
      ) {
        setNotEnoughQuantity(true)
        setTimeout(() => setNotEnoughQuantity(false), 2000)
      } else {
        dispatch(addItemToCart(cartItems, selectedVariant))
      }
    } else {
      setVariantRequired(true)
      setTimeout(() => setVariantRequired(false), 2000)
    }
  }

  useEffect(() => {
    getProduct(productCategory, productId).then((response) => setProduct(response.data))
  }, [productId])

  return (
    <>
      <Title>{title?.toUpperCase()}</Title>
      <ProductContainer>
        <ImageContainer>
          <img src={imageUrl} alt={`${title}`} />
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
                handleOnChange={handleOnChangeColor}
              />
            </InfoItem>
          )}
          {sizes && (
            <InfoItem>
              <BasicSelect
                label="Size"
                currentValue={size}
                values={sizes}
                handleOnChange={handleOnChangeSize}
              />
            </InfoItem>
          )}
          {variantRequired && (
            <AddToCartError>Please choose a color and a size</AddToCartError>
          )}
          {notEnoughQuantity && (
            <AddToCartError>Not enough quantity</AddToCartError>
          )}
          <Button onClick={handleAddProductToCart}>Add to cart</Button>
        </Info>
      </ProductContainer>
    </>
  )
}

export default Product
