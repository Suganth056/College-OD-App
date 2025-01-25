import React,{useState,useEffect} from 'react'
import '../StudentsFolder/LoginStudent.css'
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../api/baseapi';
import { useDispatch } from 'react-redux'; 
import { modifyName, modifyObj, modifyUID } from '../features_Redux/userName';

const LoginPrincipal = () => {
    const [principal_ID,setID]=useState('');
    const [principal_pwd,setPwd]=useState('');
    const [principalData,setData]=useState([])

    const nav=useNavigate();
    const dispatch=useDispatch();

    const fetchData=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.get(`${BASE_URL}/principal`).then(res => res);
            setData(response.data);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        if(principalData.length){
            let state=false;
            for(let i=0;i<principalData.length;i++){
                if((principalData[i].Principal_ID_NUM === principal_ID) && (principalData[i].pwd === principal_pwd)){
                    state=true;
                    console.log("Login Success");
                    dispatch(modifyObj(principalData[i]));
                    dispatch(modifyName(principalData[i].PrincipalName));
                    dispatch(modifyUID(principal_ID));                   
                    nav('/principal-dashboard/dashboard')
                    break;
                }
            }
            if(!state){
                alert("Invalid User or Password");
            }
        }
    },[principalData])
  return (
    <div className='Principal-Login-container Login-container'>
        <h1>Principal Login Form</h1>
        <Link to='/' className='go-to-home'>Go to Home Page</Link>
        <div className='form-outline-container'>
            <form className='form-inline-container' onSubmit={(e)=>fetchData(e)}>
                <div className='login-heading'>
                    <h2>Login Form</h2>
                </div>
                <div className='input-field-container'>
                    <input type="text"  
                    placeholder='Enter ID Number' 
                    required
                    value={principal_ID}
                    onChange={(e)=>setID((Number)(e.target.value))}
                    />
                    <input type="password"  
                    placeholder='Password' 
                    required
                    value={principal_pwd}
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
                    <p>Didn't have an Account? <Link to='/principalsignup'>Create Account</Link></p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPrincipal