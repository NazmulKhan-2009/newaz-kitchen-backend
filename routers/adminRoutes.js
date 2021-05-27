const {createAdmin}=require('../controllers/adminController')

const express = require('express')
const router=express.Router()

router
.route('/createadmin')
.post(createAdmin)







module.exports=router