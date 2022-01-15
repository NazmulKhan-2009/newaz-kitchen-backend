const OrderList=require("../models/orders")
const user=require("../models/user")
const jwt=require('jsonwebtoken')
const admin=require('../models/admin')

const orderFood=async(req,res)=>{
  // console.log(req.body.paymentCondition)
  
//* ###### CREATE METHOD WAY
 try{
   const adminFound=await admin.findOne({admin_email:req.body.email})

  

  const cartOrder={
     email:req.body.email,
     order_Time:`${new Date().toDateString() } / ${new Date().toLocaleTimeString()} `,
     payment_by:req.body.payment_by,
     purchasedInfo:req.body.purchasedInfo,
     delivery_Info:req.body.deliveryInfo,
     order_status:req.body.order_status,
     ordered_Data:req.body.cart,
     orderId:`${'NK-'+Date.now()+Math.floor(Math.random())}`,
     user:req.user_id,
     paymentCondition:req.body.paymentCondition

   
   } 
   
   //!console.log(cartOrder.payment_by)
   
   if(!adminFound){
    const newOrder=new OrderList(cartOrder)
    const orderDetails=await newOrder.save()
    const inv=await user.updateOne({_id:req.user_id},{
     $push:{
        order:orderDetails._id
     }
   })

    res.status(200).json({
    status:'success',
    data:orderDetails
     })

     }else{
    res.status(200).json({
      status:'Admin is prohibited for the feature',      
       })
     }  
    }catch(e){
    res.status(400).send(e)
    } ;
}

//* ORDER HISTORY
const orderHistory=async(req,res)=>{
  // console.log(`order controlling:: ${req.user_name}`)
  // console.log(`${req.user_id}`)
  // console.log(req.error)
  

  try {
  if(!req.error){
    const email=req.params.email
    //!console.log(email)
   const orderHistory= await OrderList.find({email})
   res.status(200).json({
     status:'success',
     data:orderHistory,
     session:true
   })
  }else{
    // console.log('tim time errow')
    res.status(201).json({error:'Authentication failed',session:false})
  }

  } catch (error) {
    res.status(400).send(error)
  }
}

const orderHistoryAll=async(req,res)=>{
  try{
    const orderHistory= await OrderList.find({})
    res.status(200).json({data:orderHistory})
  
   }catch(error){
     res.status(400).send(error)
    } ;
}

//* ORDERED ITEM search for status change
const orderedItem=async(req,res)=>{ 
  try{
    const orderId=req.params.orderId
    const data=await OrderList.find({orderId})
    res.status(200).json({
      status:"success",
      data:{
        foodName:data[0].ordered_Data.map(item=>item.foodTitle),
        orderStatus:data[0].order_status,
        email:data[0].email      
      }
    })
   }catch(e){
     res.status(400).send(e)
    } ;
}

//*Order Status Change

const changeOrderStatus=async(req,res)=>{
try {
  const orderId=req.params.orderId
  const order_status=req.body
  const data=await OrderList.findOneAndUpdate({orderId:orderId},order_status,{new:true})
  if(data!==null){
    res.status(200).json({
      status:"success",
      sms:`Successfully order status Change from  to ${data.order_status}`
    })
  }
} catch (e) {
  res.status(400).send(e)
}
}

const orderHis=async(req, res)=>{
  try{
    const response= await OrderList.find()
    .populate('user',"user_name user_email -_id")

    if(!req.error){
      res.status(200).send(response)
    }else{
      res.status(200).json("auth failed")
    }
    
    res.status(200).send(response)
   }catch(e){
     res.status(400).send(e)
    } ;
}


module.exports={
            orderFood,
            orderHistory,
            orderedItem,
            changeOrderStatus,
            orderHis,
            orderHistoryAll
          }