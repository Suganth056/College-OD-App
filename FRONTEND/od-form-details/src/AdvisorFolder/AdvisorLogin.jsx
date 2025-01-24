import React,{useState,useEffect} from 'react'
import {Link,useNavigate } from 'react-router-dom'
import '../StudentsFolder/LoginStudent.css'
import './AdvisorLogin.css'
import BASE_URL from '../api/baseapi';
import axios from 'axios';
import { useDispatch } from 'react-redux'; 
import { modifyName, modifyObj, modifyUID } from '../features_Redux/userName';

const AdvisorLogin = () => {
    const [advisorData,setData]=useState([]);
    const [advisor_ID,setID]=useState('');
    const [advisor_pwd,setPwd]=useState('');

    const nav=useNavigate();
    const dispatch=useDispatch();

    const fetchData=async()=>{
        try{
            const response=await axios.get(`${BASE_URL}/advisor`).then(res => res);
            console.log(response);
            setData(response.data);
        }
        catch(err){
            console.log(err);
            fetchData()
        }
    }
    const loginHandler=(e)=>{
        e.preventDefault();
        fetchData();
        // console.log("Waiting");
    }

    useEffect(()=>{
        let flag=false,count=1;
        if(advisorData.length){
            for(let i=0;i<advisorData.length;i++){
                if((advisorData[i].Advisor_ID_NUM === advisor_ID) && (advisorData[i].pwd === advisor_pwd)){
                    console.log("password Matches at",i);
                    flag=true;
                    dispatch(modifyObj(advisorData[i]));
                    dispatch(modifyName(advisorData[i].AdvisorName));
                    dispatch(modifyUID(advisor_ID));
                    nav('/advisor-dashboard/dashboard')
                }    
                else{
                    count++;
                }           
            }
            if(!flag && count>=1){
                alert("Invalid ID or Passwords");
            }
        }
        
    },[advisorData])
  return (
    <div className='Advisor-Login-container Login-container'>
        <h1>Advisor Login Form</h1>
        <Link to='/' className='go-to-home'>Go to Home Page</Link>
        <div className='form-outline-container'>
            <form className='form-inline-container' onSubmit={(e)=>loginHandler(e)}>
                <div className='login-heading'>
                    <h2>Login Form</h2>
                </div>
                <div className='input-field-container'>
                    <input type="text"  placeholder='Enter ID_NUMBER' required value={advisor_ID} onChange={(e)=>setID((Number)(e.target.value))}/>
                    <input type="password"  placeholder='Password' required value={advisor_pwd} onChange={(e)=>setPwd(e.target.value)}/>
                </div>
                <div className='forgot-details'>
                    <Link className='forgot-password'>Forgot Password ?</Link>
                </div>
                <div className='login-btn'>
                      <button>Login</button>
                </div>
                <div className='footer-login'>
                    <p>Didn't have an Account? <Link to='/advisorsignup'>Create Account</Link></p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AdvisorLogin;