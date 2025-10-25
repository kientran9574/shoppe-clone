import React from 'react'
import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
import type { QueryConfig } from '../../pages/ProductList/ProductList'
interface IPagigation {
  pageSize: number
  queryConfig: QueryConfig
}
const Pagination = ({ pageSize, queryConfig }: IPagigation) => {
  const page = Number(queryConfig.page)
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        // only render unique
        dotAfter = true
        return (
          <button key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 border'>
            ...
          </button>
        )
      }
      return null
    }
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        // only render unique
        dotBefore = true
        return (
          <button key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 border'>
            ...
          </button>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        const RANGE = 2
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (page + RANGE < pageNumber && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: '/',
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames('bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border', {
              'border-cyan-500': pageNumber === page,
              'border-transparent': pageNumber !== page
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      {page === 1 ? (
        <span className='bg-gray-200 rounded px-3 py-2 shadow-sm mx-2  border cursor-not-allowed '>Prev</span>
      ) : (
        <Link
          to={{
            pathname: '/',
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer  border'
        >
          Prev
        </Link>
      )}

      {renderPagination()}
      {page === pageSize ? (
        <span className='bg-gray-200 rounded px-3 py-2 shadow-sm mx-2 cursor-not-allowed border'>Next</span>
      ) : (
        <Link
          to={{
            pathname: '/',
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer  border'
        >
          Next
        </Link>
      )}
    </div>
  )
}

export default Pagination
