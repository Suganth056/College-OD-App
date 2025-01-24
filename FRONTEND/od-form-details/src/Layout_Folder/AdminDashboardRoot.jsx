import React from 'react'
import NavAdmin from '../Admin_Folder/NEXT_PAGES/NavAdmin'
import { Outlet } from 'react-router-dom'


const AdminDashboardRoot = () => {
  return (
    <div>
        <NavAdmin /> 
        <Outlet />
    </div>
  )
}

export default AdminDashboardRoot