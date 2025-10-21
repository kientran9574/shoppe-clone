import React, { useEffect } from 'react'
import AsideFilter from './AsideFilter'
import Product from './Product/Product'
import SortProductFilter from './SortProductFilter/SortProductFilter'
import { useProductsQuery } from '../../hooks/useProduct'

const ProductList = () => {
  const productsQuery = useProductsQuery()
  const products = productsQuery.data?.data.data?.products
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
