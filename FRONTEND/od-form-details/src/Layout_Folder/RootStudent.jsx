import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentHomePage from '../StudentsFolder/OD_INFO_FOLDER/StudentHomePage'

const RootStudent = () => {
  return ( 
    <div>
        <StudentHomePage />
        <Outlet />
    </div>
  )
}

export default RootStudent