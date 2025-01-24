import React from 'react'
import '../../Admin_Folder/NEXT_PAGES/NavAdmin.css'
import {NavLink} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='navbar-advisor Admin-nav'>
        <nav>
            <NavLink to='/advisor-dashboard/dashboard' className='link-tag link-tag-for-advisor'>DashBoard</NavLink>
            <NavLink to='/advisor-dashboard/edit-profile' className='link-tag link-tag-for-advisor'>Edit Profile</NavLink>
        </nav>
    </div>
  )
}

export default Navbar