import React from 'react'
import { Outlet } from 'react-router-dom'

const StudentInnerRoot = () => {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default StudentInnerRoot