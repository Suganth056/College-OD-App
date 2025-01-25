import React,{useState,useEffect} from 'react'
import { HiOutlineXMark } from "react-icons/hi2";
import { IoCheckmarkOutline } from "react-icons/io5";
import '../../AdvisorFolder/NextPageComponents/AdvisorDashboard.css'
import BASE_URL from '../../api/baseapi'; 
import axios from 'axios';
import { useSelector,useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { modifydetail_obj } from '../../features_Redux/userName';

const HodDashboard = () => {
  const user_id=useSelector((state)=> state.UserName.id_num);
  // const user_obj=useSelector((state)=>state.UserName.obj);
  const [req_data,setData]=useState([]); 

  const dispatch=useDispatch();
  const nav=useNavigate();

  const fetchData=async()=>{
    try{
      const response=await axios.post(`${BASE_URL}/hod/get-od-data`,{user_id}).then(res => res);

      setData(response.data);
    }
    catch(err){
      console.log("ERROR::",err)
    }
  }

  const nextPage=(data)=>{

      dispatch(modifydetail_obj(data));
      nav('/hod-dashboard/dashboard/innerDetail')
    }
    const deleteEntry=async(data)=>{
      // console.log(" Entry",data);
        try{
          const deleteResponse=await axios.delete(`${BASE_URL}/hod/delete-req-data`,{data}).then(res => res);
          console.log("Delete Response",deleteResponse);
          fetchData();
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
        // console.log(response);
        await deleteEntry(data);
        // console.log("delete")
      }
      catch(err){
        console.log(err)
      }
    }

    const accepted=async(data)=>{
      console.log("Accepted-by hod");
      let obj={
        data,
        count:2,
      }
      let principal_id_num;
      try{
          const principalData=await axios.get(`${BASE_URL}/principal/`).then(res => res);
          // console.log(principalData);
          principal_id_num=principalData.data[0].Principal_ID_NUM;
          // console.log(principal_id_num)
          const postResponse=await axios.post(`${BASE_URL}/principal/post-od-data`,{data,principal_id_num}).then(res => res);
          // console.log(postResponse,"HOD kita pass aanathu");
          const response=await axios.put(`${BASE_URL}/student/update-count`,obj).then(res => res);
          // console.log(response);
          deleteEntry(data)
        
      }
      catch(err){
        console.log(err);
      }
    }

  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className='hod-dashboard advisor-dashboard'>
      {
        req_data && req_data.length>0 ?
        req_data.map((data,index)=>(
            <div className='inner-body' key={index}>
              <div onClick={()=>nextPage(data)}>
                <p className='p-tag'>Requested from <span style={{fontWeight:"bolder"}}>{data.StudentName}</span> {`(${data.Student_ID_NUM}) --- [${data.StudyingYear}-${data.Dept}]`}</p>
              </div>
              <div>
                <HiOutlineXMark className='icon'onClick={()=>rejected(data)}/>
                <IoCheckmarkOutline className='icon'onClick={()=>accepted(data)}/>
              </div>
            </div>
           ))
      :`No Data`
      }    
    </div>
  )
}

export default HodDashboard