const express = require('express');
const orderControllers = require('../controllers/orderControllers');
const router=express.Router();

router
 .route('/orderdetail')
 .post(orderControllers.orderFood)

router
 .route('/orderhistory/:email') 
 .get(orderControllers.orderHistory)

router
.route('/:orderId')
.get(orderControllers.orderedItem)
.patch(orderControllers.changeOrderStatus) 









 module.exports=router