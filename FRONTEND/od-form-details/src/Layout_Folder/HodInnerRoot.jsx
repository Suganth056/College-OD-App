import React from 'react'
import { Outlet } from 'react-router-dom';

const HodInnerRoot = () => {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default HodInnerRoot