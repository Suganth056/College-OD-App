import React,{useState} from 'react'
import { FaEdit } from "react-icons/fa";
import '../../../Admin_Folder/NEXT_PAGES/AdminEditProfile.css';
import { useSelector,useDispatch } from 'react-redux';
import BASE_URL from '../../../api/baseapi';
import axios from 'axios';
import formatDate from '../../../Calender';
import { modifyObj,modifyName,modifyUID } from '../../../features_Redux/userName';


const StudentEditProfile = () => {
  const user_detail=useSelector((state)=> state.UserName.obj); 

  const dispatch=useDispatch();

  const [ufname,setFname]=useState((user_detail.StudentName?user_detail.StudentName:""));
  const [ulname,setLname]=useState((user_detail.StudentLastName?user_detail.StudentLastName:""));
  const [uId,setU_ID]=useState((user_detail.Student_ID_NUM?user_detail.Student_ID_NUM:""));
  const [uReg_no,setRegNo]=useState((user_detail.RegisterNum?user_detail.RegisterNum:""));
  const [uEmail,setUEmail]=useState((user_detail.Email?user_detail.Email:""))
  const [udept,setDept]=useState((user_detail.DEPT?user_detail.DEPT:""));
  const [uregulation,setRegulation]=useState(user_detail.Regulation)
  const [uAcademicYear,setYear]=useState((user_detail.YearOfStudying?user_detail.YearOfStudying:""));
  const [uGender,setU_Gender]=useState((user_detail.Gender?user_detail.Gender:"Select"));
  const [uPh_no,setPh_No]=useState((user_detail.phone_num?user_detail.phone_num:""));
  const [uDob,setDOB]=useState((user_detail.dob?formatDate(user_detail.dob):""))
  const [uAddress,setU_Address]=useState((user_detail.address?user_detail.address:""))
  const [uPwd,setU_Pwd]=useState((user_detail.pwd?user_detail.pwd:""))

  const [editable,setEdit]=useState(false);

  const setEditable=()=>{
    console.log("Editing...")
    setEdit(true);
    let x=document.querySelectorAll('.edit-content');
    for(let i=0;i<x.length;i++){
        x[i].removeAttribute("readOnly")
    }
   
  }

  const postingData=async(e)=>{
    e.preventDefault();
    let obj={
      studentAddress:uAddress,
      studentDept:udept,
      studentDob:uDob,
      studentGender:uGender,
      studentPh_no:uPh_no,
      studentPwd:uPwd,
      studentYear:uAcademicYear,
      student_Email:uEmail,
      student_Id:uId,
      student_fname:ufname,
      student_lname:ulname,
      student_roll_num:uReg_no,
      regulation:uregulation        
    }
    if(editable){
        try{
          const postRes=await axios.put(`${BASE_URL}/student/postData`,obj).then(res => res);
          // console.log(postRes)
          alert("Updated Successfully");
          dispatch(modifyObj({
            address:uAddress,
            DEPT:udept,
            dob:uDob,
            Gender:uGender,
            phone_num:uPh_no,
            pwd:uPwd,
            YearOfStudying:uAcademicYear,
            Email:uEmail,
            Student_ID_NUM:uId,
            StudentName:ufname,
            StudentLastName:ulname,
            RegisterNum:uReg_no,
            Regulation:uregulation 
          }))
          dispatch(modifyName(ufname));
          dispatch(modifyUID(uId));
          
            
        }
        catch(err){
            console.log(err)
        }
    }
    else{
        console.log("press Edit");
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
                    value={ufname}
                    onChange={(e)=>{setFname(e.target.value)}}
                    /> 
                  </div>
                  <div>
                    <p className='labelText'>Last Name <span className='requiredSymbol'>*</span></p>
                    <input type="text"
                    className='edit-content' 
                    required
                    readOnly
                    value={ulname}
                    onChange={(e)=>{setLname(e.target.value)}}
                    /> 
                  </div>
                  <div>
                    <p className='labelText'>Email<span className='requiredSymbol'>*</span></p>
                    <input type="email"
                    className='edit-content' 
                    required
                    readOnly
                    value={uEmail}
                    onChange={(e)=>{setUEmail((e.target.value))}}
                    /> 
                  </div>
                  <div>
                    <p className='labelText'>Student ID Number<span className='requiredSymbol'>*</span></p>
                    <input type="text" 
                    required
                    readOnly
                    value={uId}
                    onChange={(e)=>{setU_ID((Number)(e.target.value))}}
                    /> 
                  </div>
                  <div>
                    <p className='labelText'>Register Number<span className='requiredSymbol'>*</span></p>
                    <input type="text"
                    className='edit-content' 
                    required
                    readOnly
                    value={uReg_no}
                    onChange={(e)=>{setRegNo((Number)(e.target.value))}}
                    /> 
                  </div>
                  <div>
                    <p className='labelText'>DEPT<span className='requiredSymbol'>*</span></p>
                    <select name="" id="Dept" className='edit-content' readOnly value={udept} onChange={(e)=>{setDept(e.target.value)}}>
                      <option value="">Select</option>
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
                  <p className='labelText'>Year <span className='requiredSymbol'>*</span></p>
                  <select name="" id="year" readOnly value={uAcademicYear} onChange={(e)=>setYear(e.target.value)}>
                            <option value="">Select</option>
                            <option value="I">I</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                            <option value="IV">IV</option>
                  </select>
                  </div>
                <div>
                  <p className='labelText'>Regulation <span className='requiredSymbol'>*</span></p>
                  <input type="text"
                    className='edit-content' 
                    required
                    readOnly
                    value={uregulation}
                    onChange={(e)=>{setRegulation((Number)(e.target.value))}}
                    /> 
                </div>
                <div>
                  <p className='labelText'>Gender <span className='requiredSymbol'>*</span></p>
                  <select name="" id="gender" value={uGender} onChange={(e)=>setU_Gender(e.target.value)}>
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
                  required
                  readOnly
                  value={uPh_no}
                  onChange={(e)=>{setPh_No((Number)(e.target.value))}}
                  /> 
                </div>
                <div>
                  <p className='labelText'>DOB <span className='requiredSymbol'>*</span></p>
                  <input 
                  className='edit-content'
                  type="date" 
                  required
                  readOnly
                  value={uDob!==null?uDob:""}
                  onChange={(e)=>setDOB(e.target.value)}
                  />
                </div>
                <div>
                  <p className='labelText'>Address <span className='requiredSymbol'>*</span></p>
                  <textarea name="" id="" required readOnly value={uAddress} onChange={(e)=>setU_Address(e.target.value)}>

                  </textarea>
                </div>
                <div>
                    <p className='labelText'>Set Password <span className='requiredSymbol'>*</span></p>
                    <input type="password"
                    className='edit-content' 
                    required
                    readOnly
                    value={uPwd}
                    onChange={(e)=>{setU_Pwd((e.target.value))}}
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

export default StudentEditProfile