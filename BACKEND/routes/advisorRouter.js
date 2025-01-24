const express = require('express');

const router=express.Router(); 

const basicController=require('../Controllers/Advisor_Section/advisorController1');
const controller2=require('../Controllers/Advisor_Section/odController');

router.get('/',basicController.get);

router.put('/postData',basicController.put);

router.post('/odData',controller2.post);

router.delete('/delete-entry',controller2.delete);

router.post('/get-hod-data',controller2.get);

module.exports=router; 

