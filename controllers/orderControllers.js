const OrderList=require("../models/orders")

const orderFood=async(req,res)=>{
  
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
   
   const cartOrder={
     email:req.body.email,
     order_Time:`${new Date().toDateString() } / ${new Date().toLocaleTimeString()} `,
     payment_by:req.body.payment_by,
     purchasedInfo:req.body.purchasedInfo,
     delivery_Info:req.body.deliveryInfo,
     order_status:req.body.order_status,
     ordered_Data:req.body.cart,
     orderId:`${'NK-'+Date.now()+Math.floor(Math.random())}`
     
   } 
   
   //!console.log(cartOrder.payment_by)
   
   const orderDetails=await OrderList.create(cartOrder)

   

   res.status(200).json({
    status:'success',
    data:orderDetails
   })

  }catch(e){
    res.status(400).send(e)
  } ;
}

//* ORDER HISTORY
const orderHistory=async(req,res)=>{
  try {
    const email=req.params.email
    //!console.log(email)
   const orderHistory= await OrderList.find({email})
   res.status(200).json({
     status:'success',
     data:orderHistory
   })
  } catch (error) {
    res.status(400).send(e)
  }
}



module.exports={orderFood,orderHistory}