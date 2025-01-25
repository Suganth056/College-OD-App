import React, { useEffect, useState } from 'react'
import '../StudentsFolder/SignUpStudent.css'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import BASE_URL from '../api/baseapi';

const SignUpAdmin = () => {

    const [ufname,setFname]=useState('');
    const [ulname,setLname]=useState('')
    const [uId,setU_ID]=useState(0)
    const [uEmail,setUEmail]=useState('')
    const [uGender,setU_Gender]=useState('Male')
    const [uPh_no,setPh_No]=useState(0)
    const [uDob,setDOB]=useState("")
    const [uAddress,setU_Address]=useState('')
    const [uPwd,setU_Pwd]=useState('')
    const [stateManager,setState]=useState(false);

    let [admindata,setAdminData]=useState([]);
    let count=0;

    const nav=useNavigate();

    const fetchData=async()=>{
        let arr=await axios.get(`${BASE_URL}/admin`);

        let newArr=await arr.data;  
        await setAdminData(newArr)     
    }

    const postData=async (obj)=>{
        try{ 
            const response=axios.post(`${BASE_URL}/adminSignup`,obj).then(res => console.log(res))
            // console.log(obj,postD);
            
        }
        catch(err){
            console.log(err)
        }
    }

    const signup_handler=(e)=>{
        e.preventDefault();
        console.log("Submitted successfully");
        fetchData();

    }

    useEffect(()=>{
        console.log(admindata);
        for(let i=0;i<admindata.length;i++){
            

            if(((admindata[i].ID_NUM) === uId)){
                console.log("Loop True")
                setState(true);
                if(((admindata[i].ID_NUM) === uId) && (admindata[i].email !== null)){
                    alert("Account Already Created");
                    break;
                }
                let obj={
                    ufname,
                    ulname,
                    uId,
                    uEmail,
                    uGender,
                    uPh_no,
                    uDob,
                    uAddress,
                    uPwd
                }
                postData(obj);
                nav('/adminlogin');
            }
            else{
                count++;
                console.log("Loop false")
                
            }
        }
        if(!stateManager && count>=1){
            alert("Not a Valid User");
        }

        
        // console.log(state)
    },[admindata])
     


  return (
    <div>
        <div className='SignUp-container'>
        
            <h2>Admin Account Creation Form</h2>
        
            <p className='pers-det'>Personal Details</p>
            <div className='signup-outline-container'>
                <form className='signup-inline-container' onSubmit={(e)=>signup_handler(e)}>
                    <div>
                        <p className='labelText'>First Name <span className='requiredSymbol'>*</span></p>
                        <input type="text" 
                        required
                        onChange={(e)=>setFname(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className='labelText'>Last Name <span className='requiredSymbol'>*</span></p>
                        <input type="text" 
                        required
                        value={ulname}
                        onChange={(e)=>setLname(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className='labelText'>ID Number <span className='requiredSymbol'>*</span></p>
                        <input
                        type="text" 
                        required
                        onChange={(e)=>setU_ID((Number)(e.target.value))}
                        />
                    </div>
                    <div>
                        <p className='labelText'>Email<span className='requiredSymbol'>*</span></p>
                        <input 
                        type="email" 
                        required
                        onChange={(e)=>setUEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className='labelText'>Gender <span className='requiredSymbol'>*</span></p>
                        <select name="" id="gender" onChange={(e)=>setU_Gender(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>
                        </select>
                    </div>
                    <div>
                        <p className='labelText'>Phone Number <span className='requiredSymbol'>*</span></p>
                        <input 
                        type="text" 
                        required
                        onChange={(e)=>setPh_No(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className='labelText'>DOB <span className='requiredSymbol'>*</span></p>
                        <input 
                        type="date" 
                        required
                        onChange={(e)=>setDOB(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className='labelText'>Address <span className='requiredSymbol'>*</span></p>
                        <textarea name="" id="" onChange={(e)=>setU_Address(e.target.value)}>

                        </textarea>
                    </div>
                    <div>
                        <p className='labelText'>Set Password <span className='requiredSymbol'>*</span></p>
                        <input 
                        type="password" 
                        required
                        onChange={(e)=>setU_Pwd(e.target.value)}
                        />
                    </div>
                    <div className='btn-submit-container'>
                        <button type='submit'>Create Account</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignUpAdmin