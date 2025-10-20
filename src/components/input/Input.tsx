import React, { type InputHTMLAttributes } from 'react'
import type { UseFormRegister } from 'react-hook-form'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>
  errorsMessage?: string | undefined
  name?: string
}

const Input = ({ type, register, errorsMessage, className, placeholder, id, name }: IProps) => {
  const newRegister = register && name ? register(name) : {}
  return (
    <>
      <input type={type} id={id} placeholder={placeholder} {...newRegister} className={className}></input>
      <div className='text-red-500 mt-1 text-sm'>{errorsMessage}</div>
    </>
  )
}

export default Input
