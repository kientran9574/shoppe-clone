import React from 'react'
import { createSearchParams, Link } from 'react-router-dom'
import Input from '../../../components/input/Input'
import Button from '../../../components/Button'
import type { ICategory } from '../../../types/product.type'
import classNames from 'classnames'
import type { QueryConfig } from '../ProductList'
interface IProps {
  categories: ICategory[] | undefined
  queryConfig: QueryConfig
}
const AsideFilter = ({ categories, queryConfig }: IProps) => {
  const { category } = queryConfig
  return (
    <div className=''>
      <Link to={'/'} className='flex items-center font-bold'>
        <svg viewBox='0 0 12 10' className='w-3 h-4 mr-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <div className='bg-gray-400 h-[1px] w-[90%] my-4' />
      <ul>
        {categories &&
          categories.map((item) => {
            const isActive = (item: ICategory) => {
              return item._id === category
            }
            return (
              <li className='py-2 pl-2' key={item._id}>
                <Link
                  to={{
                    pathname: '/',
                    search: createSearchParams({
                      category: item._id
                    }).toString()
                  }}
                  className={classNames('relative px-2 ', {
                    'text-orange font-semibold': isActive(item),
                    'py-2 pl-2': !isActive(item)
                  })}
                >
                  <svg
                    viewBox='0 0 4 7'
                    className={classNames('h-2 w-2 absolute ', {
                      'fill-orange top-1 left-[-10px]': isActive(item),
                      hidden: !isActive(item)
                    })}
                  >
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                  {item.name}
                </Link>
              </li>
            )
          })}
        {/* 
        <li className='py-2 pl-2'>
          <Link to={'/'} className='relative px-2 '>
            Điện thoại
          </Link>
        </li> */}
      </ul>
      <div className='bg-gray-400 h-[1px] w-[90%] my-4' />
      <div className='flex flex-col gap-4'>
        <span className='text-gray-400'>Khoảng giá:</span>
        <form className='flex items-center'>
          <Input
            name='to'
            placeholder='Từ'
            className='w-[120px] border border-gray-200 rounded p-2 outline-none focus:border-orange transition-all'
          ></Input>
          <div className='w-5 h-[1.2px] bg-gray-400 flex-shrink-0 mx-2'></div>
          <Input
            name='to'
            placeholder='Đến'
            className='w-[120px] border border-gray-200 rounded p-2 outline-none focus:border-orange transition-all'
          ></Input>
        </form>
        <Button className='bg-orange text-white mt-4 py-2  active:opacity-80 transition-all'>Áp dụng</Button>
      </div>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='text-sm'>Đánh giá</div>
      <ul className='my-3'>
        <li className='py-1 pl-2'>
          <Link to='' className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg viewBox='0 0 9.5 8' className='w-4 h-4 mr-1' key={index}>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset={0} stopColor='#ffca11' />
                      <stop offset={1} stopColor='#ffad27' />
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    />
                  </defs>
                  <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}
            <span>Trở lên</span>
          </Link>
        </li>
        <li className='py-1 pl-2'>
          <Link to='' className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg viewBox='0 0 9.5 8' className='w-4 h-4 mr-1' key={index}>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset={0} stopColor='#ffca11' />
                      <stop offset={1} stopColor='#ffad27' />
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    />
                  </defs>
                  <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}
            <span>Trở lên</span>
          </Link>
        </li>
      </ul>
      <div className='bg-gray-300 h-[1px] my-4' />
      <Button className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center'>
        Xóa tất cả
      </Button>
    </div>
  )
}

export default AsideFilter
