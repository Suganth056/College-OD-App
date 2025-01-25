import React, { useState } from 'react'
import './Entry.css';
import BASE_URL from '../../../api/baseapi';
import axios from 'axios'

const HODEntry = () => {

  const [hodID,setHodID]=useState(0);

  const postData=async()=>{
    try{
      const res=await axios.post(`${BASE_URL}/hod-entry`,{hodID}).then(res => res);

      if(res.status === 200){
        let text=document.querySelector('.blinking-text-container');
        text.classList.add('blinking-active')
        setTimeout(()=>{
          text.classList.remove('blinking-active');
        },800)
      }
      
    }
    catch(err){
      if(err.status === 500){
        let text=document.querySelector('.blinking-text-container');
        let red_ltr=document.querySelector('.blinking-text');
        text.classList.add('blinking-active')
        red_ltr.classList.add('blinking-red');
        red_ltr.textContent="User Already Exists"
        setTimeout(()=>{
          text.classList.remove('blinking-active');
          red_ltr.classList.remove('blinking-red');
          red_ltr.textContent="User Added Successfully"
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
      <p>Enter HOD ID Number To add Entry into Database.</p>
      <form className='box-container' onSubmit={(e)=>submitHandler(e)}>
          <input 
          type="number" 
          required 
          placeholder='Enter ID Number'
          onChange={(e)=>setHodID(e.target.value)}
          />
          <button type='submit'>+</button>
      </form>
      <div className='blinking-text-container'>
         <span className='blinking-text '>User Added Successfully</span>
      </div>
    </div>
  )
}

export default HODEntry