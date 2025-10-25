import React, { useEffect, useState } from 'react'
import AsideFilter from './AsideFilter'
import Product from './Product/Product'
import SortProductFilter from './SortProductFilter/SortProductFilter'
import { useProductsQuery } from '../../hooks/useProduct'
import Pagination from '../../components/Pagination/Pagination'
import type { IProductListConfig } from '../../types/product.type'
import { useQueryParams } from '../../hooks/useQueryParams'
import { isUndefined, omitBy } from 'lodash'

export type QueryConfig = {
  [key in keyof IProductListConfig]: string
}
const ProductList = () => {
  const queryParams = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.litmit,
      sort_by: queryParams.sort_by,
      order: queryParams.order,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name,
      exclude: queryParams.exclude
    },
    isUndefined
  )
  const productsQuery = useProductsQuery(queryConfig as IProductListConfig)
  const pagination = productsQuery.data?.data.data?.pagination
  const products = productsQuery.data?.data.data?.products
  console.log('🚀 ~ ProductList ~ products:', products)
  const [page, setPage] = useState(1)
  return (
    <div className='bg-gray-100 py-6'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter></AsideFilter>
          </div>
          <div className='col-span-9'>
            <SortProductFilter></SortProductFilter>
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
              {products &&
                products.map((product) => (
                  <div className='mt-6 col-span-1' key={product._id}>
                    <Product product={product}></Product>
                  </div>
                ))}
            </div>
            <Pagination
              page={page}
              setPage={setPage}
              pageSize={pagination?.page_size || 20}
              queryConfig={queryConfig}
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
