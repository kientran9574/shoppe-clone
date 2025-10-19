import React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './_layout/RegisterLayout'
import MainLayout from './_layout/MainLayout'
import Profile from './pages/Profile'
import { useAppContext } from './context/app.context'

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAppContext()
  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
const RejectedRoutes = () => {
  const { isAuthenticated } = useAppContext()
  return !isAuthenticated ? <Outlet /> : <Navigate to={'/'} />
}
const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: '/',
      index: true,
      element: (
        <MainLayout>
          <ProductList></ProductList>
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoutes></ProtectedRoutes>,
      children: [
        {
          path: '/profile',
          element: <Profile></Profile>
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoutes></RejectedRoutes>,
      children: [
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
      ]
    }
  ])
  return routeElements
}

export default useRouteElements
