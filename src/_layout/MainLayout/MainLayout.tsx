import React, { type ReactNode } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
interface IProps {
  children?: ReactNode
}
const MainLayout = ({ children }: IProps) => {
  return (
    <>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  )
}

export default MainLayout
