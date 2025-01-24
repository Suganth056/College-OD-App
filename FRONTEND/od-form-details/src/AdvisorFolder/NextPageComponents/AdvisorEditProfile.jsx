import React,{useState} from 'react'
import { FaEdit } from "react-icons/fa";
import BASE_URL from '../../api/baseapi'; 
import axios from 'axios'; 
import { useSelector,useDispatch } from 'react-redux';
import Calender from '../../Calender';
import { modifyName, modifyObj, modifyUID } from '../../features_Redux/userName';

const AdvisorEditProfile = () => {

  const user_detail=useSelector((state)=> state.UserName.obj);
  console.log("user Detail",user_detail);

  const [advisor_fname,setFname]=useState(user_detail.AdvisorName);
  const [advisor_lname,setLname]=useState(user_detail.AdvisorLastName);
  const [advisor_Id,setU_ID]=useState(user_detail.Advisor_ID_NUM);
  const [advisor_Email,setUEmail]=useState(user_detail.Email);
  const [advisorDept,setDept]=useState(user_detail.DEPT);
  const [advisorYear,setYear]=useState(user_detail.YearOfAdvisor);
  const [advisorGender,setU_Gender]=useState(user_detail.Gender);
  const [advisorPh_no,setPh_No]=useState(user_detail.phone_num);
  const [advisorDob,setDOB]=useState(Calender(user_detail.dob));
  const [advisorAddress,setU_Address]=useState(user_detail.address);
  const [advisorPwd,setU_Pwd]=useState(user_detail.pwd);

  const [editable,setEdit]=useState(false);
  const dispatch=useDispatch();

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
    if(editable){
        try{
          const response=await axios.put(`${BASE_URL}/advisor/postData`,obj).then(res => res);
          console.log(response);
          alert("Updated Successfully");
          dispatch(modifyObj({
              AdvisorName:advisor_fname,
              AdvisorLastName:advisor_lname,
              Advisor_ID_NUM:advisor_Id,
              DEPT:advisorDept,
              YearOfAdvisor:advisorYear,
              Gender:advisorGender,
              Email:advisor_Email,
              dob:advisorDob,
              address:advisorAddress,
              phone_num:advisorPh_no,
              pwd:advisorPwd
            }));
            dispatch(modifyUID(advisor_Id));
            dispatch(modifyName(advisor_fname));          
            
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
                value={advisor_fname}
                onChange={(e)=>setFname(e.target.value)}
                />
            </div> 
            <div>
              <p className='labelText'>Last Name <span className='requiredSymbol'>*</span></p>
              <input type="text"
              className='edit-content' 
              readOnly
              required
              value={advisor_lname}
              onChange={(e)=>setLname(e.target.value)}
              />
            </div>
            <div>
              <p className='labelText'>ID Number <span className='requiredSymbol'>*</span></p>
              <input type="text"
              className='edit-content' 
              readOnly
              required
              value={advisor_Id}
              onChange={(e)=>setU_ID((Number)(e.target.value))}
              />
            </div>
            <div>
              <p className='labelText'>Email <span className='requiredSymbol'>*</span></p>
              <input type="email"
              className='edit-content' 
              readOnly
              required
              value={advisor_Email}
              onChange={(e)=>setUEmail(e.target.value)}
              />
            </div>
            <div>
              <p className='labelText'>DEPT<span className='requiredSymbol'>*</span></p>
              <select name="" id="Dept" className='edit-content' readOnly value={advisorDept} onChange={(e)=>setDept(e.target.value)}>
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
              <select name="" id="year" readOnly value={advisorYear} onChange={(e)=>setYear(e.target.value)}>
                <option value="">Select</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
              </select>
            </div>
            <div>
              <p className='labelText'>Gender<span className='requiredSymbol'>*</span></p>
              <select name="" id="Gender" value={advisorGender} onChange={(e)=>setU_Gender(e.target.value)}>
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
              value={advisorPh_no}
              onChange={(e)=>setPh_No((Number)(e.target.value))}
              />
            </div>
            <div>
              <p className='labelText'>DOB <span className='requiredSymbol'>*</span></p>
              <input type="date"
              className='edit-content' 
              readOnly
              required
              value={advisorDob}
              onChange={(e)=>setDOB(e.target.value)}
              />
            </div>
            <div>
              <p className='labelText'>Address <span className='requiredSymbol '>*</span></p>
              <textarea name="" id="" className='edit-content' required readOnly value={advisorAddress} onChange={(e)=>setU_Address(e.target.value)}>
              </textarea>
            </div>
            <div>
              <p className='labelText'>Password <span className='requiredSymbol'>*</span></p>
              <input type="password"
              className='edit-content' 
              readOnly
              required
              value={advisorPwd}
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

export default AdvisorEditProfile