import React from 'react'
import { useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './_layout/RegisterLayout'
import MainLayout from './_layout/MainLayout'

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductList></ProductList>
        </MainLayout>
      )
    },
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login></Login>
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register></Register>
        </RegisterLayout>
      )
    }
  ])
  return routeElements
}

export default useRouteElements
