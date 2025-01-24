import React from 'react'
import {NavLink} from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='navbar-hod Admin-nav'>
        <nav>
            <NavLink to='/hod-dashboard/dashboard' className='link-tag link-tag-for-hod'>DashBoard</NavLink>
            <NavLink to='/hod-dashboard/edit-profile' className='link-tag link-tag-for-hod'>Edit Profile</NavLink>
        </nav>
    </div>
  )
}

export default NavBar