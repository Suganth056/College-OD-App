import React,{useState,useEffect} from 'react'
import '../StudentsFolder/SignUpStudent.css'
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../api/baseapi';
import axios from 'axios';

const SignUpAdvisor = () => {
    const [advisor_fname,setFname]=useState('');
    const [advisor_lname,setLname]=useState('')
    const [advisor_Id,setU_ID]=useState('')
    const [advisor_Email,setUEmail]=useState('')
    const [advisorDept,setDept]=useState('CSE');
    const [advisorYear,setYear]=useState('I');
    const [advisorGender,setU_Gender]=useState('Male')
    const [advisorPh_no,setPh_No]=useState('')
    const [advisorDob,setDOB]=useState("")
    const [advisorAddress,setU_Address]=useState('')
    const [advisorPwd,setU_Pwd]=useState('')

    const [advisorDetail,setDetail]=useState([]);

    const nav=useNavigate();

    const fetchData=async(e)=>{ 
        e.preventDefault();
        try{
            const response=await axios.get(`${BASE_URL}/advisor`).then(res => res);
            console.log(response)
            setDetail(response.data);
            console.log(advisorDetail,"----");
        }
        catch(err){
            console.log(err,"ERROR____")
        }

    }

    const postData=async(obj)=>{
        try{
            const response=await axios.put(`${BASE_URL}/advisor/postData`,obj).then(res => res);
            console.log(response);
            nav('/advisorlogin');
            
        }
        catch(err){
            console.log(err,"ERROR____")
        }
    }
    useEffect(()=>{
        if(advisorDetail.length){
            let flag=false;
            let count=0;
            for(let i=0;i<advisorDetail.length;i++){

                if(advisorDetail[i].Advisor_ID_NUM === advisor_Id){
                    if(!advisorDetail[i].Email){
                        let obj={
                            advisor_fname,
                            advisor_lname,
                            advisor_Id,
                            advisor_Email,
                            advisorDept,
                            advisorYear,
                            advisorGender,
                            advisorPh_no,
                            advisorDob,
                            advisorAddress,
                            advisorPwd
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

    },[advisorDetail])


  return (
    <div>
        <div className='SignUp-container'>
      
            <h2>Advisor Account Creation Form</h2>
      
            <p className='pers-det'>Personal Details</p>
            <div className='signup-outline-container'>
                <form className='signup-inline-container' onSubmit={(e)=>fetchData(e)}>
                    <div>
                        <p className='labelText'>First Name <span className='requiredSymbol'>*</span></p>
                        <input 
                        type="text" 
                        required
                        value={advisor_fname}
                        onChange={(e)=>setFname(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className='labelText'>Last Name <span className='requiredSymbol'>*</span></p>
                        <input 
                        type="text" 
                        required
                        value={advisor_lname}
                        onChange={(e)=>setLname(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className='labelText'>ID Number <span className='requiredSymbol'>*</span></p>
                        <input 
                        type="number" 
                        required
                        value={advisor_Id}
                        onChange={(e)=>setU_ID((Number)(e.target.value))}
                        />
                    </div>
                    <div>
                        <p className='labelText'>Email <span className='requiredSymbol'>*</span></p>
                        <input 
                        type="email" 
                        required
                        value={advisor_Email}
                        onChange={(e)=>setUEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className='labelText'>DEPT <span className='requiredSymbol'>*</span></p>
                        <select name="" id="Dept" value={advisorDept} onChange={(e)=>setDept(e.target.value)}>
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
                        <p className='labelText'>Advisor of Which Year<span className='requiredSymbol'>*</span></p>
                        <select name="" id="Year" value={advisorYear} onChange={(e)=>setYear(e.target.value)}>
                            <option value="">Select</option>
                            <option value="I">I</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                            <option value="IV">IV</option>
                        </select>
                    </div>
                    <div>
                        <p className='labelText'>Gender <span className='requiredSymbol'>*</span></p>
                        <select name="" id="gender" value={advisorGender} onChange={(e)=>setU_Gender(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="I">Male</option>
                                    <option value="II">Female</option>
                                    <option value="III">Others</option>
                        </select>
                    </div>
                    <div>
                        <p className='labelText'>Phone Number <span className='requiredSymbol'>*</span></p>
                        <input 
                        type="text" 
                        required
                        value={advisorPh_no}
                        onChange={(e)=>setPh_No((Number)(e.target.value))}
                        />
                    </div>
                    <div>
                        <p className='labelText'>DOB <span className='requiredSymbol'>*</span></p>
                        <input 
                        type="date" 
                        required
                        value={advisorDob}
                        onChange={(e)=>setDOB((e.target.value))}
                        />
                    </div>
                    <div>
                        <p className='labelText'>Address <span className='requiredSymbol'>*</span></p>
                        <textarea name="" id="" required value={advisorAddress} onChange={(e)=>setU_Address(e.target.value)}>

                        </textarea>
                    </div>
                    <div>
                        <p className='labelText'>Set Password <span className='requiredSymbol'>*</span></p>
                        <input 
                        type="password" 
                        required
                        value={advisorPwd}
                        onChange={(e)=>setU_Pwd(e.target.value)}
                        />
                    </div>
                    <div className='btn-submit-container'>
                        <button>Create Account</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignUpAdvisor