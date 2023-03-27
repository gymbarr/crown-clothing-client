import { apiRequest } from '../axios'

export const getProducts = (category, itemsPerPage, page, filters) => {
  const params = { items: itemsPerPage, page, filters }

  return apiRequest.get(`/categories/${category}/products`, {
    params,
  })
}

export const getProduct = (category, productId) => apiRequest.get(`/categories/${category}/products/${productId}`)

export const getProductVariants = (category, productId, attributes) => apiRequest.get(
  `/categories/${category}/products/${productId}/show_variants`,
  { params: { attrs: attributes } },
)
