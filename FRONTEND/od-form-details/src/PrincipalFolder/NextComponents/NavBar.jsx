import React from 'react'
import {NavLink} from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='navbar-principal Admin-nav'>
        <nav>
            <NavLink to='/principal-dashboard/dashboard' className='link-tag link-tag-for-principal'>DashBoard</NavLink>
            <NavLink to='/principal-dashboard/edit-profile' className='link-tag link-tag-for-principal'>Edit Profile</NavLink>
        </nav>
    </div>
  )
}

export default NavBar