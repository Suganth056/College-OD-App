import React from 'react'
import './NavAdmin.css'
import {NavLink} from 'react-router-dom'
 
const NavAdmin = () => {
  return (
    <div className='Admin-nav'>
        <nav>
            <NavLink to='/admin-dashboard/dashboard' className='link-tag link-tag-for-admin'>DashBoard</NavLink>
            <NavLink to='/admin-dashboard/edit-profile' className='link-tag link-tag-for-admin'>Edit Profile</NavLink>
        </nav>
    </div>
  )
}

export default NavAdmin