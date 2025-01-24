import React from 'react';
import { Outlet } from 'react-router-dom'
import NavBar from '../HOD_Folder/NextComponents/NavBar'

const HODRoot = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default HODRoot