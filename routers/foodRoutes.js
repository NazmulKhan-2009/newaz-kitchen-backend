const express = require('express');
const foodControllers = require('../controllers/foodController');
const router=express.Router();

router
 .route('/fooddetail')
 .post(foodControllers.addFood)
 .get(foodControllers.getFoodsList);

router
.route('/:id')
.delete(foodControllers.deleteFood)
.patch(foodControllers.partialUpdate)
.get(foodControllers.searchFood)

router
.route('/searchfood')
.post(foodControllers.searchFoodBykey)









 module.exports=router
