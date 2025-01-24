import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminDashboard from '../Admin_Folder/NEXT_PAGES/AdminDashboard'

const AdminEntryRoot = () => {
  return (
    <div> 
        <AdminDashboard />
        <Outlet />
    </div>
  )
}

export default AdminEntryRoot