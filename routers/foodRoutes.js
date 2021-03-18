const express = require('express');
const foodControllers = require('../controllers/foodController');
const router=express.Router();

router
 .route('/fooddetail')
 .post(foodControllers.addFood)
 .get(foodControllers.getFoodsList)









 module.exports=router
