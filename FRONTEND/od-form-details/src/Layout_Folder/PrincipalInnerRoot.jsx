import React from 'react'
import { Outlet } from 'react-router-dom'

const PrincipalInnerRoot = () => {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default PrincipalInnerRoot;