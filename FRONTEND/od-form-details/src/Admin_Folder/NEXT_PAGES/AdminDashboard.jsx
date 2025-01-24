import React from 'react'
import './AdminDashboard.css';
import { NavLink ,Routes,Route} from 'react-router-dom';
import StudentEntry from './EntryPages/StudentEntry';
import { useSelector } from 'react-redux';


const AdminDashboard = () => {
  const user_name=useSelector((state)=> state.UserName.uname);
  return ( 
    <div className='container-nav-and-dashboard'>
      <div className='dashboard-main-container'>
         <p>Welcome <span className='u-name'>{user_name}</span></p>
         <p>Logout</p>
         <p className='data-entry-tag'>Add Entry in Database</p>
      </div>

      <div className='entry-nav-container'>
            <NavLink className="entry-link" to='/admin-dashboard/dashboard/student-entry'>Student Entry</NavLink>
            <NavLink className="entry-link" to='/admin-dashboard/dashboard/advisor-entry'>Advisor Entry</NavLink>
            <NavLink className="entry-link" to='/admin-dashboard/dashboard/HOD-entry'>HOD Entry</NavLink>
            <NavLink className="entry-link" to='/admin-dashboard/dashboard/principal-entry'>Principal Entry</NavLink>
            <NavLink className="entry-link" to='/admin-dashboard/dashboard/admin-entry'>Admin Entry</NavLink>
      </div>
      <Routes>
        <Route path='/admin-dashboard/dashboard' element={<StudentEntry />}/>
      </Routes>
    </div>
  )
}

export default AdminDashboard