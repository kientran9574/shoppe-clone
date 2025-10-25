import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { productAPI } from '../apis/product'
import { useParams } from 'react-router-dom'
import type { IProductListConfig } from '../types/product.type'

export const useProductsQuery = (queryConfig: IProductListConfig) => {
  return useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productAPI.getProducts(queryConfig),
    placeholderData: keepPreviousData
  })
}
export const useProductDetailQuery = () => {
  const { id } = useParams()
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productAPI.getProductDetail(id as string),
    enabled: Boolean(id)
  })
}
