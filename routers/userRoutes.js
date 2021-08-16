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
.patch(userController.imageUpload)

router
.route('/alluser/:email')
.get(userController.getProfile)

router
.route('/activeacc/:signupinfo')
.get(userController.verifiedUser)

router
.route('/favfood/:foodId/:email')
.patch(userController.addFavFood)

router
.route('/addevent')
.post(userController.addEvent)

router
.route('/event/:eventId')
.patch(userController.cancelEvent)

module.exports=router