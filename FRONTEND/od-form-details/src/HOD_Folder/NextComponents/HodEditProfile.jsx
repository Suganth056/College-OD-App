import React,{useState} from 'react'
import { FaEdit } from "react-icons/fa";
import BASE_URL from '../../api/baseapi'; 
import axios from 'axios'; 
import { useSelector,useDispatch } from 'react-redux';
import Calender from '../../Calender';
import { modifyName, modifyObj, modifyUID } from '../../features_Redux/userName';

const HodEditProfile = () => {

    let user_detail=useSelector((state)=> state.UserName.obj);

    const [hod_fname,setFname]=useState(user_detail.HODName);
    const [hod_lname,setLname]=useState(user_detail.HODLastName);
    const [hod_Id,setU_ID]=useState(user_detail.HOD_ID_NUM);
    const [hod_Email,setUEmail]=useState(user_detail.Email);
    const [hodDept,setDept]=useState(user_detail.Dept);
    const [hodGender,setU_Gender]=useState(user_detail.Gender);
    const [hodPh_no,setPh_No]=useState(user_detail.phone_num);
    const [hodDob,setDOB]=useState(Calender(user_detail.dob));
    const [hodAddress,setU_Address]=useState(user_detail.address);
    const [hodPwd,setU_Pwd]=useState(user_detail.pwd);

    const [editable,setEdit]=useState(false);
    const dispatch=useDispatch();

    const postingData=async(e)=>{
      e.preventDefault();
      let obj={
       hod_fname,
       hod_lname,
       hod_Id,
       hodDept,
       hodGender,
       hod_Email,
       hodDob,
       hodAddress,
       hodPh_no,
       hodPwd
    }
      if(editable){
          try{
            console.log("OBJJJJJJJJJJ",obj)
            const response=await axios.put(`${BASE_URL}/hod/postData`,obj).then(res => res);
            console.log(response);
            alert("Updated Successfully");
            dispatch(modifyObj({
              HODName:hod_fname,
              HODLastName:hod_lname,
              HOD_ID_NUM:hod_Id,
              Dept:hodDept,
              Gender:hodGender,
              Email:hod_Email,
              dob:hodDob,
              address:hodAddress,
              phone_num:hodPh_no,
              pwd:hodPwd
            }));
            dispatch(modifyUID(hod_Id));
            dispatch(modifyName(hod_fname));
              
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
                    value={hod_fname}
                    onChange={(e)=>setFname(e.target.value)}
                    />
                </div> 
                <div>
                  <p className='labelText'>Last Name <span className='requiredSymbol'>*</span></p>
                  <input type="text"
                  className='edit-content' 
                  readOnly
                  required
                  value={hod_lname}
                  onChange={(e)=>setLname(e.target.value)}
                  />
                </div>
                <div>
                  <p className='labelText'>ID Number <span className='requiredSymbol'>*</span></p>
                  <input type="text"
                  className='edit-content' 
                  readOnly
                  required
                  value={hod_Id}
                  onChange={(e)=>setU_ID((Number)(e.target.value))}
                  />
                </div>
                <div>
                  <p className='labelText'>Email <span className='requiredSymbol'>*</span></p>
                  <input type="email"
                  className='edit-content' 
                  readOnly
                  required
                  value={hod_Email}
                  onChange={(e)=>setUEmail(e.target.value)}
                  />
                </div>
                <div>
                  <p className='labelText'>DEPT<span className='requiredSymbol'>*</span></p>
                  <select name="" id="Dept" className='edit-content' readOnly value={hodDept} onChange={(e)=>setDept(e.target.value)}>
                    <option value="">SELECT DEPT</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                    <option value="BioMedical">BioMedical</option>
                    <option value="B-Tech IT">B-Tech IT</option>
                    <option value="B-Tech BioTech">B-Tech BioTech</option>
                    <option value="AIDS">AIDS</option>
                  </select>
                </div>
                <div>
                  <p className='labelText'>Gender<span className='requiredSymbol'>*</span></p>
                  <select name="" id="Gender" value={hodGender} onChange={(e)=>setU_Gender(e.target.value)}>
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
                  value={hodPh_no}
                  onChange={(e)=>setPh_No((Number)(e.target.value))}
                  />
                </div>
                <div>
                  <p className='labelText'>DOB <span className='requiredSymbol'>*</span></p>
                  <input type="date"
                  className='edit-content' 
                  readOnly
                  required
                  value={hodDob}
                  onChange={(e)=>setDOB(e.target.value)}
                  />
                </div>
                <div>
                  <p className='labelText'>Address <span className='requiredSymbol '>*</span></p>
                  <textarea name="" id="" className='edit-content' required readOnly value={hodAddress} onChange={(e)=>setU_Address(e.target.value)}>
                  </textarea>
                </div>
                <div>
                  <p className='labelText'>Password <span className='requiredSymbol'>*</span></p>
                  <input type="password"
                  className='edit-content' 
                  readOnly
                  required
                  value={hodPwd}
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

export default HodEditProfile