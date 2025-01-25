import React,{useEffect, useState} from 'react';
import './LoginStudent.css';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../api/baseapi';
import { useDispatch } from 'react-redux';
import { modifyName, modifyObj, modifyUID } from '../features_Redux/userName';

const LoginStudent = () => {
    const [studentData,setStudentData]=useState([]);
    const [student_ID,setID]=useState('');
    const [student_pwd,setPwd]=useState('');

    const nav=useNavigate();
    const dispatch=useDispatch();

    const fetchData=async()=>{
        try{
            const response=await axios.get(`${BASE_URL}/student`).then(res => res);

            setStudentData(response.data);
        }
        catch(err){
            console.log(err);
            fetchData()
        }
    }
    const loginHandler=(e)=>{
        e.preventDefault();
        fetchData();
        console.log("Waiting");
    }

    useEffect(()=>{
        let flag=false,count=1;
        if(studentData.length){
            for(let i=0;i<studentData.length;i++){
                if((studentData[i].Student_ID_NUM === student_ID) && (studentData[i].pwd === student_pwd)){
                    console.log("password Matches at",i)
                    flag=true;
                    dispatch(modifyObj(studentData[i]));
                    dispatch(modifyName(studentData[i].StudentName));
                    dispatch(modifyUID(studentData[i].Student_ID_NUM));
                    nav('/student-dashboard/dashboard')
                }    
                else{
                    count++;
                }           
            }
            if(!flag && count>=1){
                alert("Invalid ID or Passwors");
            }
        }
    },[studentData])
  return (
    <div className='Student-Login-container Login-container'>
        <h1>Student Login Form</h1>
        <div className='form-outline-container'>
            <form className='form-inline-container' onSubmit={(e)=>loginHandler(e)}>
                <div className='login-heading'>
                    <h2>Login Form</h2>
                </div>
                <div className='input-field-container'>
                    <input 
                    type="text"  
                    placeholder='Enter ID_Number' 
                    required
                    value={student_ID}
                    onChange={(e)=>setID((Number)(e.target.value))}
                    />
                    <input 
                    type="password"  
                    placeholder='Enter Password' 
                    required
                    value={student_pwd}
                    onChange={(e)=>setPwd(e.target.value)}
                    />
                </div>
                <div className='forgot-details'>
                    <Link className='forgot-password'>Forgot Password ?</Link>
                </div>
                <div className='login-btn'>
                      <button type='submit'>Login</button>
                </div>
                <div className='footer-login'>
                    <p>Didn't have an Account? <Link to='/studaccountcreation'>Create Account</Link></p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginStudent;