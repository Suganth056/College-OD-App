import React,{useState,useEffect} from 'react'
import '../StudentsFolder/SignUpStudent.css';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../api/baseapi';
import axios from 'axios';

const SignUpHOD = () => {
    const [hod_fname,setFname]=useState('');
    const [hod_lname,setLname]=useState('')
    const [hod_Id,setU_ID]=useState('')
    const [hod_Email,setUEmail]=useState('')
    const [hodDept,setDept]=useState('CSE');
    const [hodGender,setU_Gender]=useState('Male')
    const [hodPh_no,setPh_No]=useState('')
    const [hodDob,setDOB]=useState("")
    const [hodAddress,setU_Address]=useState('')
    const [hodPwd,setU_Pwd]=useState('')

    const [hodDetail,setDetail]=useState([]);

    const nav=useNavigate();

    const fetchData=async(e)=>{ 
        e.preventDefault();
        try{
            const response=await axios.get(`${BASE_URL}/hod`).then(res => res);
            console.log(response)
            setDetail(response.data);
            console.log(hodDetail,"----");
        }
        catch(err){
            console.log(err,"ERROR____");
        }

    }

    const postData=async(obj)=>{
        try{
            const response=await axios.put(`${BASE_URL}/hod/postData`,obj).then(res => res);
            console.log(response);
            nav('/hodlogin');
            
        }
        catch(err){
            console.log(err,"ERROR____")
        }
    }

    useEffect(()=>{
            if(hodDetail.length){
                let flag=false;
                let count=0;
                for(let i=0;i<hodDetail.length;i++){
    
                    if(hodDetail[i].HOD_ID_NUM === hod_Id){
                        if(!hodDetail[i].Email){
                            let obj={
                                hod_fname,
                                hod_lname,
                                hod_Id,
                                hod_Email,
                                hodDept,
                                hodGender,
                                hodPh_no,
                                hodDob,
                                hodAddress,
                                hodPwd
                            }
                            flag=true;
                            postData(obj);
                            break;
                        }
                        else{
                            alert("Already User Exists");
                        }
                    }
                    else{
                        count++;
                    }
                }
                if(!flag && count>=1){
                    alert("Not a Valid User");
                }
            }
    
        },[hodDetail])
  return (

    <div>
        <div className='SignUp-container'>
      
            <h2>HOD Account Creation Form</h2>
            
            <p className='pers-det'>Personal Details</p>
            <div className='signup-outline-container'>
                <form className='signup-inline-container' onSubmit={(e)=>fetchData(e)}>
                    <div>
                        <p className='labelText'>First Name <span className='requiredSymbol'>*</span></p>
                        <input 
                        type="text" 
                        required
                        value={hod_fname}
                        onChange={(e)=>setFname(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className='labelText'>Last Name <span className='requiredSymbol'>*</span></p>
                        <input 
                        type="text" 
                        required
                        value={hod_lname}
                        onChange={(e)=>setLname(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className='labelText'>ID Number <span className='requiredSymbol'>*</span></p>
                        <input 
                        type="text" 
                        required
                        value={hod_Id}
                        onChange={(e)=>setU_ID((Number)(e.target.value))}
                        />
                    </div>
                    <div>
                        <p className='labelText'>Email <span className='requiredSymbol'>*</span></p>
                        <input 
                        type="email" 
                        required
                        value={hod_Email}
                        onChange={(e)=>setUEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className='labelText'>DEPT <span className='requiredSymbol'>*</span></p>
                        <select name="" id="year" required value={hodDept} onChange={(e)=>setDept(e.target.value)}>
                            <option value="">Select</option>
                            <option value="CSE">CSE</option>
                            <option value="ECE">ECE</option>
                            <option value="EEE">EEE</option>
                            <option value="B-Tech.BioTech">B-Tech.BioTech</option>
                            <option value="MECH">MECH</option>
                            <option value="AIDS">AIDS</option>
                            <option value="MECH">IT</option>
                            <option value="AIDS">BioMedical</option>
                        </select>
                    </div>
            
                    <div>
                        <p className='labelText'>Gender <span className='requiredSymbol'>*</span></p>
                        <select name="" id="year" value={hodGender} onChange={(e)=>setU_Gender(e.target.value)} >
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
                        value={hodPh_no}
                        onChange={(e)=>setPh_No((Number)(e.target.value))}
                        />
                    </div>
                    <div>
                        <p className='labelText'>DOB <span className='requiredSymbol'>*</span></p>
                        <input 
                        type="date" 
                        required
                        value={hodDob}
                        onChange={(e)=>setDOB(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className='labelText'>Address <span className='requiredSymbol'>*</span></p>
                        <textarea name="" id="" required value={hodAddress} onChange={(e)=>setU_Address(e.target.value)}>

                        </textarea>
                    </div>
                    <div>
                        <p className='labelText'>Password <span className='requiredSymbol'>*</span></p>
                        <input 
                        type="text" 
                        required
                        value={hodPwd}
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

export default SignUpHOD