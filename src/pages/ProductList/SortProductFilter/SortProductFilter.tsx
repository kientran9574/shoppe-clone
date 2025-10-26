import React from 'react'
import type { QueryConfig } from '../ProductList'
import { sortBy, order as orderConstants } from '../../../constants/product'
import classNames from 'classnames'
import type { IProductListConfig } from '../../../types/product.type'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { omit } from 'lodash'
interface IProps {
  queryConfig: QueryConfig
  pageSize: number
}
const SortProductFilter = ({ queryConfig, pageSize }: IProps) => {
  const { sort_by = sortBy.view, order } = queryConfig
  const page = Number(queryConfig.page)
  const navigate = useNavigate()
  const isActiveSortBy = (sortByValue: Exclude<IProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }
  const handleSort = (sortByValue: Exclude<IProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: '/',
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue.toString()
          },
          ['order']
        )
      ).toString()
    })
  }
  const handlePriceOrder = (orderValue: Exclude<IProductListConfig['order'], undefined>) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price.toString(),
        order: orderValue.toString()
      }).toString()
    })
  }
  return (
    <div className='bg-[#ededed] p-2'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='text-base'>Sắp xếp theo:</div>
          <button
            className={classNames('h-8 px-4 capitalize text-sm text-center', {
              'bg-orange text-white hover:bg-orange/80 ': isActiveSortBy(sortBy.view),
              'bg-white text-black hover:bg-slate-100 ': !isActiveSortBy(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames('h-8 px-4 capitalize text-black text-sm  text-center', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.createdAt),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames('h-8 px-4 capitalize text-center', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.sold),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            className={classNames('p-2 text-sm cursor-pointer ouline-none border-none', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.price),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.price)
            })}
            value={order || ''}
            onChange={(e) => handlePriceOrder(e.target.value as Exclude<IProductListConfig['order'], undefined>)}
          >
            <option value='' disabled className='bg-white text-black '>
              Gía
            </option>
            <option value={orderConstants.asc} className='bg-white text-black '>
              Giá: Thấp đến cao
            </option>
            <option value={orderConstants.desc} className='bg-white text-black '>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex'>
            <Link
              to={{
                pathname: '/',
                search: createSearchParams({
                  ...queryConfig,
                  page: (page - 1).toString()
                }).toString()
              }}
              className='flex items-center justify-center px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed shadow'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </Link>
            <Link
              to={{
                pathname: '/',
                search: createSearchParams({
                  ...queryConfig,
                  page: (page + 1).toString()
                }).toString()
              }}
              className='flex items-center justify-center shadow px-3 h-8 rounded-tr-sm rounded-br-sm bg-white hover:bg-slate-100 '
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortProductFilter
