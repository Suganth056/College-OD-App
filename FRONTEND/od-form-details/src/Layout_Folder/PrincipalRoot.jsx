import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../PrincipalFolder/NextComponents/NavBar'

const PrincipalRoot = () => {
  return (
    <div>
        <NavBar />
        <Outlet />
    </div>
  )
}

export default PrincipalRoot