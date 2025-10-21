import { useQuery } from '@tanstack/react-query'
import { useQueryParams } from './useQueryParams'
import { productAPI } from '../apis/product'
import { useParams } from 'react-router-dom'

export const useProductsQuery = () => {
  const params = useQueryParams()
  return useQuery({ queryKey: ['products', params], queryFn: () => productAPI.getProducts(params) })
}
export const useProductDetailQuery = () => {
  const { id } = useParams()
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productAPI.getProductDetail(id as string),
    enabled: Boolean(id)
  })
}
