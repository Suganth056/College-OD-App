const express = require('express');

const router=express.Router(); 
const controller=require('../Controllers/studentController');
const controller2=require('../Controllers/studentController2');

router.get('/',controller.get)

router.put('/postData',controller.put);

router.post('/postodData',controller2.post);

router.get('/getData',controller2.get);

router.delete('/deleteReq',controller2.delete)

router.put('/post-remarks',controller2.put);

router.put('/update-status',controller2.putX)

router.put('/update-count',controller2.putCount);

router.put('/update-success',controller2.update);

module.exports=router;