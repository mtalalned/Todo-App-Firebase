import React from 'react'
import { Outlet } from 'react-router-dom'
import DrawerAppBar from './components/Navbar'

const Layout = () => {
  return (
    <>
      <DrawerAppBar />
      <Outlet />
    </>
  )
}

export default Layout
