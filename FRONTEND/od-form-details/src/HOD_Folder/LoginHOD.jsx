import React,{useState,useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../StudentsFolder/LoginStudent.css'
import axios from 'axios';
import BASE_URL from '../api/baseapi';
import { useDispatch } from 'react-redux'; 
import { modifyName, modifyObj, modifyUID } from '../features_Redux/userName';

const LoginHOD = () => {

    const [hod_ID,setID]=useState('');
    const [hod_pwd,setPwd]=useState('');
    const [hodData,setData]=useState([])

    const nav=useNavigate();
    const dispatch=useDispatch();
 
    const fetchData=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.get(`${BASE_URL}/hod`).then(res => res);
            setData(response.data);

        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        if(hodData.length){
            let state=false;
            for(let i=0;i<hodData.length;i++){
                if((hodData[i].HOD_ID_NUM === hod_ID) && (hodData[i].pwd === hod_pwd)){
                    state=true;
                    console.log("Login Success");
                    dispatch(modifyObj(hodData[i]));
                    dispatch(modifyName(hodData[i].HODName));
                    dispatch(modifyUID(hod_ID));
                    nav('/hod-dashboard/dashboard')
                    
                    break;
                }
            }
            if(!state){
                alert("Invalid User or Password");
            }
        }
    },[hodData])
  return (
    <div className='HOD-Login-container Login-container'>
        <h1>HOD Login Form</h1>
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
                    value={hod_ID}
                    onChange={(e)=>setID((Number)(e.target.value))}
                    />
                    <input 
                    type="text"  
                    placeholder='Password' 
                    required
                    value={hod_pwd}
                    onChange={(e)=>setPwd((e.target.value))}
                    />
                </div>
                <div className='forgot-details'>
                    <Link className='forgot-password'>Forgot Password ?</Link>
                </div>
                <div className='login-btn'>
                      <button type='submit'>Login</button>
                </div>
                <div className='footer-login'>
                    <p>Didn't have an Account? <Link to='/hodsignup'>Create Account</Link></p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginHOD