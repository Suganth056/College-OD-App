import React, { useState } from 'react'
import './Entry.css';
import BASE_URL from '../../../api/baseapi';
import axios from 'axios'

const StudentEntry = () => {

  const [studentID,setStudentID]=useState(0);
  // const [blinkAdder,setBlinkAdder]=useState(null);


  const postData=async()=>{
    try{
      const res=await axios.post(`${BASE_URL}/student-entry`,{studentID}).then(res => res);
      console.log(res)

      if(res.status === 200){
        let text=document.querySelector('.blinking-text-container');
        text.classList.add('blinking-active')
        setTimeout(()=>{
          text.classList.remove('blinking-active');
        },800)
      }
      
    }
    catch(err){
      // console.log(res);
      if(err.status === 500){
        let text=document.querySelector('.blinking-text-container');
        let red_ltr=document.querySelector('.blinking-text');
        text.classList.add('blinking-active')
        red_ltr.classList.add('blinking-red');
        red_ltr.textContent="Student Already Exists"
        setTimeout(()=>{
          text.classList.remove('blinking-active');
          red_ltr.classList.remove('blinking-red');
          red_ltr.textContent="Student Added Successfully"
        },700)
      }
      console.log("Error ___ ",err)
    }
  }

  const submitHandler=(e)=>{
    e.preventDefault()
    console.log("Posted data");
    postData();

  }
  return (
    <div className='student-entry entry-container'>
      <p>Enter Student ID Number To add Entry into Database.</p>
      <form className='box-container' onSubmit={(e)=>submitHandler(e)}>
          <input type="number" 
          required 
          placeholder='Enter ID Number'
          onChange={(e)=>setStudentID((Number)(e.target.value))}
          />
          <button type='submit'>+</button>
      </form>
      <div className='blinking-text-container'>
         <span className='blinking-text '>Student Added Successfully</span>
      </div>
    </div>
  )
}

export default StudentEntry