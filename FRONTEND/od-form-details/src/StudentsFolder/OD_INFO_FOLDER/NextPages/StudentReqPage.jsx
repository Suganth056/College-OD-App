import React,{useEffect, useState} from 'react'
import {useNavigate,NavLink} from 'react-router-dom'
import './StudentReqPage.css'
import { MdDelete } from "react-icons/md";
import BASE_URL from '../../../api/baseapi'
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { modifydetail_obj } from '../../../features_Redux/userName';

const StudentReqPage = () => {
    // const user_name=useSelector((state)=> state.UserName.uname);
    const user_id=useSelector((state)=> state.UserName.id_num);
    const dispatch=useDispatch()
    const [arr,setArr]=useState([]);
    const [newArr, setNewArr] = useState([]);
    const nav=useNavigate();
    const fetchData=async()=>{
        try{
            
            const response=await axios.get(`${BASE_URL}/student/getData`).then(res => res);
            // console.log(response);
            setArr(response.data);
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchData();
    },[])
    useEffect(()=>{
        if(arr.length){
            let filteredArr=arr.filter((data,index)=>(
                data.Student_ID_NUM === user_id
                    
            ))
            setNewArr(filteredArr)
        }
    },[arr])

    const linkHandler=(data)=>{
        console.log("Data From ----",data);
        dispatch(modifydetail_obj(data));
        nav('/student-dashboard/od-req-det/inner');
    }

    const deleteData=async(data)=>{
        try{
            console.log(",_____data_____",data)
            let newData=await {id:data.student_uuid};
            const deleteResponse=await axios.delete(`${BASE_URL}/student/deleteReq`,{ data: newData }).then(res=>res);
            console.log(deleteResponse);
            fetchData();
        }
        catch(err){
            console.log(err)
        }
        
    }

  return (
    <div>
      <div className='outline-od-detail'>
          {
            newArr.length?
                newArr.map((data,index)=>(
                    <div className='Inline-od-container' key={index}>
                        
                        <div className='next-btn'>
                            <div className='first'><p className={`color-indicator ${data.od_status==="Accepted"?"Accepted":""} ${data.od_status==="Rejected"?"Rejected":""}`}></p>{data.od_status}</div>
                        </div>
                        <div className='next-btn'>
                            <p className='reason-container'>{data.reason?data.reason:""}</p>
                            <NavLink className="link-provider" onClick={(e)=>{linkHandler(data)}}>Click here....</NavLink>
                        </div>
                        <div onClick={(e)=>deleteData(data)} className='next-btn'>
                            <MdDelete className='icon-ico'/>
                        </div>
                    </div>
                ))
            :"No Data"
          }
          
      </div>
      
    </div>
  )
}

export default StudentReqPage