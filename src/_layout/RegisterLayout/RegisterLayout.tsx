import React, { type ReactNode } from 'react'
import Footer from '../../components/Footer'
import RegisterHeader from '../../components/RegisterHeader'
interface IProps {
  children?: ReactNode
}
export default function RegisterLayout({ children }: IProps) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer></Footer>
    </div>
  )
}
