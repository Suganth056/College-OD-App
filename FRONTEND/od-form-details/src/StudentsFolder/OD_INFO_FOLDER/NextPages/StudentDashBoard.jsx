import React,{useState,useEffect} from 'react'
import './StudentDashboard.css';
import '../../SignUpStudent.css';
import BASE_URL from '../../../api/baseapi'
import axios from 'axios';
import { useSelector } from 'react-redux';
import {v4 as uuidv4} from 'uuid';

const StudentDashBoard = () => {

  const user_id=useSelector((state)=> state.UserName.id_num);

  const [student_name,setName]=useState('');
  const [student_id,setID]=useState('');
  const [student_reg_no,setRegNo]=useState('');
  const [student_Dept,setDept]=useState('CSE');
  const [student_Year,setYear]=useState('I');
  const [student_Advisor_id,setAdv_id]=useState('');
  const [student_startDate,setStartDate]=useState('');
  const [student_EndDate,setEndDate]=useState('');
  const [student_reason,setReason]=useState('');
  const [student_desc,setDescription]=useState('');

  const postData=async(e)=>{
    e.preventDefault();
      let obj=await {
        student_name,
        student_id,
        student_reg_no,
        student_Dept,
        student_Year,
        student_Advisor_id,
        student_startDate,
        student_EndDate,
        student_reason,
        student_desc,
        uuidv4:uuidv4()
        
      }
      console.log(obj);
      let res=await (user_id===obj.student_id?true:false);
      console.log(res)
      if(res){
        try{
        
          const response=await axios.post(`${BASE_URL}/student/postodData`,obj).then(res => res);
          console.log(response)
          alert("updated successfully");
        }
        catch(err){
  
        }
      }
      else{
        alert("Enter Valid userID");
      }
      
      
  }

  return (
    <div className='container-nav-and-dashboard'>
    
      <div className='application-form-container'>
        <p>On-Duty Application Filling Form</p>

        <form className='form-details-box' onSubmit={(e)=>postData(e)}>
            <div>
              <p>Name <span className='req-field'>*</span></p>
              <input 
              type="text" 
              required
              value={student_name}
              onChange={(e)=>setName(e.target.value)}
              />
            </div>
            <div>
              <p>Student ID Number <span className='req-field'>*</span></p>
              <input 
              type="text" 
              required
              value={student_id}
              onChange={(e)=>setID((Number)(e.target.value))}
              />
            </div>
            <div>
              <p>Student Register Number <span className='req-field'>*</span></p>
              <input 
              type="text" 
              required
              value={student_reg_no}
              onChange={(e)=>setRegNo((Number)(e.target.value))}
              />
            </div>
            <div>
                <p className='labelText'>DEPT <span className='req-field'>*</span></p>
                <select name="" id="dept" value={student_Dept} onChange={(e)=>setDept(e.target.value)}>
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
                <p className='labelText'>Year <span className='req-field'>*</span></p>
                <select name="" id="year" value={student_Year} onChange={(e)=>setYear(e.target.value)}>
                    <option value="">Select</option>
                    <option value="I">I</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
               </select>
            </div>
            <div>
              <p>Advisor's ID Number <span className='req-field'>*</span></p>
              <input 
              type="text" 
              required
              value={student_Advisor_id}
              onChange={(e)=>setAdv_id((Number)(e.target.value))}
              />
            </div>
            <div className='multiple-col-container'>
              <div>
                  <p>Starting Date <span className='req-field'>*</span></p>
                  <input 
                  type="date" 
                  required
                  value={student_startDate}
                  onChange={(e)=>setStartDate(e.target.value)}
                  />
              </div>
              <div>
                  <p>Ending Date <span className='req-field'>*</span></p>
                  <input 
                  type="date" 
                  required
                  value={student_EndDate}
                  onChange={(e)=>setEndDate(e.target.value)}
                  />
              </div>
            </div>
            {/* <div>
              <p>Brochure Attachments </p>
              <input type="file"/>
            </div> */}
            <div>
              <p>Reasons <span className='req-field'>*</span></p>
              <input 
              type="text" 
              required
              value={student_reason}
              onChange={(e)=>setReason(e.target.value)}
              />
            </div>
            <div>
              <p>Short Descriptions About O/D <span className='req-field'>*</span></p>
              <textarea name="" id="" required placeholder='Write a Brief Description About your OD Program' value={student_desc} onChange={(e)=>setDescription(e.target.value)}></textarea>
            </div>
            <div>
              <button type='submit'>Submit Application</button>
            </div>
        </form>
      </div>

    </div>
  )
}

export default StudentDashBoard