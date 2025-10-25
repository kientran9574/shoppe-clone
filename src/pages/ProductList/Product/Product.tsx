import React from 'react'
import { Link } from 'react-router-dom'
import type { IProduct } from '../../../types/product.type'
import { formatCurrency, formatNumberToSocial } from '../../../utils/utils'
import ProductRating from '../ProductRating/ProductRating'

interface IProps {
  product: IProduct
}
const Product = ({ product }: IProps) => {
  return (
    <Link to={'/'}>
      <div className='overflow-hidden rounded-sm bg-white '>
        <div className='relative w-full pt-[100%]'>
          <img
            src={product.image}
            alt={Product.name}
            className='absolute top-0 left-0 bg-white w-full h-full object-cover'
          />
        </div>
        <div className='p-2 overflow-hidden'>
          <p className='min-h-[2rem] text-gray-500 text-sm line-clamp-2'>{product.name}</p>
          <div className='flex items-center mt-3'>
            <div className='line-through max-w-[50%] text-gray-500 truncate'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='text-orange truncate ml-1'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='flex items-center justify-between gap-1 mt-3'>
            <ProductRating rating={product.rating}></ProductRating>
            <div className='text-xs'>
              <span className='text-xs'>{formatNumberToSocial(product.quantity)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
