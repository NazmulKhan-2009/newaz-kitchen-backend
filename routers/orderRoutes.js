const express = require('express');
const orderControllers = require('../controllers/orderControllers');
const router=express.Router();
const loginAuth=require("../middlewares/loginAuth")

router
 .route('/orderdetail')
 .post(loginAuth,orderControllers.orderFood)
 .get(loginAuth,orderControllers.orderHis)

router
 .route('/orderhistory/:email') 
 .get(loginAuth,orderControllers.orderHistory)
 
 
router
 .route('/orderhistoryall')
 .get(orderControllers.orderHistoryAll)

router
.route('/:orderId')
.get(orderControllers.orderedItem)
.patch(orderControllers.changeOrderStatus) 

// optional checking
// router
// .route('/orderhistory')
// .get(orderControllers.preOrder)









 module.exports=router