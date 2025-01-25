import React,{useState,useEffect} from 'react';
import { FaEdit } from "react-icons/fa";
import BASE_URL from '../../api/baseapi'; 
import axios from 'axios'; 
import { useSelector,useDispatch } from 'react-redux';
import Calender from '../../Calender';
import { modifyName, modifyObj, modifyUID } from '../../features_Redux/userName';

const PrincipalEditProfile = () => {

  let user_detail=useSelector((state)=> state.UserName.obj);


  const [principal_fname,setFname]=useState((user_detail.PrincipalName?user_detail.PrincipalName:""));
  const [principal_lname,setLname]=useState((user_detail.PrincipalLastName?user_detail.PrincipalLastName:""));
  const [principal_Id,setU_ID]=useState((user_detail.Principal_ID_NUM?user_detail.Principal_ID_NUM:""));
  const [principal_Email,setUEmail]=useState((user_detail.Email?user_detail.Email:""));
  const [principalGender,setU_Gender]=useState((user_detail.Gender?user_detail.Gender:""));
  const [principalPh_no,setPh_No]=useState((user_detail.phone_num?user_detail.phone_num:""));
  const [principalDob,setDOB]=useState(user_detail.dob?Calender(user_detail.dob):"");
  const [principalAddress,setU_Address]=useState((user_detail.address?user_detail.address:""));
  const [principalPwd,setU_Pwd]=useState((user_detail.pwd?user_detail.pwd:""));

  const [editable,setEdit]=useState(false);
  const dispatch=useDispatch();

  const postingData=async(e)=>{
    e.preventDefault();
    let obj={
     principal_fname,
     principal_lname,
     principal_Id,
     principal_Email,
     principalGender,
     principalPh_no,
     principalPwd,
     principalDob,
     principalAddress
  }
    if(editable){
        try{

          const response=await axios.put(`${BASE_URL}/principal/postData`,obj).then(res => res);

          alert("Updated Successfully");
          dispatch(modifyObj({
            PrincipalName:principal_fname,
            PrincipalLastName:principal_lname,
            Principal_ID_NUM:principal_Id,
            Gender:principalGender,
            Email:principal_Email,
            dob:principalDob,
            address:principalAddress,
            phone_num:principalPh_no,
            pwd:principalPwd
          }));
          dispatch(modifyUID(principal_Id));
          dispatch(modifyName(principal_fname));
            
        }
        catch(err){
            console.log(err)
        }
    }
    else{
        console.log("press Edit");
    }
  }

  const setEditable=()=>{
    console.log("Editing...")
    setEdit(true);
    let x=document.querySelectorAll('.edit-content');
    for(let i=0;i<x.length;i++){
        x[i].removeAttribute("readOnly")
    }
   }
  return (
    <div>
      <div className='SignUp-container'> 
            <p className='pers-det'>Personal Details</p>
            <div className='edit-container' onClick={()=>setEditable()}>
              <FaEdit />
              <span>Edit Profile</span>
            </div>
            <div className='signup-outline-container'>
              <form className='signup-inline-container' onSubmit={(e)=>postingData(e)}>
                <div>
                  <p className='labelText'>First Name <span className='requiredSymbol'>*</span></p>
                    <input type="text"
                    className='edit-content' 
                    required
                    readOnly
                    value={principal_fname}
                    onChange={(e)=>setFname(e.target.value)}
                    />
                </div> 
                <div>
                  <p className='labelText'>Last Name <span className='requiredSymbol'>*</span></p>
                  <input type="text"
                  className='edit-content' 
                  readOnly
                  required
                  value={principal_lname}
                  onChange={(e)=>setLname(e.target.value)}
                  />
                </div>
                <div>
                  <p className='labelText'>ID Number <span className='requiredSymbol'>*</span></p>
                  <input type="text"
                  className='edit-content' 
                  readOnly
                  required
                  value={principal_Id}
                  onChange={(e)=>setU_ID((Number)(e.target.value))}  
                  />
                </div>
                <div>
                  <p className='labelText'>Email <span className='requiredSymbol'>*</span></p>
                  <input type="email"
                  className='edit-content' 
                  readOnly
                  required
                  value={principal_Email}
                  onChange={(e)=>setUEmail(e.target.value)}  
                  />
                </div>
          
                <div>
                  <p className='labelText'>Gender<span className='requiredSymbol'>*</span></p>
                  <select name="" id="Gender" value={principalGender} onChange={(e)=>setU_Gender(e.target.value)}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div>
                  <p className='labelText'>Phone Number <span className='requiredSymbol'>*</span></p>
                  <input type="text"
                  className='edit-content' 
                  readOnly
                  required
                  value={principalPh_no}
                  onChange={(e)=>setPh_No((Number)(e.target.value))}  
                  />
                </div>
                <div>
                  <p className='labelText'>DOB <span className='requiredSymbol'>*</span></p>
                  <input type="date"
                  className='edit-content' 
                  readOnly
                  required
                  value={principalDob}
                  onChange={(e)=>setDOB(e.target.value)} 
                  />
                </div>
                <div>
                  <p className='labelText'>Address <span className='requiredSymbol '>*</span></p>
                  <textarea name="" id="" className='edit-content' required readOnly value={principalAddress} onChange={(e)=>setU_Address(e.target.value)}>
                  </textarea>
                </div>
                <div>
                  <p className='labelText'>Password <span className='requiredSymbol'>*</span></p>
                  <input type="password"
                  className='edit-content' 
                  readOnly
                  required
                  value={principalPwd}
                  onChange={(e)=>setU_Pwd(e.target.value)} 
                  />
                </div>
                <div className='btn-submit-container'>
                  <button type='submit'>Submit</button>
                </div>
              </form>
            </div>
          </div>
    </div>
  )
}

export default PrincipalEditProfile