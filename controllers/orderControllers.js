const OrderList=require("../models/orders")
const user=require("../models/user")
const jwt=require('jsonwebtoken')
const admin=require('../models/admin')

const orderFood=async(req,res)=>{
  console.log(req.user_id)
  console.log(req.user_name)
  // console.log(`${req.user_id}`)
  // console.log(req.body)
//?   #### SAVE METHOD WAY
  // try{
  //   const cartOrder=new OrderList({
  //     email:req.body.email,
  //     cart:req.body.cart
  //   })
  
  //   const getInfo=await cartOrder.save()
  //   res.status(200).json({
  //         status:'success',
  //         data:getInfo
  //        })
      
  //  }catch(e){
     
  //   } ;

 
//* ###### CREATE METHOD WAY
 try{

   const adminFound=await admin.findOne({admin_email:req.body.email})
  //  console.log(adminFound)

   const cartOrder={
     email:req.body.email,
     order_Time:`${new Date().toDateString() } / ${new Date().toLocaleTimeString()} `,
     payment_by:req.body.payment_by,
     purchasedInfo:req.body.purchasedInfo,
     delivery_Info:req.body.deliveryInfo,
     order_status:req.body.order_status,
     ordered_Data:req.body.cart,
     orderId:`${'NK-'+Date.now()+Math.floor(Math.random())}`,
     user:req.user_id
     
   } 
   
   //!console.log(cartOrder.payment_by)
   
  //  const orderDetails=await OrderList.create(cartOrder)

   if(!adminFound){

  const newOrder=new OrderList(cartOrder)
   const orderDetails=await newOrder.save()
   const inv=await user.updateOne({_id:req.user_id},{
     $push:{
        order:orderDetails._id
     }
   })

  //  console.log(orderDetails)
  //  console.log(inv)

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
  // console.log(req.headers.authorization.split(' ')[1])
  // const token=req.headers.authorization.split(' ')[1]
  // const decode=jwt.verify(token,"mynameiskhan")
  // console.log(decode)
  console.log(`order controlling:: ${req.user_name}`)
  console.log(`${req.user_id}`)
  console.log(req.error)
  // console.log(req)

  try {

  //   const email=req.params.email
  //   //!console.log(email)
  //  const orderHistory= await OrderList.find({email})
  //  res.status(200).json({
  //    status:'success',
  //    data:orderHistory
  //  })

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
    console.log('tim time errow')
    res.status(201).json({error:'Authentication failed',session:false})
  }

  } catch (error) {
    res.status(400).send(error)
    // res.status(400).send(e)
    // console.log(error)
  }
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

  console.log(orderId,order_status)

  

  const data=await OrderList.findOneAndUpdate({orderId:orderId},order_status,{new:true})
  console.log(data.email)
  
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

// optioanl checking of populate for relation id

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
            orderHis
          }