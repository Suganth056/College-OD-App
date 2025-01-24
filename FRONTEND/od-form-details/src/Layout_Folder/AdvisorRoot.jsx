import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../AdvisorFolder/NextPageComponents/Navbar';

const AdvisorRoot = () => {
  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default AdvisorRoot