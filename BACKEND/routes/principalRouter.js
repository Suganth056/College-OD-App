const express = require('express');

const router=express.Router(); 

const basicController=require('../Controllers/Principal_Section/principalController1');

router.get('/',basicController.get);

router.put('/postData',basicController.put);

router.post('/post-od-data',basicController.post);

router.post('/get-od-data',basicController.getOdData);

router.delete('/delete-req-data',basicController.delete);

module.exports=router; 