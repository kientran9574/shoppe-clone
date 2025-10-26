import React, { useEffect, useState } from 'react'
import AsideFilter from './AsideFilter'
import Product from './Product/Product'
import SortProductFilter from './SortProductFilter/SortProductFilter'
import { useCategoryQuery, useProductsQuery } from '../../hooks/useProduct'
import Pagination from '../../components/Pagination/Pagination'
import type { IProductListConfig } from '../../types/product.type'
import { useQueryParams } from '../../hooks/useQueryParams'
import { isUndefined, omitBy } from 'lodash'
import { AnimatePresence, motion } from 'motion/react'
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
      exclude: queryParams.exclude,
      category: queryParams.category
    },
    isUndefined
  )
  const productsQuery = useProductsQuery(queryConfig as IProductListConfig)
  const categoriesQuery = useCategoryQuery()
  const pagination = productsQuery.data?.data.data?.pagination
  const products = productsQuery.data?.data.data?.products
  const categories = categoriesQuery.data?.data.data

  return (
    <div className='bg-gray-100 py-6'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter categories={categories} queryConfig={queryConfig}></AsideFilter>
          </div>
          <div className='col-span-9'>
            <SortProductFilter
              queryConfig={queryConfig}
              pageSize={(pagination?.page_size as number) || 20}
            ></SortProductFilter>
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
              {products &&
                products.map((product, index) => (
                  <AnimatePresence key={product._id}>
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.25, 0.1, 0.25, 1],
                        delay: index * 0.03 // delay nhỏ để hiệu ứng xuất hiện so le
                      }}
                      // transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className='mt-6 col-span-1'
                    >
                      <Product product={product}></Product>
                    </motion.div>
                  </AnimatePresence>
                ))}
            </div>
            <AnimatePresence>
              {pagination && (
                <motion.div
                  key='pagination'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeOut',
                    delay: 0.3 // xuất hiện sau sản phẩm một chút
                  }}
                  className='mt-8 flex justify-center'
                >
                  <Pagination pageSize={pagination.page_size || 20} queryConfig={queryConfig} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
