import React,{useState} from 'react';
import './NavAdmin.css';
import './AdminEditProfile.css';
import { useSelector, useDispatch } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import BASE_URL from '../../api/baseapi'; 
import axios from 'axios';
import { modifyName,modifyObj,modifyUID } from '../../features_Redux/userName';
import Calender from '../../Calender';

const AdminEditProfile = () => { 

        const user_detail=useSelector((state)=> state.UserName.obj);
        const dispatch=useDispatch();

        const [ufname,setFname]=useState(user_detail.AdminName);
        const [ulname,setLname]=useState(user_detail.AdminLastName);
        const [uId,setU_ID]=useState(user_detail.ID_NUM);
        const [uEmail,setUEmail]=useState(user_detail.email)
        const [uGender,setU_Gender]=useState(user_detail.Gender)
        const [uPh_no,setPh_No]=useState(user_detail.phone_num)
        const [uDob,setDOB]=useState(Calender(user_detail.dob))
        const [uAddress,setU_Address]=useState(user_detail.address)
        const [uPwd,setU_Pwd]=useState(user_detail.pwd)

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
                ufname,
                ulname,
                uId,
                uEmail,
                uGender,
                uAddress,
                uDob,
                uPh_no,
                uPwd
            }
            if(editable){
                try{
                    let response=await axios.post(`${BASE_URL}/adminSignup`,obj).then(res => console.log(res));
                    alert("Updated Successfully");
                    dispatch(modifyObj({
                        AdminName:ufname,
                        AdminLastName:ulname,
                        ID_NUM:uId,
                        Gender:uGender,
                        email:uEmail,
                        dob:uDob,
                        address:uAddress,
                        phone_num:uPh_no,
                        pwd:uPwd
                    }));
                    dispatch(modifyUID(uId));
                    dispatch(modifyName(ufname));                    
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
    <div className='admin-edit-profile'>
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
                        onChange={(e)=>setFname(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className='labelText'>Last Name <span className='requiredSymbol'>*</span></p>
                        <input type="text"
                        className='edit-content' 
                        readOnly
                        required
                        value={ulname}
                        onChange={(e)=>setLname(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className='labelText'>ID Number <span className='requiredSymbol'>*</span></p>
                        <input
                        type="text" 
                        //   className='edit-content'
                        required
                        readOnly
                        value={uId}
                        onChange={(e)=>setU_ID((Number)(e.target.value))}
                        />
                    </div>
                    <div>
                        <p className='labelText'>Email<span className='requiredSymbol'>*</span></p>
                        <input 
                        type="email" 
                        className='edit-content'
                        required
                        readOnly
                        value={uEmail}
                        onChange={(e)=>setUEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className='labelText'>Gender <span className='requiredSymbol'>*</span></p>
                        <select name="" id="year" value={uGender}  onChange={(e)=>setU_Gender(e.target.value)}>
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
                        className='edit-content'
                        required
                        readOnly
                        value={uPh_no}
                        onChange={(e)=>setPh_No(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className='labelText'>DOB <span className='requiredSymbol'>*</span></p>
                        <input 
                        type="date" 
                        className='edit-content'
                        required
                        readOnly
                        value={uDob}
                        onChange={(e)=>setDOB(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className='labelText'>Address <span className='requiredSymbol '>*</span></p>
                        <textarea name="" id="" value={uAddress} className='edit-content' required readOnly onChange={(e)=>setU_Address(e.target.value)}>

                        </textarea>
                    </div>
                    <div>
                        <p className='labelText'>Set Password <span className='requiredSymbol'>*</span></p>
                        <input 
                        type="password"
                        className='edit-content' 
                        required
                        readOnly
                        value={uPwd}
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

export default AdminEditProfile