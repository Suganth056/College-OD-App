import React,{useState,useEffect} from 'react'
import { HiOutlineXMark } from "react-icons/hi2";
import { IoCheckmarkOutline } from "react-icons/io5";
import './AdvisorDashboard.css'
import BASE_URL from '../../api/baseapi'; 
import axios from 'axios';
import { useSelector,useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { modifydetail_obj } from '../../features_Redux/userName';

const AdvisorDashboard = () => {
  const user_id=useSelector((state)=> state.UserName.id_num);
  const user_obj=useSelector((state)=>state.UserName.obj);

  console.log("OBJ",user_obj)
  console.log("User ID=",user_id);
  const [advisorDetail,setDetail]=useState([]);
  const nav=useNavigate()
  const dispatch=useDispatch();
  let hod_id;

  const fetchData=async(user_id)=>{
    let obj={id_num:user_id}
    try{
      const response=await axios.post(`${BASE_URL}/advisor/odData`,obj).then(res => res);
      console.log("____res_____",response);
      setDetail(response.data);
    }
    catch(err) {
      console.log(err)
    }
  }

useEffect(()=>{
    fetchData(user_id);
},[])

  const nextPage=(data)=>{
    // console.log(data);
    dispatch(modifydetail_obj(data));
    nav('/advisor-dashboard/dashboard/innerDetail')
  }

  const deleteEntry=async(data)=>{
    console.log(" Entry",data);
      try{
        const deleteResponse=await axios.delete(`${BASE_URL}/advisor/delete-entry`,{data}).then(res => res);
        console.log("Delete Response",deleteResponse);
        fetchData(user_id);
      }
      catch(err){
        console.log(err)
      }
  }

  const rejected=async(data)=>{
    console.log("Rejected");
    console.log(data);
    try{
      const response=await axios.put(`${BASE_URL}/student/update-status`,data).then(res => res);
      console.log(response);
      await deleteEntry(data);
      // console.log("delete")
    }
    catch(err){
      console.log(err)
    }
  }

  const accepted=async(data)=>{
    let obj={
      data,
      count:1,
    }
    let dept=user_obj.DEPT;
    try{
      const response=await axios.post(`${BASE_URL}/advisor/get-hod-data`,{dept}).then(res => res);
      console.log("DEPT RES",response);
      hod_id=await response.data[0].HOD_ID_NUM;
      console.log(hod_id)
      if(hod_id){
        const postResponse=await axios.post(`${BASE_URL}/hod/post-od-data`,{data,hod_id}).then(res => res);
        console.log(postResponse,"HOD kita pass aanathu");
        const response=await axios.put(`${BASE_URL}/student/update-count`,obj).then(res => res);
        console.log(response);
        deleteEntry(data)
      }
    }
    catch(err){
      console.log(err);
    }
  }


  return (
    <div className='advisor-dashboard'>
      {/* <div className='inner-body'>
        <div>
            <p>Requested from Suganth.B {"(622521104054)---[IV-CSE]"}</p>
        </div>
        <div>
              <HiOutlineXMark className='icon'/>
              <IoCheckmarkOutline className='icon'/>
        </div>
      </div> */}

      {
        advisorDetail && advisorDetail.length>0 ?
        advisorDetail.map((data,index)=>(
          <div className='inner-body' key={index}>
            <div onClick={()=>nextPage(data)}>
                <p className='p-tag'>Requested from <span style={{fontWeight:"bolder"}}>{data.StudentName}</span> {`(${data.Student_ID_NUM}) --- [${data.StudyingYear}-${data.Dept}]`}</p>
            </div>
            <div>
                  <HiOutlineXMark className='icon' onClick={()=>rejected(data)}/>
                  <IoCheckmarkOutline className='icon' onClick={()=>accepted(data)}/>
            </div>
          </div>
        ))

        :`No Data`
      }
     
      
           
    </div>
  )
}

export default AdvisorDashboard