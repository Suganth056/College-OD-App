import React from 'react'
import {Routes,Route} from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import './SideNavBar.css';
import { LuLogIn } from "react-icons/lu";
import {Link} from 'react-router-dom'
import LoginStudent from '../StudentsFolder/LoginStudent';
import { useState } from 'react';

const SideNavBar = () => {
  

  // SideNavigation's Start
  const [navOn,setNavOn]=useState(false);
  const [hoverOn,setHoverOn]=useState(false);

  const SetNavToggle=()=>{
    console.log("Toggled");
    if(!navOn){
      setNavOn(true);
    }
    else{
      setNavOn(false)
    }
  }

  const HoverToggle=()=>{
    setHoverOn(true);
  }
  const MouseMove=()=>{
    console.log("Mouse Away")
    setHoverOn(false)
  }
  // SideNavigation's End

  return (
    <div className='Side-Nav'>
            <nav className='Nav-container'>
              <div className='menu-container nav-nav-container'>
                  <FaBars className='icon-class icon-class-menu' onClick={()=>SetNavToggle()}/>  {/* Used to Broad Menu Tag  */}
                  <div className={`nav-text ${!navOn?'nav-text-off':''}`}>
                      <p>Menu</p>
                  </div>
                  
              </div>
              <div className='login-container nav-nav-container' onMouseOver={()=>HoverToggle()} onMouseLeave={()=>MouseMove()}>  {/* Used to expand Login MouseOver is like a hover and mouseLeave refers to unhover */}
                  <LuLogIn className='icon-class'/>
                  <div className={`nav-text ${!navOn?'nav-text-off':''}`}>
                    <p>Login</p>
                    <div className={`Login-list ${hoverOn?'Login-hover-on':'Login-hoverlist'}`} >
                      <Link className='item-list' to='/'>Student Login</Link>
                      <Link className='item-list' to='/advisorlogin'>Advisor Login</Link>
                      <Link className='item-list' to='/hodlogin'>HOD Login</Link>
                      <Link className='item-list' to='/principallogin'>Principal Login</Link>
                      <Link className='item-list' to='/adminlogin'>Admin Login</Link>
                    </div>
                  </div>
              </div>
            </nav>
        
        <Routes>
          <Route exact path="/" element={<LoginStudent />}/>
        </Routes>
    </div>
  )
}

export default SideNavBar;