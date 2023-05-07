import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { checkAuthToken } from '../lib/checkAuthToken'
import AppBar from './ResponsiveAppBar'

const Layout = () => {
    let auth = checkAuthToken()

  return (
      <>
      <AppBar />
    {auth ? <Outlet /> : <Navigate to='/login' />}
    </>

  )
}

export default Layout