import React from 'react'
import { Link } from 'react-router-dom'
import IconShoppe from '../icons/IconShoppe'
interface IProps {
  title?: string
}
export default function RegisterHeader({ title }: IProps) {
  return (
    <div className='py-5'>
      <header className='max-w-7xl mx-auto px-4'>
        <nav className='flex items-end'>
          <Link to={'/'}>
            <IconShoppe></IconShoppe>
          </Link>
          <p className='ml-5 text-xl lg:text-2xl'>1123123123</p>
        </nav>
      </header>
    </div>
  )
}
