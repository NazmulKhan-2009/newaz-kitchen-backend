const express=require('express')
const userController=require('../controllers/userController')
const router=express.Router()

router
.route('/signup')
.post(userController.createUser)

router
.route('/signin')
.post(userController.signIn)

router
.route('/alluser')
.get(userController.userList)

router
.route('/activeacc/:signupinfo')
.get(userController.verifiedUser)

module.exports=router