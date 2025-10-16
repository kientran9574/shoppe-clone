import React from 'react'
import type { UseFormRegister } from 'react-hook-form'

interface IProps {
  type?: React.HTMLInputTypeAttribute | undefined
  register: UseFormRegister<any>
  errorsMessage: string | undefined
  className: string
  placeholder: string
  id: string
  name: string
}

const Input = ({ type, register, errorsMessage, className, placeholder, id, name }: IProps) => {
  return (
    <>
      <input type={type} id={id} placeholder={placeholder} {...register(name)} className={className}></input>
      <div className='text-red-500 mt-1 text-sm'>{errorsMessage}</div>
    </>
  )
}

export default Input
