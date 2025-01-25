import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import '../StudentsFolder/LoginStudent.css'
import BASE_URL from '../api/baseapi'; 
import axios from 'axios';
import { useDispatch } from 'react-redux'; 
import { modifyName, modifyObj, modifyUID } from '../features_Redux/userName';

const LoginAdmin = () => {

    const [admin_ID,setAdmin_ID]=useState(0);
    const [admin_pwd,setAdmin_pwd]=useState('');
    const [admin_data,setAdmin_data]=useState([])

    const nav=useNavigate();
    const dispatch=useDispatch();

    const fetchData=async()=>{
        try{
            let res=await axios.get(`${BASE_URL}/admin`);
            setAdmin_data(res.data);

        }
        catch(err){
            console.log("Error",err)
        }
    }

    const loginHandler=(e)=>{
        e.preventDefault();
        console.log(admin_ID,"____",admin_pwd);
        fetchData();
    }




    useEffect(()=>{
        // console.log(admin_data);
        if(admin_data.length){
            const arr=admin_data.filter((adminData)=>{
                return (adminData.ID_NUM===admin_ID && adminData.pwd===admin_pwd);
             })
             if(arr.length){
                 dispatch(modifyObj(arr[0]));
                 dispatch(modifyName(arr[0].AdminName));
                 dispatch(modifyUID(arr[0].ID_NUM));
                 console.log("Login Successfully")
                 nav('/admin-dashboard/dashboard/student-entry');
             }
             else{
                 alert("Invalid ID or Password");
                 console.log("Unsuccessful")
             }
        }
    },[admin_data])

  return (
    <div className='Principal-Login-container Login-container'>
    <h1>Admin Login Form</h1>
    <Link to='/' className='go-to-home'>Go to Home Page</Link>
    <div className='form-outline-container'>
        <form className='form-inline-container' onSubmit={(e)=>loginHandler(e)}>
            <div className='login-heading'>
                <h2>Login Form</h2>
            </div>
            <div className='input-field-container'>
                <input type="number" 
                placeholder='Enter ID Number' 
                required
                onChange={(e)=>setAdmin_ID((Number)(e.target.value))}
                />
                <input type="password"  
                placeholder='Password'
                required
                onChange={(e)=>setAdmin_pwd(e.target.value)}
                />
            </div>
            <div className='forgot-details'>
                <Link className='forgot-password'>Forgot Password ?</Link>
            </div>
            <div className='login-btn'>
                  <button>Login</button>
            </div>
            <div className='footer-login'>
                <p>Didn't have an Account? <Link to='/adminsignup'>Create Account</Link></p>
            </div>
        </form>
    </div>
</div>
  )
}

export default LoginAdmin