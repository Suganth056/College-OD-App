import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import './StudentODDetail.css';
import BASE_URL from '../api/baseapi'
import axios from 'axios';


const StudentODDetail = () => {

  const [remarks,setRemarks]=useState('');
  const data=useSelector((state)=>state.UserName.detail_obj);
  console.log(data,"Redux");
  const formatDate=(date_field)=>{
    const date = new Date(date_field);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    return formattedDate;
  }

  const postRemarks=async()=>{
    console.log("Posted Remarks..",data,"_____");
    let obj=await {
      student_uuid:data.student_uuid,
      remarks
    }
    try{
      const response=await axios.put(`${BASE_URL}/student/post-remarks`,obj).then(res => res)
      console.log(response);
    }
    catch(err){
      console.log(err)
    }

  }

  return (
    <div className='innerDetail-component'>
        <div className='inner-container'>
          <h4>Name</h4>
          <p>{data.StudentName}</p>
        </div>
        <div className='inner-container'>
          <h4>Register Number</h4>
          <p>{data.RegisterNum}</p>
        </div>
        <div className='inner-container'>
          <h4>ID Number</h4>
          <p>{data.Student_ID_NUM}</p>
        </div>
        <div className='inner-container'>
          <h4>Department</h4>
          <p>{data.Dept}</p>
        </div>
        <div className='inner-container'>
          <h4>Academic Year</h4>
          <p>{data.StudyingYear}</p>
        </div>
        <div className='inner-container date-format'>
          <div>
            <h4>From</h4>
            <p>{formatDate(data.starting_date)}</p>
          </div>
          <div>
            <h4>To</h4>
            <p>{formatDate(data.ending_date)}</p>
          </div>
        </div>
        <div className='inner-container'>
          <h4>Reason</h4>
          <p>{data.reason}</p>
        </div>
        <div className='inner-container'>
          <h4>Description in Letter Format</h4>
          <p>{data.shortDescription}</p>
          
        </div>
        <div className='inner-container'>
          <h4>Add Remarks</h4>
          <textarea type="text"  className='input-bar'value={remarks} onChange={(e)=>setRemarks(e.target.value)}/>
          <button type='submit' className='btn-submit' onClick={(e)=>postRemarks()}>Submit</button>
        </div>
    </div>
  )
}

export default StudentODDetail;