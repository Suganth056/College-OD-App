import React,{useState,useEffect} from 'react'
import './SignUpStudent.css';
import BASE_URL from '../api/baseapi'
import axios from 'axios'
import { useNavigate} from 'react-router-dom';

const SignUpStudent = () => {

    const [student_fname,setFname]=useState('');
    const [student_lname,setLname]=useState('')
    const [student_Id,setU_ID]=useState('')
    const [student_roll_num,setStudentRoll]=useState('')
    const [student_Email,setUEmail]=useState('')
    const [studentDept,setDept]=useState('CSE');
    const [studentYear,setYear]=useState('I');
    const [regulation,setRegulation]=useState('');
    const [studentGender,setU_Gender]=useState('Male')
    const [studentPh_no,setPh_No]=useState('')
    const [studentDob,setDOB]=useState("")
    const [studentAddress,setU_Address]=useState('')
    const [studentPwd,setU_Pwd]=useState('')

    const [studentDetail,setDetail]=useState([])

    const nav=useNavigate();

    const fetchData=async(e)=>{ 
        e.preventDefault();
        try{
          let response=await axios.get(`${BASE_URL}/student`).then(res =>res);

          console.log(response)

          setDetail(response.data);
        }
        catch(err){
          console.log(err)
        }
    }


    const postData=async(obj)=>{
        console.log(obj);
        try{
          const postRes=await axios.put(`${BASE_URL}/student/postData`,obj).then(res => res);
          console.log(postRes)
          nav('/');
        }
        catch(err){
          console.log(err)
        }
    }

    useEffect(()=>{
        console.log("________stud_____",studentDetail)
        let flag=false;
        let count=0;
        for(let i=0;i<studentDetail.length;i++){
          
          if(studentDetail[i].Student_ID_NUM === student_Id){
            console.log("True",i)
            if(!studentDetail[i].Email){
              flag=true
              let obj={
                studentAddress,
                studentDept,
                studentDob,
                studentGender,
                studentPh_no,
                studentPwd,
                studentYear,
                student_Email,
                student_Id,
                student_fname,
                student_lname,
                student_roll_num,
                regulation
              }
              postData(obj);
              
            }
            else{
              alert("Already Account Exists");
            }
          }
          else{
            count+=1;
          }
        }
        if(!flag && count>=1){
          alert("Not a Valid User")
        }
    },[studentDetail])

  return (
    <div className='SignUp-container'>
      
      <h2>Student Account Creation Form</h2>
      
      <p className='pers-det'>Personal Details</p>
      <div className='signup-outline-container'>
          <form className='signup-inline-container' onSubmit={(e)=>fetchData(e)}>
              <div>
                  <p className='labelText'>First Name <span className='requiredSymbol'>*</span></p>
                  <input 
                  type="text" 
                  required
                  value={student_fname}
                  onChange={(e)=>setFname(e.target.value)}
                  />
              </div>
              <div>
                  <p className='labelText'>Last Name <span className='requiredSymbol'>*</span></p>
                  <input 
                  type="text" 
                  required
                  value={student_lname}
                  onChange={(e)=>setLname(e.target.value)}
                  />
              </div>
              <div>
                  <p className='labelText'>Email <span className='requiredSymbol'>*</span></p>
                  <input 
                  type="email" 
                  required
                  value={student_Email}
                  onChange={(e)=>setUEmail(e.target.value)}
                  />
              </div>
              <div>
                  <p className='labelText'>Student ID Number <span className='requiredSymbol'>*</span></p>
                  <input 
                  type="number" 
                  required
                  value={student_Id}
                  onChange={(e)=>setU_ID((Number)(e.target.value))}
                  />
              </div>
              <div>
                  <p className='labelText'>Register Number <span className='requiredSymbol'>*</span></p>
                  <input 
                  type="number" 
                  required
                  value={student_roll_num}
                  onChange={(e)=>setStudentRoll((Number)(e.target.value))}
                  />
              </div>
              <div>
                        <p className='labelText'>DEPT <span className='requiredSymbol'>*</span></p>
                        <select name="" id="dept" value={studentDept} onChange={(e)=>setDept(e.target.value)}>
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
                  <p className='labelText'>Year <span className='requiredSymbol'>*</span></p>
                  <select name="" id="year" value={studentYear} onChange={(e)=>setYear(e.target.value)}>
                            <option value="">Select</option>
                            <option value="I">I</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                            <option value="IV">IV</option>
                  </select>
                </div>
                <div>
                  <p className='labelText'>Regulation <span className='requiredSymbol'>*</span></p>
                  <input 
                  type="number" 
                  required
                  value={regulation}
                  onChange={(e)=>setRegulation((Number)(e.target.value))}
                  />
                </div>
                <div>
                  <p className='labelText'>Gender <span className='requiredSymbol'>*</span></p>
                  <select name="" id="gender" value={studentGender} onChange={(e)=>setU_Gender(e.target.value)}>
                    <option value="">Select</option>
                    <option value="I">Male</option>
                    <option value="II">Female</option>
                    <option value="III">Others</option>
                  </select>
                </div>
                <div>
                  <p className='labelText'>Phone Number <span className='requiredSymbol'>*</span></p>
                  <input 
                  type="number" 
                  required
                  value={studentPh_no}
                  onChange={(e)=>setPh_No((Number)(e.target.value))}
                  />
                </div>
                <div>
                  <p className='labelText'>DOB <span className='requiredSymbol'>*</span></p>
                  <input 
                  type="date" 
                  required
                  value={studentDob}
                  onChange={(e)=>setDOB(e.target.value)}
                  />
                </div>
                <div>
                  <p className='labelText'>Address <span className='requiredSymbol'>*</span></p>
                  <textarea name="" id="" required value={studentAddress} onChange={(e)=>setU_Address(e.target.value)}>

                  </textarea>
                </div>
                <div>
                    <p className='labelText'>Set Password <span className='requiredSymbol'>*</span></p>
                    <input 
                    type="password" 
                    required
                    value={studentPwd}
                    onChange={(e)=>setU_Pwd(e.target.value)}
                  />
                </div>
                <div className='btn-submit-container'>
                  <button type='submit'>Create Account</button>
                </div>
          </form>
      </div>
    </div>
  )
}

export default SignUpStudent