import React from 'react'
import { Outlet } from 'react-router-dom'

const AdvisorInnerRoot = () => {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default AdvisorInnerRoot