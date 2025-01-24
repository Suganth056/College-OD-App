import React from 'react'
import {NavLink} from 'react-router-dom';
import './StudentHomePage.css';

const StudentHomePage = () => {
  return (
    <div className='Student-home'>
        <nav>
            <NavLink to='/student-dashboard/dashboard' className='link-tag-for-stud'>DashBoard</NavLink>
            <NavLink to='/student-dashboard/od-req-det' className='link-tag-for-stud'>O/D Request Details</NavLink>
            <NavLink to='/student-dashboard/edit-profile' className='link-tag-for-stud'>Edit Profile</NavLink>
        </nav>
    </div>
  )
}

export default StudentHomePage;