import React,{useState,useEffect} from 'react'
import '../StudentsFolder/SignUpStudent.css';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../api/baseapi';
import axios from 'axios';

const SignUpPrincipal = () => {
    const [principal_fname,setFname]=useState('');
    const [principal_lname,setLname]=useState('')
    const [principal_Id,setU_ID]=useState('')
    const [principal_Email,setUEmail]=useState('')
    const [principalGender,setU_Gender]=useState('Male')
    const [principalPh_no,setPh_No]=useState('')
    const [principalDob,setDOB]=useState("")
    const [principalAddress,setU_Address]=useState('')
    const [principalPwd,setU_Pwd]=useState('')

    const [principalDetail,setDetail]=useState([]);

    const nav=useNavigate();

    const fetchData=async(e)=>{ 
        e.preventDefault();
        try{
            const response=await axios.get(`${BASE_URL}/principal`).then(res => res);
            console.log(response)
            setDetail(response.data);
            console.log(principalDetail,"----");
        }
        catch(err){
            console.log(err,"ERROR____");
        }

    }

    const postData=async(obj)=>{
        console.log(obj)
        console.log("Posted")
        try{
            const response=await axios.put(`${BASE_URL}/principal/postData`,obj).then(res => res);
            console.log(response);
            nav('/principallogin')
        }
        catch(err){
            
        }
    }


    useEffect(()=>{
        if(principalDetail.length){
            let flag=false;
            for(let i=0;i<principalDetail.length;i++){
                if(principalDetail[i].Principal_ID_NUM === principal_Id){
                    flag=true;
                    if(!principalDetail[i].Email){
                        console.log("Entered into verified");
                        let obj={
                            principal_fname,
                            principal_lname,
                            principal_Email,
                            principal_Id,
                            principalPwd,
                            principalGender,
                            principalDob,
                            principalPh_no,principalAddress
                        }
                        postData(obj);
                        break;
                    }
                    else{
                        
                        alert("User Already Exists");
                        
                    }
                }
                
                
            }
            if(!flag){
                alert('Not a Valid User');
            }
        }
    },[principalDetail])

  return (
<div>
    <div className='SignUp-container'>
      
        <h2>Principal Account Creation Form</h2>
      
        <p className='pers-det'>Personal Details</p>
        <div className='signup-outline-container'>
          <form className='signup-inline-container' onSubmit={(e)=>fetchData(e)}>
              <div>
                  <p className='labelText'>First Name <span className='requiredSymbol'>*</span></p>
                  <input type="text" 
                  required
                  value={principal_fname}
                  onChange={(e)=>setFname(e.target.value)}
                  />
              </div>
              <div>
                  <p className='labelText'>Last Name <span className='requiredSymbol'>*</span></p>
                  <input type="text" 
                  required
                  value={principal_lname}
                  onChange={(e)=>setLname(e.target.value)}
                  />
              </div>
              <div>
                  <p className='labelText'>ID Number <span className='requiredSymbol'>*</span></p>
                  <input type="text" 
                  required
                  value={principal_Id}
                  onChange={(e)=>setU_ID((Number)(e.target.value))}
                  />
              </div>
              <div>
                  <p className='labelText'>Email <span className='requiredSymbol'>*</span></p>
                  <input type="email" 
                  required
                  value={principal_Email}
                  onChange={(e)=>setUEmail(e.target.value)}
                  />
              </div>
              <div>
                  <p className='labelText'>Gender <span className='requiredSymbol'>*</span></p>
                  <select name="" id="year" required value={principalGender} onChange={(e)=>setU_Gender(e.target.value)}>
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                  </select>
              </div>
              <div>
                  <p className='labelText'>Phone Number <span className='requiredSymbol'>*</span></p>
                  <input type="text" 
                  required
                  value={principalPh_no}
                  onChange={(e)=>setPh_No((Number)(e.target.value))}
                  />
              </div>
              <div>
                  <p className='labelText'>DOB <span className='requiredSymbol'>*</span></p>
                  <input type="date" 
                  required
                  value={principalDob}
                  onChange={(e)=>setDOB(e.target.value)}
                  />
              </div>
              <div>
                  <p className='labelText'>Address <span className='requiredSymbol'>*</span></p>
                  <textarea name="" id="" value={principalAddress} onChange={(e)=>setU_Address(e.target.value)}>

                  </textarea>
              </div>
              <div>
                  <p className='labelText'>Set Password <span className='requiredSymbol'>*</span></p>
                  <input type="password" 
                  required
                  value={principalPwd}
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

export default SignUpPrincipal